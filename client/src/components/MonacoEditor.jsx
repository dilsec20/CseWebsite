import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditor = ({ language = 'cpp', theme = 'vs-dark', height = '60vh', value, onChange }) => {

    const handleEditorChange = (value, event) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <Editor
                height={height}
                language={language}
                theme={theme}
                value={value}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly: false,
                    domReadOnly: false
                }}
            />
        </div>
    );
};

export default MonacoEditor;
