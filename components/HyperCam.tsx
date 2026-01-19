
import React, { useState } from 'react';
import { X, Minus, Video, Circle } from 'lucide-react';

interface HyperCamProps {
    onClose: () => void;
    position: { x: number, y: number };
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onToggleRecording: (isRec: boolean) => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}

export const HyperCam = ({ onClose, position, zIndex, active, onClick, onToggleRecording, onMouseDown, onTouchStart }: HyperCamProps) => {
    const [isRecording, setIsRecording] = useState(false);

    const toggle = () => {
        const newState = !isRecording;
        setIsRecording(newState);
        onToggleRecording(newState);
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[220px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-[10px] win-shadow select-none p-1"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-5 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-[#000080]' : 'bg-[#7899CC]'} cursor-move`}
            >
                <div className="flex items-center text-white space-x-1 pl-1 font-bold">
                     <Video size={10} />
                     <span className="drop-shadow-sm">HyperCam 2</span>
                </div>
                <button onClick={onClose} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center font-bold" onMouseDown={e => e.stopPropagation()}>x</button>
            </div>

            <div className="flex-1 bg-[#D4D0C8] p-2 space-y-2">
                <div className="flex justify-between items-center bg-white border border-gray-500 p-1 font-mono">
                    <span className={isRecording ? "text-red-600 animate-pulse font-bold" : "text-gray-400"}>
                        {isRecording ? "● REC" : "READY"}
                    </span>
                    <span className="text-[9px]">00:00:14</span>
                </div>

                <div className="grid grid-cols-2 gap-1">
                    <button 
                        onClick={toggle}
                        className="px-2 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:shadow-inner flex items-center justify-center space-x-1"
                    >
                        <Circle size={8} fill={isRecording ? "red" : "gray"} className={isRecording ? "text-red-600" : "text-gray-600"}/>
                        <span className="font-bold">{isRecording ? "Stop" : "Record"}</span>
                    </button>
                    <button className="px-2 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm opacity-50 cursor-not-allowed">Play</button>
                </div>

                <div className="border-t border-gray-400 pt-2 space-y-1">
                    <div className="flex justify-between"><span>Area:</span><span className="font-bold">Full Screen</span></div>
                    <div className="flex justify-between"><span>FPS:</span><span className="font-bold">10.0</span></div>
                </div>
            </div>

            <div className="mt-1 text-center text-[8px] text-gray-500 italic">
                www.hyperionics.com
            </div>
        </div>
    );
};

export const HyperCamWatermark = () => (
    <div className="fixed top-2 left-2 z-[10000] pointer-events-none select-none animate-in fade-in duration-500">
        <div className="bg-black/40 text-white px-2 py-0.5 font-mono text-sm border border-white/20 rounded shadow-lg flex items-baseline space-x-1 backdrop-blur-[2px]">
            <span className="font-black italic text-gray-300 drop-shadow-md">Unregistered HyperCam 2</span>
        </div>
    </div>
);
