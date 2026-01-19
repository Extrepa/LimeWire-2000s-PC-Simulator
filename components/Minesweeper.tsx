
import React, { useState, useEffect } from 'react';
import { X, Minus, Square, Smile, Frown, Meh } from 'lucide-react';

interface MinesweeperProps {
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

const BOARD_SIZE = 9;
const MINES_COUNT = 10;

type CellState = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
};

export const Minesweeper = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: MinesweeperProps) => {
    const [board, setBoard] = useState<CellState[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    useEffect(() => {
        let interval: any;
        if (timerActive && !gameOver && !win) {
            interval = setInterval(() => setTime(t => Math.min(t + 1, 999)), 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, gameOver, win]);

    const initGame = () => {
        const newBoard: CellState[][] = Array(BOARD_SIZE).fill(null).map(() => 
            Array(BOARD_SIZE).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            }))
        );

        // Place mines
        let minesPlaced = 0;
        while (minesPlaced < MINES_COUNT) {
            const r = Math.floor(Math.random() * BOARD_SIZE);
            const c = Math.floor(Math.random() * BOARD_SIZE);
            if (!newBoard[r][c].isMine) {
                newBoard[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbors
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (newBoard[r][c].isMine) continue;
                let neighbors = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (r + i >= 0 && r + i < BOARD_SIZE && c + j >= 0 && c + j < BOARD_SIZE) {
                            if (newBoard[r + i][c + j].isMine) neighbors++;
                        }
                    }
                }
                newBoard[r][c].neighborMines = neighbors;
            }
        }

        setBoard(newBoard);
        setGameOver(false);
        setWin(false);
        setTime(0);
        setTimerActive(false);
    };

    const handleCellClick = (r: number, c: number) => {
        if (gameOver || win || board[r][c].isFlagged || board[r][c].isRevealed) return;
        
        if (!timerActive) setTimerActive(true);

        const newBoard = [...board];
        
        if (newBoard[r][c].isMine) {
            // Game Over
            newBoard[r][c].isRevealed = true;
            // Reveal all mines
            newBoard.forEach(row => row.forEach(cell => {
                if (cell.isMine) cell.isRevealed = true;
            }));
            setBoard(newBoard);
            setGameOver(true);
        } else {
            revealRecursive(newBoard, r, c);
            setBoard(newBoard);
            checkWin(newBoard);
        }
    };

    const revealRecursive = (board: CellState[][], r: number, c: number) => {
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c].isRevealed || board[r][c].isFlagged) return;
        
        board[r][c].isRevealed = true;
        
        if (board[r][c].neighborMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    revealRecursive(board, r + i, c + j);
                }
            }
        }
    };

    const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        if (gameOver || win || board[r][c].isRevealed) return;
        
        const newBoard = [...board];
        newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
        setBoard(newBoard);
    };

    const checkWin = (currentBoard: CellState[][]) => {
        let unrevealedSafeCells = 0;
        currentBoard.forEach(row => row.forEach(cell => {
            if (!cell.isMine && !cell.isRevealed) unrevealedSafeCells++;
        }));
        if (unrevealedSafeCells === 0) {
            setWin(true);
            setTimerActive(false);
        }
    };

    const getMinesLeft = () => {
        let flagged = 0;
        board.forEach(row => row.forEach(cell => {
            if (cell.isFlagged) flagged++;
        }));
        return Math.max(0, MINES_COUNT - flagged);
    };

    const formatNumber = (num: number) => num.toString().padStart(3, '0');

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute bg-[#C0C0C0] border-2 border-white border-r-gray-500 border-b-gray-500 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-5 mb-1 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-1 pl-1">
                     <div className="w-3 h-3 bg-black/20 rounded-sm"></div>
                     <span className="font-bold drop-shadow-sm">Minesweeper</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-4 h-4 bg-[#C0C0C0] border border-white border-b-gray-500 border-r-gray-500 active:border-t-gray-500 active:border-l-gray-500 flex items-center justify-center"><Minus size={10} color="black"/></button>
                     <button onClick={onClose} className="w-4 h-4 bg-[#C0C0C0] border border-white border-b-gray-500 border-r-gray-500 active:border-t-gray-500 active:border-l-gray-500 flex items-center justify-center"><X size={12} color="black"/></button>
                </div>
            </div>
            
            {/* Menu */}
            <div className="flex space-x-2 px-1 mb-1 text-black">
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Game</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Help</span>
            </div>

            {/* Game Container */}
            <div className="border-[3px] border-gray-400 border-r-white border-b-white p-1">
                {/* Header */}
                <div className="flex justify-between items-center bg-[#C0C0C0] border-[2px] border-gray-400 border-r-white border-b-white p-1 mb-1">
                    <div className="bg-black text-red-600 font-mono text-xl w-12 text-center border border-gray-500 border-b-white border-r-white shadow-inner">
                        {formatNumber(getMinesLeft())}
                    </div>
                    <button 
                        onClick={initGame}
                        onMouseDown={() => setIsMouseDown(true)}
                        onMouseUp={() => setIsMouseDown(false)}
                        className="w-6 h-6 border-[2px] border-white border-r-gray-500 border-b-gray-500 active:border-t-gray-500 active:border-l-gray-500 flex items-center justify-center bg-[#C0C0C0]"
                    >
                        {gameOver ? <Frown size={16} fill="yellow" /> : win ? <div className="text-black font-bold">8)</div> : isMouseDown ? <Meh size={16} fill="yellow"/> : <Smile size={16} fill="yellow"/>}
                    </button>
                    <div className="bg-black text-red-600 font-mono text-xl w-12 text-center border border-gray-500 border-b-white border-r-white shadow-inner">
                        {formatNumber(time)}
                    </div>
                </div>

                {/* Grid */}
                <div className="border-[3px] border-gray-400 border-r-white border-b-white">
                    {board.map((row, r) => (
                        <div key={r} className="flex">
                            {row.map((cell, c) => (
                                <div 
                                    key={c}
                                    className={`
                                        w-4 h-4 flex items-center justify-center font-bold text-[10px] leading-none cursor-default
                                        ${cell.isRevealed 
                                            ? 'border border-gray-400 text-black' // Revealed
                                            : 'border-[2px] border-white border-r-gray-500 border-b-gray-500 bg-[#C0C0C0]' // Hidden
                                        }
                                    `}
                                    onMouseDown={() => setIsMouseDown(true)}
                                    onMouseUp={() => setIsMouseDown(false)}
                                    onClick={() => handleCellClick(r, c)}
                                    onContextMenu={(e) => handleRightClick(e, r, c)}
                                >
                                    {cell.isRevealed ? (
                                        cell.isMine ? <div className="w-3 h-3 bg-black rounded-full"></div> :
                                        cell.neighborMines > 0 ? <span style={{ color: ['blue', 'green', 'red', 'darkblue', 'brown', 'cyan', 'black', 'gray'][cell.neighborMines - 1] }}>{cell.neighborMines}</span> : ''
                                    ) : (
                                        cell.isFlagged ? <span className="text-red-600">P</span> : ''
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
