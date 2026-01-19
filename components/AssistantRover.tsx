
import React, { useState, useEffect } from 'react';
import { X, Search, Settings } from 'lucide-react';

interface AssistantRoverProps {
    onClose: () => void;
    position: { x: number, y: number };
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}

export const AssistantRover = ({ onClose, position, zIndex, active, onClick, onMouseDown, onTouchStart }: AssistantRoverProps) => {
    const [status, setStatus] = useState('What are you looking for?');
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
        setSearching(true);
        setStatus('Looking through your files...');
        setTimeout(() => {
            setSearching(false);
            setStatus('I found nothing! Maybe check the trash?');
        }, 3000);
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[350px] bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <Search size={14} />
                     <span className="drop-shadow-sm">Search Companion</span>
                </div>
                <button onClick={onClose} className="w-5 h-5 bg-[#E81123] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12}/></button>
            </div>

            <div className="flex-1 bg-white border border-gray-400 m-1 flex overflow-hidden">
                {/* Rover Sidebar */}
                <div className="w-24 bg-blue-100 p-2 flex flex-col items-center border-r border-gray-300">
                    <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center border-2 border-yellow-600 shadow-sm overflow-hidden mb-2">
                        <div className="text-3xl animate-bounce">🐶</div>
                    </div>
                    <div className="text-[10px] text-center font-bold text-blue-900 leading-tight">Rover</div>
                </div>

                {/* Search Content */}
                <div className="flex-1 p-4 flex flex-col space-y-4">
                    <div className="bg-[#FFFFCC] border border-black p-2 rounded relative text-[11px]">
                        <strong>{status}</strong>
                        <div className="absolute top-2 -left-2 w-2 h-2 bg-[#FFFFCC] border-t border-l border-black transform -rotate-45"></div>
                    </div>

                    <div className="space-y-2">
                        <label className="block font-bold">Search for:</label>
                        <input className="w-full border border-gray-400 p-1 outline-none focus:border-blue-500" placeholder="*.mp3, photos, etc." />
                    </div>

                    <div className="flex-1"></div>

                    <div className="flex justify-end space-x-2 border-t border-gray-200 pt-3">
                        <button onClick={handleSearch} disabled={searching} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 font-bold disabled:text-gray-400">Search</button>
                        <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
