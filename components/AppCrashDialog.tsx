import React from 'react';
import { X } from 'lucide-react';

interface AppCrashDialogProps {
    onClose: () => void;
    appName: string;
}

export const AppCrashDialog = ({ onClose, appName }: AppCrashDialogProps) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
            <div className="w-[400px] bg-[#ECE9D8] border border-[#0055EA] shadow-xl rounded-t-lg win-shadow flex flex-col font-sans text-xs">
                {/* Title Bar */}
                <div className="h-6 bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA] flex items-center justify-between px-2 select-none">
                    <span className="text-white font-bold">{appName}</span>
                    <button onClick={onClose} className="w-4 h-4 bg-[#E81123] border border-white/50 rounded-sm flex items-center justify-center text-white">
                        <X size={12} />
                    </button>
                </div>

                <div className="p-3">
                    <div className="flex items-start space-x-3 mb-4">
                        <img 
                            src="https://winaero.com/blog/wp-content/uploads/2018/12/windows-xp-error-icon-big.png" 
                            alt="error" 
                            className="w-8 h-8"
                            onError={(e) => { e.currentTarget.style.display='none'; }} 
                        />
                        <div className="w-8 h-8 flex-shrink-0 bg-red-600 rounded-full border-4 border-red-200 flex items-center justify-center text-white font-bold text-xl">X</div>
                        
                        <div className="flex-1">
                            <p className="mb-2 font-bold">{appName} has encountered a problem and needs to close. We are sorry for the inconvenience.</p>
                            <p className="mb-2 text-gray-700">If you were in the middle of something, the information you were working on might be lost.</p>
                            <p className="text-gray-700">Please tell Microsoft about this problem.</p>
                            <p className="text-gray-700 mt-2">We have created an error report that you can send to help us improve {appName}. We will treat this report as confidential and anonymous.</p>
                            <div className="mt-2 text-blue-600 underline cursor-pointer">To see what data this error report contains, click here.</div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4 pt-2 border-t border-gray-300">
                        <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[80px]">Send Error Report</button>
                        <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 min-w-[80px]">Don't Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
