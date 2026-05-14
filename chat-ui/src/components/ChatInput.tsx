import React, { type FormEvent, type ChangeEvent } from 'react'; // Added 'type' here
import { Send } from 'lucide-react';

interface Props {
  input: string;
  setInput: (val: string) => void;
  onSend: (e: FormEvent) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<Props> = ({ input, setInput, onSend, isLoading }) => {
  
  // Explicitly typing the change event to avoid linting errors
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <footer className="p-4 bg-slate-900 border-t border-slate-800">
      <form onSubmit={onSend} className="max-w-4xl mx-auto flex gap-2">
        <input
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 text-slate-100"
          placeholder={isLoading ? "Waiting for 9B model..." : "Type a message..."}
          value={input}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 p-2 rounded-lg text-white transition-colors flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </form>
    </footer>
  );
};