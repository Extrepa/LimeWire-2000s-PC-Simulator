import React, { useState } from 'react';
import { X, Minus, Square, FileText, Printer, Search, Scissors, Copy, Clipboard, Undo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface WordPadProps {
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

export const WordPad = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: WordPadProps) => {
    const [font, setFont] = useState('Arial');
    const [fontSize, setFontSize] = useState(10);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[600px] h-[450px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                        <FileText size={12} className="text-[#215DC6]"/>
                     </div>
                     <span className="font-bold drop-shadow-sm">Document - WordPad</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="flex space-x-2 px-1 text-black border-b border-gray-400 pb-1">
                {['File', 'Edit', 'View', 'Insert', 'Format', 'Help'].map(m => (
                    <span key={m} className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">{m}</span>
                ))}
            </div>

            {/* Standard Toolbar */}
            <div className="flex items-center space-x-1 px-1 py-1 border-b border-gray-400 bg-[#ECE9D8]">
                <ToolbarButton icon={<FileText size={14}/>} />
                <ToolbarButton icon={<Search size={14}/>} />
                <ToolbarButton icon={<Printer size={14}/>} />
                <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                <ToolbarButton icon={<Scissors size={14}/>} />
                <ToolbarButton icon={<Copy size={14}/>} />
                <ToolbarButton icon={<Clipboard size={14}/>} />
                <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                <ToolbarButton icon={<Undo size={14}/>} />
            </div>

            {/* Format Bar */}
            <div className="flex items-center space-x-2 px-1 py-1 border-b border-gray-400 bg-[#ECE9D8]">
                <select 
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                    className="border border-gray-400 h-5 text-xs w-32"
                >
                    <option>Arial</option>
                    <option>Times New Roman</option>
                    <option>Courier New</option>
                    <option>Verdana</option>
                </select>
                <select 
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="border border-gray-400 h-5 text-xs w-12"
                >
                    {[8,9,10,11,12,14,16,18,20,22,24,26,28,36,48,72].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="flex space-x-0.5">
                    <ToolbarButton icon={<Bold size={14} strokeWidth={3}/>} />
                    <ToolbarButton icon={<Italic size={14}/>} />
                    <ToolbarButton icon={<Underline size={14}/>} />
                </div>
                <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                <div className="flex space-x-0.5">
                    <ToolbarButton icon={<AlignLeft size={14}/>} />
                    <ToolbarButton icon={<AlignCenter size={14}/>} />
                    <ToolbarButton icon={<AlignRight size={14}/>} />
                </div>
            </div>

            {/* Ruler */}
            <div className="h-6 bg-white border-b border-gray-400 relative flex items-end">
                <div className="w-full h-1/2 border-t border-black flex justify-between px-2 text-[8px] text-gray-500 font-mono">
                    {Array.from({length: 15}).map((_, i) => (
                        <div key={i} className="h-2 border-l border-black flex flex-col items-center">
                            {i > 0 && <span className="-mt-3">{i}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#808080] p-4 overflow-auto shadow-inner">
                <div 
                    className="min-h-full bg-white shadow-lg p-8 outline-none"
                    style={{ fontFamily: font, fontSize: `${fontSize}pt` }}
                    contentEditable
                    suppressContentEditableWarning
                >
                    LimeWire Simulator<br/>
                    <br/>
                    WordPad is a basic word processor included with almost all versions of Microsoft Windows from Windows 95 onwards. It is more advanced than Notepad but simpler than Microsoft Word and Microsoft Works.
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-5 border-t border-gray-400 bg-[#ECE9D8] text-gray-600 px-1 pt-0.5 flex justify-between">
                <span>For Help, press F1</span>
                <div className="flex space-x-4">
                    <span>NUM</span>
                </div>
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) => (
    <button 
        onClick={onClick}
        className="p-0.5 hover:bg-white border border-transparent hover:border-gray-400 rounded-sm active:border-gray-600 active:bg-gray-200"
    >
        {icon}
    </button>
);