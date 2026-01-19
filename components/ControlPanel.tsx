
import React, { useState } from 'react';
import { X, Settings, Monitor, Volume2, User, MousePointer, Accessibility, ShieldCheck, Globe, Calendar, RefreshCw, HardDrive, Trash2, ArrowLeft, Package, UserPlus } from 'lucide-react';

interface ControlPanelProps {
    onClose: () => void;
    onOpenApp: (id: string) => void;
    position: { x: number, y: number };
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}

export const ControlPanel = ({ onClose, onOpenApp, position, zIndex, active, onClick, onMouseDown, onTouchStart }: ControlPanelProps) => {
    const [view, setView] = useState<'main' | 'users' | 'programs'>('main');

    const categories = [
        { id: 'display', label: 'Appearance and Themes', icon: <Monitor className="text-blue-500" />, desc: 'Change the look of your desktop items.' },
        { id: 'sound', label: 'Sounds, Speech, and Audio Devices', icon: <Volume2 className="text-gray-500" />, desc: 'Change the sound scheme for your computer.' },
        { id: 'network', label: 'Network and Internet Connections', icon: <Globe className="text-green-500" />, desc: 'Connect to the Internet or a network.' },
        { id: 'users', label: 'User Accounts', icon: <User className="text-orange-500" />, desc: 'Change user settings and passwords.', internal: 'users' },
        { id: 'accessibility', label: 'Accessibility Options', icon: <Accessibility className="text-blue-700" />, desc: 'Adjust your computer for vision or mobility.' },
        { id: 'security', label: 'Security Center', icon: <ShieldCheck className="text-red-500" />, desc: 'Keep your computer safe and up to date.' },
        { id: 'datetime', label: 'Date, Time, Language, and Regional Options', icon: <Calendar className="text-yellow-600" />, desc: 'Change how dates and times appear.' },
        { id: 'performance', label: 'Performance and Maintenance', icon: <HardDrive className="text-blue-900" />, desc: 'Check system information and performance.' },
        { id: 'programs', label: 'Add or Remove Programs', icon: <Package className="text-blue-400" />, desc: 'Install or remove programs and Windows components.', internal: 'programs' },
    ];

    const INSTALLED_PROGRAMS = [
        { name: 'LimeWire PRO 4.12.6', size: '12.4 MB', date: '10/22/2005' },
        { name: 'Winamp 2.91', size: '4.1 MB', date: '09/15/2005' },
        { name: 'Microsoft Encarta 2005', size: '640 MB', date: '01/10/2005' },
        { name: 'Adobe Reader 7.0', size: '24.2 MB', date: '05/04/2005' },
        { name: 'Norton AntiVirus 2005', size: '85 MB', date: '12/20/2004' },
    ];

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[800px] h-[550px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans win-shadow select-none overflow-hidden"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-8 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <Settings size={14} />
                     <span className="text-[13px] drop-shadow-sm">{view === 'main' ? 'Control Panel' : view === 'users' ? 'User Accounts' : 'Add or Remove Programs'}</span>
                </div>
                <button onClick={onClose} className="w-6 h-6 bg-[#E81123] rounded-sm flex items-center justify-center text-white border border-white/30 transition-colors"><X size={14} strokeWidth={3}/></button>
            </div>

            <div className="flex-1 bg-white flex flex-col">
                <div className="bg-gradient-to-r from-[#7BA2E7] to-[#6375D6] p-6 text-white border-b border-gray-400 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter">{view === 'main' ? 'Control Panel' : view === 'users' ? 'User Accounts' : 'Add or Remove Programs'}</h1>
                        <p className="text-blue-100 font-bold">{view === 'main' ? 'Pick a category' : 'Manage your computer system'}</p>
                    </div>
                    {view !== 'main' && (
                        <button onClick={() => setView('main')} className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors">
                            <ArrowLeft size={14}/> <span>Back to Categories</span>
                        </button>
                    )}
                </div>

                {view === 'main' && (
                    <div className="flex-1 p-8 overflow-y-auto grid grid-cols-2 gap-8 content-start scrollbar-retro">
                        {categories.map(cat => (
                            <div 
                                key={cat.id} 
                                onClick={() => {
                                    if (cat.internal === 'users') setView('users');
                                    else if (cat.internal === 'programs') setView('programs');
                                    else onOpenApp(cat.id);
                                }}
                                className="flex items-start space-x-4 p-2 hover:bg-blue-50 cursor-pointer group rounded-lg transition-colors border border-transparent hover:border-blue-200"
                            >
                                <div className="w-12 h-12 bg-white rounded shadow-md border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-blue-900 text-sm group-hover:underline">{cat.label}</span>
                                    <p className="text-[10px] text-gray-500 mt-1">{cat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {view === 'users' && (
                    <div className="flex-1 p-8 overflow-y-auto scrollbar-retro space-y-8">
                         <div className="space-y-4">
                            <h3 className="font-bold text-blue-900 border-b border-gray-200 pb-2">Pick a task...</h3>
                            <div className="grid grid-cols-2 gap-4 text-blue-700 font-bold underline">
                                <span className="cursor-pointer hover:text-blue-900 flex items-center"><UserPlus size={16} className="mr-2"/> Create a new account</span>
                                <span className="cursor-pointer hover:text-blue-900 flex items-center"><User size={16} className="mr-2"/> Change an account</span>
                                <span className="cursor-pointer hover:text-blue-900 flex items-center"><Settings size={16} className="mr-2"/> Change the way users log on</span>
                            </div>
                         </div>
                         <div className="space-y-4 pt-4">
                            <h3 className="font-bold text-blue-900 border-b border-gray-200 pb-2">or pick an account to change</h3>
                            <div className="flex space-x-8">
                                <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm cursor-pointer hover:brightness-110 transition-all">
                                    <div className="w-16 h-16 bg-yellow-300 rounded border-2 border-white shadow overflow-hidden flex items-center justify-center">
                                        <User size={40} className="text-white drop-shadow-md" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-blue-900">Administrator</div>
                                        <div className="text-[10px] text-gray-500">Computer administrator</div>
                                        <div className="text-[10px] text-gray-500">Password protected</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                                    <div className="w-16 h-16 bg-blue-300 rounded border-2 border-white shadow flex items-center justify-center">
                                        <User size={40} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-700">Guest</div>
                                        <div className="text-[10px] text-gray-400">Guest account is off</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                )}

                {view === 'programs' && (
                    <div className="flex-1 p-4 bg-white overflow-hidden flex flex-col">
                        <div className="bg-[#D3D3D3] p-1 mb-1 border border-gray-400 flex items-center text-[11px] font-bold">
                             Currently installed programs:
                        </div>
                        <div className="flex-1 border border-gray-400 overflow-y-auto scrollbar-retro bg-white">
                             {INSTALLED_PROGRAMS.map((prog, i) => (
                                 <div key={i} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-[#316AC5] hover:text-white group cursor-default transition-colors">
                                     <div className="flex items-center space-x-3">
                                         <div className="w-8 h-8 bg-gray-100 border border-gray-300 rounded flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                            <Package size={20} className="text-gray-500 group-hover:text-white" />
                                         </div>
                                         <span className="font-bold">{prog.name}</span>
                                     </div>
                                     <div className="text-right text-[10px]">
                                         <div className="font-bold">Size: {prog.size}</div>
                                         <div className="opacity-70">Used: frequently</div>
                                         <div className="opacity-70">Last Used: {prog.date}</div>
                                     </div>
                                 </div>
                             ))}
                        </div>
                        <div className="h-12 flex items-center justify-end px-4">
                             <button className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 font-bold">Close</button>
                        </div>
                    </div>
                )}

                <div className="h-10 bg-[#ECE9D8] border-t border-gray-400 px-6 flex items-center justify-between">
                    <button className="text-blue-800 font-bold hover:underline">Switch to Classic View</button>
                    <div className="flex items-center text-gray-500 font-bold text-[10px] uppercase space-x-2">
                        <RefreshCw size={12}/>
                        <span>System Status: Optimal</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
