import React, { useState, useEffect, useRef } from 'react';
import { X, Play } from 'lucide-react';

interface RunDialogProps {
    onClose: () => void;
    onRun: (command: string) => void;
}

export const RunDialog = ({ onClose, onRun }: RunDialogProps) => {
    const [command, setCommand] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRun(command);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-end left-0 bottom-10 pb-10 pl-4 pointer-events-none">
            {/* Positioned relative to start menu roughly */}
            <div className="pointer-events-auto w-[350px] bg-[#ECE9D8] border border-[#0055EA] shadow-xl rounded-t-lg win-shadow font-sans text-xs">
                {/* Header */}
                <div className="h-6 bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA] flex items-center justify-between px-2 select-none">
                     <span className="text-white font-bold">Run</span>
                     <button onClick={onClose} className="w-4 h-4 bg-[#E81123] border border-white/50 rounded-sm flex items-center justify-center text-white">
                        <X size={12} />
                     </button>
                </div>

                {/* Body */}
                <div className="p-3 flex flex-col space-y-3">
                    <div className="flex space-x-3">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-[#3277BC] rounded-md flex items-center justify-center border-2 border-white shadow-md">
                                <Play size={20} className="text-white ml-0.5" />
                            </div>
                        </div>
                        <p className="text-gray-700 leading-tight">
                            Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <span className="font-bold">Open:</span>
                        <input 
                            ref={inputRef}
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className="flex-1 border border-gray-500 p-0.5 outline-none"
                            list="run-history"
                        />
                        <datalist id="run-history">
                            <option value="cmd" />
                            <option value="notepad" />
                            <option value="calc" />
                            <option value="explorer" />
                            <option value="solitaire" />
                            <option value="mspaint" />
                            <option value="iexplore" />
                            <option value="limewire" />
                            <option value="winamp" />
                        </datalist>
                    </form>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button onClick={handleSubmit} className="w-20 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">OK</button>
                        <button onClick={onClose} className="w-20 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">Cancel</button>
                        <button className="w-20 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">Browse...</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
