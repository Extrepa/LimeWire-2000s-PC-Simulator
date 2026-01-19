import React, { useState } from 'react';
import { X, Lightbulb, ChevronRight } from 'lucide-react';
import { LogoIcon } from './Icons';

const TIPS = [
    "To get the best download speeds, make sure you are an 'Ultrapeer'.",
    "Sharing your files helps the community and improves your 'karma' rating!",
    "Beware of .exe files disguised as songs. Check the Bitzi rating first!",
    "You can change the skin of LimeWire in the Options menu.",
    "LimeWire PRO provides turbo-charged download speeds compared to the Basic version.",
    "Use the 'Monitor' tab to see who is currently downloading files from you."
];

export const TipOfDay = ({ onClose }: { onClose: () => void }) => {
    const [tipIdx, setTipIdx] = useState(Math.floor(Math.random() * TIPS.length));

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            <div className="w-[450px] bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs p-1">
                <div className="h-6 bg-[#0055EA] flex items-center justify-between px-2 mb-2">
                    <span className="text-white font-bold flex items-center">
                        <Lightbulb size={12} className="mr-1 text-yellow-300"/> Tip of the Day
                    </span>
                    <button onClick={onClose} className="w-4 h-4 bg-[#E81123] border border-white/50 rounded-sm flex items-center justify-center text-white">
                        <X size={12} />
                    </button>
                </div>
                
                <div className="bg-white border border-gray-400 p-6 flex items-start space-x-6 m-2 flex-1">
                    <div className="w-16 h-16 flex-shrink-0 bg-lime-500 rounded-full flex items-center justify-center shadow-md">
                        <div className="scale-150"><LogoIcon /></div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#003399] mb-4 italic">Did you know...</h2>
                        <p className="text-sm text-gray-800 leading-relaxed min-h-[60px]">
                            {TIPS[tipIdx]}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center px-2 py-4">
                    <div className="flex items-center space-x-1">
                        <input type="checkbox" id="showTips" defaultChecked />
                        <label htmlFor="showTips">Show tips on startup</label>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setTipIdx((tipIdx + 1) % TIPS.length)}
                            className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 flex items-center"
                        >
                            Next Tip <ChevronRight size={14}/>
                        </button>
                        <button onClick={onClose} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};