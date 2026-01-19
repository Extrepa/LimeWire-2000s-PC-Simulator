
import React, { useState, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface SolitaireProps {
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

type CardType = {
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
    value: number; // 1 (Ace) to 13 (King)
    faceUp: boolean;
    id: string;
    color: 'red' | 'black';
};

export const Solitaire = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: SolitaireProps) => {
    const [deck, setDeck] = useState<CardType[]>([]);
    const [waste, setWaste] = useState<CardType[]>([]);
    const [foundations, setFoundations] = useState<CardType[][]>([[], [], [], []]);
    const [tableau, setTableau] = useState<CardType[][]>([[], [], [], [], [], [], []]);
    const [selected, setSelected] = useState<{ pile: string, index: number, card: CardType } | null>(null);

    // Initial Setup
    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
        const newDeck: CardType[] = [];
        suits.forEach(suit => {
            for (let i = 1; i <= 13; i++) {
                newDeck.push({
                    suit,
                    value: i,
                    faceUp: false,
                    id: `${suit}-${i}`,
                    color: (suit === 'hearts' || suit === 'diamonds') ? 'red' : 'black'
                });
            }
        });
        
        // Shuffle
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        const newTableau: CardType[][] = [[], [], [], [], [], [], []];
        
        // Deal Tableau
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j <= i; j++) {
                const card = newDeck.pop();
                if (card) {
                    card.faceUp = (j === i);
                    newTableau[i].push(card);
                }
            }
        }

        setDeck(newDeck);
        setWaste([]);
        setFoundations([[], [], [], []]);
        setTableau(newTableau);
        setSelected(null);
    };

    const drawCard = () => {
        if (deck.length > 0) {
            const card = deck[deck.length - 1];
            const newDeck = deck.slice(0, -1);
            const newWaste = [...waste, { ...card, faceUp: true }];
            setDeck(newDeck);
            setWaste(newWaste);
        } else {
            // Recycle waste
            const newDeck = [...waste].map(c => ({ ...c, faceUp: false })).reverse();
            setDeck(newDeck);
            setWaste([]);
        }
        setSelected(null);
    };

    const moveCard = (toPile: string, toIndex: number | null) => {
        if (!selected) return;

        // Validation Logic
        let validMove = false;
        
        // Foundations logic
        if (toPile.startsWith('foundation')) {
            const fIdx = parseInt(toPile.split('-')[1]);
            const targetPile = foundations[fIdx];
            const topCard = targetPile[targetPile.length - 1];
            
            // Only allow single cards to foundation
            if (selected.pile.startsWith('tableau') && selected.index !== tableau[parseInt(selected.pile.split('-')[1])].length - 1) return;

            if (!topCard) {
                if (selected.card.value === 1) validMove = true;
            } else {
                if (selected.card.suit === topCard.suit && selected.card.value === topCard.value + 1) validMove = true;
            }
            
            if (validMove) {
                // Execute Move
                updateGameStateAfterMove(toPile, fIdx, [selected.card]);
            }
        } 
        // Tableau Logic
        else if (toPile.startsWith('tableau')) {
            const tIdx = parseInt(toPile.split('-')[1]);
            const targetPile = tableau[tIdx];
            const topCard = targetPile[targetPile.length - 1];

            if (!topCard) {
                if (selected.card.value === 13) validMove = true; // King only on empty
            } else {
                if (selected.card.color !== topCard.color && selected.card.value === topCard.value - 1) validMove = true;
            }

            if (validMove) {
                // Get stack if moving from tableau
                let cardsToMove = [selected.card];
                if (selected.pile.startsWith('tableau')) {
                    const sIdx = parseInt(selected.pile.split('-')[1]);
                    cardsToMove = tableau[sIdx].slice(selected.index);
                }
                updateGameStateAfterMove(toPile, tIdx, cardsToMove);
            }
        }

        if (!validMove) setSelected(null);
    };

    const updateGameStateAfterMove = (toPileType: string, toIdx: number, cards: CardType[]) => {
        // Remove from source
        if (selected!.pile === 'waste') {
            setWaste(prev => prev.slice(0, -1));
        } else if (selected!.pile.startsWith('tableau')) {
            const sIdx = parseInt(selected!.pile.split('-')[1]);
            setTableau(prev => {
                const newT = [...prev];
                newT[sIdx] = newT[sIdx].slice(0, selected!.index);
                // Reveal new top card if any
                if (newT[sIdx].length > 0) {
                    newT[sIdx][newT[sIdx].length - 1].faceUp = true;
                }
                return newT;
            });
        }

        // Add to dest
        if (toPileType.startsWith('foundation')) {
            setFoundations(prev => {
                const newF = [...prev];
                newF[toIdx] = [...newF[toIdx], ...cards];
                return newF;
            });
        } else if (toPileType.startsWith('tableau')) {
            setTableau(prev => {
                const newT = [...prev];
                newT[toIdx] = [...newT[toIdx], ...cards];
                return newT;
            });
        }
        
        setSelected(null);
    };

    const handleCardClick = (card: CardType, pile: string, index: number) => {
        if (!card.faceUp) {
            // If it's the top unrevealed card in tableau, allow clicking? No, usually not in Klondike unless scripting.
            // But we handle reveal on move.
            return;
        }

        if (selected && selected.card.id === card.id) {
            setSelected(null);
        } else if (selected) {
            moveCard(pile, index);
        } else {
            setSelected({ pile, index, card });
        }
    };

    const handleEmptyPileClick = (pile: string) => {
        if (selected) {
            moveCard(pile, null);
        }
    };

    const renderCard = (card: CardType | null, pile: string, index: number, style?: React.CSSProperties) => {
        if (!card) return <div onClick={() => handleEmptyPileClick(pile)} className="w-[50px] h-[70px] border border-green-800 rounded opacity-50" style={style}></div>;

        const isSelected = selected?.card.id === card.id;

        return (
            <div 
                key={card.id}
                onClick={(e) => { e.stopPropagation(); handleCardClick(card, pile, index); }}
                className={`
                    absolute w-[50px] h-[70px] bg-white border border-gray-400 rounded shadow-sm flex flex-col items-center justify-between p-1 select-none cursor-pointer
                    ${isSelected ? 'brightness-90 ring-2 ring-yellow-400 z-50' : ''}
                `}
                style={style}
            >
                {card.faceUp ? (
                    <>
                        <div className={`text-xs font-bold self-start leading-none ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                            {['A','2','3','4','5','6','7','8','9','10','J','Q','K'][card.value - 1]}
                            <div className="text-[10px]">{getSuitSymbol(card.suit)}</div>
                        </div>
                        <div className={`text-lg ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>{getSuitSymbol(card.suit)}</div>
                        <div className={`text-xs font-bold self-end rotate-180 leading-none ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                            {['A','2','3','4','5','6','7','8','9','10','J','Q','K'][card.value - 1]}
                            <div className="text-[10px]">{getSuitSymbol(card.suit)}</div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full bg-blue-800 rounded-sm border-2 border-white/30" style={{backgroundImage: 'repeating-linear-gradient(45deg, #1e40af 25%, #1d4ed8 25%, #1d4ed8 50%, #1e40af 50%, #1e40af 75%, #1d4ed8 75%, #1d4ed8 100%)', backgroundSize: '10px 10px'}}></div>
                )}
            </div>
        );
    };

    const getSuitSymbol = (suit: string) => {
        switch(suit) {
            case 'hearts': return '♥';
            case 'diamonds': return '♦';
            case 'clubs': return '♣';
            case 'spades': return '♠';
            default: return '';
        }
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[500px] h-[400px] bg-[#008000] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">Solitaire</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="bg-[#EBE9ED] flex space-x-2 px-1 text-black border-b border-gray-400">
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Game</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
                <div className="flex-1"></div>
                <span onClick={initGame} className="text-blue-600 cursor-pointer underline px-2">New Game</span>
            </div>

            {/* Game Area */}
            <div className="flex-1 p-4 relative overflow-hidden" onClick={() => setSelected(null)}>
                
                {/* Top Row: Stock, Waste, Foundations */}
                <div className="flex justify-between mb-4">
                    <div className="flex space-x-4">
                        {/* Deck */}
                        <div className="relative w-[50px] h-[70px]" onClick={drawCard}>
                            {deck.length > 0 ? (
                                <div className="absolute w-full h-full bg-blue-800 rounded border-2 border-white/30 cursor-pointer shadow-md" style={{backgroundImage: 'repeating-linear-gradient(45deg, #1e40af 25%, #1d4ed8 25%, #1d4ed8 50%, #1e40af 50%, #1e40af 75%, #1d4ed8 75%, #1d4ed8 100%)', backgroundSize: '10px 10px'}}>
                                    <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xl font-bold">O</div>
                                </div>
                            ) : (
                                <div className="w-full h-full border-2 border-green-800 rounded flex items-center justify-center cursor-pointer">
                                    <span className="text-green-800 text-xl">↻</span>
                                </div>
                            )}
                        </div>

                        {/* Waste */}
                        <div className="relative w-[50px] h-[70px]">
                            {waste.length > 0 && renderCard(waste[waste.length - 1], 'waste', waste.length - 1)}
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        {/* Foundations */}
                        {foundations.map((pile, i) => (
                            <div key={i} className="relative w-[50px] h-[70px] bg-green-700/30 rounded border border-green-600" onClick={() => handleEmptyPileClick(`foundation-${i}`)}>
                                {pile.length > 0 && renderCard(pile[pile.length - 1], `foundation-${i}`, pile.length - 1)}
                                {pile.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-green-900 text-xl opacity-50">A</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tableau */}
                <div className="flex justify-between pl-2 pr-2">
                    {tableau.map((pile, i) => (
                        <div key={i} className="relative w-[50px] h-[250px]" onClick={() => { if(pile.length===0) handleEmptyPileClick(`tableau-${i}`); }}>
                            {pile.length === 0 && <div className="w-[50px] h-[70px] border border-green-800 rounded opacity-30"></div>}
                            {pile.map((card, j) => (
                                <div key={card.id}>
                                    {renderCard(card, `tableau-${i}`, j, { top: j * 15 })}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};
