import React from 'react';
import { Bot, Clock } from 'lucide-react';

interface Props {
  isLoading: boolean;
  timer: number;
}

export const ChatHeader: React.FC<Props> = ({ isLoading, timer }) => {
  return (
    <header className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Bot className="text-blue-400" />
        <h1 className="font-bold text-slate-100">Qwen 3.5 (9B)</h1>
      </div>
      {isLoading && (
        <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          <Clock size={14} className="animate-pulse text-blue-400" />
          <span>Processing: {timer}s</span>
        </div>
      )}
    </header>
  );
};