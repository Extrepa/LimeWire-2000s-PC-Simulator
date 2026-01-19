import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react';
import { LibraryItem } from '../types';

interface MediaPlayerProps {
  currentTrack: LibraryItem | null;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio Object
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  // Handle Track Changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      // Use the item's specific URL or a default fallback if missing
      const src = currentTrack.audioUrl || 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg';
      
      if (audioRef.current.src !== src) {
          audioRef.current.src = src;
          audioRef.current.load();
      }
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
            .then(() => setIsPlaying(true))
            .catch(error => {
                if (error.name === 'AbortError' || error.message?.includes('aborted')) {
                    // Ignore aborts
                } else {
                    console.error("Playback failed:", error);
                    setIsPlaying(false);
                }
            });
      }
    } else if (!currentTrack && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
    }
  }, [currentTrack]);

  // Handle Play/Pause Toggle
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name !== 'AbortError' && !error.message?.includes('aborted')) {
                    setIsPlaying(false);
                }
            });
        }
    } else {
        audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle Volume Changes
  useEffect(() => {
      if (audioRef.current) {
          audioRef.current.volume = volume;
      }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      const prog = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(prog) ? 0 : prog);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (audioRef.current) {
          const newTime = (Number(e.target.value) / 100) * duration;
          audioRef.current.currentTime = newTime;
          setProgress(Number(e.target.value));
      }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="h-16 bg-[#D4D0C8] border-t border-white flex items-center px-4 shadow-[inset_0_1px_0_white] select-none">
      {/* Controls */}
      <div className="flex items-center space-x-2 mr-4">
        <button className="p-1 border border-gray-400 rounded bg-[#EBE9ED] hover:bg-white active:border-gray-800 shadow-sm active:shadow-inner">
          <SkipBack size={16} fill="black" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={!currentTrack}
          className="p-1 border border-gray-400 rounded bg-[#EBE9ED] hover:bg-white active:border-gray-800 shadow-sm active:shadow-inner disabled:opacity-50"
        >
          {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" />}
        </button>
        <button className="p-1 border border-gray-400 rounded bg-[#EBE9ED] hover:bg-white active:border-gray-800 shadow-sm active:shadow-inner">
          <SkipForward size={16} fill="black" />
        </button>
      </div>

      {/* Track Info & Visualizer */}
      <div className="flex-1 bg-black border-2 border-gray-500 h-10 px-2 flex items-center relative overflow-hidden font-mono group">
        <div className="absolute inset-0 flex items-end opacity-40 pointer-events-none">
            {/* Fake Visualizer bars */}
            {isPlaying && Array.from({ length: 40 }).map((_, i) => (
                <div 
                    key={i} 
                    className="flex-1 bg-lime-500 mx-[1px] transition-all duration-75 ease-out"
                    style={{ height: `${Math.random() * 100}%` }}
                />
            ))}
        </div>
        
        <div className="z-10 w-full flex items-center justify-between text-lime-400 text-xs">
            <span className="truncate max-w-[60%]">
                 {currentTrack ? `Playing: ${currentTrack.filename} (${currentTrack.bitrate})` : "Ready to play..."}
            </span>
            <span className="font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
            </span>
        </div>
        
        {/* Seek Bar (overlay) */}
        <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleSeek}
            disabled={!currentTrack}
            className="absolute bottom-0 left-0 w-full h-1 bg-transparent appearance-none cursor-pointer z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-lime-300"
        />
        <div className="absolute bottom-0 left-0 h-0.5 bg-lime-600 transition-all duration-200" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Volume */}
      <div className="ml-4 flex items-center w-24 space-x-1 group">
        <button onClick={() => setVolume(v => v === 0 ? 0.8 : 0)}>
            {volume === 0 ? <VolumeX size={16} className="text-gray-600"/> : <Volume2 size={16} className="text-gray-600" />}
        </button>
        <input 
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#EBE9ED] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-500"
        />
      </div>
    </div>
  );
};

export default MediaPlayer;
