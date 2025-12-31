import React, { createContext, useContext, useState } from 'react';
import ChatModal from '../components/ChatModal';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children, isAuthenticated }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeChatUser, setActiveChatUser] = useState(null);

    const openChat = (user = null) => {
        if (user) setActiveChatUser(user);
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
        setActiveChatUser(null);
    };

    return (
        <ChatContext.Provider value={{ isChatOpen, openChat, closeChat, activeChatUser }}>
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
