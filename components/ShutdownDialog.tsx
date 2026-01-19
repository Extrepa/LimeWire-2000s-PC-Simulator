import React from 'react';
import { Power, RotateCcw, Moon } from 'lucide-react';

interface ShutdownDialogProps {
    onCancel: () => void;
    onShutdown: () => void;
    onRestart: () => void;
    onStandby: () => void;
}

export const ShutdownDialog = ({ onCancel, onShutdown, onRestart, onStandby }: ShutdownDialogProps) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center font-sans">
            {/* Grayscale Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-grayscale transition-all duration-1000"></div>
            
            {/* Dialog */}
            <div className="relative w-[400px] h-[200px] bg-[#003399] rounded-t-lg rounded-b-md shadow-2xl border-2 border-white/20 flex flex-col overflow-hidden animate-pop-in">
                {/* Header */}
                <div className="h-10 flex items-center px-4 text-white text-lg font-bold select-none">
                    Turn off computer
                </div>
                
                {/* Body */}
                <div className="flex-1 bg-gradient-to-b from-[#6D95E9] to-[#4374E0] flex items-center justify-center space-x-8 px-8 border-t border-white/10">
                    
                    {/* Stand By */}
                    <div className="group flex flex-col items-center cursor-pointer" onClick={onStandby}>
                        <div className="w-10 h-10 bg-[#ECCE60] rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg group-hover:brightness-110 transition-all active:scale-95">
                            <Moon size={20} className="text-white fill-white" />
                        </div>
                        <span className="text-white text-xs mt-2 font-bold group-hover:underline shadow-black drop-shadow-md">Stand By</span>
                    </div>

                    {/* Turn Off */}
                    <div className="group flex flex-col items-center cursor-pointer" onClick={onShutdown}>
                        <div className="w-10 h-10 bg-[#E81123] rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg group-hover:brightness-110 transition-all active:scale-95">
                            <Power size={20} className="text-white" />
                        </div>
                        <span className="text-white text-xs mt-2 font-bold group-hover:underline shadow-black drop-shadow-md">Turn Off</span>
                    </div>

                    {/* Restart */}
                    <div className="group flex flex-col items-center cursor-pointer" onClick={onRestart}>
                        <div className="w-10 h-10 bg-[#16A05D] rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg group-hover:brightness-110 transition-all active:scale-95">
                            <RotateCcw size={20} className="text-white" />
                        </div>
                        <span className="text-white text-xs mt-2 font-bold group-hover:underline shadow-black drop-shadow-md">Restart</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-12 bg-[#003399] flex items-center justify-end px-4">
                    <button 
                        onClick={onCancel}
                        className="px-4 py-1 bg-white border border-black rounded-sm shadow-sm hover:bg-gray-100 text-xs font-bold active:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
