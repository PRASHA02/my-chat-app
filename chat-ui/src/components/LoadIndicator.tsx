import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-in fade-in duration-300">
      <div className="flex gap-3 items-center bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-slate-400 text-xs">
        <Loader2 className="animate-spin text-blue-400" size={18} />
        <span>Qwen is thinking... (RTX 3050)</span>
      </div>
    </div>
  );
};