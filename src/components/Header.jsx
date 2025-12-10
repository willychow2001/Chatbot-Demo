import React from 'react';
import { Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center p-4 border-b border-[#333] bg-chat-bg sticky top-0 z-10 h-16">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-chat-secondary text-chat-accent">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">中醫練習小助手</h1>
          <p className="text-xs text-gray-400">Powered by Vertex AI</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
