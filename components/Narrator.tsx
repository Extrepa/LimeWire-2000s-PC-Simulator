import React, { useState } from 'react';
import { X, Minus, Square, Play } from 'lucide-react';
import { generateSpeech } from '../services/geminiService';

interface NarratorProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    // Added onTouchStart to support mobile window dragging
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const Narrator = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: NarratorProps) => {
    const [text, setText] = useState('Microsoft Sam is the default voice for Windows XP.');
    const [isLoading, setIsLoading] = useState(false);

    const handleSpeak = async () => {
        if (!text.trim()) return;
        setIsLoading(true);
        const audioData = await generateSpeech(text);
        setIsLoading(false);

        if (audioData) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            
            // Base64 decoding manually to ArrayBuffer
            const binaryString = atob(audioData);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Native decode - simpler for this demo than raw PCM parsing if format is WAV/MP3 which gemini usually returns in candidates
            // Actually Gemini returns raw PCM often, but let's try standard decode first or use the raw buffer logic
            // The instructions say it returns raw PCM. Let's assume 24kHz mono based on docs.
            
            // Raw PCM decode logic for Gemini
            const dataInt16 = new Int16Array(bytes.buffer);
            const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
            const channelData = buffer.getChannelData(0);
            for(let i=0; i<dataInt16.length; i++) {
                channelData[i] = dataInt16[i] / 32768.0;
            }

            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start();
        }
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[350px] h-[250px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">Microsoft Narrator</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="p-2 flex flex-col h-full space-y-2">
                <p className="text-gray-700">Narrator will read aloud what is on screen.</p>
                
                <div className="border border-gray-400 p-2 bg-white flex-1">
                    <label className="block mb-1 font-bold text-gray-700">Text to read:</label>
                    <textarea 
                        className="w-full h-24 border border-gray-300 outline-none p-1 resize-none"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button 
                        onClick={handleSpeak}
                        disabled={isLoading}
                        className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[80px] flex items-center justify-center space-x-1"
                    >
                        {isLoading ? (
                            <span>Reading...</span>
                        ) : (
                            <>
                                <Play size={12}/> <span>Voice</span>
                            </>
                        )}
                    </button>
                    <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">Exit</button>
                </div>
            </div>
        </div>
    );
};