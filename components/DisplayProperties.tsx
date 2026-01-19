
import React, { useState } from 'react';
import { X, Monitor, Palette, Image as ImageIcon } from 'lucide-react';

interface DisplayPropertiesProps {
    onClose: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
    setWallpaper: (url: string) => void;
    currentWallpaper: string;
    theme: 'blue' | 'olive' | 'silver';
    onThemeChange: (theme: 'blue' | 'olive' | 'silver') => void;
}

const WALLPAPERS = [
    { name: 'Bliss (Default)', value: '' },
    { name: 'Autumn', value: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1600&q=80' },
    { name: 'Azul', value: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80' },
    { name: 'Crystal', value: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1600&q=80' },
];

export const DisplayProperties = ({ onClose, position, onMouseDown, onTouchStart, zIndex, active, onClick, setWallpaper, currentWallpaper, theme, onThemeChange }: DisplayPropertiesProps) => {
    const [selectedTab, setSelectedTab] = useState('Desktop');
    const [previewWallpaper, setPreviewWallpaper] = useState(currentWallpaper);
    const [previewTheme, setPreviewTheme] = useState(theme);

    const handleApply = () => {
        setWallpaper(previewWallpaper);
        onThemeChange(previewTheme);
        onClose();
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[420px] h-[520px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-7 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <Monitor size={14} />
                     <span className="drop-shadow-sm">Display Properties</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="flex px-1 pt-1 space-x-1 border-b border-gray-400 mb-2">
                {['Themes', 'Desktop', 'Screen Saver', 'Appearance'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-3 py-1 rounded-t border-t border-l border-r border-gray-400 -mb-[1px] z-10 font-bold ${selectedTab === tab ? 'bg-[#ECE9D8] border-b-[#ECE9D8]' : 'bg-[#E0DFE3] border-b-gray-400'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-1 p-3 border border-gray-400 bg-[#ECE9D8] mx-1 mb-2 shadow-inner overflow-y-auto">
                {selectedTab === 'Desktop' && (
                    <div className="flex flex-col h-full">
                        <div className="h-44 flex justify-center items-center mb-6 relative bg-gray-900 rounded border-2 border-gray-500 overflow-hidden shadow-inner">
                            <div className="w-[180px] h-[135px] bg-[#2b4f6b] relative z-10 border border-gray-700">
                                {previewWallpaper ? <img src={previewWallpaper} className="w-full h-full object-cover" alt="preview" /> : <div className="w-full h-full bg-[#2b4f6b]"></div>}
                            </div>
                            <Monitor size={220} className="text-gray-400 absolute opacity-20" strokeWidth={0.5}/>
                        </div>

                        <div className="space-y-4">
                            <div className="font-bold text-gray-700 flex items-center"><ImageIcon size={14} className="mr-2"/> Desktop Background:</div>
                            <div className="h-32 border border-gray-500 bg-white overflow-y-auto shadow-inner">
                                {WALLPAPERS.map(wp => (
                                    <div 
                                        key={wp.name}
                                        onClick={() => setPreviewWallpaper(wp.value)}
                                        className={`px-3 py-1 cursor-pointer flex items-center space-x-3 ${previewWallpaper === wp.value ? 'bg-[#316AC5] text-white font-bold' : 'hover:bg-blue-50 text-black'}`}
                                    >
                                        <div className="w-4 h-4 border border-black shadow-sm" style={{backgroundImage: `url(${wp.value})`, backgroundColor: '#2b4f6b', backgroundSize: 'cover'}}></div>
                                        <span>{wp.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'Appearance' && (
                    <div className="flex flex-col space-y-6">
                        <div className="font-bold text-gray-700 flex items-center"><Palette size={14} className="mr-2"/> Windows and Buttons:</div>
                        <div className="space-y-3">
                             {['blue', 'olive', 'silver'].map(t => (
                                 <label key={t} className="flex items-center space-x-3 p-3 bg-white border border-gray-300 rounded cursor-pointer hover:bg-blue-50 shadow-sm transition-all">
                                     <input type="radio" name="theme" checked={previewTheme === t} onChange={() => setPreviewTheme(t as any)} />
                                     <div className="flex-1">
                                         <div className="font-bold uppercase text-blue-900">{t} Luna Style</div>
                                         <div className="flex space-x-1 mt-1">
                                             <div className={`w-8 h-2 rounded-sm ${t==='blue' ? 'bg-[#0055EA]' : t==='olive' ? 'bg-[#6E8D42]' : 'bg-[#A0A2A4]'}`}></div>
                                             <div className="w-8 h-2 rounded-sm bg-green-500"></div>
                                         </div>
                                     </div>
                                 </label>
                             ))}
                        </div>
                    </div>
                )}

                {['Themes', 'Screen Saver'].includes(selectedTab) && (
                    <div className="h-full flex items-center justify-center text-center text-gray-500 italic p-8">
                        The "{selectedTab}" customization features are locked in the trial version of Windows XP Simulator.
                    </div>
                )}
            </div>

            <div className="h-10 flex items-center justify-end space-x-2 px-1">
                 <button onClick={handleApply} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[80px] font-bold">OK</button>
                 <button onClick={onClose} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[80px] font-bold">Cancel</button>
                 <button onClick={handleApply} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[80px] font-bold">Apply</button>
            </div>
        </div>
    );
};
