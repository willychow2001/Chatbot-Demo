import React, { useState } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import InputArea from './components/InputArea';
import { sendMessageToGeminiStream } from './services/vertexAi';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

   const handleSendMessage = async (text) => {
    const userMessage = { sender: 'user', text };
    const newHistory = [...messages, userMessage];
    
    // 1. 先加入 User Message
    setMessages(newHistory);
    setIsLoading(true);

    // 2. 預先建立一個空的 Bot Message 佔位符
    const botMessagePlaceholder = { sender: 'bot', text: '' };
    setMessages(prev => [...prev, botMessagePlaceholder]);

    try {
      // 3. 呼叫 Stream API
      await sendMessageToGeminiStream(newHistory, text, (currentText) => {
        // 4. Callback: 每次收到新片段就更新最後一則訊息
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'bot', text: currentText };
          return updated;
        });
      });

    } catch (error) {
      setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { 
            sender: 'bot', 
            text: "Error: Could not connect to the AI service." 
          };
          return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-chat-bg font-sans">
      <Header />
      <ChatContainer messages={messages} isLoading={isLoading} />
      <InputArea onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
