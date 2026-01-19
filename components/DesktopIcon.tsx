
import React, { useRef } from 'react';
import { XpComputerIcon, XpTrashIcon, LogoIcon } from './Icons';
import { Zap, Brush, Gamepad2, Film } from 'lucide-react';

interface DesktopIconProps {
  label: string;
  icon: 'computer' | 'trash' | 'limewire' | 'drive' | 'paint' | 'winamp' | 'wmp' | 'pinball' | 'freddy';
  onDoubleClick?: () => void;
  selected?: boolean;
  onClick?: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onDoubleClick, selected, onClick }) => {
  const timerRef = useRef<number | null>(null);

  const renderIcon = () => {
    switch (icon) {
      case 'computer': return <XpComputerIcon />;
      case 'trash': return <XpTrashIcon />;
      case 'limewire': return <LogoIcon />;
      case 'winamp': return <div className="p-1 bg-gray-800 rounded shadow-lg"><Zap size={24} className="text-yellow-400" fill="currentColor" /></div>;
      case 'wmp': return <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-md"><div className="w-3 h-3 bg-white rounded-sm"></div></div>;
      case 'paint': return <Brush size={32} className="text-[#FF0080] drop-shadow-md" strokeWidth={1.5} />;
      case 'pinball': return <Gamepad2 size={32} className="text-green-500 drop-shadow-md" />;
      case 'freddy': return <div className="text-2xl drop-shadow-md">🐠</div>;
      default: return <XpComputerIcon />;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    timerRef.current = window.setTimeout(() => {
        // Trigger generic context menu event manually for simulation
        const event = new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY
        });
        e.target.dispatchEvent(event);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }
  };

  return (
    <div 
      className={`
        w-24 flex flex-col items-center justify-center p-2 cursor-pointer
        group hover:bg-white/15 rounded border border-transparent
        ${selected ? 'bg-blue-800/30 border-blue-400/30 shadow-inner' : ''}
      `}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick && onDoubleClick(); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEnd}
    >
      <div className="mb-2 transition-transform group-active:scale-90">{renderIcon()}</div>
      <span className={`
        text-white text-[11px] text-center leading-tight drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]
        ${selected ? 'bg-[#0055EA] px-1.5 py-0.5 rounded shadow-md' : ''}
      `}>
        {label}
      </span>
    </div>
  );
};
