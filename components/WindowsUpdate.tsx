
import React, { useState, useEffect } from 'react';
import { X, Minus, Square, ShieldCheck, Download, RefreshCw, ChevronRight } from 'lucide-react';

interface WindowsUpdateProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const WindowsUpdate = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: WindowsUpdateProps) => {
    const [status, setStatus] = useState<'checking' | 'ready' | 'installing' | 'complete'>('checking');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (status === 'checking') {
            const timer = setTimeout(() => setStatus('ready'), 3000);
            return () => clearTimeout(timer);
        }
        if (status === 'installing') {
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        setStatus('complete');
                        return 100;
                    }
                    return p + Math.random() * 2;
                });
            }, 100);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <div style={{ left: position.x, top: position.y, zIndex }} className="absolute w-[95vw] md:w-[750px] h-[550px] bg-white border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans win-shadow overflow-hidden" onClick={onClick}>
            {/* Title Bar */}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className={`h-8 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}>
                <div className="flex items-center text-white space-x-2 pl-2 truncate font-bold">
                     <ShieldCheck size={16} />
                     <span className="text-[13px] drop-shadow-sm">Windows Update - Microsoft Internet Explorer</span>
                </div>
                <div className="flex space-x-1">
                     <button onClick={onMinimize} className="w-6 h-6 bg-[#0055EA] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><Minus size={14}/></button>
                     <button onClick={onClose} className="w-6 h-6 bg-[#E81123] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><X size={14} strokeWidth={3}/></button>
                </div>
            </div>

            {/* IE Address Bar */}
            <div className="bg-[#EBE9ED] p-1 border-b border-gray-300 flex items-center space-x-2">
                <span className="text-gray-500 text-[11px] font-bold ml-2">Address</span>
                <div className="flex-1 bg-white border border-gray-500 h-6 px-2 flex items-center text-blue-900 font-mono text-[11px] shadow-inner">
                    http://windowsupdate.microsoft.com/v6/default.aspx
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white overflow-y-auto flex">
                {/* Windows Update Sidebar */}
                <div className="w-48 bg-[#D6E3F7] border-r border-gray-300 p-4 space-y-4">
                    <h2 className="font-bold text-blue-900 text-sm">Windows Update</h2>
                    <div className="space-y-2 text-[11px] text-blue-700">
                        <div className="font-bold underline cursor-pointer">Welcome</div>
                        <div className="hover:underline cursor-pointer">Pick updates to install</div>
                        <div className="hover:underline cursor-pointer">View installation history</div>
                        <div className="hover:underline cursor-pointer">Personalize Windows Update</div>
                        <div className="pt-4 border-t border-blue-400/30">
                            <div className="hover:underline cursor-pointer">Get help and support</div>
                        </div>
                    </div>
                </div>

                {/* Main View */}
                <div className="flex-1 p-8">
                    <div className="flex justify-between items-start border-b-2 border-blue-900 pb-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-serif font-black text-blue-900 italic tracking-tighter">Microsoft Windows Update</h1>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Keep your computer up to date</p>
                        </div>
                        <ShieldCheck size={48} className="text-blue-600 opacity-20" />
                    </div>

                    {status === 'checking' && (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <h2 className="text-xl font-bold text-blue-900">Checking for the latest updates for your computer...</h2>
                            <p className="text-gray-500 italic">Windows Update is looking for available updates...</p>
                        </div>
                    )}

                    {status === 'ready' && (
                        <div className="space-y-6">
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <h3 className="font-bold text-yellow-800 flex items-center"><RefreshCw size={16} className="mr-2"/> Updates are ready for your computer</h3>
                                <p className="text-sm text-yellow-700 mt-1">Microsoft recommends that you install these updates to improve the performance and security of Windows XP.</p>
                            </div>

                            <div className="border border-gray-300 rounded overflow-hidden">
                                <div className="bg-gray-100 p-2 font-bold text-gray-700 border-b border-gray-300 uppercase text-[10px]">High-Priority Updates</div>
                                <div className="p-4 space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <input type="checkbox" defaultChecked />
                                        <div>
                                            <div className="font-bold text-blue-900 underline">Windows XP Service Pack 3 (SP3)</div>
                                            <p className="text-xs text-gray-600">Size: 316.4 MB • 45 minutes on 56k</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <input type="checkbox" defaultChecked />
                                        <div>
                                            <div className="font-bold text-blue-900 underline">Internet Explorer 7 for Windows XP</div>
                                            <p className="text-xs text-gray-600">Size: 14.7 MB • 3 minutes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setStatus('installing')}
                                className="bg-gradient-to-b from-blue-400 to-blue-700 text-white px-8 py-2 font-bold rounded shadow-lg flex items-center space-x-2 hover:brightness-110 active:scale-95 transition-all"
                            >
                                <Download size={18}/>
                                <span>Install Updates Now</span>
                            </button>
                        </div>
                    )}

                    {status === 'installing' && (
                        <div className="space-y-8 mt-12">
                            <h2 className="text-2xl font-bold text-blue-900">Installing Updates...</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-600">
                                    <span>Downloading: Service Pack 3...</span>
                                    <span>{Math.floor(progress)}%</span>
                                </div>
                                <div className="w-full h-8 bg-gray-200 border-2 border-gray-400 relative overflow-hidden shadow-inner">
                                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300" style={{width: `${progress}%`}}></div>
                                    <div className="absolute inset-0 flex items-center justify-center font-black text-white/40 italic pointer-events-none uppercase tracking-widest text-xs">Microsoft Update</div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 italic">Please do not turn off your computer during installation.</p>
                        </div>
                    )}

                    {status === 'complete' && (
                        <div className="flex flex-col items-center justify-center h-64 text-center space-y-6">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                                <ShieldCheck size={40} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-blue-900">Installation Complete</h2>
                                <p className="text-gray-600 mt-2 font-bold">You must restart your computer for these changes to take effect.</p>
                            </div>
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-blue-700 text-white px-10 py-3 font-bold rounded shadow-lg hover:bg-blue-800 transition-colors"
                            >
                                Restart Now
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* IE Status Bar */}
            <div className="h-6 bg-[#EBE9ED] border-t border-gray-400 flex items-center px-4 text-[10px] text-gray-600 font-bold justify-between">
                <span>Done</span>
                <span className="flex items-center text-green-700"><ShieldCheck size={12} className="mr-1"/> Trusted Site</span>
            </div>
        </div>
    );
};
