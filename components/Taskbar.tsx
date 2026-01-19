
import React, { useState, useEffect } from 'react';
import { LogoIcon } from './Icons';
import { Volume2, Wifi, FileText } from 'lucide-react';

interface TaskbarProps {
  onToggleStart: () => void;
  startMenuOpen: boolean;
  windows: Array<{
      id: string;
      title: string;
      icon: 'limewire' | 'notepad';
      isOpen: boolean;
      isMinimized: boolean;
      isActive: boolean;
  }>;
  onWindowClick: (id: string) => void;
  onVolumeClick: (e: React.MouseEvent) => void;
  onClockClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  themeConfig?: { taskbar: string, border: string, accent: string };
}

export const Taskbar: React.FC<TaskbarProps> = ({ onToggleStart, startMenuOpen, windows, onWindowClick, onVolumeClick, onClockClick, onContextMenu, themeConfig }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const currentTheme = themeConfig || { taskbar: 'from-[#245DDA] via-[#245DDA] to-[#1F52C5]', border: '#3E80EE' };

  return (
    <div 
        className={`taskbar-container absolute bottom-0 w-full h-8 bg-gradient-to-b ${currentTheme.taskbar} border-t border-white/20 flex items-center justify-between z-[300] select-none shadow-[0_-2px_5px_rgba(0,0,0,0.3)]`}
        onContextMenu={onContextMenu}
    >
      
      {/* Start Button */}
      <div 
        className="start-button-trigger h-full flex items-center pl-0.5 flex-shrink-0" 
        onClick={(e) => {
            e.stopPropagation();
            onToggleStart();
        }}
      >
        <div className={`
            h-[90%] px-3 flex items-center space-x-1.5 
            bg-gradient-to-b from-[#3E843E] via-[#3B9C3B] to-[#2D732D]
            rounded-r-[10px] rounded-tl-[10px] rounded-bl-[4px]
            shadow-[inset_1px_1px_0px_rgba(255,255,255,0.4),1px_1px_2px_rgba(0,0,0,0.5)]
            hover:brightness-110 cursor-pointer active:translate-y-[1px]
            ${startMenuOpen ? 'brightness-75 translate-y-[1px] shadow-inner' : ''}
        `}>
          <div className="italic font-black text-white text-shadow-md text-[14px] flex items-center tracking-tighter">
             <span className="w-4 h-4 bg-white rounded-full mr-1 flex items-center justify-center relative overflow-hidden border border-red-500 shadow-sm">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#E81123]"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#00A93F]"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#0055EA]"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#FFBA08]"></div>
             </span>
             start
          </div>
        </div>
        <div className="mx-2 w-[1px] h-[80%] bg-black/20 border-r border-white/20"></div>
      </div>

      {/* Task List - Responsive logic */}
      <div className="flex-1 flex items-center justify-start px-1 space-x-1 overflow-x-auto h-full scrollbar-none scroll-smooth">
        {windows.filter(w => w.isOpen).map(win => (
            <div 
                key={win.id}
                onClick={(e) => {
                    e.stopPropagation();
                    onWindowClick(win.id);
                }}
                className={`
                    min-w-[40px] md:w-40 h-[26px] flex items-center px-2 space-x-2 rounded-[3px] cursor-pointer transition-all flex-shrink-0 md:flex-shrink
                    ${win.isActive && !win.isMinimized
                        ? 'bg-[#1E52C2] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)] border border-[#163C8E]' 
                        : 'bg-[#3C81F0] hover:bg-[#5293FA] shadow-[1px_1px_0px_rgba(255,255,255,0.2)] border-b border-black/20'
                    }
                `}
            >
                <div className="transform scale-75 -ml-1 flex-shrink-0">
                    {win.id === 'limewire' ? <LogoIcon /> : <FileText size={20} className="text-white"/>}
                </div>
                <span className="text-white text-xs truncate drop-shadow-sm font-bold hidden md:block">{win.title}</span>
            </div>
        ))}
      </div>

      {/* System Tray */}
      <div className="h-full bg-[#0F9BED] border-l border-[#133F8F] px-3 flex items-center space-x-2 shadow-[inset_2px_2px_2px_rgba(0,0,0,0.2)] flex-shrink-0">
         <div className="hidden sm:flex items-center space-x-2 mr-2">
            <div className="w-4 h-4 scale-50"><LogoIcon /></div>
            <Wifi size={14} className="text-white drop-shadow-sm opacity-80 cursor-pointer" />
            <div onClick={onVolumeClick} className="cursor-pointer hover:bg-white/20 p-0.5 rounded">
                <Volume2 size={14} className="text-white drop-shadow-sm opacity-80" />
            </div>
         </div>
         <div 
            onClick={(e) => { e.stopPropagation(); onClockClick(); }}
            className="text-white text-xs font-bold drop-shadow-sm ml-1 select-none cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded"
            title={time.toLocaleDateString()}
         >
            {formatTime(time)}
         </div>
      </div>
    </div>
  );
};
