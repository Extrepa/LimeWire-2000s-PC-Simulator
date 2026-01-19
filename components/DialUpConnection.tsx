import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Phone, Settings } from 'lucide-react';

interface DialUpProps {
    onClose: () => void;
    onConnect: () => void;
}

export const DialUpConnection = ({ onClose, onConnect }: DialUpProps) => {
    const [status, setStatus] = useState<'idle' | 'dialing' | 'verifying' | 'connected'>('idle');
    const [progress, setProgress] = useState(0);

    const handleConnect = () => {
        setStatus('dialing');
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 5;
            setProgress(p);
            if (p >= 60 && status !== 'verifying') setStatus('verifying');
            if (p >= 100) {
                clearInterval(interval);
                onConnect();
            }
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="w-[350px] bg-[#ECE9D8] border border-[#0055EA] shadow-2xl rounded-t-lg overflow-hidden win-shadow font-sans text-xs">
                <div className="h-6 bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA] flex items-center justify-between px-2 select-none">
                    <span className="text-white font-bold">Connect My Connection</span>
                    <button onClick={onClose} className="w-4 h-4 bg-[#E81123] border border-white/50 rounded-sm flex items-center justify-center text-white">
                        <X size={12} />
                    </button>
                </div>

                <div className="p-4 flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#3277BC] rounded border-2 border-white shadow flex items-center justify-center">
                            <Phone size={32} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold mb-1">User name: Administrator</p>
                            <p className="font-bold">Password: [*******]</p>
                        </div>
                    </div>

                    <div className="border border-gray-400 bg-white p-2">
                         {status === 'idle' ? (
                             <div className="space-y-2">
                                 <div className="flex items-center justify-between">
                                     <span>Dial:</span>
                                     <input defaultValue="0845 123 4567" className="border border-gray-300 px-1 w-40" />
                                 </div>
                                 <div className="flex items-center space-x-2">
                                     <input type="checkbox" defaultChecked />
                                     <span>Save password</span>
                                 </div>
                             </div>
                         ) : (
                             <div className="space-y-2 py-2">
                                 <div className="font-bold text-blue-700">
                                     {status === 'dialing' && 'Dialing 0845 123 4567...'}
                                     {status === 'verifying' && 'Verifying username and password...'}
                                 </div>
                                 <div className="w-full h-4 bg-gray-200 border border-gray-500 relative">
                                     <div className="h-full bg-blue-600 transition-all duration-300" style={{width: `${progress}%`}}></div>
                                 </div>
                             </div>
                         )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-gray-300">
                        <button onClick={handleConnect} disabled={status !== 'idle'} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 disabled:opacity-50">Dial</button>
                        <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">Cancel</button>
                        <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200"><Settings size={12}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
