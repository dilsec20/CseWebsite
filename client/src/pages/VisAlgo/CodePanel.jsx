import React, { useEffect, useRef } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('cpp', cpp);

const CodePanel = ({ code, activeLine }) => {
    // We can use a custom style or modify docco to support line highlighting
    // For simplicity, we'll map the code string to line numbers manually if needed, 
    // but SyntaxHighlighter supports wrapLines and lineProps.

    return (
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full flex flex-col">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 font-mono text-sm font-semibold text-gray-700">
                Algorithm Code (C++)
            </div>
            <div className="flex-1 overflow-auto text-sm">
                <SyntaxHighlighter
                    language="cpp"
                    style={docco}
                    showLineNumbers={true}
                    wrapLines={true}
                    lineProps={(lineNumber) => {
                        const style = { display: 'block' };
                        // Adjust logic mapping if necessary. Currently logic sends 1-indexed lines.
                        // bubbleSortCode:
                        // 1: for (int i = 0; i < n-1; i++) {
                        // 2:     // Last i elements are already in place
                        // 3:     for (int j = 0; j < n-i-1; j++) {
                        // 4:         if (arr[j] > arr[j+1]) {
                        // 5:             swap(&arr[j], &arr[j+1]);
                        // 6:         }
                        // 7:     }
                        // 8: }

                        // Map logic lines (1, 3, 4) to actual code lines
                        // Logic 1 (Outer Loop) -> Line 1
                        // Logic 3 (Comparison) -> Line 4
                        // Logic 4 (Swap) -> Line 5

                        let highlighted = false;
                        if (activeLine === 1 && lineNumber === 1) highlighted = true;
                        if (activeLine === 3 && lineNumber === 4) highlighted = true;
                        if (activeLine === 4 && lineNumber === 5) highlighted = true;
                        if (activeLine === 8 && lineNumber === 8) highlighted = true; // Done

                        if (highlighted) {
                            style.backgroundColor = '#fef08a'; // yellow-200
                            style.borderLeft = '4px solid #eab308';
                        }
                        return { style };
                    }}
                    customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodePanel;
