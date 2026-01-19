
import React, { useState, useEffect } from 'react';
import { X, Minus, Square, RotateCcw } from 'lucide-react';

interface TicTacToeProps {
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

export const TicTacToe = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: TicTacToeProps) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = (squares: any[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        const w = checkWinner(newBoard);
        if (w) setWinner(w);
        else setXIsNext(!xIsNext);
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
    };

    // Computer move (simple random)
    useEffect(() => {
        if (!xIsNext && !winner) {
            const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
            if (emptyIndices.length > 0) {
                const timer = setTimeout(() => {
                    const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                    if (randomIdx !== null) handleClick(randomIdx);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [xIsNext, winner, board]);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[250px] h-[300px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">Tic Tac Toe</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="flex-1 p-4 flex flex-col items-center justify-center bg-[#ECE9D8]">
                <div className="mb-4 text-sm font-bold text-[#0055EA]">
                    {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X (You)' : 'O (CPU)'}`}
                </div>
                
                <div className="grid grid-cols-3 gap-1 bg-gray-400 border border-gray-500 p-1">
                    {board.map((cell, i) => (
                        <div 
                            key={i} 
                            onClick={() => handleClick(i)}
                            className="w-16 h-16 bg-white flex items-center justify-center text-3xl font-bold cursor-pointer hover:bg-gray-100"
                        >
                            <span className={cell === 'X' ? 'text-red-600' : 'text-blue-600'}>{cell}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={reset}
                    className="mt-4 flex items-center space-x-1 px-3 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200"
                >
                    <RotateCcw size={12} />
                    <span>Restart Game</span>
                </button>
            </div>
        </div>
    );
};
