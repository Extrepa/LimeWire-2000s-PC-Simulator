
import React, { useState, useEffect } from 'react';
import { X, User, FileIcon, QualityStars } from './Icons';
import { SearchResult } from '../types';
import { searchGeminiFiles } from '../services/geminiService';

interface PeerProfileProps {
    peerId: string;
    onClose: () => void;
    onDownload: (file: SearchResult) => void;
}

export const PeerProfile = ({ peerId, onClose, onDownload }: PeerProfileProps) => {
    const [sharedFiles, setSharedFiles] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            // Simulate browsing by searching for peer's likely files
            const results = await searchGeminiFiles(`Shared library of ${peerId}`);
            setSharedFiles(results);
            setLoading(false);
        };
        fetchFiles();
    }, [peerId]);

    return (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="w-full max-w-[650px] h-[500px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans text-xs win-shadow rounded-t-lg overflow-hidden animate-slide-up">
                {/* Title Bar */}
                <div className="h-7 bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA] flex items-center justify-between px-2 select-none">
                    <div className="flex items-center text-white font-bold space-x-2">
                        <User size={14} />
                        <span className="truncate">Browsing Host: {peerId}</span>
                    </div>
                    <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-sm flex items-center justify-center text-white border border-white/30 transition-colors">
                        <X size={14}/>
                    </button>
                </div>

                {/* Peer Info Header */}
                <div className="bg-[#EBE9ED] p-4 border-b border-gray-400 flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white border border-gray-400 rounded-sm flex items-center justify-center shadow-inner group overflow-hidden">
                        <User size={48} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="font-black text-xl text-blue-900 truncate tracking-tighter">{peerId}</div>
                        <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                            <span className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div> Ultrapeer Connection</span>
                            <span>•</span>
                            <span>Gnutella 0.6</span>
                            <span>•</span>
                            <span>LimeWire 4.12.6</span>
                        </div>
                        <div className="mt-2 flex space-x-2">
                            <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200 font-bold uppercase text-[9px]">T3 Connection</div>
                            <div className="bg-lime-100 text-lime-800 px-2 py-0.5 rounded border border-lime-200 font-bold uppercase text-[9px]">Karma: {Math.floor(Math.random() * 500) + 100}</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white overflow-hidden flex flex-col">
                    <div className="bg-[#ECE9D8] px-3 py-1.5 font-black text-gray-700 border-b border-gray-300 flex justify-between items-center">
                        <span className="uppercase tracking-tight">Public Shared Library ({sharedFiles.length} items)</span>
                        <div className="text-[10px] text-blue-600 cursor-help hover:underline italic font-bold">What is this?</div>
                    </div>
                    
                    <div className="flex-1 overflow-auto scrollbar-retro">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center space-y-4">
                                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-blue-900 font-bold italic animate-pulse">Scanning host for shared assets...</span>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100 sticky top-0 border-b border-gray-300 z-10 shadow-sm">
                                    <tr className="text-[10px] font-black uppercase text-gray-600">
                                        <th className="p-2 border-r border-gray-200">File Name</th>
                                        <th className="p-2 border-r border-gray-200 w-20">Size</th>
                                        <th className="p-2 border-r border-gray-200 w-24">Rating</th>
                                        <th className="p-2 w-20 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sharedFiles.map(res => (
                                        <tr key={res.id} className="hover:bg-blue-50 border-b border-gray-50 group transition-colors">
                                            <td className="p-2 truncate flex items-center space-x-2">
                                                <FileIcon type={res.type} />
                                                <span className="font-bold text-[11px] text-blue-900">{res.filename}</span>
                                            </td>
                                            <td className="p-2 text-gray-500 font-mono text-[10px]">{res.size}</td>
                                            <td className="p-2">
                                                <QualityStars count={res.quality}/>
                                            </td>
                                            <td className="p-2 text-center">
                                                <button 
                                                    onClick={() => onDownload(res)}
                                                    className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-3 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm hover:brightness-110 active:scale-95 transition-all"
                                                >
                                                    GET
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="h-8 bg-[#EBE9ED] border-t border-gray-400 px-4 flex items-center justify-between text-[10px] text-gray-600 font-bold uppercase tracking-tight">
                    <div className="flex items-center space-x-4">
                        <span>Status: Connected</span>
                        <div className="w-[1px] h-4 bg-gray-400"></div>
                        <span>Latency: 45ms</span>
                    </div>
                    <button onClick={onClose} className="text-blue-700 hover:underline">Close Browse Session</button>
                </div>
            </div>
        </div>
    );
};
