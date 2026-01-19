
import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { generateAssistantReply } from '../services/geminiService';

export const Clippy = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("It looks like you're trying to use a LimeWire simulator.");
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;

        setIsThinking(true);
        const userQuery = input;
        setInput('');
        
        const reply = await generateAssistantReply('Clippy', userQuery);
        setMessage(reply);
        setIsThinking(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-12 right-4 w-56 z-[1000] animate-slide-up">
            <div className="bg-[#FFFFCC] border border-black rounded shadow-2xl p-3 mb-2 relative text-[11px] font-sans text-black">
                <button onClick={() => setIsVisible(false)} className="absolute top-1 right-1 text-gray-400 hover:text-red-500">
                    <X size={10} />
                </button>
                <div className="min-h-[40px] mb-3 leading-tight italic">
                    {isThinking ? "..." : message}
                </div>
                
                <form onSubmit={handleChat} className="flex flex-col space-y-2 pt-2 border-t border-black/10">
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        className="bg-white/50 border border-black/20 px-2 py-1 outline-none text-[10px] w-full"
                        placeholder="Ask Clippy something..."
                    />
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-gray-500">AI Powered Assistant</span>
                        <button type="submit" className="text-blue-800 font-bold hover:underline">Speak</button>
                    </div>
                </form>
                
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#FFFFCC] border-b border-r border-black transform rotate-45 shadow-sm"></div>
            </div>

            <div className="relative w-16 h-16 mx-auto hover:scale-110 transition-transform cursor-pointer">
                 <div className="absolute top-3 left-3 w-3 h-1 bg-black rounded-full -rotate-12 animate-pulse"></div>
                 <div className="absolute top-3 right-5 w-3 h-1 bg-black rounded-full rotate-12 animate-pulse"></div>
                 <div className="absolute top-5 left-3 w-3 h-3 bg-white rounded-full border border-black flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full"></div></div>
                 <div className="absolute top-5 right-5 w-3 h-3 bg-white rounded-full border border-black flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full"></div></div>
                 <div className="w-full h-full border-[6px] border-gray-400 rounded-full rounded-tl-none rounded-br-none" style={{ borderRadius: '20px 20px 20px 0'}}></div>
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-[6px] border-gray-400 border-t-0 border-l-0 rounded-br-2xl"></div>
            </div>
        </div>
    );
};
