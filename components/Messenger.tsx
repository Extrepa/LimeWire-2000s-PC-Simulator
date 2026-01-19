import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, User, Lock, ChevronDown, MessageCircle, Bell, Video, Phone, Users } from 'lucide-react';
import { generateChatReply } from '../services/geminiService';

interface MessengerProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const Messenger = ({ onClose, onMinimize, position, onMouseDown, zIndex, active, onClick }: MessengerProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [activeChat, setActiveChat] = useState<{name: string, status: string} | null>(null);
    const [chatMessages, setChatMessages] = useState<{sender: string, text: string, type?: 'nudge' | 'msg'}>([
        { sender: 'System', text: 'Conversations may be recorded for quality assurance. (lol jk)' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isNudging, setIsNudging] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSigningIn(true);
        setTimeout(() => { setIsSigningIn(false); setIsLoggedIn(true); }, 1500);
    };

    const openChat = (name: string, status: string) => {
        setActiveChat({ name, status });
        setChatMessages([{ sender: 'System', text: `You are now chatting with ${name}.` }]);
    };

    const sendChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!chatInput.trim()) return;
        const text = chatInput;
        setChatMessages(prev => [...prev, { sender: 'Me', text, type: 'msg' }]);
        setChatInput('');
        
        setTimeout(async () => {
            const reply = await generateChatReply(text);
            setChatMessages(prev => [...prev, { sender: activeChat?.name || 'Friend', text: reply, type: 'msg' }]);
        }, 1500);
    };

    const sendNudge = () => {
        setIsNudging(true);
        setChatMessages(prev => [...prev, { sender: 'Me', text: "You have just sent a Nudge!", type: 'nudge' }]);
        setTimeout(() => setIsNudging(false), 500);
        
        setTimeout(() => {
             setChatMessages(prev => [...prev, { sender: activeChat?.name || 'Friend', text: "BRB MOM CALLING", type: 'msg' }]);
             setIsNudging(true);
             setTimeout(() => setIsNudging(false), 500);
        }, 3000);
    };
    
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

    return (
        <div 
            style={{ left: isNudging ? position.x + (Math.random()*10-5) : position.x, top: isNudging ? position.y + (Math.random()*10-5) : position.y, zIndex }}
            className={`absolute w-[300px] h-[500px] bg-white border-2 border-[#527099] shadow-xl flex flex-col font-sans text-xs win-shadow overflow-hidden transition-transform ${isNudging ? 'scale-105' : ''}`}
            onClick={onClick}
        >
            <div onMouseDown={onMouseDown} className={`h-7 flex items-center justify-between px-1 select-none bg-gradient-to-r from-[#B9D1EA] via-[#B9D1EA] to-[#A3C2E0] cursor-move`}>
                <div className="flex items-center text-[#214168] space-x-2 pl-1 font-bold">
                     <div className="bg-green-500 rounded-full p-[1px] border border-white shadow-sm"><User size={10} className="text-white" fill="white"/></div>
                     <span className="truncate">{activeChat ? activeChat.name : 'MSN Messenger'}</span>
                </div>
                <div className="flex space-x-1" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-5 h-5 rounded-[3px] flex items-center justify-center hover:bg-white/30 text-[#214168] border border-[#214168]/20 shadow-sm"><Minus size={12}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12}/></button>
                </div>
            </div>

            <div className="flex-1 flex flex-col bg-gradient-to-b from-[#FFFFFF] to-[#EBF4FA] overflow-hidden">
                {!isLoggedIn ? (
                    <div className="flex flex-col items-center p-6 space-y-6">
                         <div className="w-24 h-24 relative animate-pulse">
                                 <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center transform -rotate-6 shadow-xl border-2 border-white">
                                     <User size={40} className="text-white" />
                                 </div>
                                 <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center transform rotate-12 absolute -right-2 bottom-0 shadow-xl border-2 border-white">
                                     <MessageCircle size={24} className="text-white" />
                                 </div>
                         </div>
                         <h2 className="text-[#214168] text-lg font-bold">.NET Messenger Service</h2>
                         <form onSubmit={handleSignIn} className="w-full space-y-3">
                             <div>
                                 <label className="text-[#214168] block mb-1">E-mail address:</label>
                                 <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-[#8DA6C2] px-2 py-1 outline-none focus:ring-1 ring-blue-400" placeholder="sk8r_boi_88@hotmail.com" />
                             </div>
                             <div>
                                 <label className="text-[#214168] block mb-1">Password:</label>
                                 <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-[#8DA6C2] px-2 py-1 outline-none focus:ring-1 ring-blue-400" />
                             </div>
                             <button type="submit" disabled={isSigningIn} className="w-full bg-gradient-to-b from-[#F7FBFF] to-[#DCE9F5] border border-[#8DA6C2] text-[#214168] py-1.5 rounded font-bold shadow active:shadow-inner">
                                 {isSigningIn ? 'Signing In...' : 'Sign In'}
                             </button>
                         </form>
                    </div>
                ) : activeChat ? (
                    <div className="flex flex-col h-full bg-white">
                         <div className="p-2 border-b border-[#ABC7E3] bg-[#EEF3FA] flex justify-between">
                            <button onClick={sendNudge} className="flex flex-col items-center px-3 py-1 hover:bg-white rounded border border-transparent hover:border-blue-200">
                                <Bell size={18} className="text-orange-500" />
                                <span className="text-[9px] font-bold">NUDGE</span>
                            </button>
                            <div className="flex-1 px-4 flex flex-col justify-center">
                                <span className="font-bold text-blue-900">{activeChat.name} ({activeChat.status})</span>
                                <span className="text-[10px] text-gray-500 truncate">I'm so bored lol...</span>
                            </div>
                         </div>
                         <div className="flex-1 p-2 overflow-y-auto bg-[#F9FBFF] shadow-inner font-sans">
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`mb-3 ${m.type === 'nudge' ? 'text-red-600 font-bold italic text-center text-[10px] bg-red-50 p-1 rounded' : ''}`}>
                                    {m.type !== 'nudge' && (
                                        <>
                                            <span className={`font-bold ${m.sender === 'Me' ? 'text-blue-600' : 'text-orange-600'}`}>{m.sender} says:</span>
                                            <div className="pl-2 text-[12px] text-gray-800 leading-tight">{m.text}</div>
                                        </>
                                    )}
                                    {m.type === 'nudge' && m.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                         </div>
                         <form onSubmit={sendChat} className="h-20 border-t border-gray-300 p-2 flex flex-col bg-[#F1F7FB]">
                            <div className="flex space-x-2 mb-1">
                                <span className="text-gray-400 font-bold hover:text-blue-600 cursor-pointer">B</span>
                                <span className="text-gray-400 italic hover:text-blue-600 cursor-pointer font-serif">I</span>
                                <span className="text-gray-400 hover:text-blue-600 cursor-pointer">☺</span>
                            </div>
                            <textarea value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => {if(e.key==='Enter'&&!e.shiftKey) sendChat(e);}} className="flex-1 outline-none resize-none bg-white p-1 border border-[#ABC7E3] text-[12px]" autoFocus />
                         </form>
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <div className="bg-[#D7E6F5] p-3 border-b border-[#ABC7E3] flex items-center space-x-3">
                            <div className="w-12 h-12 border-2 border-white bg-gray-100 flex items-center justify-center shadow-sm cursor-pointer hover:border-blue-400 overflow-hidden">
                                <User size={24} className="text-gray-400" />
                            </div>
                            <div className="flex-1 truncate">
                                <div className="font-bold text-[#214168] text-sm">Administrator (Online)</div>
                                <div className="text-[10px] text-gray-500 italic truncate">Listening to: Linkin Park - Numb</div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-white p-2">
                             <div className="text-[#214168] font-bold text-[10px] border-b border-gray-200 mb-2 py-1">CONTACTS (Online 2)</div>
                             <div className="space-y-2">
                                <ContactItem name="skater_boi_88" status="Online" sub="~ skating is lyfe ~" onClick={() => openChat('skater_boi_88', 'Online')}/>
                                <ContactItem name="xX_DragonSlayer_Xx" status="Away" sub="BRB BRUNCH" onClick={() => openChat('xX_DragonSlayer_Xx', 'Away')}/>
                                <ContactItem name="Mom" status="Offline" onClick={() => {}} offline/>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ContactItem = ({ name, status, sub, onClick, offline }: { name: string, status: string, sub?: string, onClick: () => void, offline?: boolean }) => (
    <div onClick={onClick} className={`flex items-start space-x-2 p-1 rounded cursor-pointer group ${offline ? 'opacity-50' : 'hover:bg-[#EBF4FA]'}`}>
        <div className={`w-3 h-3 mt-1 rounded-sm border ${offline ? 'bg-gray-300 border-gray-400' : status === 'Away' ? 'bg-yellow-400 border-yellow-600' : 'bg-green-500 border-green-600'}`}></div>
        <div className="flex flex-col leading-tight overflow-hidden">
            <span className={`font-bold ${offline ? 'text-gray-400' : 'text-black group-hover:text-blue-900'}`}>{name} ({status})</span>
            {sub && <span className="text-[9px] text-gray-500 truncate">{sub}</span>}
        </div>
    </div>
);
