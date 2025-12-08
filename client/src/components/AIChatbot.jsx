import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Maximize2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCodeContext } from '../contexts/CodeContext';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getCode } = useCodeContext();
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hi! I can help you understand this page or answer any coding questions. What do you need help with?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Resize State
    const [size, setSize] = useState({ width: 400, height: 500 });
    const isResizingRef = useRef(false);
    const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

    const location = useLocation();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle Resize Logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizingRef.current) return;

            const deltaX = e.clientX - resizeStartRef.current.x;
            const deltaY = e.clientY - resizeStartRef.current.y;

            // Since anchored bottom-left:
            // Dragging Right (positive deltaX) -> Increase Width
            // Dragging Up (negative deltaY) -> Increase Height

            setSize({
                width: Math.max(300, Math.min(800, resizeStartRef.current.w + deltaX)),
                height: Math.max(400, Math.min(900, resizeStartRef.current.h - deltaY))
            });
        };

        const handleMouseUp = () => {
            isResizingRef.current = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto'; // Re-enable text selection
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        if (isResizingRef.current) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []); // Empty dependency array as we use refs/event listeners dynamically

    const startResize = (e) => {
        e.preventDefault();
        isResizingRef.current = true;
        resizeStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            w: size.width,
            h: size.height
        };
        // Disable text selection while resizing
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ne-resize'; // North-East resize cursor

        // We attach listeners directly to window in the mousedown handler to ensure they are active immediately
        const handleMouseMove = (evt) => {
            if (!isResizingRef.current) return;
            const deltaX = evt.clientX - resizeStartRef.current.x;
            const deltaY = evt.clientY - resizeStartRef.current.y;
            setSize({
                width: Math.max(300, Math.min(800, resizeStartRef.current.w + deltaX)),
                height: Math.max(400, Math.min(900, resizeStartRef.current.h - deltaY))
            });
        };

        const handleMouseUp = () => {
            isResizingRef.current = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const getPageContext = () => {
        // Get visible text content
        let context = document.body.innerText.substring(0, 10000);

        // Check if there is code in the editor context
        const editorCode = getCode();
        if (editorCode && editorCode.trim().length > 0 && editorCode.trim() !== 'undefined') {
            context += `\n\n--- USER CODE EDITOR CONTENT ---\n${editorCode}\n--------------------------------`;
        }

        return context;
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/chat`, { // Adjust URL based on env
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Optional, if needed
                },
                body: JSON.stringify({
                    message: userMessage,
                    context: getPageContext(),
                    pageUrl: window.location.href
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'ai', content: `Error: ${data.error || 'Something went wrong.'}` }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I cannot connect to the server right now.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center animate-bounce-slow"
                    title="Ask AI Helper"
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-75 relative"
                    style={{
                        width: `${size.width}px`,
                        height: `${size.height}px`
                    }}
                >
                    {/* Resize Handle - Top Right */}
                    <div
                        onMouseDown={startResize}
                        className="absolute top-0 right-0 w-6 h-6 z-50 cursor-ne-resize flex items-center justify-center text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-bl-lg"
                        title="Drag to resize"
                    >
                        <Maximize2 size={14} />
                    </div>

                    {/* Header */}
                    <div className="bg-indigo-600 p-4 flex justify-between items-center text-white cursor-move select-none">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <h3 className="font-semibold">AI Assistant</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-indigo-700 p-1 rounded transition ml-4"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {
                                        // Simple formatting for creating line breaks
                                        msg.content.split('\n').map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                {i !== msg.content.split('\n').length - 1 && <br />}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about this page..."
                            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AIChatbot;
