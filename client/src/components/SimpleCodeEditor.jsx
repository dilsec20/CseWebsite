import React, { useRef, useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import '../vscode-theme.css';

const SimpleCodeEditor = ({ value = "", onChange, language = 'cpp' }) => {
    const editorRef = useRef(null);
    const lineNumbersRef = useRef(null);
    const [lineCount, setLineCount] = useState(1);

    // Update line count when value changes
    useEffect(() => {
        const lines = (value || "").split('\n').length;
        setLineCount(lines);
    }, [value]);

    // Sync scroll between line numbers and editor
    useEffect(() => {
        const editorContainer = editorRef.current?.querySelector('.editor-container');
        const lineNumbers = lineNumbersRef.current;

        if (editorContainer && lineNumbers) {
            const handleScroll = () => {
                lineNumbers.scrollTop = editorContainer.scrollTop;
            };
            editorContainer.addEventListener('scroll', handleScroll);
            return () => editorContainer.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Helper to get Prism grammar
    const getGrammar = (lang) => {
        if (lang === 'cpp' || lang === 'c') return Prism.languages.cpp;
        if (lang === 'python') return Prism.languages.python;
        if (lang === 'java') return Prism.languages.java;
        return Prism.languages.clike || Prism.languages.javascript;
    };

    // Auto-closing pairs for brackets, parentheses, and braces
    const closingPairs = {
        '(': ')',
        '{': '}',
        '[': ']',
        '"': '"',
        "'": "'"
    };

    const handleKeyDown = (e) => {
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        // Handle Tab key
        if (e.key === 'Tab') {
            e.preventDefault();
            const newValue = value.substring(0, start) + '    ' + value.substring(end);
            onChange(newValue);

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 4;
            }, 0);
        }

        // Handle Enter key - Auto-indentation
        else if (e.key === 'Enter') {
            e.preventDefault();

            const beforeCursor = value.substring(0, start);
            const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
            const currentLine = beforeCursor.substring(currentLineStart);

            const indentMatch = currentLine.match(/^(\s*)/);
            const currentIndent = indentMatch ? indentMatch[1] : '';

            const charBefore = value[start - 1];
            const charAfter = value[start];
            const isBetweenBraces = charBefore === '{' && charAfter === '}';

            let newValue, newCursorPos;

            if (isBetweenBraces) {
                const extraIndent = currentIndent + '    ';
                newValue = value.substring(0, start) + '\n' + extraIndent + '\n' + currentIndent + value.substring(end);
                newCursorPos = start + 1 + extraIndent.length;
            } else if (charBefore === '{') {
                const extraIndent = currentIndent + '    ';
                newValue = value.substring(0, start) + '\n' + extraIndent + value.substring(end);
                newCursorPos = start + 1 + extraIndent.length;
            } else {
                newValue = value.substring(0, start) + '\n' + currentIndent + value.substring(end);
                newCursorPos = start + 1 + currentIndent.length;
            }

            onChange(newValue);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = newCursorPos;
            }, 0);
        }

        // Handle auto-closing pairs
        else if (closingPairs[e.key]) {
            e.preventDefault();
            const closing = closingPairs[e.key];

            if (start !== end) {
                const newValue = value.substring(0, start) + e.key + selectedText + closing + value.substring(end);
                onChange(newValue);
                setTimeout(() => {
                    textarea.selectionStart = start + 1;
                    textarea.selectionEnd = end + 1;
                }, 0);
            } else {
                const newValue = value.substring(0, start) + e.key + closing + value.substring(end);
                onChange(newValue);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                }, 0);
            }
        }

        // Handle Backspace - Delete matching closing bracket
        else if (e.key === 'Backspace') {
            const charBefore = value[start - 1];
            const charAfter = value[start];

            if (closingPairs[charBefore] === charAfter && start === end) {
                e.preventDefault();
                const newValue = value.substring(0, start - 1) + value.substring(end + 1);
                onChange(newValue);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start - 1;
                }, 0);
            }
        }

        // Skip over closing bracket when typed
        else if (e.key === ')' || e.key === '}' || e.key === ']' || e.key === '"' || e.key === "'") {
            if (value[start] === e.key && start === end) {
                e.preventDefault();
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                }, 0);
            }
        }
    };

    // Generate line numbers
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

    return (
        <div
            ref={editorRef}
            className="w-full h-full flex flex-col overflow-hidden"
            style={{
                backgroundColor: '#1e1e2e',
                borderRadius: '8px',
                border: '1px solid #313244'
            }}
        >
            {/* Header Bar */}
            <div
                className="px-4 py-2 text-sm flex-shrink-0 flex items-center justify-between"
                style={{
                    backgroundColor: '#181825',
                    color: '#6c7086',
                    borderBottom: '1px solid #313244'
                }}
            >
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#f38ba8]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#f9e2af]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#a6e3a1]"></div>
                    </div>
                    <span className="ml-2 font-medium text-[#cdd6f4]">{language?.toUpperCase() || 'CPP'}</span>
                </div>
                <span className="text-xs text-[#6c7086]">Lines: {lineCount}</span>
            </div>

            {/* Editor with Line Numbers */}
            <div className="flex-1 flex overflow-hidden">
                {/* Line Numbers Gutter */}
                <div
                    ref={lineNumbersRef}
                    className="flex-shrink-0 overflow-hidden select-none"
                    style={{
                        backgroundColor: '#181825',
                        color: '#6c7086',
                        fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
                        fontSize: 14,
                        lineHeight: '1.6',
                        padding: '16px 0',
                        textAlign: 'right',
                        minWidth: '50px',
                        borderRight: '1px solid #313244'
                    }}
                >
                    {lineNumbers.map((num) => (
                        <div
                            key={num}
                            style={{
                                paddingRight: '12px',
                                paddingLeft: '12px',
                                height: '22.4px' // lineHeight * fontSize
                            }}
                        >
                            {num}
                        </div>
                    ))}
                </div>

                {/* Code Editor */}
                <div
                    className="flex-1 overflow-auto editor-container"
                    style={{ backgroundColor: '#1e1e2e' }}
                >
                    <Editor
                        value={value || ""}
                        onValueChange={onChange}
                        onKeyDown={handleKeyDown}
                        highlight={(code) => Prism.highlight(code, getGrammar(language) || Prism.languages.clike || Prism.languages.javascript || {}, language)}
                        padding={16}
                        textareaClassName="focus:outline-none"
                        style={{
                            fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
                            fontSize: 14,
                            backgroundColor: 'transparent',
                            color: '#cdd6f4',
                            minHeight: '100%',
                            lineHeight: '1.6',
                            caretColor: '#f5c2e7'
                        }}
                        placeholder="// Write your code here..."
                    />
                </div>
            </div>
        </div>
    );
};

export default SimpleCodeEditor;
