
import React, { useState } from 'react';
import { X, HelpCircle, Monitor, Speaker, Music, MousePointer, Info, Minus } from 'lucide-react';

interface DxDiagProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const DxDiag = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: DxDiagProps) => {
    const [activeTab, setActiveTab] = useState('System');

    const tabs = ['System', 'Display', 'Sound', 'Music', 'Input', 'Help'];

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[500px] h-[520px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-[#000080]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center border border-black shadow-sm">
                         <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                     </div>
                     <span className="drop-shadow-sm text-[11px]">DirectX Diagnostic Tool</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={onMinimize} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center font-bold">-</button>
                     <button onClick={onClose} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center font-bold">x</button>
                </div>
            </div>

            <div className="flex px-1 pt-1 space-x-0.5 border-b border-gray-400 mb-2 overflow-x-auto whitespace-nowrap scrollbar-none">
                {tabs.map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-t border-t border-l border-r border-gray-400 -mb-[1px] z-10 text-[11px] ${activeTab === tab ? 'bg-[#ECE9D8] font-bold border-b-[#ECE9D8]' : 'bg-[#E0DFE3] border-b-gray-400'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-1 border border-gray-400 bg-white mx-1 mb-2 p-4 overflow-y-auto shadow-inner">
                {activeTab === 'System' && (
                    <div className="space-y-4">
                        <p>This tool reports detailed information about the DirectX components and drivers installed on your system.</p>
                        <div className="space-y-1">
                            <h3 className="font-bold text-blue-900 border-b border-gray-200 pb-1 mb-2">System Information</h3>
                            <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1">
                                <span className="text-gray-500">Current Date/Time:</span><span>Sunday, October 23, 2005, 9:24 PM</span>
                                <span className="text-gray-500">Computer Name:</span><span>LIME-USER-XP</span>
                                <span className="text-gray-500">Operating System:</span><span>Microsoft Windows XP Professional (5.1, Build 2600)</span>
                                <span className="text-gray-500">Language:</span><span>English (Regional Setting: English)</span>
                                <span className="text-gray-500">System Manufacturer:</span><span>Microsoft Corporation</span>
                                <span className="text-gray-500">System Model:</span><span>VirtualBox / Simulator 2.0</span>
                                <span className="text-gray-500">BIOS:</span><span>Default System BIOS</span>
                                <span className="text-gray-500">Processor:</span><span>Intel(R) Pentium(R) 4 CPU 3.00GHz</span>
                                <span className="text-gray-500">Memory:</span><span>512MB RAM</span>
                                <span className="text-gray-500">Page file:</span><span>236MB used, 1015MB available</span>
                                <span className="text-gray-500">DirectX Version:</span><span>DirectX 9.0c (4.09.0000.0904)</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Display' && (
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="font-bold text-blue-900 border-b border-gray-200 pb-1 mb-2">Device</h3>
                            <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1">
                                <span className="text-gray-500">Name:</span><span>NVIDIA GeForce 6800 Ultra</span>
                                <span className="text-gray-500">Manufacturer:</span><span>NVIDIA</span>
                                <span className="text-gray-500">Chip Type:</span><span>GeForce 6800 Ultra</span>
                                <span className="text-gray-500">DAC Type:</span><span>Integrated RAMDAC</span>
                                <span className="text-gray-500">Approx. Total Memory:</span><span>256.0 MB</span>
                                <span className="text-gray-500">Current Display Mode:</span><span>1024 x 768 (32 bit) (60Hz)</span>
                                <span className="text-gray-500">Monitor:</span><span>Plug and Play Monitor</span>
                            </div>
                        </div>
                        <div className="border-t pt-2 mt-4">
                             <h3 className="font-bold text-blue-900 mb-2">DirectX Features</h3>
                             <div className="grid grid-cols-2 gap-2 pl-4">
                                <span>DirectDraw Acceleration:</span><span className="text-green-700 font-bold">Enabled</span>
                                <span>Direct3D Acceleration:</span><span className="text-green-700 font-bold">Enabled</span>
                                <span>AGP Texture Acceleration:</span><span className="text-green-700 font-bold">Enabled</span>
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Help' && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                        <HelpCircle size={48} className="text-blue-700" />
                        <p className="font-bold italic">Looking for help with DirectX? <br/>Try searching on the Gnutella network!</p>
                    </div>
                )}

                {!['System', 'Display', 'Help'].includes(activeTab) && (
                    <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-30 grayscale">
                        <Info size={32} />
                        <p>Detailed information for "{activeTab}" is unavailable.</p>
                    </div>
                )}
            </div>

            <div className="h-10 flex items-center justify-end space-x-2 px-1 mt-1">
                 <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">Help</button>
                 <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">Next Page</button>
                 <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">Save All Information...</button>
                 <button onClick={onClose} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[80px] font-bold">Exit</button>
            </div>
        </div>
    );
};
