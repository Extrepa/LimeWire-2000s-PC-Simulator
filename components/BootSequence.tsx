import React, { useEffect, useState } from 'react';
import { User, Briefcase, Power, Play } from 'lucide-react';

const BOOT_MESSAGES = [
    "Checking for updates (using 56k modem)...",
    "Optimizing registry (deleting random files)...",
    "Installing BonziBuddy (please wait)...",
    "Reticulating splines...",
    "Warming up the CRT monitor...",
    "Loading Winamp skins...",
    "Defragmenting floppy drive A:...",
    "Connecting to Gnutella network...",
    "Bypassing parental controls...",
    "Calculating remaining time (approx 4 hours)...",
    "Checking for viruses (Found: 42)...",
    "Finalizing pirated software installation...",
    "Ready! (Just kidding, 5 more seconds)..."
];

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 10000; // Reduced for testing but still feels longish
    const msgInterval = setInterval(() => setMsgIdx(prev => (prev + 1) % BOOT_MESSAGES.length), 2000);
    const progInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + (Math.random() > 0.8 ? 5 : 1), 99));
    }, 400);

    const timer = setTimeout(onComplete, totalDuration);
    return () => {
        clearTimeout(timer);
        clearInterval(msgInterval);
        clearInterval(progInterval);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] font-sans select-none cursor-pointer overflow-hidden text-white"
      onClick={onComplete}
    >
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>

      <div className="flex items-center mb-8 scale-150">
        <div className="grid grid-cols-2 gap-1 mr-4">
            <div className="w-8 h-8 bg-[#E84834] rounded-tl-full"></div>
            <div className="w-8 h-8 bg-[#6CBF32] rounded-tr-full"></div>
            <div className="w-8 h-8 bg-[#3E85E8] rounded-bl-full"></div>
            <div className="w-8 h-8 bg-[#F5B82E] rounded-br-full"></div>
        </div>
        <div className="flex flex-col">
            <span className="text-white text-4xl font-bold tracking-tighter leading-none">Microsoft</span>
            <div className="flex items-baseline">
                <span className="text-white text-6xl font-bold tracking-tighter leading-none">Windows</span>
                <span className="text-[#E84834] text-xl font-bold align-super ml-1">xp</span>
            </div>
        </div>
      </div>
      
      <div className="w-64 h-3 border border-gray-600 rounded-sm p-[2px] mt-16 relative overflow-hidden bg-black">
         <div className="absolute top-[2px] bottom-[2px] left-0 w-full flex space-x-1 animate-boot-load">
             <div className="w-3 h-full bg-[#3D6ADB] rounded-sm shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]"></div>
             <div className="w-3 h-full bg-[#3D6ADB] rounded-sm shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]"></div>
             <div className="w-3 h-full bg-[#3D6ADB] rounded-sm shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]"></div>
         </div>
      </div>
      
      <div className="mt-8 h-4 text-[#B0CFFF] text-xs italic animate-pulse">
        {BOOT_MESSAGES[msgIdx]}
      </div>

      <div className="absolute bottom-8 right-8 text-white font-bold italic text-sm text-right opacity-50">
          Copyright © 1985-2001<br/>Microsoft Corporation
      </div>
      
      <style>{`
        @keyframes boot-load {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-boot-load {
            animation: boot-load 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export const LoginScreen = ({ onLogin }: { onLogin: (user: string) => void }) => {
    return (
        <div className="fixed inset-0 bg-[#003399] z-[9999] flex flex-col font-sans select-none overflow-hidden">
            <div className="h-[10%] bg-[#003399] border-b border-white/20"></div>
            <div className="flex-1 bg-gradient-to-r from-[#003399] via-[#5A7EDC] to-[#003399] flex items-center justify-center relative">
                <div className="absolute top-1/2 left-1/2 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-white/50 to-transparent -translate-x-1/2 -translate-y-1/2"></div>
                <div className="flex w-full max-w-4xl px-4 md:px-20">
                    <div className="flex-1 flex flex-col items-end pr-10 text-right text-white">
                        <div className="mb-8">
                             <div className="flex items-center justify-end space-x-2 mb-2">
                                <div className="grid grid-cols-2 gap-0.5 transform scale-75">
                                    <div className="w-6 h-6 bg-[#E84834] rounded-tl-lg"></div>
                                    <div className="w-6 h-6 bg-[#6CBF32] rounded-tr-lg"></div>
                                    <div className="w-6 h-6 bg-[#3E85E8] rounded-bl-lg"></div>
                                    <div className="w-6 h-6 bg-[#F5B82E] rounded-br-lg"></div>
                                </div>
                                <span className="text-4xl font-bold tracking-tight">Windows</span>
                                <span className="text-[#E84834] text-2xl font-bold align-top">xp</span>
                            </div>
                        </div>
                        <h2 className="text-xl md:text-2xl font-medium text-[#B0CFFF]">To begin, click your user name</h2>
                    </div>
                    <div className="flex-1 flex flex-col items-start pl-10 space-y-6">
                        <button onClick={() => onLogin('Errl')} className="flex items-center p-2 rounded-lg cursor-pointer group hover:bg-[#F3A505]/20 border border-transparent hover:border-[#F3A505]/50 transition-all w-64 text-left">
                            <div className="w-16 h-16 bg-yellow-300 rounded border-2 border-white flex items-center justify-center shadow-lg group-hover:border-[#F3A505] overflow-hidden relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-500"></div>
                                <User size={40} className="text-white relative z-10 drop-shadow-md" />
                            </div>
                            <div className="ml-4 text-white">
                                <div className="text-xl font-bold group-hover:text-white">Errl</div>
                                <div className="text-sm text-[#B0CFFF] group-hover:text-white">Computer Administrator</div>
                            </div>
                        </button>
                        <button onClick={() => onLogin('Guest')} className="flex items-center p-2 rounded-lg cursor-pointer group hover:bg-[#F3A505]/20 border border-transparent hover:border-[#F3A505]/50 transition-all w-64 text-left">
                            <div className="w-16 h-16 bg-blue-300 rounded border-2 border-white flex items-center justify-center shadow-lg group-hover:border-[#F3A505] overflow-hidden relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-500"></div>
                                <Briefcase size={32} className="text-white relative z-10 drop-shadow-md" />
                            </div>
                            <div className="ml-4 text-white">
                                <div className="text-xl font-bold group-hover:text-white">Guest</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-[15%] bg-[#003399] border-t border-white/20 flex items-center justify-between px-12">
                <button className="flex items-center space-x-2 text-white hover:text-[#F3A505] transition-colors group">
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center border border-white shadow group-hover:brightness-110">
                        <Power size={18} className="text-white"/>
                    </div>
                    <span className="font-bold text-sm">Turn off computer</span>
                </button>
            </div>
        </div>
    );
};

export const WelcomeScreen = ({ user, onComplete }: { user: string, onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, []); // Only run once on mount

    return (
        <div className="fixed inset-0 bg-[#003399] z-[9999] flex flex-col font-sans select-none overflow-hidden cursor-pointer" onClick={onComplete}>
             <div className="h-[10%] bg-[#003399] border-b border-white/20"></div>
             <div className="flex-1 bg-gradient-to-r from-[#003399] via-[#5A7EDC] to-[#003399] flex items-center justify-center relative">
                 <div className="absolute top-1/2 left-1/2 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-white/50 to-transparent -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="flex w-full max-w-4xl px-20">
                     <div className="flex-1"></div>
                     <div className="flex-1 flex flex-col items-start pl-10">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-yellow-300 rounded border-2 border-white flex items-center justify-center shadow-lg overflow-hidden relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-500"></div>
                                {user === 'Errl' ? <User size={50} className="text-white relative z-10 drop-shadow-md" /> : <Briefcase size={40} className="text-white relative z-10 drop-shadow-md" />}
                            </div>
                            <div className="text-white">
                                <div className="text-4xl font-bold italic mb-1">welcome</div>
                                <div className="text-xl font-bold">{user}</div>
                            </div>
                        </div>
                        <button className="mt-8 flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-white text-xs border border-white/30 animate-pulse">
                            <Play size={12} fill="white"/>
                            <span>Click to expedite start up...</span>
                        </button>
                     </div>
                 </div>
             </div>
             <div className="h-[15%] bg-[#003399] border-t border-white/20"></div>
        </div>
    );
};
