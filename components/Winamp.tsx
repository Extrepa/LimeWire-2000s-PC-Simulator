
import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Play, Pause, Square as Stop, SkipBack, SkipForward, Zap, Menu } from 'lucide-react';
import { LibraryItem } from '../types';

interface WinampProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
    currentTrack: LibraryItem | null;
}

export const Winamp = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick, currentTrack }: WinampProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        let anim: number;
        const draw = () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, 74, 30);
            if (isPlaying) {
                for (let i = 0; i < 20; i++) {
                    const h = Math.random() * 25;
                    ctx.fillStyle = h > 20 ? '#FF0000' : h > 15 ? '#FFFF00' : '#00FF00';
                    ctx.fillRect(i * 4, 30 - h, 3, h);
                }
            }
            anim = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(anim);
    }, [isPlaying]);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[275px] h-[116px] bg-[#191919] select-none shadow-2xl flex flex-col font-sans win-shadow border border-[#333]"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-[14px] bg-[#2d2d2d] flex items-center justify-between px-1 border-b border-[#4a4a4a] cursor-move ${active ? 'bg-[#3d3d3d]' : ''}`}
            >
                <div className="flex items-center space-x-1">
                     <Zap size={10} className="text-[#dcdcdc]" fill="#dcdcdc" />
                     <span className="text-[9px] text-[#dcdcdc] font-bold tracking-tighter uppercase">Winamp 2.91</span>
                </div>
                <div className="flex space-x-[2px]" onMouseDown={e => e.stopPropagation()}>
                     <div onClick={onMinimize} className="w-[10px] h-[10px] bg-[#2d2d2d] border border-[#4a4a4a] flex items-center justify-center cursor-pointer hover:bg-[#555]">-</div>
                     <div onClick={onClose} className="w-[10px] h-[10px] bg-[#2d2d2d] border border-[#4a4a4a] flex items-center justify-center cursor-pointer hover:bg-red-800">x</div>
                </div>
            </div>

            <div className="flex h-[40px] px-2 py-2 bg-[#191919]">
                 <div className="bg-black w-[76px] h-full border border-[#4a4a4a] relative shadow-inner">
                     <canvas ref={canvasRef} width={74} height={30} className="w-full h-full" />
                 </div>
                 <div className="flex-1 bg-black ml-1 border border-[#4a4a4a] p-1 relative overflow-hidden shadow-inner">
                     <div className="text-[#00ff00] font-mono text-[10px] whitespace-nowrap animate-marquee">
                        {currentTrack ? `1. ${currentTrack.artist} - ${currentTrack.filename}` : "WINAMP: IT REALLY WHIPS THE LLAMA'S ASS!"}
                     </div>
                     <div className="flex justify-between items-end mt-1 text-[9px] font-mono text-[#00ff00]/60">
                         <span>128kbps</span>
                         <span>44kHz</span>
                         <span className="text-[#00ff00] font-bold">STEREO</span>
                     </div>
                 </div>
            </div>

            <div className="px-2 h-[10px] flex items-center mb-1">
                 <div className="flex-1 relative h-[4px] bg-black border border-[#4a4a4a]">
                    <div className="h-full bg-red-600" style={{ width: '45%' }}></div>
                 </div>
            </div>

            <div className="flex-1 px-2 flex items-center justify-between pb-1 bg-[#191919]">
                <div className="flex items-center space-x-0.5">
                    <WinampBtn icon={<SkipBack size={8} fill="#ccc"/>} />
                    <WinampBtn icon={<Play size={10} fill="#ccc"/>} onClick={() => setIsPlaying(true)} active={isPlaying} />
                    <WinampBtn icon={<Pause size={10} fill="#ccc"/>} onClick={() => setIsPlaying(false)} />
                    <WinampBtn icon={<Stop size={8} fill="#ccc"/>} onClick={() => setIsPlaying(false)} />
                    <WinampBtn icon={<SkipForward size={8} fill="#ccc"/>} />
                </div>
                <div className="flex space-x-1">
                    <div className="text-[8px] bg-black border border-[#444] px-1 text-[#ccc]">EQ</div>
                    <div className="text-[8px] bg-black border border-[#444] px-1 text-[#ccc]">PL</div>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 10s linear infinite;
                }
            `}</style>
        </div>
    );
};

const WinampBtn = ({ icon, onClick, active }: any) => (
    <button 
        onClick={onClick}
        className={`w-5 h-5 flex items-center justify-center border border-black shadow-sm active:shadow-inner ${active ? 'bg-[#555]' : 'bg-gradient-to-b from-[#444] to-[#222]'}`}
    >
        {icon}
    </button>
);
