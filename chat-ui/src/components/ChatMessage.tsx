import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types/chat'; 

interface Props {
  msg: Message;
}

export const ChatMessage: React.FC<Props> = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'bg-blue-600' : 'bg-slate-800 border border-slate-700'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        <div className={`p-3 rounded-xl ${
          isUser ? 'bg-blue-600' : 'bg-slate-800 border border-slate-700'
        }`}>
          <p className="whitespace-pre-wrap text-sm text-slate-100">{msg.content}</p>
        </div>
      </div>
    </div>
  );
};