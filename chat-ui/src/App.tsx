import React, { useState, useRef, useEffect, type FormEvent } from 'react';
// Use type-only import for your interfaces
import type { Message, ChatResponse } from './types/chat'; 
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { LoadingIndicator } from './components/LoadIndicator';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    const history = messages.slice(-5);
    
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8007/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history }),
      });

      if (!response.ok) throw new Error('Server unreachable');
      
      const data: ChatResponse = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Connection Error: Backend might be offline." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      <ChatHeader isLoading={isLoading} timer={timer} />

      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
        {isLoading && <LoadingIndicator />}
        <div ref={scrollRef} />
      </main>

      <ChatInput input={input} setInput={setInput} onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default App;