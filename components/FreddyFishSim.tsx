
import React, { useState } from 'react';
import { X, Minus, Briefcase, Sparkles, Waves } from 'lucide-react';

interface FreddyFishSimProps {
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

const FreddiArt = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-2xl">
    <ellipse cx="60" cy="40" rx="50" ry="30" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
    <path d="M10 40 L-20 20 L-20 60 Z" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
    <circle cx="85" cy="30" r="8" fill="white" stroke="black" />
    <circle cx="87" cy="30" r="3" fill="black" />
    <path d="M70 50 Q 85 60 100 50" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="60" cy="20" rx="15" ry="10" fill="#FFD700" stroke="#B8860B" strokeWidth="1" transform="rotate(-20, 60, 20)" />
  </svg>
);

const LutherArt = () => (
  <svg width="60" height="40" viewBox="0 0 60 40" className="drop-shadow-lg">
    <ellipse cx="30" cy="20" rx="25" ry="15" fill="#4169E1" stroke="#000080" strokeWidth="2" />
    <path d="M5 20 L-10 10 L-10 30 Z" fill="#4169E1" stroke="#000080" strokeWidth="2" />
    <circle cx="45" cy="15" r="5" fill="white" stroke="black" />
    <circle cx="46" cy="15" r="2" fill="black" />
  </svg>
);

export const FreddyFishSim = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: FreddyFishSimProps) => {
    const [scene, setScene] = useState('reef');
    const [dialogue, setDialogue] = useState('Freddi: "Golly! We need to find those missing kelp seeds before the festival!"');
    const [inventory, setInventory] = useState<string[]>([]);

    const scenes: any = {
      reef: { 
        bg: 'bg-gradient-to-b from-[#4fb9ff] to-[#1e3c72]', 
        items: [
          { name: 'Kelp Seeds', x: 20, y: 65, text: 'Luther: "Found them! These look important!"', type: 'collect' },
          { name: 'Sea Shell', x: 75, y: 75, text: 'Freddi: "What a pretty shell. Luther, help me pick it up!"', type: 'collect' },
          { name: 'Dark Cave', x: 55, y: 20, text: 'Freddi: "It looks awfully dark in there. Are you brave enough, Luther?"', next: 'cave' }
        ],
        decor: 'reef'
      },
      cave: { 
        bg: 'bg-gradient-to-b from-[#0f2027] to-[#203a43]', 
        items: [
          { name: 'Grandma\'s Key', x: 30, y: 40, text: 'Luther: "Wow! A shiny gold key! This must open something!"', type: 'collect' },
          { name: 'Exit Cave', x: 85, y: 15, text: 'Freddi: "Let\'s head back to the sunlight!"', next: 'reef' }
        ],
        decor: 'cave'
      }
    };

    const handleItemClick = (item: any) => {
      setDialogue(item.text);
      if (item.next) setScene(item.next);
      if (item.type === 'collect' && !inventory.includes(item.name)) {
          setInventory([...inventory, item.name]);
      }
    };

    return (
        <div style={{ left: position.x, top: position.y, zIndex }} className="absolute w-[640px] h-[480px] bg-black border-4 border-[#0055EA] shadow-2xl flex flex-col overflow-hidden rounded-lg win-shadow" onClick={onClick}>
            {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className="h-7 flex items-center justify-between px-2 select-none bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA] cursor-move text-white font-bold italic shadow-md">
                <div className="flex items-center space-x-2">
                    <Waves size={16} />
                    <span className="text-xs">Freddi Fish: The Missing Seeds (SIM)</span>
                </div>
                <div className="flex space-x-1">
                    <button onClick={onMinimize} className="w-5 h-5 bg-[#0055EA] border border-white/40 rounded flex items-center justify-center">-</button>
                    <button onClick={onClose} className="w-5 h-5 bg-[#E81123] border border-white/40 rounded flex items-center justify-center">x</button>
                </div>
            </div>
            
            <div className={`flex-1 relative ${scenes[scene].bg} cursor-pointer overflow-hidden`}>
                {/* Parallax Background Decor */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({length: 15}).map((_, i) => (
                        <div key={i} className="absolute bg-white/10 rounded-full animate-pulse" style={{
                            width: `${Math.random() * 20 + 5}px`,
                            height: `${Math.random() * 20 + 5}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`
                        }} />
                    ))}
                </div>

                {/* Interactive Items */}
                {scenes[scene].items.map((item: any, i: number) => (
                    <div key={i} onClick={() => handleItemClick(item)} className="absolute group flex flex-col items-center z-20" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity"></div>
                            <div className="bg-white/20 border-2 border-white/40 rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg backdrop-blur-sm">
                                <Sparkles className="text-yellow-200" size={32}/>
                            </div>
                        </div>
                        <span className="text-[10px] text-white font-black mt-2 drop-shadow-lg uppercase tracking-widest">{item.name}</span>
                    </div>
                ))}

                {/* Character Layers */}
                <div className="absolute bottom-16 left-12 z-30 transition-all duration-700 hover:translate-x-4">
                    <FreddiArt />
                </div>
                <div className="absolute bottom-20 left-48 z-40 animate-bounce" style={{ animationDuration: '3s' }}>
                    <LutherArt />
                </div>

                {/* Bottom UI - Dialogue */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="w-full bg-[#000044]/60 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-2xl flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-white flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-inner">FF</div>
                        <p className="text-white font-medium italic text-sm line-clamp-2">"{dialogue}"</p>
                    </div>
                </div>
            </div>

            {/* Inventory Rack */}
            <div className="h-20 bg-gradient-to-b from-[#D4D0C8] to-[#A0A0A0] border-t-2 border-white flex items-center px-6 space-x-6 shadow-inner flex-shrink-0">
                <div className="flex flex-col items-center opacity-70">
                    <Briefcase size={24} className="text-[#333]"/>
                    <span className="text-[9px] font-black uppercase text-[#333]">Pockets</span>
                </div>
                <div className="flex space-x-3 overflow-x-auto py-2">
                    {inventory.map((item, i) => (
                        <div key={i} className="w-12 h-12 bg-white/80 border-2 border-[#555] rounded-lg flex items-center justify-center text-[8px] font-black text-center p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-transform cursor-help">
                            {item}
                        </div>
                    ))}
                    {inventory.length === 0 && <span className="text-gray-600 text-xs italic font-medium">Click on items in the sea to collect them!</span>}
                </div>
            </div>
        </div>
    );
};
