import React, { useState, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface NotepadProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
    initialContent?: string;
}

export const Notepad = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick, initialContent }: NotepadProps) => {
    const [content, setContent] = useState(initialContent || "\n\n\n   REMEMBER TO BUY MILK\n   DOWNLOAD NEW LINKIN PARK ALBUM");
    const [isSaved, setIsSaved] = useState(true);

    useEffect(() => {
        if (initialContent) setContent(initialContent);
    }, [initialContent]);

    const handleSave = () => {
        setIsSaved(true);
        alert("File saved to C:\\Documents and Settings\\Administrator\\My Documents\\note.txt");
    };

    const handleNew = () => {
        if (!isSaved && !window.confirm("You have unsaved changes. Create new file anyway?")) return;
        setContent("");
        setIsSaved(true);
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[95vw] max-w-[400px] h-[300px] bg-white border border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow"
            onClick={onClick}
        >
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}>
                <div className="flex items-center text-white space-x-2 pl-1 truncate">
                     <span className="font-bold drop-shadow-sm truncate">{isSaved ? '' : '*'}Untitled - Notepad</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10">-</button>
                     <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-5 h-5 bg-[#E81123] rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:brightness-110">x</button>
                </div>
            </div>
            
            <div className="flex space-x-3 p-1 px-2 border-b border-gray-200 bg-[#ECE9D8] text-black">
                <div className="relative group">
                    <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
                    <div className="hidden group-hover:block absolute top-full left-0 bg-white border border-gray-400 shadow-md z-50 min-w-[120px]">
                        <div onClick={handleNew} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">New</div>
                        <div onClick={handleSave} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">Save</div>
                        <div className="border-t border-gray-300 my-1"></div>
                        <div onClick={onClose} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">Exit</div>
                    </div>
                </div>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Edit</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
            </div>
            
            <textarea 
                className="flex-1 p-2 outline-none resize-none font-mono text-sm leading-tight scrollbar-retro" 
                spellCheck={false} 
                value={content}
                onChange={(e) => { setContent(e.target.value); setIsSaved(false); }}
            />
            <div className="h-5 bg-[#ECE9D8] border-t border-gray-300 px-2 flex items-center justify-end text-gray-500 italic">
                {isSaved ? 'All changes saved' : 'Unsaved changes'}
            </div>
        </div>
    )
}
