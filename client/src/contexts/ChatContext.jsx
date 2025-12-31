import React, { createContext, useContext, useState } from 'react';
import ChatModal from '../components/ChatModal';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

import { API_URL } from '../config';

export const ChatProvider = ({ children, isAuthenticated }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

    const checkUnreadMessages = async () => {
        if (!isAuthenticated) return;
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await fetch(`${API_URL}/api/social/unread`, {
                headers: { token }
            });
            const data = await res.json();
            if (res.ok) {
                setHasUnreadMessages(data.hasUnread);
            }
        } catch (err) {
            console.error("Failed to check unread messages", err);
        }
    };

    // Poll for unread messages
    React.useEffect(() => {
        if (isAuthenticated) {
            checkUnreadMessages();
            const interval = setInterval(checkUnreadMessages, 60000); // Check every minute
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const openChat = (user = null) => {
        if (user) setActiveChatUser(user);
        setIsChatOpen(true);
        // Optimistically clear unread if we recognize we are opening it (simplified)
        // Ideally, we clear it when we actually read the specific message, but this is a good UX approximation
    };

    const closeChat = () => {
        setIsChatOpen(false);
        setActiveChatUser(null);
        checkUnreadMessages(); // Re-check on close
    };

    return (
        <ChatContext.Provider value={{ isChatOpen, openChat, closeChat, activeChatUser, hasUnreadMessages, checkUnreadMessages }}>
            {children}
            {isAuthenticated && isChatOpen && (
                <ChatModal
                    onClose={closeChat}
                    initialReceiver={activeChatUser}
                />
            )}
        </ChatContext.Provider>
    );
};
