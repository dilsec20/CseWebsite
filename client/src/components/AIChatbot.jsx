import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Maximize2, Trash2, Copy, Check, Minimize2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCodeContext } from '../contexts/CodeContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, value, ...props }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-md overflow-hidden my-3 bg-black border border-gray-800">
            <div className="bg-[#202123] px-4 py-1.5 text-xs text-gray-400 border-b border-gray-700 flex justify-between items-center font-mono select-none">
                <span>{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
                    title="Copy code"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-500" />
                            <span className="text-green-500">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                {...props}
                style={vscDarkPlus}
                language={language}
                PreTag="div"
                customStyle={{ margin: 0, padding: '1rem', background: '#000', fontSize: '0.9em' }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
};

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getCode } = useCodeContext();
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello Coder! How can i help you?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Resize State
    const [size, setSize] = useState({ width: 400, height: 600 });
    const isResizingRef = useRef(false);
    const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

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
            setSize({
                width: Math.max(350, Math.min(800, resizeStartRef.current.w + deltaX)),
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
        if (isResizingRef.current) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const startResize = (e) => {
        e.preventDefault();
        isResizingRef.current = true;
        resizeStartRef.current = { x: e.clientX, y: e.clientY, w: size.width, h: size.height };
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ne-resize';

        const handleMouseMove = (evt) => {
            if (!isResizingRef.current) return;
            const deltaX = evt.clientX - resizeStartRef.current.x;
            const deltaY = evt.clientY - resizeStartRef.current.y;
            setSize({
                width: Math.max(350, Math.min(1000, resizeStartRef.current.w + deltaX)),
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
        let context = document.body.innerText.substring(0, 10000);
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
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    const handleClose = () => {
        setIsOpen(false);
        // Reset chat history when closed
        setMessages([
            { role: 'ai', content: 'Hello Coder! How can i help you?' }
        ]);
        setInput('');
    };

    const handleMinimize = () => {
        setIsOpen(false);
        // Do NOT reset messages, just close the window
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 font-sans">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-black/90 hover:bg-black text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center ring-1 ring-gray-700"
                    title="Ask AI Helper"
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="bg-[#343541] text-gray-100 rounded-xl shadow-2xl flex flex-col border border-gray-700 overflow-hidden transition-all duration-75 relative"
                    style={{ width: `${size.width}px`, height: `${size.height}px` }}
                >
                    {/* Resize Handle */}
                    <div
                        onMouseDown={startResize}
                        className="absolute top-0 right-0 w-8 h-8 z-50 cursor-ne-resize flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors"
                        title="Drag to resize"
                    >
                        <Maximize2 size={14} />
                    </div>

                    {/* Header */}
                    <div className="bg-[#343541] p-3 flex justify-between items-center border-b border-gray-700 select-none">
                        <div className="flex items-center gap-2">
                            <Bot size={18} className="text-gray-300" />
                            <h3 className="font-medium text-sm text-gray-200">ChatGPT Assistant</h3>
                        </div>
                        <div className="flex items-center gap-1 mr-4">
                            <button
                                onClick={() => setMessages([{ role: 'ai', content: 'Hello Coder! How can i help you?' }])}
                                className="hover:bg-gray-700 p-1.5 rounded transition text-gray-400 hover:text-white"
                                title="Clear Chat"
                            >
                                <Trash2 size={16} />
                            </button>
                            <button
                                onClick={handleMinimize}
                                className="hover:bg-gray-700 p-1.5 rounded transition text-gray-400 hover:text-white"
                                title="Minimize (Keep Chat)"
                            >
                                <Minimize2 size={18} />
                            </button>
                            <button
                                onClick={handleClose}
                                className="hover:bg-red-500/20 hover:text-red-400 p-1.5 rounded transition text-gray-400"
                                title="Close & Reset"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto bg-[#343541] p-0 scrollbar-thin scrollbar-thumb-gray-600">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`py-6 px-4 border-b border-black/10 dark:border-gray-900/50 ${msg.role === 'ai' ? 'bg-[#444654]' : 'bg-[#343541]'}`}
                            >
                                <div className="flex gap-4 max-w-[95%] mx-auto">
                                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-[#19c37d]' : 'bg-[#5436DA]'}`}>
                                        {msg.role === 'ai' ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white" />}
                                    </div>

                                    <div className="flex-1 overflow-hidden">
                                        {msg.role === 'user' ? (
                                            <p className="whitespace-pre-wrap leading-relaxed text-gray-100 text-sm pt-1">{msg.content}</p>
                                        ) : (
                                            <div className="markdown-content text-sm leading-relaxed text-gray-100">
                                                <ReactMarkdown
                                                    components={{
                                                        code({ node, inline, className, children, ...props }) {
                                                            const match = /language-(\w+)/.exec(className || '')
                                                            return !inline && match ? (
                                                                <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
                                                            ) : (
                                                                <code {...props} className={`bg-black/30 px-1.5 py-0.5 rounded font-mono text-sm text-[#E9E9E9] ${className}`}>
                                                                    {children}
                                                                </code>
                                                            )
                                                        },
                                                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                                                        ul: ({ children }) => <ul className="list-disc ml-4 mb-4 space-y-1">{children}</ul>,
                                                        ol: ({ children }) => <ol className="list-decimal ml-4 mb-4 space-y-1">{children}</ol>,
                                                        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="py-6 px-4 bg-[#444654] border-b border-black/10">
                                <div className="flex gap-4 max-w-[95%] mx-auto">
                                    <div className="w-8 h-8 rounded-sm bg-[#19c37d] flex items-center justify-center shrink-0">
                                        <Bot size={20} className="text-white" />
                                    </div>
                                    <div className="flex gap-1 items-center pt-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-[#343541] border-t border-gray-700">
                        <div className="relative flex items-end gap-2 bg-[#40414f] rounded-xl shadow-md border border-gray-600 focus-within:border-gray-500">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Send a message..."
                                className="flex-1 bg-transparent text-gray-100 rounded-xl px-4 py-3 max-h-[200px] focus:outline-none placeholder-gray-400 text-sm"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-2 mr-2 mb-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-gray-500">AI can make mistakes. Consider checking important information.</p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AIChatbot;
