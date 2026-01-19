
import React, { useState } from 'react';
import { X, Minus, Square, ChevronLeft, ChevronRight, ArrowUp, Search, Folder, HardDrive, Disc, File, FileText, Music, Image, ShieldAlert } from 'lucide-react';

interface FileExplorerProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onOpenFile: (file: { name: string, type: string, content?: string }) => void;
    onItemContextMenu: (e: React.MouseEvent, item: any) => void;
    onBsod: () => void;
}

const FILESYSTEM: Record<string, { name: string, type: 'root' | 'drive' | 'disk_drive' | 'floppy' | 'folder' | 'file', fileType?: 'txt' | 'mp3' | 'img' | 'exe' | 'dll', content?: string, children: string[] }> = {
    'root': { name: 'My Computer', type: 'root', children: ['c', 'd', 'a', 'shared'] },
    'c': { name: 'Local Disk (C:)', type: 'drive', children: ['docs', 'progs', 'win'] },
    'd': { name: 'CD Drive (D:) Audio CD', type: 'disk_drive', children: ['track1', 'track2'] },
    'a': { name: '3½ Floppy (A:)', type: 'floppy', children: [] },
    'shared': { name: 'Shared Documents', type: 'folder', children: ['shared_music', 'shared_pics'] },
    'docs': { name: 'Documents and Settings', type: 'folder', children: ['admin'] },
    'progs': { name: 'Program Files', type: 'folder', children: ['lime', 'winamp'] },
    'win': { name: 'WINDOWS', type: 'folder', children: ['sys32', 'notepad'] },
    'sys32': { name: 'system32', type: 'folder', children: ['hal_dll', 'kernel32_dll'] },
    'hal_dll': { name: 'hal.dll', type: 'file', fileType: 'dll', children: [] },
    'kernel32_dll': { name: 'kernel32.dll', type: 'file', fileType: 'dll', children: [] },
    'admin': { name: 'Administrator', type: 'folder', children: ['mydocs'] },
    'mydocs': { name: 'My Documents', type: 'folder', children: ['readme', 'todo', 'passwords'] },
    'readme': { name: 'README_IMPORTANT.txt', type: 'file', fileType: 'txt', content: "WELCOME TO THE XP SIMULATOR v2.0\n\n- Use LimeWire to search for music and movies.\n- Attempting to modify system32 files will cause a crash.\n- Change themes in Display Properties.\n- Watch out for viruses in LimeWire search results!", children: [] },
    'todo': { name: 'todo_list.txt', type: 'file', fileType: 'txt', content: "- Buy CD-Rs\n- Burn Mix CD for Jen\n- Defrag computer\n- Install Service Pack 2", children: [] },
    'passwords': { name: 'passwords.txt', type: 'file', fileType: 'txt', content: "Hotmail: hunter2\nRunescape: dragon123\nNeopets: fluffyrabbit", children: [] },
    'lime': { name: 'LimeWire', type: 'folder', children: [] },
    'winamp': { name: 'Winamp', type: 'folder', children: [] },
    'notepad': { name: 'notepad.exe', type: 'file', fileType: 'exe', children: [] },
    'track1': { name: 'Track01.cda', type: 'file', fileType: 'mp3', children: [] },
    'track2': { name: 'Track02.cda', type: 'file', fileType: 'mp3', children: [] },
    'shared_music': { name: 'Shared Music', type: 'folder', children: ['mp3_1'] },
    'mp3_1': { name: 'Linkin_Park_-_Numb.mp3', type: 'file', fileType: 'mp3', children: [] },
    'shared_pics': { name: 'Shared Pictures', type: 'folder', children: ['pic1'] },
    'pic1': { name: 'Blue Hills.jpg', type: 'file', fileType: 'img', children: [] },
};

