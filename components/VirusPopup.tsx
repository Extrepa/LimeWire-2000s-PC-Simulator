import React from 'react';
import { X } from 'lucide-react';

export const VirusPopup = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="w-96 bg-[#ECE9D8] border border-[#0055EA] shadow-xl rounded-t-lg overflow-hidden win-shadow">
                {/* Title Bar */}
                <div className="h-8 bg-gradient-to-r from-[#E81123] via-[#F04050] to-[#E81123] flex items-center justify-between px-2 select-none">
                    <span className="text-white font-bold text-sm">Security Alert - Norton AntiVirus 2005</span>
                    <button onClick={onClose} className="w-5 h-5 bg-[#D53C3C] border border-white/50 rounded-sm flex items-center justify-center text-white">
                        <X size={14} />
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-4 flex items-start space-x-4">
                    <div className="w-10 h-10 flex-shrink-0">
                         <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center border-4 border-red-200">
                             <span className="text-white font-bold text-2xl">!</span>
                         </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-red-600 mb-2">Threat Detected!</h3>
                        <p className="text-sm mb-2">Norton AntiVirus has detected a high-risk threat in the file you are attempting to open.</p>
                        <p className="text-xs bg-white border border-gray-400 p-1 mb-4 font-mono">Trojan.Win32.Generic.exe</p>
                        
                        <div className="flex justify-end space-x-2">
                             <button 
                                onClick={onClose}
                                className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[80px]"
                             >
                                Quarantine
                             </button>
                             <button 
                                onClick={onClose}
                                className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[80px]"
                             >
                                Delete
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
