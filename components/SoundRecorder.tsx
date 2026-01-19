import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Mic, StopCircle, Play, FastForward, Rewind } from 'lucide-react';

interface SoundRecorderProps {
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

export const SoundRecorder = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: SoundRecorderProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [positionVal, setPositionVal] = useState(0);
    const [length, setLength] = useState(60);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let interval: any;
        if (isRecording || isPlaying) {
            interval = setInterval(() => {
                setPositionVal(p => {
                    if (p >= length) {
                        setIsRecording(false);
                        setIsPlaying(false);
                        return length;
                    }
                    return p + 0.1;
                });
                drawVisualizer();
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isRecording, isPlaying, length]);

    const drawVisualizer = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);

        for (let x = 0; x < w; x++) {
            // Fake wave
            const amp = (isRecording || isPlaying) ? Math.random() * (h / 2) : 1;
            const y = h / 2 + Math.sin(x * 0.1 + Date.now() * 0.05) * amp;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    };

    // Initial draw
    useEffect(() => { drawVisualizer(); }, []);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[300px] h-[180px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <div className="w-4 h-4 text-yellow-300"><Mic size={14} fill="gold"/></div>
                     <span className="font-bold drop-shadow-sm">Sound - Sound Recorder</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="flex space-x-2 px-1 text-black border-b border-gray-400 pb-1 mb-2">
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Edit</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Effects</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
            </div>

            {/* Visualizer */}
            <div className="px-2 mb-2">
                <canvas ref={canvasRef} width={270} height={40} className="border-2 border-gray-500 border-b-white border-r-white rounded-sm bg-black" />
            </div>

            {/* Position Slider */}
            <div className="px-2 mb-2">
                <div className="flex justify-between text-[10px] text-gray-600 mb-0.5">
                    <span>Position: {positionVal.toFixed(2)} sec.</span>
                    <span>Length: {length.toFixed(2)} sec.</span>
                </div>
                <div className="relative h-6 bg-gray-300 border border-gray-500 shadow-inner">
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-blue-500" style={{left: `${(positionVal / length) * 100}%`}}></div>
                    <div className="h-full w-full flex items-center justify-between px-1">
                        {Array.from({length: 10}).map((_, i) => <div key={i} className="h-2 w-[1px] bg-gray-500"></div>)}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-1 px-2">
                <button onClick={() => setPositionVal(0)} className="w-8 h-6 bg-[#ECE9D8] border border-gray-500 rounded shadow-sm flex items-center justify-center active:bg-gray-200">
                    <Rewind size={14} className="text-black" />
                </button>
                <button onClick={() => setPositionVal(length)} className="w-8 h-6 bg-[#ECE9D8] border border-gray-500 rounded shadow-sm flex items-center justify-center active:bg-gray-200">
                    <FastForward size={14} className="text-black" />
                </button>
                <button onClick={() => { setIsPlaying(true); setIsRecording(false); }} className="w-8 h-6 bg-[#ECE9D8] border border-gray-500 rounded shadow-sm flex items-center justify-center active:bg-gray-200">
                    <Play size={14} className="text-black" />
                </button>
                <button onClick={() => { setIsPlaying(false); setIsRecording(false); }} className="w-8 h-6 bg-[#ECE9D8] border border-gray-500 rounded shadow-sm flex items-center justify-center active:bg-gray-200">
                    <StopCircle size={14} className="text-black" />
                </button>
                <button onClick={() => { setIsRecording(true); setIsPlaying(false); }} className="w-8 h-6 bg-[#ECE9D8] border border-gray-500 rounded shadow-sm flex items-center justify-center active:bg-gray-200">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                </button>
            </div>
        </div>
    );
};