export const FileExplorer = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick, onOpenFile, onItemContextMenu, onBsod }: FileExplorerProps) => {
    const [history, setHistory] = useState(['root']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const currentId = history[historyIndex];
    const currentFolder = FILESYSTEM[currentId] || FILESYSTEM['root'];

    const navigate = (id: string) => {
        if (!FILESYSTEM[id]) return;
        const item = FILESYSTEM[id];
        if (['root', 'drive', 'disk_drive', 'folder'].includes(item.type)) {
             const newHistory = [...history.slice(0, historyIndex + 1), id];
             setHistory(newHistory);
             setHistoryIndex(newHistory.length - 1);
        } else if (item.type === 'floppy') {
            setError("A:");
        } else if (item.type === 'file') {
            if (item.fileType === 'dll') {
                onBsod();
            } else {
                onOpenFile({ name: item.name, type: item.fileType || 'txt', content: item.content });
            }
        }
    };

    const getIcon = (item: any) => {
        switch(item.type) {
            case 'drive': return <HardDrive size={32} className="text-gray-500" />;
            case 'disk_drive': return <Disc size={32} className="text-gray-400" />;
            case 'folder': return <Folder size={32} className="text-yellow-500 fill-yellow-500" />;
            case 'file':
                if (item.fileType === 'txt') return <FileText size={32} className="text-blue-400" />;
                if (item.fileType === 'mp3') return <Music size={32} className="text-purple-600" />;
                if (item.fileType === 'img') return <Image size={32} className="text-green-600" />;
                if (item.fileType === 'dll') return <ShieldAlert size={32} className="text-red-600" />;
                return <File size={32} className="text-gray-500" />;
            default: return <File size={32} className="text-gray-500" />;
        }
    };

    return (
        <div style={{ left: position.x, top: position.y, zIndex }} className="absolute w-[90vw] md:w-[800px] h-[75vh] md:h-[600px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans text-xs win-shadow rounded-t-lg overflow-hidden" onClick={onClick}>
             {error && (
                 <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                     <div className="w-80 bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl p-4 flex flex-col">
                         <div className="flex items-center space-x-3 mb-6">
                             <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-white shadow-md">X</div>
                             <div><p className="font-bold text-sm">{error} is not accessible.</p><p className="text-gray-700">The device is not ready or volume is corrupted.</p></div>
                         </div>
                         <button className="self-end px-6 py-1 border border-gray-400 bg-white shadow-sm active:bg-gray-200 font-bold" onClick={() => setError(null)}>OK</button>
                     </div>
                 </div>
             )}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className={`h-8 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}>
                <div className="flex items-center text-white space-x-2 pl-2 truncate font-bold"><span className="drop-shadow-sm text-[13px]">{currentFolder.name}</span></div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-6 h-6 bg-[#0055EA] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><Minus size={14}/></button>
                     <button className="w-6 h-6 bg-[#0055EA] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><Square size={12}/></button>
                     <button onClick={onClose} className="w-6 h-6 bg-[#E81123] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><X size={14} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="bg-[#EBE9ED] p-1 border-b border-gray-400 flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-none">
                 <button onClick={() => historyIndex > 0 && setHistoryIndex(historyIndex - 1)} disabled={historyIndex === 0} className="flex items-center space-x-1 px-3 py-1 hover:bg-white/50 border border-transparent hover:border-gray-400 rounded-sm disabled:opacity-30 group">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white shadow-sm group-hover:shadow-md"><ChevronLeft size={16}/></div>
                    <span className="font-bold">Back</span>
                 </button>
                 <button onClick={() => historyIndex < history.length - 1 && setHistoryIndex(historyIndex + 1)} disabled={historyIndex === history.length - 1} className="p-1 hover:bg-white/50 border border-transparent hover:border-gray-400 rounded-sm disabled:opacity-30">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white shadow-sm"><ChevronRight size={16}/></div>
                 </button>
                 <div className="w-[1px] h-6 bg-gray-400 mx-1"></div>
                 <button className="flex items-center space-x-1 px-2 py-1 hover:bg-white/50 border border-transparent hover:border-gray-400 rounded-sm">
                    <Search size={16}/> <span className="font-bold">Search</span>
                 </button>
                 <button className="flex items-center space-x-1 px-2 py-1 hover:bg-white/50 border border-transparent hover:border-gray-400 rounded-sm">
                    <Folder size={16}/> <span className="font-bold">Folders</span>
                 </button>
            </div>

            <div className="bg-[#EBE9ED] px-2 py-1 border-b border-gray-400 flex items-center space-x-2">
                <span className="text-gray-500 font-bold text-[11px]">Address:</span>
                <div className="flex-1 bg-white border border-gray-500 h-6 px-2 flex items-center font-mono text-[11px] text-blue-900 shadow-inner overflow-hidden">
                    C:\{history.slice(1, historyIndex + 1).join('\\')}
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-white shadow-inner scrollbar-retro">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6">
                    {currentFolder.children.map(childId => {
                        const item = FILESYSTEM[childId];
                        return (
                            <div key={childId} onDoubleClick={() => navigate(childId)} onClick={() => {}} onContextMenu={(e) => { e.stopPropagation(); onItemContextMenu(e, item); }} className="flex flex-col items-center group cursor-pointer">
                                <div className="w-12 h-12 flex items-center justify-center mb-2 group-hover:opacity-80 group-active:scale-95 transition-transform">{getIcon(item)}</div>
                                <span className="text-center text-[11px] text-gray-800 font-bold group-hover:bg-[#316AC5] group-hover:text-white px-2 py-0.5 rounded-sm truncate w-full">{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="h-6 bg-[#EBE9ED] border-t border-gray-400 px-3 flex items-center justify-between text-[11px] text-gray-600 font-bold">
                 <span>{currentFolder.children.length} Object(s)</span>
                 <span>Local Intranet</span>
            </div>
        </div>
    );
};
