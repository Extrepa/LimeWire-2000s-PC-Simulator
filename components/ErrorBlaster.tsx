import React, { useState } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface ErrorBlasterProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    // Added onTouchStart to support mobile window dragging
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onBlast: (config: { title: string, message: string, type: 'error' | 'warning' | 'info' }) => void;
}

export const ErrorBlaster = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick, onBlast }: ErrorBlasterProps) => {
    const [title, setTitle] = useState('System Error');
    const [message, setMessage] = useState('A critical error has occurred.');
    const [type, setType] = useState<'error' | 'warning' | 'info'>('error');

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[350px] h-[300px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">Error Blaster 2000</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="flex-1 p-3 flex flex-col space-y-4">
                <div className="bg-white border border-gray-400 p-2 mb-2 text-center text-gray-500 italic">
                    Create your own authentic Windows XP error messages to confuse your friends!
                </div>

                <div className="space-y-2">
                    <div>
                        <label className="block mb-1 font-bold">Window Title:</label>
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-400 p-1 outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Error Message:</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full h-16 border border-gray-400 p-1 outline-none resize-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Icon Type:</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="radio" name="icon" checked={type === 'error'} onChange={() => setType('error')} />
                                <div className="w-4 h-4 bg-red-600 rounded-full text-white flex items-center justify-center font-bold text-[10px]">X</div>
                                <span>Error</span>
                            </label>
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="radio" name="icon" checked={type === 'warning'} onChange={() => setType('warning')} />
                                <div className="w-4 h-4 bg-yellow-500 rounded-full text-black flex items-center justify-center font-bold text-[10px]">!</div>
                                <span>Warning</span>
                            </label>
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="radio" name="icon" checked={type === 'info'} onChange={() => setType('info')} />
                                <div className="w-4 h-4 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold text-[10px]">i</div>
                                <span>Info</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-300">
                    <button 
                        onClick={() => onBlast({ title, message, type })}
                        className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 font-bold"
                    >
                        BLAST ERROR!
                    </button>
                </div>
            </div>
        </div>
    );
};