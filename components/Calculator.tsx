
import React, { useState } from 'react';
import { X, Minus } from 'lucide-react';

interface CalculatorProps {
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

export const Calculator = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: CalculatorProps) => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [shouldReset, setShouldReset] = useState(false);

    const handleNum = (num: string) => {
        if (display === '0' || shouldReset) {
            setDisplay(num);
            setShouldReset(false);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOp = (op: string) => {
        const current = parseFloat(display);
        if (prevValue === null) {
            setPrevValue(current);
        } else if (operator) {
            const result = calculate(prevValue, current, operator);
            setPrevValue(result);
            setDisplay(String(result));
        }
        setOperator(op);
        setShouldReset(true);
    };

    const calculate = (a: number, b: number, op: string): number => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    };

    const performEqual = () => {
        if (operator && prevValue !== null) {
            const result = calculate(prevValue, parseFloat(display), operator);
            setDisplay(String(result));
            setPrevValue(null);
            setOperator(null);
            setShouldReset(true);
        }
    };

    const clear = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setShouldReset(false);
    };

    const Button = ({ label, color = 'blue', onClick, width = 1 }: { label: string, color?: 'blue' | 'red' | 'gray', onClick?: () => void, width?: number }) => (
        <button 
            onClick={onClick}
            className={`
                h-7 text-[11px] rounded-[3px] border mb-[2px] mx-[2px] shadow-sm active:translate-y-[1px] active:shadow-none font-sans
                ${color === 'red' ? 'text-red-700 border-[#870000]' : color === 'blue' ? 'text-blue-800 border-[#003C74]' : 'text-blue-800 border-gray-400'}
                bg-gradient-to-b from-white via-[#F3F8FC] to-[#DCE5F2] hover:to-[#FFD800] hover:from-[#FFF8D0]
            `}
            style={{ width: `calc(${width * 34}px + ${(width - 1) * 4}px)` }}
        >
            {label}
        </button>
    );

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[260px] bg-[#D6D3CE] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans select-none win-shadow pb-2"
            onClick={onClick}
        >
            {/* Added onTouchStart for mobile window dragging */}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}>
                <div className="flex items-center text-white space-x-2 pl-1 truncate">
                     <span className="font-bold drop-shadow-sm text-xs">Calculator</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={onMinimize} className="w-5 h-5 bg-[#0055EA] rounded flex items-center justify-center text-white border border-white/20">-</button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] rounded flex items-center justify-center text-white border border-white/20">x</button>
                </div>
            </div>

            <div className="px-2 mt-2">
                <div className="bg-white border-2 border-gray-400 border-b-white border-r-white p-2 text-right mb-4 shadow-inner">
                    <div className="text-xl font-mono truncate">{display}</div>
                </div>

                <div className="grid grid-cols-5 gap-0.5">
                    <Button label="MC" color="red" onClick={() => {}} />
                    <Button label="7" onClick={() => handleNum('7')} />
                    <Button label="8" onClick={() => handleNum('8')} />
                    <Button label="9" onClick={() => handleNum('9')} />
                    <Button label="/" color="red" onClick={() => handleOp('/')} />
                    
                    <Button label="MR" color="red" onClick={() => {}} />
                    <Button label="4" onClick={() => handleNum('4')} />
                    <Button label="5" onClick={() => handleNum('5')} />
                    <Button label="6" onClick={() => handleNum('6')} />
                    <Button label="*" color="red" onClick={() => handleOp('*')} />
                    
                    <Button label="MS" color="red" onClick={() => {}} />
                    <Button label="1" onClick={() => handleNum('1')} />
                    <Button label="2" onClick={() => handleNum('2')} />
                    <Button label="3" onClick={() => handleNum('3')} />
                    <Button label="-" color="red" onClick={() => handleOp('-')} />
                    
                    <Button label="M+" color="red" onClick={() => {}} />
                    <Button label="0" onClick={() => handleNum('0')} />
                    <Button label="." onClick={() => handleNum('.')} />
                    <Button label="+" color="red" onClick={() => handleOp('+')} />
                    <Button label="=" color="red" onClick={performEqual} />
                </div>
                <div className="mt-2 flex justify-end px-1">
                    <Button label="C" color="red" width={2} onClick={clear} />
                </div>
            </div>
        </div>
    );
};
