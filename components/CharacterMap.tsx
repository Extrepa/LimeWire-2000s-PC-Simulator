import React, { useState } from 'react';
import { X, Minus } from 'lucide-react';

interface CharacterMapProps {
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

export const CharacterMap = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: CharacterMapProps) => {
    const [selectedFont, setSelectedFont] = useState('Arial');
    const [selectedChar, setSelectedChar] = useState<string | null>(null);
    const [copyBuffer, setCopyBuffer] = useState('');

    const chars = [];
    for (let i = 32; i < 255; i++) {
        chars.push(String.fromCharCode(i));
    }

    const handleCopy = () => {
        if (copyBuffer) {
            navigator.clipboard.writeText(copyBuffer);
        }
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[450px] h-[400px] bg-[#ECE9D8] border-2 border-[#E0DFE3] border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <div className="w-4 h-4 bg-white text-black font-serif font-bold flex items-center justify-center text-[10px] rounded-sm">Ç</div>
                     <span className="font-bold drop-shadow-sm">Character Map</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="p-2 flex flex-col h-full space-y-2">
                <div className="flex items-center space-x-2">
                    <span className="w-10">Font:</span>
                    <select 
                        value={selectedFont} 
                        onChange={(e) => setSelectedFont(e.target.value)}
                        className="flex-1 border border-gray-500 shadow-inner bg-white"
                    >
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Wingdings">Wingdings</option>
                    </select>
                </div>

                <div className="flex-1 bg-white border border-gray-500 shadow-inner overflow-y-scroll grid grid-cols-[repeat(auto-fill,minmax(24px,1fr))] content-start p-1 h-48 select-text">
                    {chars.map((char, i) => (
                        <div 
                            key={i} 
                            onClick={() => setSelectedChar(char)}
                            onDoubleClick={() => setCopyBuffer(prev => prev + char)}
                            className={`
                                w-6 h-6 flex items-center justify-center border hover:bg-blue-100 hover:border-blue-300 cursor-pointer
                                ${selectedChar === char ? 'bg-blue-200 border-blue-500 shadow-inner' : 'border-transparent'}
                            `}
                            style={{ fontFamily: selectedFont === 'Wingdings' ? 'Wingdings, sans-serif' : selectedFont }}
                        >
                            {char}
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <span>Characters to copy:</span>
                        <div className="flex-1 flex space-x-2">
                            <input 
                                className="flex-1 border border-gray-500 shadow-inner px-1"
                                value={copyBuffer}
                                onChange={(e) => setCopyBuffer(e.target.value)}
                                style={{ fontFamily: selectedFont === 'Wingdings' ? 'Wingdings, sans-serif' : selectedFont }}
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                        <button 
                            className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[70px]"
                            onClick={() => {
                                if (selectedChar) setCopyBuffer(prev => prev + selectedChar);
                            }}
                        >
                            Select
                        </button>
                        <button 
                            className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[70px]"
                            onClick={handleCopy}
                        >
                            Copy
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-400 pt-2">
                    <div className="flex items-center space-x-1 mb-1">
                        <input type="checkbox" id="advanced" />
                        <label htmlFor="advanced">Advanced view</label>
                    </div>
                    {selectedChar && (
                        <div className="text-gray-600">
                            Keystroke: Alt+{selectedChar.charCodeAt(0).toString().padStart(4, '0')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};