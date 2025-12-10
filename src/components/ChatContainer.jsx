import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import Guideline from './Guideline';

const ChatContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto bg-chat-bg">
        <Guideline />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-chat-bg">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`flex gap-4 max-w-4xl mx-auto ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {/* AI Avatar */}
          {msg.sender === 'bot' && (
            <div className="w-8 h-8 rounded-full bg-chat-secondary flex items-center justify-center shrink-0 mt-1">
              <Bot size={16} className="text-chat-accent" />
            </div>
          )}

          {/* Message Bubble */}
          <div 
            className={`relative px-5 py-3 rounded-2xl max-w-[80%] leading-relaxed text-sm md:text-base shadow-md
              ${msg.sender === 'user' 
                ? 'bg-chat-secondary text-white rounded-br-none' 
                : 'bg-transparent border border-[#333] text-gray-100 rounded-bl-none'
              }`}
          >
            {msg.text ? (
               <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
               <span className="inline-block w-1.5 h-5 bg-chat-accent animate-pulse align-middle"></span>
            )}
          </div>

          {/* User Avatar */}
           {msg.sender === 'user' && (
            <div className="w-8 h-8 rounded-full bg-[#444] flex items-center justify-center flex-shrink-0 mt-1">
              <User size={16} className="text-white" />
            </div>
          )}
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
