import React from 'react';
import { Globe, Monitor, Library, Play, Pause, X, Minus, Square, Search, RefreshCw, Music, Film, File, ShieldAlert, ShieldCheck, FileText, User, Mail, Settings, HelpCircle, Power, Terminal, AlertTriangle, Volume2, Wifi, Zap, Trash2, Star, ChevronLeft, ChevronRight, HardDrive, Gamepad2, Disc, Layout, ExternalLink, MessageCircle, MessageSquare, Activity } from 'lucide-react';

// Quality stars for file ratings
export const QualityStars = ({ count }: { count: number }) => (
  <div className="flex space-x-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={10} fill={i < count ? "#FFD700" : "none"} className={i < count ? "text-[#FFD700] drop-shadow-[0_0_2px_rgba(255,215,0,0.5)]" : "text-gray-300"} />
    ))}
  </div>
);

export const LogoIcon = () => (
  <div className="w-8 h-8 relative flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-lime-300 via-lime-500 to-green-700 rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_8px_rgba(0,0,0,0.3)] border border-green-800"></div>
    <div className="w-5 h-5 border-[3px] border-white rounded-full border-t-transparent animate-spin-slow shadow-sm z-10 opacity-90"></div>
    <div className="absolute top-1 right-1 w-2.5 h-1.5 bg-white/60 rounded-full blur-[1px] rotate-[-20deg]"></div>
    <div className="absolute bottom-1 left-2 w-1 h-1 bg-white/20 rounded-full blur-[0.5px]"></div>
  </div>
);

export const XpComputerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
    <defs>
      <linearGradient id="comp_body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8f8f8" />
        <stop offset="100%" stopColor="#a0a0a0" />
      </linearGradient>
      <linearGradient id="comp_screen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3A6EA5" />
        <stop offset="100%" stopColor="#1a4e85" />
      </linearGradient>
    </defs>
    <rect x="2" y="4" width="28" height="19" rx="2" fill="url(#comp_body)" stroke="#444" strokeWidth="1"/>
    <rect x="4" y="6" width="24" height="14" fill="url(#comp_screen)" />
    <path d="M10 23 L8 28 H24 L22 23 Z" fill="#888" stroke="#444" />
    <rect x="7" y="28" width="18" height="2" fill="#666" />
    <circle cx="26" cy="20" r="1.5" fill="#00ff00" className="animate-pulse shadow-[0_0_4px_#00ff00]" />
  </svg>
);

export const XpTrashIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
    <path d="M6 10H26L24 28H8L6 10Z" fill="#D4D0C8" stroke="#444" strokeWidth="1"/>
    <rect x="4" y="6" width="24" height="4" rx="1" fill="#D4D0C8" stroke="#444" strokeWidth="1"/>
    <path d="M12 6V4H20V6" stroke="#444" strokeWidth="1"/>
    <rect x="10" y="14" width="2" height="10" fill="#888" />
    <rect x="15" y="14" width="2" height="10" fill="#888" />
    <rect x="20" y="14" width="2" height="10" fill="#888" />
  </svg>
);

export const XpFolderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
    <path d="M2 6C2 4.89543 2.89543 4 4 4H12L15 7H28C29.1046 7 30 7.89543 30 9V26C30 27.1046 29.1046 28 28 28H4C2.89543 28 2 27.1046 2 26V6Z" fill="#FFD15C" stroke="#B8860B" strokeWidth="1"/>
    <path d="M2 11H30V26C30 27.1046 29.1046 28 28 28H4C2.89543 28 2 27.1046 2 26V11Z" fill="#FFE08C" />
    <rect x="5" y="14" width="20" height="1" fill="white" opacity="0.4" />
  </svg>
);

export const FileIcon = ({ type }: { type: string }) => {
  const t = type.toLowerCase();
  if (t.includes('mp3') || t.includes('audio')) return <Music size={16} className="text-purple-600 drop-shadow-sm" />;
  if (t.includes('wmv') || t.includes('mpg') || t.includes('avi') || t.includes('video')) return <Film size={16} className="text-blue-600 drop-shadow-sm" />;
  if (t.includes('exe')) return <Zap size={16} className="text-orange-500 drop-shadow-sm" fill="currentColor" />;
  if (t.includes('txt') || t.includes('doc')) return <FileText size={16} className="text-gray-600" />;
  return <File size={16} className="text-gray-400" />;
};

export { Globe, Monitor, Library, Play, Pause, X, Minus, Square, Search, RefreshCw, Music, Film, File, ShieldAlert, ShieldCheck, FileText, User, Mail, Settings, HelpCircle, Power, Terminal, AlertTriangle, Volume2, Wifi, Zap, Trash2, Star, ChevronLeft, ChevronRight, HardDrive, Gamepad2, Disc, Layout, ExternalLink, MessageCircle, MessageSquare, Activity };