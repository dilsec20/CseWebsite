import React, { createContext, useContext, useRef } from 'react';

const CodeContext = createContext(null);

export const CodeProvider = ({ children }) => {
    // We use a ref so that updating the code doesn't trigger re-renders in consumers
    // The Chatbot only reads this when the user sends a message.
    const codeRef = useRef('');
    const problemContextRef = useRef(null); // To store problem details title/desc

    const setCode = (code) => {
        codeRef.current = code;
    };

    const setProblemContext = (details) => {
        problemContextRef.current = details;
    };

    const getCode = () => codeRef.current;
    const getProblemContext = () => problemContextRef.current;

    return (
        <CodeContext.Provider value={{ setCode, getCode, setProblemContext, getProblemContext }}>
            {children}
        </CodeContext.Provider>
    );
};

export const useCodeContext = () => {
    const context = useContext(CodeContext);
    if (!context) {
        throw new Error('useCodeContext must be used within a CodeProvider');
    }
    return context;
};
