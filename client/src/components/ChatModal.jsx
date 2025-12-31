import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, Search } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const ChatModal = ({ onClose, initialReceiver = null }) => {
    const [conversations, setConversations] = useState([]);
    const [activeChat, setActiveChat] = useState(initialReceiver); // { user_id, username, profile_picture }
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Fetch conversations list
    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/social/conversations`, {
                headers: { token }
            });
            const data = await res.json();
            if (Array.isArray(data)) setConversations(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch messages for active chat
    const fetchMessages = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/social/messages/${userId}`, {
                headers: { token }
            });
            const data = await res.json();
            if (Array.isArray(data)) setMessages(data);
            scrollToBottom();
        } catch (err) {
            console.error(err);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/social/message/${activeChat.user_id || activeChat.contact_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token
                },
                body: JSON.stringify({ content: newMessage })
            });

            if (res.ok) {
                const sentMsg = await res.json();
                setMessages([...messages, sentMsg]);
                setNewMessage("");
                scrollToBottom();
                fetchConversations(); // Update last message in list
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to send");
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (activeChat) {
            const id = activeChat.user_id || activeChat.contact_id;
            fetchMessages(id);
            // Poll for new messages every 3 seconds (simple implementation)
            const interval = setInterval(() => fetchMessages(id), 3000);
            return () => clearInterval(interval);
        }
    }, [activeChat]);

    useEffect(() => {
        if (initialReceiver) {
            setActiveChat(initialReceiver);
        }
    }, [initialReceiver]);

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] shadow-2xl flex overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Sidebar: Conversations */}
                <div className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 border-r border-gray-100 flex-col bg-gray-50`}>
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h3 className="font-bold text-lg">Messages</h3>
                        <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5" /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading ? <p className="p-4 text-center text-gray-400">Loading...</p> :
                            conversations.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <p>No messages yet.</p>
                                    <p className="text-sm mt-1">Start a conversation from a profile!</p>
                                </div>
                            ) : (
                                conversations.map(conv => (
                                    <div
                                        key={conv.contact_id}
                                        onClick={() => setActiveChat(conv)}
                                        className={`p-4 hover:bg-white cursor-pointer transition border-b border-gray-100 ${(activeChat?.contact_id === conv.contact_id || activeChat?.user_id === conv.contact_id) ? 'bg-white border-l-4 border-l-blue-600' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={conv.profile_picture || `https://ui-avatars.com/api/?name=${conv.user_name}`} className="w-10 h-10 rounded-full bg-gray-200" alt="" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h4 className="font-semibold text-gray-900 truncate">{conv.user_name}</h4>
                                                    {conv.has_unread && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                                                </div>
                                                <p className={`text-sm truncate ${conv.has_unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                                    {conv.last_message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className={`${!activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-2/3 flex-col bg-white`}>
                    {activeChat ? (
                        <>
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setActiveChat(null)} className="md:hidden p-1 hover:bg-gray-100 rounded-lg">
                                        ←
                                    </button>
                                    <img
                                        src={activeChat.profile_picture || `https://ui-avatars.com/api/?name=${activeChat.user_name}`}
                                        className="w-8 h-8 rounded-full"
                                        alt=""
                                    />
                                    <h3 className="font-bold text-gray-900">{activeChat.user_name}</h3>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X className="h-5 w-5" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                                {messages.map((msg, idx) => {
                                    const isMe = msg.sender_id === (activeChat.user_id || activeChat.contact_id) ? false : true;
                                    // Logic check: if msg.sender_id != current user ID... wait, we need current user ID. 
                                    // Actually easier: In 'conversations' query we filtered by $1 (current user). 
                                    // But here we might not know 'my' ID easily without decoding token or passing prop.
                                    // Workaround: We know 'activeChat' is the OTHER person.
                                    // So if sender_id === activeChat.id, it's THEM. Else it's ME.
                                    const otherId = activeChat.user_id || activeChat.contact_id;
                                    const isFromOther = msg.sender_id === otherId;

                                    return (
                                        <div key={idx} className={`flex ${isFromOther ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${isFromOther
                                                ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                                                : 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button type="submit" disabled={!newMessage.trim()} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition">
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="hidden md:flex flex-col items-center justify-center h-full text-gray-400">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Send className="h-8 w-8 text-gray-300" />
                            </div>
                            <p>Select a conversation to start messaging</p>
                            <button onClick={onClose} className="mt-8 px-6 py-2 border rounded-full hover:bg-gray-50 transition">Close</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
