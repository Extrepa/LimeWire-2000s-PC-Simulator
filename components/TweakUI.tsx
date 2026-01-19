import React, { useState } from 'react';
import { X, Settings, MousePointer, Monitor, User, Zap, HardDrive, Info } from 'lucide-react';

interface TweakUIProps {
    onClose: () => void;
    position: { x: number, y: number };
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}

export const TweakUI = ({ onClose, position, zIndex, active, onClick, onMouseDown, onTouchStart }: TweakUIProps) => {
    const [selectedCategory, setSelectedCategory] = useState('About');

    const categories = [
        { name: 'About', icon: <Info size={14}/> },
        { name: 'General', icon: <Settings size={14}/> },
        { name: 'Mouse', icon: <MousePointer size={14}/> },
        { name: 'Explorer', icon: <HardDrive size={14}/> },
        { name: 'Desktop', icon: <Monitor size={14}/> },
        { name: 'My Computer', icon: <User size={14}/> },
        { name: 'Logon', icon: <Zap size={14}/> },
    ];

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[500px] h-[450px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-[#000080]' : 'bg-[#7899CC]'} cursor-move`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <Settings size={14} className="text-gray-300"/>
                     <span className="drop-shadow-sm text-[11px]">Tweak UI for Windows XP</span>
                </div>
                <button onClick={onClose} className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center" onMouseDown={e => e.stopPropagation()}>x</button>
            </div>

            <div className="flex-1 flex overflow-hidden border border-gray-400 bg-white m-1 shadow-inner">
                {/* Category List */}
                <div className="w-36 bg-white border-r border-gray-300 overflow-y-auto p-1">
                    {categories.map(cat => (
                        <div 
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center space-x-2 px-2 py-1 cursor-pointer rounded-sm ${selectedCategory === cat.name ? 'bg-[#316AC5] text-white' : 'hover:bg-blue-50 text-black'}`}
                        >
                            <span className="opacity-70">{cat.icon}</span>
                            <span className="font-bold">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* Settings Panel */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <h2 className="text-lg font-bold text-blue-900 border-b border-gray-300 mb-4">{selectedCategory}</h2>
                    
                    {selectedCategory === 'About' && (
                        <div className="space-y-4">
                            <p className="font-bold">Tweak UI v2.10.0.0</p>
                            <p>This PowerToy gives you access to system settings that are not exposed in the Windows XP default user interface.</p>
                            <div className="bg-yellow-50 p-3 border border-yellow-200 rounded text-[10px] italic">
                                Note: Most of these settings are simulated for your nostalgia.
                            </div>
                        </div>
                    )}

                    {selectedCategory === 'Mouse' && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" defaultChecked />
                                    <span>Enable Menu Animation</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" />
                                    <span>X-Mouse: Activation follows mouse pointer</span>
                                </label>
                            </div>
                            <div className="border-t pt-4">
                                <span className="font-bold block mb-2">Hover Sensitivity</span>
                                <input type="range" className="w-full" />
                            </div>
                        </div>
                    )}

                    {selectedCategory === 'Desktop' && (
                        <div className="space-y-4">
                            <span className="font-bold block mb-2">Desktop Icons:</span>
                            <div className="space-y-1">
                                {['My Computer', 'Recycle Bin', 'My Documents', 'My Network Places'].map(icon => (
                                    <label key={icon} className="flex items-center space-x-2">
                                        <input type="checkbox" defaultChecked />
                                        <span>{icon}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {!['About', 'Mouse', 'Desktop'].includes(selectedCategory) && (
                        <div className="flex flex-col items-center justify-center h-full opacity-40 grayscale">
                            <Settings size={48} className="mb-2"/>
                            <p className="font-bold italic">Category implementation pending...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="h-10 flex items-center justify-end space-x-2 px-1 mt-1">
                 <button onClick={onClose} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[80px] font-bold">OK</button>
                 <button onClick={onClose} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[80px] font-bold">Cancel</button>
                 <button onClick={onClose} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[80px] font-bold">Apply</button>
            </div>
        </div>
    );
};