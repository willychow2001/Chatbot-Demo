import React from 'react';
import { Sparkles, MessageSquare, Brain, Workflow, BookOpen } from 'lucide-react';

const Guideline = () => {
  const tips = [
    {
      icon: <Sparkles className="text-yellow-400" />,
      title: "從一個病例開始",
      title2: "Starting from a Case",
      descZh: "提供或生成一個病例開始練習。",
      descEn: "Start by giving or generating a case."
    },
    {
      icon: <Workflow className="text-chat-accent" />,
      title: "重點訓練步驟",
      title2: "Key TCM Steps",
      descZh: "專注練習診斷、證型、病因病機與治法。",
      descEn: "Focus on diagnosis, pattern and treatment."
    },
    {
      icon: <MessageSquare className="text-blue-400" />,
      title: "中英雙語支援",
      title2: "Chinese & English",
      descZh: "可用中英文提問，我會使用你的語言。",
      descEn: "Ask in Chinese or English, I follow your choice."
    },
    {
      icon: <Brain className="text-purple-400" />,
      title: "引導式學習",
      title2: "Guided Learning",
      descZh: "以提問方式帶你自己做出判斷。",
      descEn: "I guide you with questions, not direct answers."
    },
    {
      icon: <BookOpen className="text-emerald-400" />,
      title: "只供學習用途",
      title2: "For Study Only",
      descZh: "內容僅供教學練習，不能代替臨床診療。",
      descEn: "For education, not real-world diagnosis."
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 opacity-0 animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-white">歡迎使用中醫練習小助手</h2>
      <p className="text-gray-400 mb-10 max-w-md">
        我是你的練習夥伴，我可以幫助你提升你的問診技巧與判斷，讓我們一起加油吧！
      </p>

      <div className="grid gap-4 w-full max-w-4xl md:grid-cols-5">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-chat-secondary p-6 rounded-xl border border-[#3d3d3d] hover:border-chat-accent transition-colors duration-300"
          >
            <div className="mb-4 flex justify-center">{tip.icon}</div>
            <h3 className="font-semibold">{tip.title}</h3>
            <h3 className="font-semibold mb-2 text-balance text-gray-300">
              {tip.title2}
            </h3>
            <p className="text-sm text-gray-500">{tip.descZh}</p>
            <p className="text-xs text-gray-500 mt-1">{tip.descEn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guideline;

