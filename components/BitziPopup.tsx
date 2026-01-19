
import React from 'react';
import { X, Minus, Square, ChevronLeft, ChevronRight, RefreshCw, Home, ShieldCheck, ShieldAlert } from 'lucide-react';
import { SearchResult } from '../types';

interface BitziPopupProps {
  file: SearchResult;
  onClose: () => void;
}

export const BitziPopup: React.FC<BitziPopupProps> = ({ file, onClose }) => {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div className="w-[95vw] md:w-[800px] h-[85vh] md:h-[600px] bg-[#D4D0C8] border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans text-xs rounded-t-lg overflow-hidden win-shadow">
        
        {/* IE6 Title Bar */}
        <div className="h-7 bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA] flex items-center justify-between px-2 select-none">
          <div className="flex items-center text-white font-bold space-x-2 truncate">
            <div className="w-4 h-4 bg-white text-blue-800 flex items-center justify-center text-[10px] font-serif font-bold rounded-sm border border-blue-900 shadow-inner">e</div>
            <span className="truncate drop-shadow-md">{file.filename} - Bitzi Ticket - Microsoft Internet Explorer</span>
          </div>
          <div className="flex space-x-1">
            <button className="w-5 h-5 bg-[#EBE9ED] border border-white/50 rounded-sm flex items-center justify-center text-black shadow-sm"><Minus size={12}/></button>
            <button className="w-5 h-5 bg-[#EBE9ED] border border-white/50 rounded-sm flex items-center justify-center text-black shadow-sm"><Square size={10}/></button>
            <button onClick={onClose} className="w-5 h-5 bg-[#E81123] border border-white/50 rounded-sm flex items-center justify-center text-white shadow-sm hover:brightness-110"><X size={14} strokeWidth={3}/></button>
          </div>
        </div>

        {/* IE Menu Bar */}
        <div className="bg-[#EBE9ED] flex items-center px-1 border-b border-gray-400 py-0.5 font-bold text-gray-800">
           {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(m => (
               <span key={m} className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default rounded-sm">{m}</span>
           ))}
        </div>

        {/* Address Bar */}
        <div className="bg-[#EBE9ED] p-1 border-b border-gray-400 flex items-center space-x-2">
            <div className="flex space-x-1 text-gray-700">
                <button className="p-1 rounded-full border border-transparent hover:border-gray-400 hover:bg-white transition-colors"><ChevronLeft size={18}/></button>
                <button className="p-1 rounded-full border border-transparent hover:border-gray-400 hover:bg-white transition-colors"><ChevronRight size={18}/></button>
                <button className="p-1 rounded-full border border-transparent hover:border-gray-400 hover:bg-white transition-colors"><RefreshCw size={14}/></button>
                <button className="p-1 rounded-full border border-transparent hover:border-gray-400 hover:bg-white transition-colors"><Home size={14}/></button>
            </div>
            <div className="flex-1 bg-white border border-gray-500 h-6 px-2 flex items-center text-gray-800 font-mono shadow-inner overflow-hidden">
                <span className="text-gray-400 mr-2">http://</span>bitzi.com/lookup/{file.id}
            </div>
            <button className="px-3 py-0.5 bg-[#EBE9ED] border border-gray-400 rounded-sm hover:bg-white font-bold text-green-700">Go</button>
        </div>

        {/* Web Content */}
        <div className="flex-1 bg-white overflow-auto p-4 md:p-8 scrollbar-retro">
             <div className="max-w-3xl mx-auto font-verdana">
                <div className="border-b-4 border-[#FF9900] pb-2 mb-6 flex justify-between items-end">
                    <h1 className="text-3xl font-black text-[#003366] italic tracking-tighter">bitzi</h1>
                    <span className="text-gray-500 font-bold italic text-sm">"Know what you download"</span>
                </div>

                <div className="bg-[#FFF8DD] border-2 border-[#FFCC00] p-4 mb-8 shadow-sm">
                    <h2 className="font-black text-xl mb-4 text-[#CC6600] uppercase tracking-tight">Bitzi Ticket Details</h2>
                    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-3 text-sm">
                        <div className="font-black text-right text-gray-500 uppercase text-[10px] pt-1">Filename:</div>
                        <div className="font-bold text-blue-900 break-all">{file.filename}</div>
                        
                        <div className="font-black text-right text-gray-500 uppercase text-[10px] pt-1">Size:</div>
                        <div className="font-bold">{file.size}</div>
                        
                        <div className="font-black text-right text-gray-500 uppercase text-[10px] pt-1">Type:</div>
                        <div className="font-black text-orange-700">{file.type.toUpperCase()}</div>

                        <div className="font-black text-right text-gray-500 uppercase text-[10px] pt-1">SHA1 Hash:</div>
                        <div className="font-mono text-xs text-gray-400 bg-gray-50 p-1 border border-gray-200">3f78a2b109c902839d8912839b0c0923812</div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-black text-[#003366] mb-4 border-b-2 border-gray-200 uppercase text-xs tracking-widest pb-1">Community Trust Audit</h3>
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 bg-gray-50 p-6 rounded border border-gray-200">
                        <div className="text-center bg-white p-4 border border-gray-300 shadow-sm rounded-lg min-w-[120px]">
                            {file.filename.toLowerCase().includes('.exe') ? (
                                <ShieldAlert size={56} className="text-red-600 mx-auto mb-2 drop-shadow-[0_0_8px_rgba(255,0,0,0.3)]"/>
                            ) : (
                                <ShieldCheck size={56} className="text-green-600 mx-auto mb-2 drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]"/>
                            )}
                            <div className={`font-black text-lg ${file.filename.toLowerCase().includes('.exe') ? 'text-red-700' : 'text-green-700'}`}>
                                {file.filename.toLowerCase().includes('.exe') ? 'DANGEROUS' : 'VERIFIED'}
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <p className="mb-4 text-gray-700 leading-relaxed font-medium">
                                This asset has been rated by <strong>{Math.floor(Math.random() * 500) + 20}</strong> unique peers.
                            </p>
                            {file.filename.toLowerCase().includes('.exe') ? (
                                <div className="bg-red-50 border-l-4 border-red-600 p-3 text-red-800 font-bold">
                                    CRITICAL WARNING: This file is flagged as a "Trojan" or "Worm". Peer-to-peer users have reported system instability after execution.
                                </div>
                            ) : (
                                <div className="bg-green-50 border-l-4 border-green-600 p-3 text-green-800 font-bold">
                                    The hash for this file matches known fingerprints for <strong>"{file.filename}"</strong>. It appears to be a genuine media asset.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pb-12">
                     <h3 className="font-black text-[#003366] mb-4 border-b-2 border-gray-200 uppercase text-xs tracking-widest pb-1">Recent Peer Reviews</h3>
                     <div className="space-y-4">
                        <ReviewBox user="music_fanatic_2005" date="Oct 20, 2005" text="Clean rip! No static. 5 stars." color="text-blue-700" />
                        <ReviewBox user="p2p_veteran" date="Oct 18, 2005" text="Careful guys, check the file extension twice. This one is good though." color="text-green-700" />
                     </div>
                </div>
             </div>
        </div>
        
        {/* IE Status Bar */}
        <div className="h-6 bg-[#EBE9ED] border-t border-gray-400 flex items-center px-2 text-gray-700 gap-4 font-bold text-[10px]">
            <span className="flex-1">Done</span>
            <div className="w-24 h-4 bg-white border border-gray-400 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/20 w-3/4 animate-pulse"></div>
            </div>
            <span className="flex items-center space-x-1 border-l border-gray-400 pl-4">
                <ShieldCheck size={12} className="text-green-700"/>
                <span>Trusted Site</span>
            </span>
        </div>
      </div>
    </div>
  );
};

const ReviewBox = ({ user, date, text, color }: { user: string, date: string, text: string, color: string }) => (
    <div className="bg-white p-3 border border-gray-200 shadow-sm rounded">
        <div className="flex justify-between items-center mb-1">
            <div className={`font-black text-xs ${color}`}>{user}</div>
            <div className="text-[10px] text-gray-400 font-bold">{date}</div>
        </div>
        <p className="text-gray-800 text-[13px] leading-snug">{text}</p>
    </div>
);
