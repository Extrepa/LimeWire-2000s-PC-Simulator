
import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Play, Pause, Square as StopSquare } from 'lucide-react';

interface DiskDefragmenterProps {
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

type BlockType = 'fragmented' | 'contiguous' | 'free' | 'system' | 'unmovable';

export const DiskDefragmenter = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: DiskDefragmenterProps) => {
    const [blocks, setBlocks] = useState<BlockType[]>([]);
    const [isDefragging, setIsDefragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Ready');

    useEffect(() => {
        // Init fake disk map
        const initialBlocks: BlockType[] = [];
        for (let i = 0; i < 500; i++) {
            const r = Math.random();
            if (r < 0.05) initialBlocks.push('system');
            else if (r < 0.2) initialBlocks.push('free');
            else if (r < 0.5) initialBlocks.push('fragmented');
            else initialBlocks.push('contiguous');
        }
        setBlocks(initialBlocks);
    }, []);

    useEffect(() => {
        let interval: any;
        if (isDefragging) {
            interval = setInterval(() => {
                setBlocks(prev => {
                    const next = [...prev];
                    // Find a fragmented block
                    const fragIndex = next.findIndex(b => b === 'fragmented');
                    // Find a free block after it
                    const freeIndex = next.findIndex((b, i) => b === 'free' && i > fragIndex);

                    if (fragIndex !== -1 && freeIndex !== -1) {
                        // Swap / Defrag logic sim
                        next[freeIndex] = 'contiguous'; // Moved part becomes contiguous
                        next[fragIndex] = 'free'; // Old spot becomes free
                        
                        // Occasionally convert fragmented to contiguous in place just to clean up visually
                        if(Math.random() > 0.5) next[fragIndex] = 'contiguous';
                        
                        return next;
                    } else {
                        // Done or cant find pairs
                        if (progress < 100) {
                             setProgress(p => Math.min(p + 0.5, 100));
                        } else {
                             setIsDefragging(false);
                             setStatus('Defragmentation is complete for: (C:)');
                        }
                        return next;
                    }
                });
                if(progress < 100) setProgress(p => p + 0.1);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isDefragging, progress]);

    const handleDefrag = () => {
        setIsDefragging(true);
        setStatus('Defragmenting...');
    };

    const handleStop = () => {
        setIsDefragging(false);
        setStatus('Stopped');
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[600px] h-[450px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <div className="w-4 h-3 border border-white bg-gray-400 grid grid-cols-2">
                         <div className="bg-red-500"></div><div className="bg-blue-500"></div>
                         <div className="bg-white"></div><div className="bg-green-500"></div>
                     </div>
                     <span className="font-bold drop-shadow-sm">Disk Defragmenter</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="flex space-x-2 px-1 text-black border-b border-gray-400 pb-1 mb-2">
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Action</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">View</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
            </div>

            {/* Content */}
            <div className="flex-1 px-2 pb-2 flex flex-col space-y-2">
                
                {/* Volume List */}
                <div className="bg-white border border-gray-500 h-24 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="pl-1 font-normal text-gray-600">Volume</th>
                                <th className="pl-1 font-normal text-gray-600">Session Status</th>
                                <th className="pl-1 font-normal text-gray-600">File System</th>
                                <th className="pl-1 font-normal text-gray-600">Capacity</th>
                                <th className="pl-1 font-normal text-gray-600">Free Space</th>
                                <th className="pl-1 font-normal text-gray-600">% Free Space</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-[#316AC5] text-white">
                                <td className="pl-1">(C:)</td>
                                <td className="pl-1">{isDefragging ? 'Defragmenting...' : 'Analyzed'}</td>
                                <td className="pl-1">NTFS</td>
                                <td className="pl-1">80.00 GB</td>
                                <td className="pl-1">45.12 GB</td>
                                <td className="pl-1">56 %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Analysis Display */}
                <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                        <span>Estimated disk usage before defragmentation:</span>
                    </div>
                    <div className="h-16 bg-black border border-gray-600 flex flex-wrap content-start p-[1px]">
                        {blocks.slice(0, 250).map((b, i) => (
                            <div key={i} className={`flex-1 h-full ${
                                b === 'fragmented' ? 'bg-red-600 border-l border-red-400' :
                                b === 'contiguous' ? 'bg-blue-600 border-l border-blue-400' :
                                b === 'system' ? 'bg-green-600 border-l border-green-400' :
                                'bg-white'
                            }`} style={{minWidth: '2px'}}></div>
                        ))}
                    </div>
                </div>

                {/* Defrag Display */}
                <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                        <span>Estimated disk usage after defragmentation:</span>
                    </div>
                    <div className="h-16 bg-black border border-gray-600 flex flex-wrap content-start p-[1px]">
                         {blocks.map((b, i) => (
                            <div key={i} className={`flex-1 h-full transition-colors duration-200 ${
                                b === 'fragmented' ? 'bg-red-600 border-l border-red-400' :
                                b === 'contiguous' ? 'bg-blue-600 border-l border-blue-400' :
                                b === 'system' ? 'bg-green-600 border-l border-green-400' :
                                'bg-white'
                            }`} style={{minWidth: '1.2px'}}></div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center border-t border-gray-400 pt-2">
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm disabled:text-gray-400">Analyze</button>
                        <button onClick={handleDefrag} disabled={isDefragging} className="px-3 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 disabled:text-gray-400">Defragment</button>
                        <button className="px-3 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 disabled:text-gray-400">Pause</button>
                        <button onClick={handleStop} disabled={!isDefragging} className="px-3 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 disabled:text-gray-400">Stop</button>
                        <button className="px-3 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 disabled:text-gray-400">View Report</button>
                    </div>
                    <div>{status} {isDefragging && `${Math.floor(progress)}%`}</div>
                </div>

                {/* Legend */}
                <div className="bg-white border border-gray-400 p-1 flex space-x-4 text-[10px]">
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-red-600"></div><span>Fragmented files</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-blue-600"></div><span>Contiguous files</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-green-600"></div><span>Unmovable files</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-white border border-gray-300"></div><span>Free space</span></div>
                </div>
            </div>
        </div>
    );
};
