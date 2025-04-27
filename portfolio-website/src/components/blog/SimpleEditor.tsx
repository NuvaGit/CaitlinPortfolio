'use client';

import React, { useRef, useEffect, useState } from 'react';

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Write your content here...', 
  className = '' 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync content from value prop to the editable div
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Handle toolbar button actions
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      editorRef.current.focus();
    }
  };

  // Handle changes in the editor content
  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Check if the editor is empty for placeholder logic
  const isEmpty = () => {
    if (!editorRef.current) return true;
    const content = editorRef.current.innerHTML;
    return content === '' || content === '<br>' || content === '<div><br></div>';
  };

  return (
    <div className={`simple-editor ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-300 rounded-t-md">
        <ToolbarButton 
          icon="format_bold" 
          title="Bold" 
          onClick={() => handleFormat('bold')} 
        />
        <ToolbarButton 
          icon="format_italic" 
          title="Italic" 
          onClick={() => handleFormat('italic')} 
        />
        <ToolbarButton 
          icon="format_underlined" 
          title="Underline" 
          onClick={() => handleFormat('underline')} 
        />
        <ToolbarDivider />
        <ToolbarButton 
          icon="format_list_bulleted" 
          title="Bullet List" 
          onClick={() => handleFormat('insertUnorderedList')} 
        />
        <ToolbarButton 
          icon="format_list_numbered" 
          title="Numbered List" 
          onClick={() => handleFormat('insertOrderedList')} 
        />
        <ToolbarDivider />
        <ToolbarButton 
          icon="format_quote" 
          title="Blockquote" 
          onClick={() => handleFormat('formatBlock', '<blockquote>')} 
        />
        <ToolbarButton 
          icon="code" 
          title="Code" 
          onClick={() => handleFormat('formatBlock', '<pre>')} 
        />
        <ToolbarDivider />
        <ToolbarSelect 
          title="Heading" 
          onChange={(e) => handleFormat('formatBlock', e.target.value)}
          options={[
            { value: 'p', label: 'Paragraph' },
            { value: 'h1', label: 'Heading 1' },
            { value: 'h2', label: 'Heading 2' },
            { value: 'h3', label: 'Heading 3' },
            { value: 'h4', label: 'Heading 4' },
          ]}
        />
        <ToolbarButton 
          icon="link" 
          title="Insert Link" 
          onClick={() => {
            const url = prompt('Enter link URL:');
            if (url) handleFormat('createLink', url);
          }} 
        />
      </div>
      
      {/* Editor */}
      <div 
        className="relative"
      >
        {isEmpty() && !isFocused && (
          <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          className="min-h-[300px] p-3 border border-gray-300 border-t-0 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          contentEditable
          onInput={handleChange}
          onBlur={() => {
            handleChange();
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          style={{ color: '#111827' }} /* Explicit dark text color */
        />
      </div>

      <style jsx global>{`
        .simple-editor [contenteditable] {
          line-height: 1.5;
          font-family: inherit;
          color: #111827; /* Equivalent to text-gray-900 */
        }
        
        .simple-editor [contenteditable] h1,
        .simple-editor [contenteditable] h2,
        .simple-editor [contenteditable] h3,
        .simple-editor [contenteditable] h4 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #111827;
        }
        
        .simple-editor [contenteditable] h1 {
          font-size: 1.5rem;
        }
        
        .simple-editor [contenteditable] h2 {
          font-size: 1.25rem;
        }
        
        .simple-editor [contenteditable] h3 {
          font-size: 1.125rem;
        }
        
        .simple-editor [contenteditable] p {
          margin-bottom: 0.5rem;
          color: #111827;
        }
        
        .simple-editor [contenteditable] ul,
        .simple-editor [contenteditable] ol {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          color: #111827;
        }
        
        .simple-editor [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #111827;
        }
        
        .simple-editor [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-family: monospace;
          white-space: pre-wrap;
          color: #111827;
        }
        
        .simple-editor [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

// Helper components for the toolbar
const ToolbarButton = ({ icon, title, onClick }: { icon: string, title: string, onClick: () => void }) => (
  <button
    type="button"
    title={title}
    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded"
    onClick={onClick}
  >
    <span className="material-icons text-sm">{icon}</span>
  </button>
);

const ToolbarDivider = () => (
  <div className="h-6 w-px bg-gray-300 my-auto mx-1" />
);

const ToolbarSelect = ({ 
  title, 
  onChange, 
  options 
}: { 
  title: string, 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  options: { value: string, label: string }[]
}) => (
  <select
    title={title}
    className="h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
    onChange={onChange}
    defaultValue="p"
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SimpleEditor;