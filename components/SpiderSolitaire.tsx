import React, { useState, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface SpiderSolitaireProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

type CardType = {
    suit: 'spades' | 'hearts' | 'clubs' | 'diamonds';
    value: number;
    faceUp: boolean;
    id: string;
};

export const SpiderSolitaire = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: SpiderSolitaireProps) => {
    const [columns, setColumns] = useState<CardType[][]>([]);
    const [stock, setStock] = useState<CardType[]>([]);
    const [selected, setSelected] = useState<{ colIndex: number, cardIndex: number } | null>(null);
    const [score, setScore] = useState(500);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        const newDeck: CardType[] = [];
        for (let d = 0; d < 8; d++) {
            for (let i = 1; i <= 13; i++) {
                newDeck.push({ suit: 'spades', value: i, faceUp: false, id: `card-${d}-${i}-${Math.random()}` });
            }
        }

        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        const newColumns: CardType[][] = Array(10).fill([]).map(() => []);
        
        let cardIdx = 0;
        for (let col = 0; col < 10; col++) {
            const count = col < 4 ? 6 : 5;
            for (let i = 0; i < count; i++) {
                const card = newDeck[cardIdx++];
                if (i === count - 1) card.faceUp = true;
                newColumns[col].push(card);
            }
        }

        setColumns(newColumns);
        setStock(newDeck.slice(cardIdx));
        setScore(500);
        setMoves(0);
    };

    const handleCardClick = (colIndex: number, cardIndex: number) => {
        const col = columns[colIndex];
        const card = col[cardIndex];

        if (!card.faceUp) return;

        if (selected) {
            if (selected.colIndex === colIndex) {
                setSelected(null);
            } else {
                moveCards(selected.colIndex, selected.cardIndex, colIndex);
            }
        } else {
            if (isValidSequence(col, cardIndex)) {
                setSelected({ colIndex, cardIndex });
            }
        }
    };

    const handleColumnClick = (colIndex: number) => {
        if (selected && columns[colIndex].length === 0) {
            moveCards(selected.colIndex, selected.cardIndex, colIndex);
        }
    };

    const isValidSequence = (col: CardType[], startIndex: number) => {
        for (let i = startIndex; i < col.length - 1; i++) {
            if (col[i].value !== col[i+1].value + 1) return false;
        }
        return true;
    };

    const moveCards = (fromColIdx: number, fromCardIdx: number, toColIdx: number) => {
        const fromCol = columns[fromColIdx];
        const toCol = columns[toColIdx];
        const cardsToMove = fromCol.slice(fromCardIdx);
        const targetCard = toCol[toCol.length - 1];

        if (!targetCard || targetCard.value === cardsToMove[0].value + 1) {
            const newColumns = [...columns];
            newColumns[fromColIdx] = fromCol.slice(0, fromCardIdx);
            if (newColumns[fromColIdx].length > 0) {
                newColumns[fromColIdx][newColumns[fromColIdx].length - 1].faceUp = true;
            }
            newColumns[toColIdx] = [...toCol, ...cardsToMove];
            setColumns(newColumns);
            setMoves(m => m + 1);
            setScore(s => Math.max(0, s - 1));
            setSelected(null);
        } else {
            setSelected(null);
        }
    };

    const dealStock = () => {
        if (stock.length === 0) return;
        const newColumns = [...columns];
        const newStock = [...stock];
        for (let i = 0; i < 10; i++) {
            if (newStock.length > 0) {
                const card = newStock.pop()!;
                card.faceUp = true;
                newColumns[i].push(card);
            }
        }
        setColumns(newColumns);
        setStock(newStock);
    };

    const getCardStyle = (card: CardType) => {
        const valStr = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'][card.value - 1];
        return (
            <div className="bg-white w-full h-full rounded border border-gray-400 flex flex-col items-center justify-between p-0.5 select-none shadow-sm relative">
                <div className="self-start text-[10px] font-bold leading-none tracking-tighter">{valStr} ♠</div>
                <div className="text-xl leading-none">♠</div>
                <div className="self-end text-[10px] font-bold rotate-180 leading-none tracking-tighter">{valStr} ♠</div>
            </div>
        );
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[90vw] md:w-[600px] h-[75vh] md:h-[450px] bg-[#007F00] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow"
            onClick={onClick}
        >
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'} cursor-move`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                     <span className="drop-shadow-sm truncate">Spider Solitaire</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-5 h-5 bg-[#0055EA] border border-white/30 rounded flex items-center justify-center text-white">-</button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] border border-white/30 rounded flex items-center justify-center text-white">x</button>
                </div>
            </div>

            <div className="bg-[#EBE9ED] flex space-x-2 px-1 text-black border-b border-gray-400">
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Game</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
                <div className="flex-1"></div>
                <span onClick={initGame} className="text-blue-600 cursor-pointer underline px-2">New Game</span>
            </div>

            <div className="flex-1 p-2 relative overflow-hidden flex flex-col bg-[#007F00]" onClick={() => setSelected(null)}>
                <div className="flex justify-between items-start mb-4 h-20">
                    <div className="relative w-12 h-16" onClick={(e) => { e.stopPropagation(); dealStock(); }}>
                        {stock.length > 0 ? (
                            <div className="absolute top-0 left-0 w-full h-full bg-blue-800 rounded border-2 border-white/30 cursor-pointer shadow-md" style={{backgroundImage: 'repeating-linear-gradient(45deg, #1e40af 10px, #1d4ed8 10px, #1d4ed8 20px)'}}></div>
                        ) : (
                            <div className="w-full h-full border-2 border-green-800 rounded flex items-center justify-center opacity-30 bg-black/10"></div>
                        )}
                    </div>
                    <div className="text-white font-bold text-[10px] sm:text-xs bg-black/20 p-2 rounded">
                        <div>Score: {score}</div>
                        <div>Moves: {moves}</div>
                    </div>
                </div>

                <div className="flex-1 flex justify-between px-1">
                    {columns.map((col, colIdx) => (
                        <div key={colIdx} className="relative w-[9%] h-full" onClick={(e) => { e.stopPropagation(); handleColumnClick(colIdx); }}>
                            <div className="absolute top-0 left-0 w-full h-[60px] border-2 border-green-800 rounded opacity-20"></div>
                            {col.map((card, cardIdx) => (
                                <div 
                                    key={card.id}
                                    onClick={(e) => { e.stopPropagation(); handleCardClick(colIdx, cardIdx); }}
                                    className={`absolute w-full h-[60px] rounded transition-all ${selected?.colIndex === colIdx && selected.cardIndex === cardIdx ? 'ring-2 ring-yellow-400 z-50 brightness-110' : ''}`}
                                    style={{ top: `${cardIdx * 10}px`, zIndex: cardIdx }}
                                >
                                    {card.faceUp ? getCardStyle(card) : (
                                        <div className="w-full h-full bg-blue-800 rounded border border-white/30 shadow-sm" style={{backgroundImage: 'repeating-linear-gradient(45deg, #1e40af 5px, #1d4ed8 5px, #1d4ed8 10px)'}}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="h-5 bg-[#007F00] border-t border-green-600 text-white/50 px-2 flex items-center text-[10px]">
                <span>Spider Solitaire</span>
            </div>
        </div>
    );
};