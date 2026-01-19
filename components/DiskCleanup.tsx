import React, { useState, useEffect } from 'react';
import { X, HardDrive, RefreshCw, ShieldCheck } from './Icons';

interface DiskCleanupProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    zIndex: number;
    active: boolean;
    onClick: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}

export const DiskCleanup = ({ onClose, onMinimize, position, zIndex, active, onClick, onMouseDown, onTouchStart }: DiskCleanupProps) => {
    const [step, setStep] = useState<'calculating' | 'ready' | 'cleaning' | 'done'>('calculating');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (step === 'calculating') {
            const timer = setTimeout(() => setStep('ready'), 3000);
            return () => clearTimeout(timer);
        }
        if (step === 'cleaning') {
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        setStep('done');
                        return 100;
                    }
                    return p + Math.random() * 5;
                });
            }, 150);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[95vw] md:w-[380px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-[#000080]' : 'bg-[#7899CC]'} cursor-move`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <HardDrive size={12} />
                     <span className="drop-shadow-sm text-[11px]">Disk Cleanup</span>
                </div>
                <div className="flex space-x-0.5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
                      className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center font-bold"
                    >-</button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onClose(); }} 
                      className="w-4 h-4 bg-[#ECE9D8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center font-bold"
                    >x</button>
                </div>
            </div>

            <div className="flex-1 bg-[#ECE9D8] p-4 flex flex-col min-h-[250px]">
                {step === 'calculating' && (
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <HardDrive size={32} className="text-blue-700 flex-shrink-0" />
                            <div>
                                <p className="font-bold">Disk Cleanup is calculating how much space you will be able to free on Local Disk (C:).</p>
                                <p className="mt-2 text-[10px] text-gray-600">This may take a few minutes.</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-blue-900">Calculating...</p>
                            <div className="w-full h-4 bg-white border border-gray-500 relative overflow-hidden">
                                <div className="h-full bg-blue-600 animate-pulse w-1/3 transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.5)]"></div>
                            </div>
                            <p className="text-gray-600 italic text-[10px]">Scanning: Temporary Internet Files</p>
                        </div>
                    </div>
                )}

                {step === 'ready' && (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <HardDrive size={32} className="text-blue-700 flex-shrink-0" />
                            <div>
                                <p>You can use Disk Cleanup to free up to <span className="font-bold">124.5 MB</span> of disk space on Local Disk (C:).</p>
                            </div>
                        </div>
                        <div className="border border-gray-400 bg-white h-32 overflow-y-auto p-1 shadow-inner scrollbar-retro">
                            <div className="flex items-center space-x-2 p-1 hover:bg-blue-50">
                                <input type="checkbox" defaultChecked />
                                <span className="flex-1">Downloaded Program Files</span>
                                <span className="font-bold">0 KB</span>
                            </div>
                            <div className="flex items-center space-x-2 p-1 hover:bg-blue-50">
                                <input type="checkbox" defaultChecked />
                                <span className="flex-1">Temporary Internet Files</span>
                                <span className="font-bold">42.1 MB</span>
                            </div>
                            <div className="flex items-center space-x-2 p-1 hover:bg-blue-50">
                                <input type="checkbox" defaultChecked />
                                <span className="flex-1">Recycle Bin</span>
                                <span className="font-bold">12.4 MB</span>
                            </div>
                            <div className="flex items-center space-x-2 p-1 hover:bg-blue-50">
                                <input type="checkbox" defaultChecked />
                                <span className="flex-1">LimeWire Shared Cache</span>
                                <span className="font-bold">70.0 MB</span>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-300">
                            <button onClick={() => setStep('cleaning')} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 font-bold active:translate-y-[1px]">OK</button>
                            <button onClick={onClose} className="px-6 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 active:translate-y-[1px]">Cancel</button>
                        </div>
                    </div>
                )}

                {step === 'cleaning' && (
                    <div className="space-y-4 py-4">
                        <div className="flex items-center space-x-3">
                             <RefreshCw size={24} className="text-blue-600 animate-spin flex-shrink-0" />
                             <p className="font-bold text-blue-900">The Disk Cleanup utility is cleaning up unnecessary files on your machine.</p>
                        </div>
                        <div className="w-full h-5 bg-white border border-gray-500 relative overflow-hidden shadow-inner">
                             <div className="h-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 transition-all duration-100 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]" style={{width: `${progress}%`}}></div>
                        </div>
                        <p className="text-center font-bold text-gray-600">Cleaning: Temporary files ({Math.floor(progress)}%)</p>
                    </div>
                )}

                {step === 'done' && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8 animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg animate-bounce">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-blue-900 text-lg">Clean Complete!</p>
                            <p className="text-gray-600 text-[10px]">Your disk is now optimized for sharing.</p>
                        </div>
                        <button onClick={onClose} className="px-10 py-1.5 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 font-bold hover:brightness-105 active:translate-y-[1px]">Finish</button>
                    </div>
                )}
            </div>
        </div>
    );
};