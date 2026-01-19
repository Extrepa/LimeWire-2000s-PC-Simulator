import React, { useState, useEffect, useRef } from 'react';
import { generateChatReply } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User } from 'lucide-react';

const INITIAL_MESSAGES: ChatMessage[] = [
    { id: '1', user: 'System', text: 'Welcome to the LimeWire Gnutella Chat.', timestamp: Date.now(), isSystem: true },
    { id: '2', user: 'xX_DragonSlayer_Xx', text: 'anyone got the new 50 cent album?', timestamp: Date.now() - 50000 },
    { id: '3', user: 'skater_boi_88', text: 'dont dload dragonball_z.exe its a virus lol', timestamp: Date.now() - 20000 },
];

export const ChatTab = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg: ChatMessage = {
            id: Date.now().toString(),
            user: 'Me',
            text: inputValue,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate reply delay
        setTimeout(async () => {
            const replyText = await generateChatReply(newUserMsg.text);
            const replyMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                user: Math.random() > 0.5 ? 'xX_DragonSlayer_Xx' : 'skater_boi_88',
                text: replyText,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, replyMsg]);
            setIsTyping(false);
        }, 1500 + Math.random() * 2000);
    };

    return (
        <div className="flex w-full h-full bg-[#EBE9ED]">
            {/* Channel List */}
            <div className="w-48 border-r border-gray-400 flex flex-col bg-[#EBE9ED]">
                <div className="p-2 border-b border-gray-400 font-bold text-gray-700 bg-[#EBE9ED]">Channels</div>
                <div className="bg-white flex-1 overflow-y-auto p-1">
                    {['General', 'Music', 'Movies', 'Tech Support', 'Flame Wars'].map(channel => (
                        <div key={channel} className={`px-2 py-1 cursor-pointer flex items-center ${channel === 'General' ? 'bg-[#000080] text-white' : 'text-gray-800 hover:bg-gray-100'}`}>
                            <span className="text-xs"># {channel}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-white p-2 overflow-y-auto font-mono text-sm border-b border-gray-400 shadow-inner">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`mb-1 ${msg.isSystem ? 'text-gray-500 italic' : ''}`}>
                            <span className={`font-bold ${msg.user === 'Me' ? 'text-blue-600' : 'text-red-600'}`}>
                                &lt;{msg.user}&gt;
                            </span>{' '}
                            <span className="text-black">{msg.text}</span>
                        </div>
                    ))}
                    {isTyping && <div className="text-gray-400 text-xs italic">Someone is typing...</div>}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <form onSubmit={handleSend} className="h-12 bg-[#EBE9ED] p-2 flex items-center space-x-2">
                    <input 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 border border-gray-500 p-1 text-sm outline-none focus:border-blue-500"
                        placeholder="Say something..."
                        autoFocus
                    />
                    <button type="submit" className="px-4 py-1 bg-[#EBE9ED] border-2 border-white border-b-gray-500 border-r-gray-500 active:border-t-gray-500 active:border-l-gray-500 text-black text-sm font-bold">
                        Send
                    </button>
                </form>
            </div>

            {/* User List */}
            <div className="w-40 border-l border-gray-400 flex flex-col bg-[#EBE9ED]">
                <div className="p-2 border-b border-gray-400 font-bold text-gray-700">Users (4)</div>
                <div className="bg-white flex-1 overflow-y-auto p-1">
                     <div className="flex items-center space-x-1 mb-1">
                        <User size={12} className="text-lime-600"/>
                        <span className="font-bold text-blue-600">Me</span>
                     </div>
                     <div className="flex items-center space-x-1 mb-1">
                        <User size={12} className="text-gray-400"/>
                        <span className="text-red-600">xX_DragonSlayer_Xx</span>
                     </div>
                     <div className="flex items-center space-x-1 mb-1">
                        <User size={12} className="text-gray-400"/>
                        <span className="text-red-600">skater_boi_88</span>
                     </div>
                     <div className="flex items-center space-x-1 mb-1">
                        <User size={12} className="text-gray-400"/>
                        <span className="text-gray-600">Guest_291</span>
                     </div>
                </div>
            </div>
        </div>
    );
};
