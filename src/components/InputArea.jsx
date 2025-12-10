import React, { useRef, useState } from 'react';
import { SendHorizontal } from 'lucide-react';

const InputArea = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    setInput(e.target.value);

    // Auto resize logic
    textarea.style.height = 'auto';
    const style = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(style.lineHeight);
    const maxHeight = lineHeight * 5.5; // Max 5.5 lines

    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="bg-chat-bg p-4 border-t border-[#333]">
      <div className="max-w-4xl mx-auto relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          disabled={isLoading}
          className="w-full bg-chat-secondary text-white placeholder-gray-500 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-chat-accent resize-none overflow-y-hidden"
          style={{
            minHeight: '56px',
            maxHeight: '160px',
          }}
        />
        
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`absolute right-2 bottom-4 p-2 rounded-xl transition-all duration-200 flex items-center justify-center
            ${input.trim() && !isLoading
              ? 'bg-chat-accent text-black hover:bg-[#33e0ff] shadow-lg hover:scale-105 cursor-pointer' 
              : 'bg-[#444] text-gray-500 cursor-not-allowed'
            }`}
        >
          <SendHorizontal size={20} />
        </button>
      </div>
      <div className="text-center text-xs text-gray-600 mt-2">
        Press Enter to send, Shift + Enter for new line
      </div>
    </div>
  );
};

export default InputArea;
