import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import '../vscode-theme.css';

const SimpleCodeEditor = ({ value, onChange, language = 'cpp' }) => {

    // Helper to get Prism grammar
    const getGrammar = (lang) => {
        if (lang === 'cpp' || lang === 'c') return languages.cpp;
        if (lang === 'python') return languages.python;
        if (lang === 'java') return languages.java;
        return languages.clike; // Fallback
    };

    // Auto-closing pairs for brackets, parentheses, and braces
    const closingPairs = {
        '(': ')',
        '{': '}',
        '[': ']',
        '"': '"',
        "'": "'"
    };

    // ... (rest of the component)

    return (
        <div className="w-full h-full flex flex-col rounded-md overflow-hidden shadow-sm" style={{ backgroundColor: '#1e1e1e' }}>
            <div className="px-4 py-2 text-sm flex-shrink-0 flex items-center justify-between" style={{ backgroundColor: '#252526', color: '#858585', borderBottom: '1px solid #3e3e42' }}>
                <span className="font-semibold">{language?.toUpperCase() || 'CPP'}</span>
                <span className="text-xs">Code Editor</span>
            </div>
            <div className="flex-1 overflow-auto" style={{ backgroundColor: '#1e1e1e' }}>
                <Editor
                    value={value}
                    onValueChange={onChange}
                    onKeyDown={handleKeyDown}
                    highlight={(code) => highlight(code, getGrammar(language) || languages.clike, language)}
                    padding={16}
                    textareaClassName="focus:outline-none"
                    style={{
                        fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
                        fontSize: 14,
                        backgroundColor: '#1e1e1e',
                        color: '#d4d4d4',
                        minHeight: '100%',
                        lineHeight: '1.6'
                    }}
                    placeholder="// Write your C++ code here..."
                />
            </div>
        </div>
    );
};

export default SimpleCodeEditor;
