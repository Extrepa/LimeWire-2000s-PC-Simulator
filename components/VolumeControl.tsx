import React, { useState } from 'react';

interface VolumeControlProps {
    onClose: () => void;
    position: { x: number, y: number };
}

export const VolumeControl = ({ onClose, position }: VolumeControlProps) => {
    const [volume, setVolume] = useState(80);

    return (
        <div 
            style={{ left: position.x - 50, top: position.y - 120 }}
            className="fixed w-[60px] h-[120px] bg-[#ECE9D8] border border-gray-400 shadow-xl flex flex-col items-center justify-between py-2 z-[9999] win-shadow"
        >
             <span className="text-[10px] text-gray-700">Volume</span>
             <div className="flex-1 relative w-8 flex justify-center py-2">
                 <div className="h-full w-1 bg-gray-400 rounded-full"></div>
                 <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="absolute h-full w-full opacity-0 cursor-pointer -rotate-180"
                    style={{writingMode: 'vertical-lr', direction: 'rtl'}} 
                    orient="vertical"
                 />
                 <div 
                    className="absolute w-4 h-2 bg-[#D4D0C8] border-t border-l border-white border-b border-r border-gray-600 shadow-sm pointer-events-none"
                    style={{ bottom: `${volume}%` }}
                 ></div>
             </div>
             <div className="flex items-center space-x-1 mt-1">
                 <input type="checkbox" className="w-3 h-3"/>
                 <span className="text-[9px]">Mute</span>
             </div>
             {/* Click outside backdrop to close */}
             <div className="fixed inset-0 -z-10" onClick={onClose}></div>
        </div>
    );
};
