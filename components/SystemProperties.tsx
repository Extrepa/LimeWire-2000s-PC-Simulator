import React, { useState } from 'react';
import { X, Monitor } from 'lucide-react';

interface SystemPropertiesProps {
    onClose: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    // Added onTouchStart to support mobile window dragging
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const SystemProperties = ({ onClose, position, onMouseDown, onTouchStart, zIndex, active, onClick }: SystemPropertiesProps) => {
    const [activeTab, setActiveTab] = useState('General');

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[420px] h-[480px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">System Properties</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex px-1 pt-1 space-x-1 border-b border-gray-400 mb-2 overflow-hidden">
                {['General', 'Computer Name', 'Hardware', 'Advanced', 'System Restore', 'Automatic Updates', 'Remote'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2 py-1 rounded-t border-t border-l border-r border-gray-400 -mb-[1px] z-10 whitespace-nowrap ${activeTab === tab ? 'bg-[#ECE9D8] font-bold border-b-[#ECE9D8]' : 'bg-[#E0DFE3] border-b-gray-400'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 border border-gray-400 bg-[#ECE9D8] mx-1 mb-2">
                {activeTab === 'General' ? (
                    <div className="flex flex-col h-full space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex flex-col items-center space-y-2">
                                <Monitor size={48} className="text-blue-600" />
                            </div>
                            <div className="space-y-4 text-gray-700">
                                <div>
                                    <p className="font-bold">System:</p>
                                    <p className="pl-4">Microsoft Windows XP</p>
                                    <p className="pl-4">Professional</p>
                                    <p className="pl-4">Version 2002</p>
                                    <p className="pl-4">Service Pack 2</p>
                                </div>
                                
                                <div>
                                    <p className="font-bold">Registered to:</p>
                                    <p className="pl-4">Administrator</p>
                                    <p className="pl-4">LimeWire Simulator</p>
                                    <p className="pl-4">76487-640-1457236-23125</p>
                                </div>

                                <div>
                                    <p className="font-bold">Computer:</p>
                                    <p className="pl-4">Intel(R) Pentium(R) 4 CPU 3.00GHz</p>
                                    <p className="pl-4">3.00 GHz, 512 MB of RAM</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center pt-8">
                            <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200">Support Information</button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        This tab is not implemented in the simulator.
                    </div>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="h-8 flex items-center justify-end space-x-2 px-1">
                 <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">OK</button>
                 <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">Cancel</button>
                 <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]" disabled>Apply</button>
            </div>
        </div>
    );
};