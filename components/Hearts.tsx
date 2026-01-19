
import React, { useState, useEffect } from 'react';
import { X, Minus, Square, User, RotateCcw } from 'lucide-react';

interface HeartsProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const Hearts = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: HeartsProps) => {
    const [gameState, setGameState] = useState<'intro' | 'passing' | 'playing' | 'end'>('intro');
    const [score, setScore] = useState({ North: 0, East: 0, West: 0, You: 0 });

    const players = ['North', 'East', 'West', 'You'];

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[600px] h-[450px] bg-[#008000] border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">The Microsoft Hearts Network</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center">-</button>
                     <button onClick={onClose} className="w-4 h-4 bg-[#E81123] border border-white/50 text-white flex items-center justify-center">x</button>
                </div>
            </div>

            <div className="bg-[#EBE9ED] flex space-x-3 px-1 text-black border-b border-gray-400">
                <span className="hover:bg-blue-800 hover:text-white px-1 cursor-default">Game</span>
                <span className="hover:bg-blue-800 hover:text-white px-1 cursor-default">Help</span>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center text-white font-bold p-8">
                {gameState === 'intro' && (
                    <div className="text-center space-y-6">
                        <h2 className="text-4xl italic tracking-tighter drop-shadow-lg uppercase font-black">Hearts</h2>
                        <div className="bg-black/20 p-4 border border-white/30 rounded-lg">
                            <p className="mb-4">Welcome to the Microsoft Hearts Network.</p>
                            <label className="block mb-2">What is your name?</label>
                            <input className="bg-white text-black px-2 py-1 border-2 border-gray-400 mb-4" defaultValue="Administrator" />
                            <div className="flex justify-center space-x-4">
                                <button onClick={() => setGameState('playing')} className="px-6 py-2 bg-white text-black border-2 border-gray-500 hover:bg-gray-100 shadow-lg active:scale-95 transition-all">OK</button>
                            </div>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full h-full grid grid-rows-3 grid-cols-3 relative">
                        {/* Table Layout */}
                        <div className="col-start-2 row-start-1 flex flex-col items-center">
                            <User className="text-white/50" size={32}/>
                            <span className="bg-black/30 px-2 rounded">North: {score.North}</span>
                        </div>
                        <div className="col-start-1 row-start-2 flex items-center space-x-2">
                             <div className="flex flex-col items-center">
                                <User className="text-white/50" size={32}/>
                                <span className="bg-black/30 px-2 rounded">West: {score.West}</span>
                             </div>
                        </div>
                        <div className="col-start-3 row-start-2 flex items-center justify-end space-x-2">
                             <div className="flex flex-col items-center">
                                <User className="text-white/50" size={32}/>
                                <span className="bg-black/30 px-2 rounded">East: {score.East}</span>
                             </div>
                        </div>
                        <div className="col-start-2 row-start-3 flex flex-col items-center justify-end pb-4">
                            <div className="flex space-x-[-10px] mb-4">
                                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                                    <div key={i} className="w-10 h-16 bg-white border border-gray-400 rounded-sm shadow hover:-translate-y-2 transition-transform cursor-pointer"></div>
                                ))}
                            </div>
                            <span className="bg-blue-600 px-4 py-0.5 rounded shadow-lg">You: {score.You}</span>
                        </div>

                        {/* Center Table */}
                        <div className="col-start-2 row-start-2 flex items-center justify-center">
                             <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center italic text-white/20">
                                Hearts
                             </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="h-6 bg-[#008000] border-t border-white/20 px-2 flex items-center justify-between text-white/50 text-[10px]">
                <span>The Microsoft Hearts Network</span>
                <div className="flex space-x-2">
                    <button onClick={() => setGameState('intro')} className="hover:text-white"><RotateCcw size={12}/></button>
                </div>
            </div>
        </div>
    );
};
