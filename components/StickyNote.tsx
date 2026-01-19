import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface StickyNoteProps {
    id: string;
    initialText?: string;
    position: { x: number, y: number };
    onClose: (id: string) => void;
    zIndex: number;
    onClick: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onNew: () => void;
}

export const StickyNote = ({ id, initialText = '', position, onClose, zIndex, onClick, onMouseDown, onNew }: StickyNoteProps) => {
    const [text, setText] = useState(initialText);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[200px] h-[200px] bg-[#FEF79E] shadow-md flex flex-col font-comic win-shadow transform rotate-1 transition-transform hover:rotate-0"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                className="h-6 bg-[#FEF278] flex items-center justify-between px-1 cursor-move"
            >
                <div 
                    onClick={(e) => { e.stopPropagation(); onNew(); }}
                    className="w-4 h-4 hover:bg-black/10 rounded flex items-center justify-center cursor-pointer"
                >
                    <Plus size={12} className="text-gray-600"/>
                </div>
                <div 
                    onClick={(e) => { e.stopPropagation(); onClose(id); }}
                    className="w-4 h-4 hover:bg-black/10 rounded flex items-center justify-center cursor-pointer"
                >
                    <X size={12} className="text-gray-600"/>
                </div>
            </div>
            <textarea 
                className="flex-1 bg-[#FEF79E] p-2 outline-none resize-none font-handwriting text-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a note..."
            />
            <style>{`
                .font-handwriting {
                    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
                }
            `}</style>
        </div>
    );
};
