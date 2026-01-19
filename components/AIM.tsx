
import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, User, Plus, Search, MessageCircle, MoreVertical, Heart, Music, Send } from 'lucide-react';
import { generateChatReply } from '../services/geminiService';

interface AIMProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    // Added onTouchStart to support mobile window dragging
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

interface ChatSession {
    buddy: string;
    messages: Array<{ sender: string, text: string, time: number }>;
    isTyping: boolean;
}

export const AIM = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: AIMProps) => {
    const [status, setStatus] = useState('Online');
    const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
    const [chatInput, setChatInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const buddies = [
        { name: 'jenny_loves_music', status: 'Online', sub: '~* glitzy lyrics here *~', avatar: 'https://i.pinimg.com/236x/8e/3c/d3/8e3cd3d73507119f07a2c7921a97d5a5.jpg' },
        { name: 'xX_sephiroth_Xx', status: 'Away', sub: 'BRB HALO 2', avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png' },
        { name: 'fluffy_cat_92', status: 'Online', sub: 'listening to: Linkin Park', avatar: 'https://placekitten.com/50/50' },
        { name: 'Tom (MySpace)', status: 'Online', sub: 'Check your top 8!', avatar: 'https://miro.medium.com/v2/resize:fit:1400/1*m_T_2_H7i7f_D50o8lq72A.jpeg' }
    ];

    const openChat = (buddyName: string) => {
        if (activeChat?.buddy === buddyName) return;
        setActiveChat({
            buddy: buddyName,
            messages: [{ sender: 'System', text: `You are now chatting with ${buddyName}.`, time: Date.now() }],
            isTyping: false
        });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() || !activeChat) return;

        const text = chatInput;
        const updatedChat = { ...activeChat };
        updatedChat.messages.push({ sender: 'Me', text, time: Date.now() });
        setActiveChat(updatedChat);
        setChatInput('');

        // Simulate Typing
        setTimeout(() => {
            setActiveChat(prev => prev ? { ...prev, isTyping: true } : null);
        }, 800);

        // Simulated AI Response
        setTimeout(async () => {
            const reply = await generateChatReply(text);
            setActiveChat(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    isTyping: false,
                    messages: [...prev.messages, { sender: prev.buddy, text: reply, time: Date.now() }]
                };
            });
        }, 2500);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChat?.messages, activeChat?.isTyping]);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }} 
            className="absolute w-[240px] h-[520px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow overflow-hidden" 
            onClick={onClick}
        >
            {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className="h-6 bg-gradient-to-r from-[#FFCC00] to-[#FF9900] flex items-center justify-between px-1 cursor-move border-b border-black">
                <div className="flex items-center text-black space-x-2 pl-1 font-bold">
                     <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                        <div className="w-2 h-3 bg-[#FFCC00] rounded-sm transform -skew-x-12"></div>
                     </div>
                     <span className="text-[10px]">AIM - sk8r_boi_88</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={onMinimize} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 flex items-center justify-center">-</button>
                     <button onClick={onClose} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 flex items-center justify-center">x</button>
                </div>
            </div>

            {/* Main View / Chat View Switcher */}
            {!activeChat ? (
                <>
                    {/* User Info Section */}
                    <div className="bg-[#D6D3CE] p-2 border-b border-gray-400">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 bg-white border border-gray-500 p-0.5 shadow-inner">
                                <div className="w-full h-full bg-[#333] flex items-center justify-center overflow-hidden">
                                     <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/27725916369011.562a98f1f1a52.jpg" className="w-full h-full object-cover" alt="Me" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="font-bold text-black truncate">sk8r_boi_88</div>
                                <div className="flex items-center text-[10px] text-gray-600">
                                    <div className={`w-2 h-2 rounded-full mr-1 ${status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <select className="bg-transparent outline-none cursor-pointer" value={status} onChange={e => setStatus(e.target.value)}>
                                        <option>Online</option>
                                        <option>Away</option>
                                        <option>Invisible</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buddy List */}
                    <div className="flex-1 bg-white border border-gray-500 m-1 shadow-inner overflow-y-auto">
                        <div className="bg-[#f0f0f0] px-2 py-0.5 font-bold text-gray-700 flex justify-between items-center cursor-pointer">
                            <span>Buddies (4/12)</span>
                            <Plus size={12}/>
                        </div>
                        <div className="p-1 space-y-1">
                            {buddies.map(b => (
                                <BuddyItem key={b.name} name={b.name} status={b.status} sub={b.sub} onClick={() => openChat(b.name)} />
                            ))}
                        </div>

                        <div className="bg-[#f0f0f0] px-2 py-0.5 font-bold text-gray-700 mt-2 flex justify-between items-center cursor-pointer">
                            <span>Family (0/3)</span>
                            <Plus size={12}/>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                    <div className="bg-[#D6D3CE] p-1 flex justify-between items-center border-b border-gray-400">
                        <button onClick={() => setActiveChat(null)} className="text-[9px] font-bold text-blue-800 hover:underline">◀ Buddy List</button>
                        <span className="font-bold truncate max-w-[120px]">{activeChat.buddy}</span>
                        <div className="flex space-x-1">
                             <div className="w-3 h-3 bg-white border border-gray-400"></div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 font-serif text-[13px] leading-tight space-y-2">
                        {activeChat.messages.map((m, i) => (
                            <div key={i} className={m.sender === 'System' ? 'text-gray-500 italic text-[10px]' : ''}>
                                <span className={`font-bold ${m.sender === 'Me' ? 'text-blue-800' : 'text-red-700'}`}>
                                    {m.sender !== 'System' && `${m.sender}: `}
                                </span>
                                <span>{m.text}</span>
                            </div>
                        ))}
                        {activeChat.isTyping && <div className="text-[10px] text-gray-400 italic">{activeChat.buddy} is typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="h-16 border-t border-gray-300 p-1 flex flex-col bg-[#F5F5F5]">
                        <div className="flex space-x-1 mb-1 opacity-60">
                             <button type="button" className="font-bold">B</button>
                             <button type="button" className="italic font-serif">I</button>
                             <button type="button" className="underline">U</button>
                        </div>
                        <div className="flex-1 flex items-center space-x-1">
                            <input 
                                value={chatInput} 
                                onChange={e => setChatInput(e.target.value)} 
                                className="flex-1 border border-gray-400 p-1 outline-none text-xs" 
                                autoFocus 
                                placeholder="Write a message..."
                            />
                            <button type="submit" className="bg-[#ECE9D8] border border-gray-500 px-2 py-0.5 hover:bg-white active:bg-gray-300">
                                <Send size={12}/>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bottom Icons */}
            <div className="h-10 bg-[#D6D3CE] border-t border-gray-400 p-1 flex items-center justify-around">
                <div className="p-1.5 hover:bg-white/50 rounded cursor-pointer" title="IM"><MessageCircle size={20} className="text-gray-700"/></div>
                <div className="p-1.5 hover:bg-white/50 rounded cursor-pointer" title="Search"><Search size={20} className="text-gray-700"/></div>
                <div className="p-1.5 hover:bg-white/50 rounded cursor-pointer" title="Setup"><Heart size={20} className="text-red-600" fill="currentColor"/></div>
                <div className="p-1.5 hover:bg-white/50 rounded cursor-pointer" title="More"><MoreVertical size={20} className="text-gray-700"/></div>
            </div>

            {/* Ads Panel (Nostalgic) */}
            <div className="h-12 bg-black flex items-center justify-center cursor-pointer hover:brightness-125 transition-all">
                 <div className="text-[10px] text-white font-black italic tracking-tighter text-center">
                    <span className="text-blue-500">AOL</span> <span className="text-yellow-500">DIAL-UP</span> IS ONLY $9.99/mo!<br/>
                    <span className="text-green-400 text-[8px] uppercase">Click to download setup.exe</span>
                 </div>
            </div>
        </div>
    );
};

const BuddyItem = ({ name, status, sub, onClick }: any) => (
    <div onClick={onClick} className="flex items-start space-x-2 p-1 hover:bg-blue-600 hover:text-white cursor-pointer group transition-colors">
        <div className={`w-3 h-3 mt-1 rounded-sm border ${status === 'Away' ? 'bg-yellow-400 border-yellow-600' : 'bg-blue-400 border-blue-600'}`}></div>
        <div className="flex flex-col leading-tight overflow-hidden">
            <span className="font-bold truncate group-hover:text-white">{name}</span>
            {sub && <span className="text-[9px] text-gray-500 group-hover:text-blue-100 italic truncate">{sub}</span>}
        </div>
    </div>
);
