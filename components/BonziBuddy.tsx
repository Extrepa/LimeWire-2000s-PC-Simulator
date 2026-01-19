
import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { generateAssistantReply } from '../services/geminiService';

export const BonziBuddy = () => {
    const [pos, setPos] = useState({ x: 800, y: 100 });
    const [msg, setMsg] = useState("Hello! I am your new friend Bonzi!");
    const [input, setInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [dancing, setDancing] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 20000);
        return () => clearTimeout(timer);
    }, []);

    const handleChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;

        setIsThinking(true);
        const userQuery = input;
        setInput('');
        
        const reply = await generateAssistantReply('Bonzi', userQuery);
        setMsg(reply);
        setIsThinking(false);
        setDancing(true);
        setTimeout(() => setDancing(false), 2000);
    };

    if (!visible) return null;

    return (
        <div 
            style={{ left: pos.x, top: pos.y }}
            className="fixed z-[200] cursor-grab active:cursor-grabbing group select-none"
            onMouseDown={(e) => {
                const startX = e.clientX - pos.x;
                const startY = e.clientY - pos.y;
                const onMove = (me: MouseEvent) => setPos({ x: me.clientX - startX, y: me.clientY - startY });
                const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
            }}
        >
            <div className="relative">
                <div className="absolute bottom-full right-0 w-40 bg-[#FFFFE1] border border-black p-2 text-[10px] rounded shadow-2xl mb-3">
                    <button onClick={(e) => { e.stopPropagation(); setVisible(false); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] border border-white shadow-lg">X</button>
                    <div className="mb-2 italic font-bold text-purple-900">{isThinking ? "Expanding my banana mind..." : msg}</div>
                    
                    <form onSubmit={handleChat} className="flex space-x-1 border-t border-black/10 pt-2">
                        <input 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            className="flex-1 bg-white/50 border border-black/20 px-1 text-[9px] outline-none"
                            placeholder="Type to chat..."
                            onMouseDown={e => e.stopPropagation()}
                        />
                        <button type="submit" className="text-purple-800 font-black">GO</button>
                    </form>
                    
                    <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[#FFFFE1] border-b border-r border-black transform rotate-45"></div>
                </div>
                
                <div className={`w-16 h-20 bg-purple-600 rounded-2xl border-4 border-purple-800 shadow-lg relative ${dancing ? 'animate-bounce' : ''}`}>
                    <div className="absolute top-2 left-2 right-2 h-10 bg-pink-200 rounded-xl border border-purple-400">
                        <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"><div className="w-1 h-1 bg-black rounded-full ml-0.5 mt-0.5"></div></div>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"><div className="w-1 h-1 bg-black rounded-full ml-0.5 mt-0.5"></div></div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
                    </div>
                    <div className="absolute top-2 -left-2 w-4 h-4 bg-purple-600 border-2 border-purple-800 rounded-full"></div>
                    <div className="absolute top-2 -right-2 w-4 h-4 bg-purple-600 border-2 border-purple-800 rounded-full"></div>
                    <div className="absolute -right-4 top-10 w-6 h-4 bg-purple-600 border-2 border-purple-800 rounded-full animate-wave origin-left"></div>
                </div>
            </div>
            <style>{`
                @keyframes wave { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-30deg); } }
                .animate-wave { animation: wave 1s infinite; }
            `}</style>
        </div>
    );
};
