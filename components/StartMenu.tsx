
import React, { useState } from 'react';
import { User, Globe, Mail, FileText, Music, Settings, Power, HelpCircle, Search, Play, Monitor, File, Gamepad2, Film, Zap, ChevronRight, HardDrive, Layout, Calculator, Terminal, BookOpen, MessageCircle, Mic, Type, Users, ShieldCheck, Video, Image as ImageIcon, Heart, Trash2, Info } from 'lucide-react';
import { LogoIcon } from './Icons';

interface StartMenuProps {
  onOpenApp: (appName: string) => void;
  onShutdown: () => void;
  onRun: () => void;
  onClose: () => void;
}

export const StartMenu = ({ onOpenApp, onShutdown, onRun, onClose }: StartMenuProps) => {
  const [showGames, setShowGames] = useState(false);

  const programs = [
    { id: 'ie', label: 'Internet Explorer', icon: <div className="w-6 h-6 bg-white text-blue-800 flex items-center justify-center text-[10px] font-serif font-bold rounded-sm border border-blue-800 shadow-sm">e</div>, sub: 'Browse the web' },
    { id: 'outlook', label: 'Outlook Express', icon: <Mail size={22} className="text-blue-500 drop-shadow-sm" />, sub: 'E-mail and news' },
    { id: 'limewire', label: 'LimeWire PRO', icon: <div className="scale-75"><LogoIcon /></div>, sub: 'Share files' },
    { id: 'winamp', label: 'Winamp', icon: <Zap size={22} className="text-yellow-500 drop-shadow-sm" fill="currentColor"/>, sub: 'Media Player' },
    { id: 'moviemaker', label: 'Movie Maker', icon: <Video size={22} className="text-blue-600 drop-shadow-sm" />, sub: 'Edit home movies' },
    { id: 'hypercam', label: 'HyperCam 2', icon: <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white"><Video size={16}/></div>, sub: 'Record screen' },
    { id: 'aim', label: 'AIM', icon: <MessageCircle size={22} className="text-yellow-600 drop-shadow-sm" />, sub: 'Instant Messaging' },
  ];

  const games = [
    { id: 'pinball', label: '3D Pinball', icon: <Gamepad2 size={16} /> },
    { id: 'minesweeper', label: 'Minesweeper', icon: <Layout size={16} /> },
    { id: 'solitaire', label: 'Solitaire', icon: <File size={16} /> },
    { id: 'spider', label: 'Spider Solitaire', icon: <File size={16} className="text-red-600" /> },
    { id: 'hearts', label: 'Hearts', icon: <Heart size={16} className="text-red-500" /> },
    { id: 'freddy', label: 'Freddi Fish', icon: <div className="text-sm">🐠</div> },
    { id: 'tictactoe', label: 'Tic Tac Toe', icon: <Users size={16} /> },
    { id: 'snake', label: 'Snake', icon: <div className="text-sm">🐍</div> },
  ];

  return (
    <div className="start-menu-container w-[320px] md:w-[380px] bg-white border-2 border-[#0055EA] rounded-t-lg shadow-2xl flex flex-col overflow-visible select-none animate-slide-up font-sans z-[201]">
      <div className="h-16 bg-gradient-to-r from-[#1856D1] via-[#3C81F0] to-[#1856D1] flex items-center px-4 space-x-3 border-b border-white/20">
        <div className="w-12 h-12 bg-white rounded border-2 border-white shadow-lg overflow-hidden flex items-center justify-center p-0.5">
          <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-500 flex items-center justify-center">
            <User size={32} className="text-white drop-shadow-md" />
          </div>
        </div>
        <span className="text-white font-bold text-lg drop-shadow-md tracking-tight">Administrator</span>
      </div>

      <div className="flex flex-1 bg-white">
        <div className="flex-1 p-2 space-y-0.5 bg-white">
          {programs.map((prog) => (
            <div key={prog.id} onClick={() => { onOpenApp(prog.id); onClose(); }} className="flex items-center space-x-3 p-1.5 hover:bg-[#316AC5] group cursor-pointer transition-colors rounded-sm">
              <div className="w-7 h-7 flex items-center justify-center group-hover:brightness-110">{prog.icon}</div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-black font-bold text-[11px] group-hover:text-white truncate">{prog.label}</span>
                <span className="text-gray-600 text-[9px] group-hover:text-blue-100 truncate">{prog.sub}</span>
              </div>
            </div>
          ))}
          <div className="h-[1px] bg-gray-200 mx-2 my-1"></div>
          <div onClick={() => { onOpenApp('sysinfo'); onClose(); }} className="flex items-center space-x-3 p-1.5 hover:bg-[#316AC5] group cursor-pointer transition-colors rounded-sm">
             <div className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm border border-gray-200"><Info size={18} className="text-blue-600" /></div>
             <span className="text-black font-bold text-[11px] group-hover:text-white">System Information</span>
          </div>
          <div onClick={() => { onOpenApp('diskcleanup'); onClose(); }} className="flex items-center space-x-3 p-1.5 hover:bg-[#316AC5] group cursor-pointer transition-colors rounded-sm">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm border border-gray-200 transition-all"><Trash2 size={18} className="text-blue-600" /></div>
            <span className="text-black font-bold text-[11px] group-hover:text-white">Disk Cleanup</span>
          </div>
          <div onClick={() => { onOpenApp('wu'); onClose(); }} className="flex items-center space-x-3 p-1.5 hover:bg-[#316AC5] group cursor-pointer transition-colors rounded-sm">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm border border-gray-200 transition-all"><ShieldCheck size={18} className="text-blue-600" /></div>
            <span className="text-black font-bold text-[11px] group-hover:text-white">Windows Update</span>
          </div>
          <div className="relative" onMouseEnter={() => setShowGames(true)} onMouseLeave={() => setShowGames(false)} onClick={() => setShowGames(!showGames)}>
            <div className={`flex items-center justify-between p-1.5 cursor-pointer rounded-sm ${showGames ? 'bg-[#316AC5] text-white' : 'hover:bg-[#316AC5] hover:text-white group'}`}>
              <div className="flex items-center space-x-3"><div className="w-7 h-7 bg-green-600 rounded flex items-center justify-center shadow-sm"><Gamepad2 size={18} className="text-white" /></div><span className="font-bold text-[11px]">All Games</span></div>
              <ChevronRight size={14} />
            </div>
            {showGames && (
              <div className="absolute left-full top-0 w-44 bg-[#ECE9D8] border border-gray-500 shadow-2xl p-1 z-[300]">
                {games.map(game => (
                  <div key={game.id} onClick={(e) => { e.stopPropagation(); onOpenApp(game.id); onClose(); }} className="flex items-center space-x-2 px-3 py-1.5 hover:bg-[#316AC5] group transition-colors cursor-pointer"><div className="w-4 h-4 text-gray-700 group-hover:text-white flex items-center justify-center">{game.icon}</div><span className="text-[11px] font-bold text-black group-hover:text-white">{game.label}</span></div>
                ))}
              </div>
            )}
          </div>
          <div className="h-[1px] bg-gray-200 mx-2 my-1"></div>
          <div className="flex items-center justify-center p-1.5 font-bold text-[11px] text-black hover:bg-[#316AC5] hover:text-white cursor-pointer group rounded-sm"><span>All Programs</span><ChevronRight size={14} className="ml-2 text-blue-600 group-hover:text-white" /></div>
        </div>

        <div className="w-36 md:w-40 bg-[#D3E5FA] border-l border-white/40 p-2 space-y-1">
          <SidebarItem label="My Documents" icon={<FileText size={16} className="text-yellow-600" />} onClick={() => { onOpenApp('explorer'); onClose(); }} />
          <SidebarItem label="My Pictures" icon={<ImageIcon size={16} className="text-blue-500" />} onClick={() => { onOpenApp('explorer'); onClose(); }} />
          <SidebarItem label="My Music" icon={<Music size={16} className="text-red-500" />} onClick={() => { onOpenApp('explorer'); onClose(); }} />
          <SidebarItem label="My Computer" icon={<Monitor size={16} className="text-blue-800" />} onClick={() => { onOpenApp('explorer'); onClose(); }} />
          <div className="h-[1px] bg-blue-300 mx-1 my-2 opacity-50"></div>
          <SidebarItem label="Control Panel" icon={<Settings size={16} className="text-gray-600" />} onClick={() => { onOpenApp('control'); onClose(); }} />
          <SidebarItem label="Search Companion" icon={<Search size={16} className="text-gray-700" />} onClick={() => { onOpenApp('rover'); onClose(); }} />
          <SidebarItem label="Run..." icon={<Play size={16} className="text-green-700" />} onClick={() => { onRun(); onClose(); }} />
        </div>
      </div>

      <div className="h-12 bg-gradient-to-r from-[#1856D1] to-[#3C81F0] flex items-center justify-end px-4 space-x-4 border-t border-white/20">
        <button onClick={onShutdown} className="flex items-center text-white space-x-2 group hover:brightness-110"><div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center border border-white shadow shadow-black/40"><Power size={14} /></div><span className="text-[11px] font-bold group-hover:underline drop-shadow-sm">Log Off</span></button>
        <button onClick={onShutdown} className="flex items-center text-white space-x-2 group hover:brightness-110"><div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center border border-white shadow shadow-black/40"><Power size={14} /></div><span className="text-[11px] font-bold group-hover:underline drop-shadow-sm">Turn Off Computer</span></button>
      </div>
    </div>
  );
};

const SidebarItem = ({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center space-x-2 p-1.5 hover:bg-[#316AC5] hover:text-white group cursor-pointer transition-colors rounded-sm">
    <div className="w-5 h-5 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:brightness-110">{icon}</div>
    <span className="text-[#00136B] group-hover:text-white font-bold text-[11px] truncate drop-shadow-none">{label}</span>
  </div>
);
