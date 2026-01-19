
import React, { useState } from 'react';
import { X, Minus, Square, ChevronLeft, ChevronRight, ArrowUp, Search, Folder, Trash2, File, FileText } from 'lucide-react';

interface RecycleBinProps {
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

const INITIAL_ITEMS = [
    { name: 'New Folder', type: 'Folder', size: '', deleted: 'Today' },
    { name: 'Top Secret.txt', type: 'Text Document', size: '1 KB', deleted: 'Yesterday' },
    { name: 'failed_project.doc', type: 'WordPad Document', size: '45 KB', deleted: 'Last Week' },
    { name: 'virus_scan_log.txt', type: 'Text Document', size: '2 KB', deleted: 'Last Week' },
];

export const RecycleBin = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: RecycleBinProps) => {
    const [items, setItems] = useState(INITIAL_ITEMS);

    const handleEmpty = () => {
        // Play crunch sound simulated by just clearing for now
        setItems([]);
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[800px] h-[600px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow"
            onClick={onClick}
        >
            {/* Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-7 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 truncate">
                     <Trash2 size={16} className="text-white"/>
                     <span className="font-bold drop-shadow-sm text-[13px]">Recycle Bin</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu Bar */}
            <div className="bg-[#EBE9ED] flex items-center px-1 border-b border-[#D6D3CE] py-0.5">
               {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(m => (
                   <span key={m} className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default">{m}</span>
               ))}
               <div className="flex-1"></div>
               <div className="w-8 h-8 bg-black/5 border border-gray-400 rounded-sm"></div>
            </div>

            {/* Nav Bar */}
            <div className="bg-[#EBE9ED] p-1 border-b border-[#D6D3CE] flex items-center space-x-2">
                 <button className="flex items-center space-x-1 px-1 hover:border-gray-400 border border-transparent rounded-sm disabled:opacity-50 group">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm group-hover:shadow-md"><ChevronLeft size={16}/></div>
                    <span>Back</span>
                 </button>
                 <button className="p-1 hover:border-gray-400 border border-transparent rounded-sm disabled:opacity-50">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm"><ChevronRight size={16}/></div>
                 </button>
                 <button className="p-1 hover:border-gray-400 border border-transparent rounded-sm flex items-center space-x-1">
                    <div className="w-6 h-6 bg-[#EBE9ED] border border-gray-400 rounded flex items-center justify-center"><ArrowUp size={16} className="text-green-600"/></div>
                 </button>
                 <div className="w-[1px] h-6 bg-gray-400 mx-2"></div>
                 <button className="flex items-center space-x-1 px-1 hover:border-gray-400 border border-transparent rounded-sm">
                    <Search size={16}/> <span>Search</span>
                 </button>
                 <button className="flex items-center space-x-1 px-1 hover:border-gray-400 border border-transparent rounded-sm">
                    <Folder size={16}/> <span>Folders</span>
                 </button>
            </div>

            <div className="flex-1 flex bg-white overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] p-2 overflow-y-auto hidden md:block">
                     <div className="mb-3 bg-white/0">
                        <div className="font-bold text-[#215DC6] px-2 py-1 rounded-t-sm cursor-pointer flex justify-between items-center bg-gradient-to-r from-white/0 via-white/30 to-white/0">
                            <span>Recycle Bin Tasks</span>
                            <div className="w-4 h-4 border border-white/50 rounded-full flex items-center justify-center text-white text-[9px] bg-[#215DC6] font-normal">v</div>
                        </div>
                        <div className="bg-[#D6DFF7] border border-white/50 p-2 text-[11px] space-y-2">
                            <div className="flex items-start space-x-1 cursor-pointer hover:underline text-[#003399]" onClick={handleEmpty}>
                                <div className="min-w-[12px]"><Trash2 size={12}/></div>
                                <span>Empty the Recycle Bin</span>
                            </div>
                            <div className="flex items-start space-x-1 cursor-pointer hover:underline text-[#003399]" onClick={() => setItems([])}>
                                <div className="min-w-[12px]"><ChevronRight size={12}/></div>
                                <span>Restore all items</span>
                            </div>
                        </div>
                     </div>
                     
                     <div className="mb-3 bg-white/0">
                        <div className="font-bold text-[#215DC6] px-2 py-1 rounded-t-sm cursor-pointer flex justify-between items-center bg-gradient-to-r from-white/0 via-white/30 to-white/0">
                            <span>Other Places</span>
                            <div className="w-4 h-4 border border-white/50 rounded-full flex items-center justify-center text-white text-[9px] bg-[#215DC6] font-normal">v</div>
                        </div>
                        <div className="bg-[#D6DFF7] border border-white/50 p-2 text-[11px] space-y-1">
                             <div className="text-[#003399] hover:underline cursor-pointer">My Computer</div>
                             <div className="text-[#003399] hover:underline cursor-pointer">My Documents</div>
                             <div className="text-[#003399] hover:underline cursor-pointer">My Network Places</div>
                        </div>
                     </div>
                </div>

                {/* File List */}
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-600 bg-[#EBE9ED] border-b border-gray-300">
                                <th className="p-1 font-normal border-r border-gray-300 pl-2">Name</th>
                                <th className="p-1 font-normal border-r border-gray-300">Original Location</th>
                                <th className="p-1 font-normal border-r border-gray-300">Date Deleted</th>
                                <th className="p-1 font-normal border-r border-gray-300">Size</th>
                                <th className="p-1 font-normal">Type</th>
                            </tr>
                        </thead>
                        <tbody className="text-[11px]">
                            {items.map((item, i) => (
                                <tr key={i} className="hover:bg-blue-50 cursor-default group">
                                    <td className="p-1 flex items-center space-x-1 group-hover:text-blue-700">
                                        {item.type === 'Folder' ? <Folder size={14} className="text-yellow-500 fill-yellow-500"/> : <FileText size={14} className="text-gray-500"/>}
                                        <span>{item.name}</span>
                                    </td>
                                    <td className="p-1 text-gray-500">C:\My Documents</td>
                                    <td className="p-1 text-gray-500">{item.deleted}</td>
                                    <td className="p-1 text-gray-500">{item.size}</td>
                                    <td className="p-1 text-gray-500">{item.type}</td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-400">The Recycle Bin is empty.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
