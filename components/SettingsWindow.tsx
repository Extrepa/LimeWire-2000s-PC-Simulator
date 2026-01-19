import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SettingsWindowProps {
  onClose: () => void;
}

export const SettingsWindow: React.FC<SettingsWindowProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState('Sharing');

  const categories = ['Sharing', 'Speed', 'Downloads', 'Chat', 'Filters', 'Skins'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className="w-[600px] h-[450px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs p-1">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0055EA] px-2 py-1 mb-2">
            <span className="text-white font-bold">Options</span>
            <button onClick={onClose} className="bg-[#E81123] text-white p-0.5 border border-white/50 rounded-sm">
                <X size={12} />
            </button>
        </div>

        <div className="flex flex-1 gap-2 overflow-hidden">
            {/* Sidebar */}
            <div className="w-32 bg-white border border-gray-400 p-1 overflow-y-auto shadow-inner">
                {categories.map(cat => (
                    <div 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`cursor-pointer px-2 py-1 mb-1 flex items-center ${activeCategory === cat ? 'bg-[#316AC5] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        {/* Placeholder icons */}
                        <div className="w-4 h-4 mr-2 bg-gray-300 border border-gray-400"></div>
                        {cat}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 border border-gray-400 p-4 relative">
                <h2 className="font-bold text-gray-700 border-b border-gray-300 pb-2 mb-4">{activeCategory}</h2>
                
                {activeCategory === 'Sharing' && (
                    <div className="space-y-4">
                        <div>
                            <p className="mb-2">Select folders to share with other users:</p>
                            <div className="h-32 border border-gray-400 bg-white p-2 overflow-y-auto">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" checked readOnly />
                                    <span>C:\My Documents\My Music</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" />
                                    <span>C:\Program Files\LimeWire\Shared</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" checked readOnly />
                            <span>Share files immediately after download</span>
                        </div>
                    </div>
                )}

                {activeCategory === 'Speed' && (
                    <div className="space-y-4">
                        <div className="border border-gray-300 p-2 relative mt-2">
                            <span className="absolute -top-2 left-2 bg-[#ECE9D8] px-1 text-gray-600">Connection Speed</span>
                            <div className="space-y-2 mt-2">
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="speed" />
                                    <span>Modem (56k)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="speed" />
                                    <span>DSL / Cable</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="speed" checked readOnly />
                                    <span>T1</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="speed" />
                                    <span>T3 or higher</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Download Bandwidth:</span>
                            <input type="range" className="w-32" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Upload Bandwidth:</span>
                            <input type="range" className="w-32" />
                        </div>
                    </div>
                )}

                {/* Default Empty State for other tabs */}
                {!['Sharing', 'Speed'].includes(activeCategory) && (
                    <div className="text-center text-gray-500 mt-10">
                        Settings for {activeCategory} are not available in this simulator version.
                    </div>
                )}
            </div>
        </div>

        {/* Footer Buttons */}
        <div className="h-10 flex items-center justify-end space-x-2 px-2 mt-1">
             <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">OK</button>
             <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">Cancel</button>
             <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">Apply</button>
        </div>
      </div>
    </div>
  );
};
