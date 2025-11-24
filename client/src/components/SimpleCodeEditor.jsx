import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import '../vscode-theme.css';

const SimpleCodeEditor = ({ value, onChange, language = 'cpp' }) => {

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

            // Get current line
            const beforeCursor = value.substring(0, start);
            const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
            const currentLine = beforeCursor.substring(currentLineStart);

            // Calculate indentation of current line
            const indentMatch = currentLine.match(/^(\s*)/);
            const currentIndent = indentMatch ? indentMatch[1] : '';

            // Check if cursor is between braces {}
            const charBefore = value[start - 1];
            const charAfter = value[start];
            const isBetweenBraces = charBefore === '{' && charAfter === '}';

            let newValue, newCursorPos;

            if (isBetweenBraces) {
                // Add extra indentation and closing brace on new line
                const extraIndent = currentIndent + '    ';
                newValue = value.substring(0, start) + '\n' + extraIndent + '\n' + currentIndent + value.substring(end);
                newCursorPos = start + 1 + extraIndent.length;
            } else if (charBefore === '{') {
                // Just opened a brace, add extra indentation
                const extraIndent = currentIndent + '    ';
                newValue = value.substring(0, start) + '\n' + extraIndent + value.substring(end);
                newCursorPos = start + 1 + extraIndent.length;
            } else {
                // Normal enter, maintain current indentation
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

            // If text is selected, wrap it
            if (start !== end) {
                const newValue = value.substring(0, start) + e.key + selectedText + closing + value.substring(end);
                onChange(newValue);
                setTimeout(() => {
                    textarea.selectionStart = start + 1;
                    textarea.selectionEnd = end + 1;
                }, 0);
            } else {
                // Insert opening and closing pair
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

            // If cursor is between matching pairs, delete both
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
                    highlight={(code) => highlight(code, languages.cpp, 'cpp')}
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
