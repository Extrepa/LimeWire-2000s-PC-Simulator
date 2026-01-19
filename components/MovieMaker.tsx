import React, { useState } from 'react';
import { X, Minus, Film, Play, SkipBack, SkipForward, Music, Image as ImageIcon, Video, Monitor, Plus, Save, Share2 } from 'lucide-react';

interface MovieMakerProps {
    onClose: () => void;
    position: { x: number, y: number };
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}

export const MovieMaker = ({ onClose, position, zIndex, active, onClick, onMouseDown, onTouchStart }: MovieMakerProps) => {
    const [clips, setClips] = useState(['Intro', 'LimeWire Clip 01', 'Final Render']);
    const [viewMode, setViewMode] = useState<'timeline' | 'storyboard'>('timeline');

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[95vw] md:w-[800px] h-[75vh] md:h-[550px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-8 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'} cursor-move`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <Film size={14} />
                     <span className="drop-shadow-sm truncate">Windows Movie Maker (Simulated Beta)</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={onClose} className="w-6 h-6 bg-[#E81123] rounded-[3px] flex items-center justify-center text-white border border-white/30" onMouseDown={e => e.stopPropagation()}><X size={14}/></button>
                </div>
            </div>

            {/* Menu Bar */}
            <div className="flex space-x-4 px-2 border-b border-gray-400 pb-1 mb-1 bg-[#ECE9D8] overflow-x-auto whitespace-nowrap">
                {['File', 'Edit', 'View', 'Tools', 'Clip', 'Play', 'Help'].map(m => (
                    <span key={m} className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default font-bold">{m}</span>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center space-x-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-400">
                <button className="flex items-center space-x-1 px-2 py-0.5 border border-transparent hover:border-gray-400 hover:bg-white rounded-sm">
                    <Save size={14} /> <span className="hidden sm:inline">Save Movie</span>
                </button>
                <button className="flex items-center space-x-1 px-2 py-0.5 border border-transparent hover:border-gray-400 hover:bg-white rounded-sm">
                    <Share2 size={14} /> <span className="hidden sm:inline">Finish Movie</span>
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden gap-1 p-1 bg-white">
                {/* Tasks Sidebar */}
                <div className="w-48 bg-[#D3E5FA]/30 border border-gray-300 flex flex-col p-3 space-y-4 shadow-inner hidden md:flex">
                    <h3 className="font-bold text-blue-900 border-b border-blue-200 uppercase text-[10px]">Movie Tasks</h3>
                    <div className="space-y-1">
                        <div className="font-bold text-blue-700">1. Capture Video</div>
                        <ul className="pl-4 space-y-1 text-blue-600">
                            <li className="hover:underline cursor-pointer">Capture from video device</li>
                            <li className="hover:underline cursor-pointer">Import video</li>
                            <li className="hover:underline cursor-pointer">Import pictures</li>
                        </ul>
                    </div>
                    <div className="space-y-1">
                        <div className="font-bold text-blue-700">2. Edit Movie</div>
                        <ul className="pl-4 space-y-1 text-blue-600">
                            <li className="hover:underline cursor-pointer font-bold">Show collections</li>
                            <li className="hover:underline cursor-pointer">View video effects</li>
                            <li className="hover:underline cursor-pointer">View video transitions</li>
                        </ul>
                    </div>
                    <div className="space-y-1">
                        <div className="font-bold text-blue-700">3. Finish Movie</div>
                        <ul className="pl-4 space-y-1 text-blue-600">
                            <li className="hover:underline cursor-pointer">Save to my computer</li>
                            <li className="hover:underline cursor-pointer">Save to CD</li>
                        </ul>
                    </div>
                </div>

                {/* Collections Area */}
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex-1 bg-white border border-gray-400 p-3 grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto shadow-inner">
                        {clips.map((clip, i) => (
                            <div key={i} className="flex flex-col items-center group cursor-pointer">
                                <div className="w-full aspect-video bg-gray-100 border-2 border-gray-300 flex items-center justify-center group-hover:border-blue-500 transition-colors shadow-sm">
                                    <Video className="text-gray-400" size={24} />
                                </div>
                                <span className="mt-1 text-[10px] text-center font-bold truncate w-full px-1">{clip}</span>
                            </div>
                        ))}
                        <div className="flex flex-col items-center opacity-40 border-2 border-dashed border-gray-300 aspect-video justify-center hover:opacity-100 transition-opacity cursor-pointer">
                            <Plus size={24}/>
                            <span className="text-[8px] font-black uppercase">Add Clip</span>
                        </div>
                    </div>

                    {/* Preview Monitor */}
                    <div className="h-40 sm:h-56 bg-black border border-gray-500 flex flex-col shadow-2xl">
                        <div className="flex-1 flex items-center justify-center relative overflow-hidden group">
                             <div className="text-white/10 text-xl italic font-black select-none uppercase tracking-widest">WMM Preview</div>
                             <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center">
                                 <Monitor size={64} className="text-white/5 opacity-50" />
                                 <div className="absolute top-2 left-2 text-[8px] text-white/40 font-mono">720x480 | 29.97fps</div>
                             </div>
                        </div>
                        <div className="h-10 bg-[#ECE9D8] border-t border-gray-400 flex items-center px-4 justify-between shadow-[inset_0_1px_0_white]">
                            <div className="flex items-center space-x-3">
                                <SkipBack size={16} className="text-gray-600 cursor-pointer hover:text-black"/>
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-500 active:scale-95 transition-all">
                                    <Play size={16} className="text-white fill-white ml-0.5"/>
                                </div>
                                <SkipForward size={16} className="text-gray-600 cursor-pointer hover:text-black"/>
                            </div>
                            <div className="font-mono text-[10px] text-blue-900 font-bold bg-white/50 px-2 py-0.5 rounded border border-gray-300 shadow-inner">0:00:12 / 0:02:45</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="h-24 sm:h-32 mt-1 bg-[#D4D0C8] border border-gray-500 flex flex-col p-1 shadow-lg overflow-hidden">
                <div className="flex items-center space-x-4 border-b border-gray-400 mb-1 px-2 py-0.5 text-[10px] font-bold">
                    <button 
                        onClick={() => setViewMode(viewMode === 'timeline' ? 'storyboard' : 'timeline')}
                        className="bg-white border border-gray-500 px-3 py-0.5 shadow-sm active:shadow-inner hover:bg-gray-50"
                    >
                        {viewMode === 'timeline' ? 'Storyboard' : 'Timeline'}
                    </button>
                    <div className="hidden sm:flex items-center space-x-2 text-gray-600 border-l border-gray-400 pl-4">
                        <Music size={12}/> <span>Audio: 44.1kHz</span>
                    </div>
                </div>
                
                {viewMode === 'timeline' ? (
                    <div className="flex-1 flex gap-1 overflow-hidden">
                        <div className="w-20 bg-[#D4D0C8] border-r border-gray-400 flex flex-col text-[8px] font-black uppercase p-1 space-y-0.5">
                            <div className="h-8 border-b border-gray-400 flex items-center">Video</div>
                            <div className="h-6 border-b border-gray-400 flex items-center">Audio</div>
                        </div>
                        <div className="flex-1 bg-white overflow-x-auto p-1 flex flex-col space-y-1 relative shadow-inner scrollbar-retro">
                            <div className="h-8 flex space-x-1">
                                <div className="h-full w-40 bg-gradient-to-r from-blue-400 to-blue-600 border border-blue-800 rounded-sm flex items-center px-2 text-[9px] text-white font-bold shadow-sm">Intro.wmv</div>
                                <div className="h-full w-64 bg-gradient-to-r from-green-400 to-green-600 border border-green-800 rounded-sm flex items-center px-2 text-[9px] text-white font-bold shadow-sm">LimeWire_RIP.mpg</div>
                            </div>
                            <div className="absolute top-0 left-1/4 w-0.5 h-full bg-red-600 z-10 shadow-[0_0_8px_red]"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-white p-2 flex space-x-4 overflow-x-auto shadow-inner scrollbar-retro">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center space-x-2">
                                <div className="w-24 h-16 bg-gray-200 border-2 border-gray-400 rounded-sm flex items-center justify-center text-[10px] font-bold text-gray-500">
                                    CLIP {i}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="h-6 bg-[#ECE9D8] border-t border-gray-400 flex items-center px-2 text-[10px] text-gray-500 font-bold">
                <span>Ready. Total: 00:02:45</span>
            </div>
        </div>
    );
};