import React, { useState, useEffect } from 'react';
import { X, Minus, Square, MessageSquare, User, Trophy, Star, ChevronDown } from 'lucide-react';
import { generateForumThread } from '../services/geminiService';

interface ForumWindowProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const ForumWindow = ({ onClose, onMinimize, position, onMouseDown, zIndex, active, onClick }: ForumWindowProps) => {
    const [thread, setThread] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const loadThread = async (newTopic: string) => {
        setLoading(true);
        const data = await generateForumThread(newTopic);
        setThread(data);
        setLoading(false);
    };

    useEffect(() => {
        loadThread('How to use Gnutella without getting a virus lol');
    }, []);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[800px] h-[550px] bg-white border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans text-xs win-shadow overflow-hidden"
            onClick={onClick}
        >
            {/* Title Bar */}
            <div onMouseDown={onMouseDown} className={`h-7 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}>
                <div className="flex items-center text-white space-x-2 pl-1">
                     <MessageSquare size={14} className="drop-shadow-sm" />
                     <span className="font-bold drop-shadow-sm">vBulletin 3.0 Simulator - {thread?.title || 'Forum'}</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={onMinimize} className="w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10"><Minus size={10}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12}/></button>
                </div>
            </div>

            {/* vB Navigation Bar */}
            <div className="bg-[#1C4376] p-2 flex items-center justify-between border-b border-black shadow-inner">
                <div className="flex space-x-6 text-[#D7E3F1] font-bold text-[11px]">
                    <span className="hover:text-white cursor-pointer transition-colors flex items-center"><ChevronDown size={12} className="mr-1"/> Portal</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Forums</span>
                    <span className="hover:text-white cursor-pointer transition-colors">User CP</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Members</span>
                    <span className="hover:text-white cursor-pointer transition-colors">FAQ</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Calendar</span>
                </div>
                <div className="flex items-center space-x-1">
                    <input className="px-2 py-0.5 border border-black bg-white/90 text-black outline-none focus:bg-white" placeholder="Search..." />
                    <button className="bg-gray-300 px-3 py-0.5 border border-black font-bold hover:bg-white active:bg-gray-400">GO</button>
                </div>
            </div>

            {/* Forum Body */}
            <div className="flex-1 bg-[#F5F5F5] overflow-y-auto scrollbar-retro">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <div className="font-bold text-blue-900 italic text-sm animate-pulse">Reticulating Forum Beef...</div>
                    </div>
                ) : thread ? (
                    <div className="p-4 max-w-4xl mx-auto">
                        {/* Breadcrumbs */}
                        <div className="text-[11px] mb-4 text-[#1C4376] flex items-center space-x-1">
                            <span className="underline">P2P Scene Forums</span>
                            <span>&gt;</span>
                            <span className="underline">General Discussion</span>
                            <span>&gt;</span>
                            <span className="font-bold">{thread.title}</span>
                        </div>

                        <div className="bg-[#D1D1E1] p-2 border border-[#808080] mb-4 flex justify-between items-center shadow-sm">
                            <h1 className="font-bold text-lg text-[#1C4376] drop-shadow-sm">{thread.title}</h1>
                            <button className="bg-gradient-to-b from-[#1C4376] to-[#0A2244] text-white px-4 py-1 font-bold rounded-sm border border-black hover:brightness-110 shadow-md">POST REPLY</button>
                        </div>

                        {thread.posts.map((post: any, i: number) => (
                            <div key={i} className="mb-6 border border-[#808080] shadow-md bg-white rounded-sm overflow-hidden">
                                <div className="bg-[#E1E1E2] p-1.5 flex justify-between text-[11px] text-[#1C4376] border-b border-[#808080] font-bold">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500 font-normal">{new Date(Date.now() - (i * 3600000)).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Trophy size={10} className="text-yellow-600" />
                                        <span>Post #{i+1}</span>
                                    </div>
                                </div>
                                <div className="flex min-h-[150px]">
                                    {/* User Sidebar */}
                                    <div className="w-36 bg-[#F1F1F1] p-3 border-r border-[#D1D1D1] flex flex-col items-center">
                                        <span className="font-bold text-[#1C4376] text-sm mb-2 hover:underline cursor-pointer">{post.user}</span>
                                        <div className="w-24 h-24 bg-gray-200 border-2 border-[#D1D1D1] mb-2 flex items-center justify-center overflow-hidden shadow-inner group cursor-pointer relative">
                                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-bold">PROFILE</div>
                                            <div className="text-[10px] text-center p-2 text-gray-400 italic">[{post.avatarType}]</div>
                                        </div>
                                        <div className="flex flex-col items-center text-center space-y-0.5">
                                            <span className="text-[10px] text-blue-900 font-bold bg-blue-50 px-2 rounded-full border border-blue-200 mb-1">{post.rank}</span>
                                            <div className="flex space-x-0.5 mb-1">
                                                {Array.from({length: 5}).map((_, j) => <Star key={j} size={8} fill={j < (i===0 ? 5 : 2) ? "gold" : "none"} className="text-yellow-600" />)}
                                            </div>
                                            <div className="text-[9px] text-gray-500 leading-tight">
                                                <div>Join Date: Jan 2004</div>
                                                <div>Location: {i%2===0 ? 'The Internet' : 'Your Mom\'s House'}</div>
                                                <div>Posts: {Math.floor(Math.random() * 8000 + 100)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Post Content */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div className="text-[14px] leading-relaxed mb-10 text-gray-800">
                                            {post.content}
                                        </div>
                                        <div className="border-t border-gray-200 pt-3 mt-4">
                                            <div className="text-gray-400 text-[10px] italic mb-1">__________________</div>
                                            <div className="text-[#1C4376] font-mono text-[10px] leading-tight whitespace-pre bg-gray-50/50 p-2 rounded">
                                                {post.signature}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#E1E1E2] h-6 border-t border-[#D1D1D1] px-4 flex items-center justify-end space-x-4">
                                    <span className="text-[10px] text-[#1C4376] font-bold cursor-pointer hover:underline">Quote</span>
                                    <span className="text-[10px] text-[#1C4376] font-bold cursor-pointer hover:underline">Multi-Quote</span>
                                    <span className="text-[10px] text-[#1C4376] font-bold cursor-pointer hover:underline">Report</span>
                                </div>
                            </div>
                        ))}
                        
                        <div className="flex justify-between items-center text-[10px] text-gray-500 mt-8 pb-4">
                            <span>vBulletin® Version 3.0.7, Copyright ©2000 - 2005, Jelsoft Enterprises Ltd.</span>
                            <div className="flex space-x-2 underline">
                                <span>Contact Us</span>
                                <span>Archive</span>
                                <span>Top</span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
