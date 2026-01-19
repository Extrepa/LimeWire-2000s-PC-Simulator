
import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, RotateCcw } from 'lucide-react';

interface SnakeProps {
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

const GRID_SIZE = 20;
const SPEED = 100;

export const Snake = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: SnakeProps) => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 5 });
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [paused, setPaused] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const moveSnake = () => {
        if (gameOver || paused) return;

        const newSnake = [...snake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        // Check walls
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            setGameOver(true);
            return;
        }

        // Check self
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            setScore(s => s + 10);
            setFood({
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 20)
            });
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    useEffect(() => {
        const interval = setInterval(moveSnake, SPEED);
        return () => clearInterval(interval);
    }, [snake, direction, gameOver, paused]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!active) return;
            switch (e.key) {
                case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
                case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
                case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
                case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
                case ' ': setPaused(p => !p); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, active]);

    // Draw
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        // Bg
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 400, 400);

        // Snake
        ctx.fillStyle = '#00FF00';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
        });

        // Food
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);

    }, [snake, food]);

    const reset = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection({ x: 1, y: 0 });
        setGameOver(false);
        setScore(0);
        setPaused(false);
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[410px] h-[460px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">Snake</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="flex-1 p-1 bg-[#ECE9D8] flex flex-col items-center">
                <div className="flex justify-between w-full px-2 mb-1 font-bold text-gray-700">
                    <span>Score: {score}</span>
                    <span>{paused ? 'PAUSED' : gameOver ? 'GAME OVER' : 'PLAYING'}</span>
                </div>
                <div className="relative border-4 border-gray-500">
                    <canvas ref={canvasRef} width={400} height={400} />
                    {gameOver && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                            <div className="text-center">
                                <h2 className="text-red-500 text-2xl font-bold mb-4 font-mono">GAME OVER</h2>
                                <button 
                                    onClick={reset}
                                    className="px-4 py-2 bg-white border-2 border-gray-400 font-bold hover:bg-gray-200"
                                >
                                    Play Again
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-1 text-[10px] text-gray-500">Use Arrow Keys to move. Space to Pause.</div>
            </div>
        </div>
    );
};
