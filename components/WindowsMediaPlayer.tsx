
import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Play, Pause, SkipBack, SkipForward, Volume2, Square as Stop, Disc, List, Radio, Maximize2, Minimize2, Volume1, VolumeX } from 'lucide-react';
import { LibraryItem } from '../types';

interface WindowsMediaPlayerProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    // Added onTouchStart to support mobile window dragging
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
    currentTrack: LibraryItem | null;
    playlist: LibraryItem[];
    onSelectTrack: (item: LibraryItem) => void;
}

export const WindowsMediaPlayer = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick, currentTrack, playlist, onSelectTrack }: WindowsMediaPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFullViz, setIsFullViz] = useState(false);
    const [vizMode, setVizMode] = useState<'ambience' | 'bars' | 'battery'>('ambience');
    const [volume, setVolume] = useState(0.8);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Audio Sync Logic
    useEffect(() => {
        if (currentTrack) {
            setIsPlaying(true);
            setProgress(0);
        }
    }, [currentTrack]);

    useEffect(() => {
        let anim: number;
        const drawViz = () => {
          if (!canvasRef.current) return;
          const ctx = canvasRef.current.getContext('2d');
          if (!ctx) return;
          const w = canvasRef.current.width;
          const h = canvasRef.current.height;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.fillRect(0, 0, w, h);
          
          if (isPlaying) {
            const time = Date.now() / 1000;
            const cx = w / 2;
            const cy = h / 2;
            
            if (vizMode === 'ambience') {
                for (let i = 0; i < 15; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = `hsla(${(time * 50 + i * 24) % 360}, 100%, 50%, 0.4)`;
                    ctx.lineWidth = 3;
                    const r = 30 + i * 18 + Math.sin(time * 2 + i) * 25;
                    ctx.ellipse(cx, cy, r, r * 0.7, Math.sin(time + i) * 2, 0, Math.PI * 2);
                    ctx.stroke();
                }
            } else if (vizMode === 'bars') {
                const barWidth = w / 40;
                for(let i=0; i<40; i++) {
                    const bh = Math.abs(Math.sin(time * 4 + i * 0.4)) * (h * 0.9);
                    ctx.fillStyle = `hsl(${(i * 9 + time * 60) % 360}, 100%, 50%)`;
                    ctx.fillRect(i * barWidth, h - bh, barWidth - 1, bh);
                }
            } else {
                ctx.beginPath();
                ctx.moveTo(0, h/2);
                for(let i=0; i<w; i+=8) {
                    const y = h/2 + Math.sin(i * 0.04 + time * 6) * 60 + (Math.random() - 0.5) * 30;
                    ctx.lineTo(i, y);
                    ctx.strokeStyle = '#00FF00';
                    ctx.lineWidth = 2;
                }
                ctx.stroke();
            }
          }
        };

        const loop = () => {
            if (isPlaying) { setProgress(prev => (prev + 0.1) % 100); }
            drawViz();
            anim = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(anim);
    }, [isPlaying, vizMode]);

    const handleNext = () => {
        const idx = playlist.findIndex(t => t.id === currentTrack?.id);
        if (idx < playlist.length - 1) onSelectTrack(playlist[idx + 1]);
        else onSelectTrack(playlist[0]);
    };

    const handlePrev = () => {
        const idx = playlist.findIndex(t => t.id === currentTrack?.id);
        if (idx > 0) onSelectTrack(playlist[idx - 1]);
        else onSelectTrack(playlist[playlist.length - 1]);
    };

    return (
        <div style={{ left: position.x, top: position.y, zIndex }} className="absolute w-[95vw] md:w-[700px] h-[75vh] md:h-[520px] flex flex-col win-shadow rounded-t-xl overflow-hidden bg-[#2C5896] border-2 border-[#1E3C6B]" onClick={onClick}>
            {/* Added onTouchStart for mobile window dragging */}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className="h-9 bg-gradient-to-r from-[#2C5896] via-[#5F8DD3] to-[#2C5896] flex items-center justify-between px-2 cursor-move border-b border-[#7AA3E0]">
                <div className="flex items-center text-white space-x-2 pl-2">
                     <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-inner"><div className="w-3 h-3 bg-blue-600"></div></div>
                     <span className="font-bold italic text-base tracking-tight">Windows Media Player</span>
                </div>
                <div className="flex space-x-1">
                     <button onClick={onMinimize} className="w-6 h-6 bg-[#2C5896] hover:bg-blue-400 rounded-sm flex items-center justify-center text-white border border-white/20"><Minus size={14}/></button>
                     <button onClick={onClose} className="w-6 h-6 bg-[#E81123] hover:bg-red-400 rounded-sm flex items-center justify-center text-white border border-white/20"><X size={14}/></button>
                </div>
            </div>

            <div className="bg-[#1D3B63] h-8 flex items-center px-4 space-x-6 text-white/80 text-[10px] font-bold uppercase tracking-widest border-b border-black/20 shadow-inner">
                <span className="text-white border-b-2 border-white pb-1 cursor-pointer">Now Playing</span>
                <span className="hover:text-white cursor-pointer transition-colors">Library</span>
                <span className="hover:text-white cursor-pointer transition-colors">Rip</span>
                <span className="hover:text-white cursor-pointer transition-colors">Burn</span>
            </div>

            <div className="flex-1 bg-black relative flex overflow-hidden">
                <div className={`transition-all duration-500 ${isFullViz ? 'flex-1' : 'flex-1'} relative`}>
                    <canvas ref={canvasRef} width={600} height={400} className="w-full h-full object-cover" />
                    <button onClick={() => setIsFullViz(!isFullViz)} className="absolute top-4 right-4 text-white/30 hover:text-white bg-black/40 p-1 rounded transition-colors z-20">
                        {isFullViz ? <Minimize2 size={20}/> : <Maximize2 size={20}/>}
                    </button>
                    {!isFullViz && (
                        <div className="absolute bottom-4 left-4 flex space-x-2 z-20">
                            <button onClick={() => setVizMode('ambience')} className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest transition-all ${vizMode==='ambience' ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-black/50 text-white/50'}`}>Ambience</button>
                            <button onClick={() => setVizMode('bars')} className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest transition-all ${vizMode==='bars' ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-black/50 text-white/50'}`}>Bars</button>
                            <button onClick={() => setVizMode('battery')} className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest transition-all ${vizMode==='battery' ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-black/50 text-white/50'}`}>Battery</button>
                        </div>
                    )}
                    {currentTrack && (
                         <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-sm p-3 rounded border border-white/10">
                            <div className="text-blue-400 font-black text-xs uppercase tracking-tighter mb-1">Current Track</div>
                            <div className="text-white font-bold text-lg leading-tight truncate max-w-[250px]">{currentTrack.filename}</div>
                            <div className="text-gray-400 text-[10px] italic">Artist: {currentTrack.artist}</div>
                         </div>
                    )}
                </div>

                {!isFullViz && (
                    <div className="w-64 bg-[#DDEAF7] flex flex-col border-l border-white/20 shadow-xl overflow-hidden">
                        <div className="bg-[#6B91C9] text-white px-3 py-2 font-black text-[10px] uppercase tracking-widest shadow-md flex items-center justify-between">
                            <span>Playlist</span>
                            <List size={12}/>
                        </div>
                        <div className="flex-1 overflow-y-auto p-1 scrollbar-retro bg-white/50">
                            {playlist.map((t, i) => (
                                <div 
                                    key={t.id} 
                                    onClick={() => onSelectTrack(t)}
                                    className={`p-2 text-[11px] truncate cursor-pointer rounded mb-0.5 transition-colors ${t.id === currentTrack?.id ? 'bg-[#2C5896] text-white font-bold shadow-sm' : 'text-gray-700 hover:bg-blue-100'}`}
                                >
                                    <span className="mr-2 opacity-50">{i + 1}.</span>
                                    {t.filename}
                                </div>
                            ))}
                        </div>
                        <div className="p-2 bg-[#DDEAF7] border-t border-gray-300 text-[9px] text-gray-500 font-bold text-center">
                            TOTAL: {playlist.length} TRACKS
                        </div>
                    </div>
                )}
            </div>

            <div className="h-2 bg-[#162E4D] cursor-pointer group relative">
                <div className="h-full bg-blue-400 shadow-[0_0_10px_#60A5FA] transition-all duration-100" style={{width: `${progress}%`}}></div>
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-600 shadow-md opacity-0 group-hover:opacity-100 cursor-grab" style={{left: `${progress}%`}}></div>
            </div>

            <div className="h-24 bg-gradient-to-b from-[#2C5896] via-[#1E3C6B] to-[#122442] flex items-center justify-center relative border-t border-[#4B7BC2] px-6">
                <div className="flex items-center space-x-6">
                    <button onClick={handlePrev} className="text-[#7AA3E0] hover:text-white transition-transform active:scale-90"><SkipBack size={28} fill="currentColor"/></button>
                    <div onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-gradient-to-b from-[#7AA3E0] to-[#2C5896] border-2 border-white/50 flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-xl active:brightness-90">
                        {isPlaying ? <Pause size={36} className="text-white fill-white"/> : <Play size={36} className="text-white fill-white ml-2"/>}
                    </div>
                    <button onClick={() => setIsPlaying(false)} className="text-[#7AA3E0] hover:text-white transition-transform active:scale-90"><Stop size={24} fill="currentColor"/></button>
                    <button onClick={handleNext} className="text-[#7AA3E0] hover:text-white transition-transform active:scale-90"><SkipForward size={28} fill="currentColor"/></button>
                </div>
                <div className="absolute right-8 flex items-center space-x-3 group">
                    {volume === 0 ? <VolumeX size={20} className="text-red-400" onClick={() => setVolume(0.8)}/> : 
                     volume < 0.5 ? <Volume1 size={20} className="text-[#7AA3E0]"/> : 
                     <Volume2 size={20} className="text-[#7AA3E0]"/>}
                    <div className="w-24 h-1.5 bg-[#162E4D] rounded-full overflow-hidden border border-white/10 relative cursor-pointer">
                        <input 
                            type="range" 
                            min="0" max="1" step="0.1" 
                            value={volume} 
                            onChange={e => setVolume(parseFloat(e.target.value))}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="h-full bg-blue-500 shadow-lg" style={{width: `${volume * 100}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
