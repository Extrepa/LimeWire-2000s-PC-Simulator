import React, { useState } from 'react';
import { X, Minus, Monitor, Cpu, HardDrive, ShieldCheck, Zap, Music, Globe, Activity } from 'lucide-react';

interface SystemInfoProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const SystemInfo = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: SystemInfoProps) => {
    const [selectedCategory, setSelectedCategory] = useState('System Summary');

    const subsystems = [
        { name: 'System Summary', icon: <Monitor size={14}/> },
        { name: 'Health & Status', icon: <Activity size={14}/> },
        { name: 'Hardware Resources', icon: <Cpu size={14}/> },
        { name: 'Components', icon: <Zap size={14}/> },
        { name: 'Software Environment', icon: <ShieldCheck size={14}/> },
        { name: 'Internet Settings', icon: <Globe size={14}/> },
    ];

    const featureStatus = [
        { name: 'Gnutella P2P Core', status: 'Online', color: 'text-green-600', version: '4.12.6' },
        { name: 'Gemini AI Brain', status: 'Connected', color: 'text-green-600', version: 'gemini-3-flash' },
        { name: 'WinXP Shell Engine', status: 'Stable', color: 'text-green-600', version: '5.1.2600' },
        { name: 'Audio Subsystem', status: 'Active', color: 'text-green-600', version: 'DirectSound 9' },
        { name: 'Legacy Browser Stack', status: 'Working', color: 'text-blue-600', version: 'IE 6.0 SP2' },
        { name: 'Nostalgia Filter', status: '100% Depth', color: 'text-purple-600', version: 'N/A' },
        { name: 'HyperCam Watermark', status: 'Ready', color: 'text-gray-500', version: 'v2.1' },
        { name: 'Bonzi Presence', status: 'Detected', color: 'text-orange-500', version: 'Banana-1' }
    ];

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[95vw] md:w-[650px] h-[75vh] md:h-[480px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1 overflow-hidden"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-[#000080]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <Monitor size={14} className="text-blue-300"/>
                     <span className="drop-shadow-sm text-[11px]">System Information</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center">-</button>
                     <button onClick={onClose} className="w-4 h-4 bg-[#E81123] border border-white/50 text-white flex items-center justify-center font-bold">x</button>
                </div>
            </div>

            {/* Menu Bar */}
            <div className="flex space-x-4 px-2 border-b border-gray-400 pb-1 mb-1 bg-[#ECE9D8] font-bold overflow-x-auto whitespace-nowrap">
                {['File', 'Edit', 'View', 'Tools', 'Help'].map(m => (
                    <span key={m} className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">{m}</span>
                ))}
            </div>

            <div className="flex-1 flex overflow-hidden border border-gray-400 bg-white m-1 shadow-inner">
                {/* Sidebar */}
                <div className="w-32 md:w-44 bg-white border-r border-gray-300 overflow-y-auto p-1 flex-shrink-0">
                    {subsystems.map(sub => (
                        <div 
                            key={sub.name}
                            onClick={() => setSelectedCategory(sub.name)}
                            className={`flex items-center space-x-2 px-2 py-1 cursor-pointer rounded-sm ${selectedCategory === sub.name ? 'bg-[#316AC5] text-white' : 'hover:bg-blue-50 text-black'}`}
                        >
                            <span className="opacity-70 flex-shrink-0">{sub.icon}</span>
                            <span className="font-bold truncate">{sub.name}</span>
                        </div>
                    ))}
                </div>

                {/* Info Panel */}
                <div className="flex-1 p-4 overflow-y-auto scrollbar-retro bg-white">
                    <h2 className="text-lg font-bold text-blue-900 border-b border-gray-300 mb-4 flex items-center">
                        <Activity size={18} className="mr-2 opacity-50"/> {selectedCategory}
                    </h2>
                    
                    {selectedCategory === 'System Summary' && (
                        <table className="w-full text-left">
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1 font-bold text-gray-500 w-1/3">OS Name</td>
                                    <td className="py-1">Microsoft Windows XP Professional</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1 font-bold text-gray-500">Version</td>
                                    <td className="py-1">5.1.2600 Service Pack 2 Build 2600</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1 font-bold text-gray-500">System Model</td>
                                    <td className="py-1">LimeWire Simulator Pro v2.7</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1 font-bold text-gray-500">Processor</td>
                                    <td className="py-1">Intel(R) Pentium(R) 4 CPU 3.00GHz</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1 font-bold text-gray-500">Total Physical Memory</td>
                                    <td className="py-1">512.00 MB</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-1 font-bold text-gray-500">Page File</td>
                                    <td className="py-1">1.22 GB Available</td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {selectedCategory === 'Health & Status' && (
                        <div className="space-y-4">
                            <p className="italic text-gray-600 mb-4 bg-blue-50 p-2 border border-blue-100 rounded text-[11px]">Comprehensive check of all simulator modules. All subsystems report optimal functioning.</p>
                            <div className="grid grid-cols-1 gap-2">
                                {featureStatus.map(f => (
                                    <div key={f.name} className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded hover:bg-white transition-colors group">
                                        <div>
                                            <span className="font-bold text-blue-900">{f.name}</span>
                                            <span className="ml-2 text-[9px] text-gray-400">({f.version})</span>
                                        </div>
                                        <span className={`${f.color} font-black uppercase tracking-widest text-[10px] group-hover:scale-105 transition-transform underline decoration-dotted`}>{f.status}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-300">
                                <div className="flex items-center space-x-2 text-green-700 font-bold animate-pulse">
                                    <ShieldCheck size={16}/>
                                    <span>System Integrity Verified by Simulator Pro v2.7</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!['System Summary', 'Health & Status'].includes(selectedCategory) && (
                        <div className="flex flex-col items-center justify-center h-full opacity-30 grayscale italic text-center p-10">
                            <Zap size={48} className="mb-2"/>
                            <p className="text-sm">Detailed data for {selectedCategory} is currently being reticulated from the simulated BIOS.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="h-10 flex items-center justify-between px-2 bg-[#ECE9D8] border-t border-gray-300">
                 <div className="flex-1 flex items-center bg-white border border-gray-400 px-2 h-6 mr-4 shadow-inner">
                    <span className="text-gray-400 mr-2">Find what:</span>
                    <input className="flex-1 border-none outline-none" />
                 </div>
                 <button onClick={onClose} className="px-6 md:px-8 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 font-bold min-w-[80px] md:min-w-[100px]">Close</button>
            </div>
        </div>
    );
};