
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square, MousePointer, Pencil, Type, Eraser, PaintBucket, Search, Circle, Square as SquareShape, Move, Slash } from 'lucide-react';

interface PaintProps {
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

const COLORS = [
    '#000000', '#787878', '#780000', '#787800', '#007800', '#007878', '#000078', '#780078', '#78783c', '#003c3c', '#003c78', '#3c0078', '#783c00', '#3c3c3c',
    '#ffffff', '#dcdcdc', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff78', '#00ff78', '#78ffff', '#7878ff', '#ff7878', '#ff3c3c'
];

export const Paint = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: PaintProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState('pencil');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPos, setLastPos] = useState<{x: number, y: number} | null>(null);

    // Init canvas white background
    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    }, []);

    const getMousePos = (e: React.MouseEvent) => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const startDraw = (e: React.MouseEvent) => {
        setIsDrawing(true);
        const { x, y } = getMousePos(e);
        setLastPos({ x, y });
        
        // Single dot for pencil
        if (selectedTool === 'pencil') {
             draw(e);
        }
    };

    const stopDraw = () => {
        setIsDrawing(false);
        setLastPos(null);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing && e.type !== 'mousedown') return;
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        
        const { x, y } = getMousePos(e);

        ctx.strokeStyle = selectedColor;
        ctx.fillStyle = selectedColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (selectedTool === 'pencil') {
            ctx.lineWidth = 1;
            if (lastPos) {
                ctx.beginPath();
                ctx.moveTo(lastPos.x, lastPos.y);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        } else if (selectedTool === 'brush') {
             ctx.lineWidth = 4;
            if (lastPos) {
                ctx.beginPath();
                ctx.moveTo(lastPos.x, lastPos.y);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        } else if (selectedTool === 'eraser') {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 8;
            if (lastPos) {
                ctx.beginPath();
                ctx.moveTo(lastPos.x, lastPos.y);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }

        setLastPos({ x, y });
    };

    const clearCanvas = () => {
         if (!canvasRef.current) return;
         const ctx = canvasRef.current.getContext('2d');
         if (ctx) {
             ctx.fillStyle = '#ffffff';
             ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
         }
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[600px] h-[450px] bg-[#C0C0C0] border-2 border-white border-r-gray-500 border-b-gray-500 shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
            {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-5 mb-1 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-1 pl-1">
                     <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
                     <span className="font-bold drop-shadow-sm">untitled - Paint</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-4 h-4 bg-[#C0C0C0] border border-white border-b-gray-500 border-r-gray-500 active:border-t-gray-500 active:border-l-gray-500 flex items-center justify-center"><Minus size={10} color="black"/></button>
                     <button className="w-4 h-4 bg-[#C0C0C0] border border-white border-r-gray-500 border-b-gray-500 active:border-t-gray-500 active:border-l-gray-500 flex items-center justify-center"><Square size={8} color="black"/></button>
                     <button onClick={onClose} className="w-4 h-4 bg-[#C0C0C0] border border-white border-b-gray-500 border-r-gray-500 active:border-t-gray-500 active:border-l-gray-500 flex items-center justify-center"><X size={12} color="black"/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="flex space-x-2 px-1 mb-1 text-black border-b border-gray-400 pb-1">
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">File</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Edit</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">View</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Image</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Colors</span>
                <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Help</span>
            </div>

            <div className="flex flex-1 overflow-hidden p-1">
                {/* Tools */}
                <div className="w-12 mr-1 grid grid-cols-2 gap-0.5 content-start">
                    {[
                        { id: 'free', icon: <MousePointer size={12}/> },
                        { id: 'select', icon: <SquareShape size={12} style={{borderStyle: 'dashed'}}/> },
                        { id: 'eraser', icon: <Eraser size={12}/> },
                        { id: 'fill', icon: <PaintBucket size={12}/> },
                        { id: 'pencil', icon: <Pencil size={12}/> },
                        { id: 'brush', icon: <div className="w-2 h-2 rounded-full bg-black"></div> },
                        { id: 'text', icon: <Type size={12}/> },
                        { id: 'line', icon: <Slash size={12}/> },
                    ].map(tool => (
                        <button 
                            key={tool.id}
                            onClick={() => setSelectedTool(tool.id)}
                            className={`w-6 h-6 border flex items-center justify-center ${selectedTool === tool.id ? 'bg-white border-gray-500 border-t-black border-l-black' : 'bg-[#C0C0C0] border-white border-b-gray-500 border-r-gray-500'}`}
                        >
                            {tool.icon}
                        </button>
                    ))}
                    <button onClick={clearCanvas} className="col-span-2 mt-2 text-[9px] border border-gray-500 bg-white">Clear</button>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 bg-[#808080] p-1 overflow-auto border border-gray-500 shadow-inner relative">
                    <canvas 
                        ref={canvasRef} 
                        width={600}
                        height={400}
                        className="bg-white cursor-crosshair"
                        onMouseDown={startDraw}
                        onMouseUp={stopDraw}
                        onMouseOut={stopDraw}
                        onMouseMove={draw}
                    />
                </div>
            </div>

            {/* Palette */}
            <div className="h-10 border-t border-gray-400 p-1 flex">
                 <div className="w-8 h-8 border border-gray-500 shadow-inner mr-2 relative">
                     <div className="absolute top-1 left-1 w-4 h-4 border border-gray-400 z-10" style={{backgroundColor: selectedColor}}></div>
                     <div className="absolute bottom-1 right-1 w-4 h-4 border border-gray-400 bg-white"></div>
                 </div>
                 <div className="flex flex-wrap w-64 h-8 gap-[1px]">
                     {COLORS.map(c => (
                         <div 
                            key={c} 
                            className="w-4 h-4 border border-gray-500 cursor-pointer" 
                            style={{backgroundColor: c}}
                            onClick={() => setSelectedColor(c)}
                        />
                     ))}
                 </div>
            </div>

            {/* Status Bar */}
            <div className="h-5 border-t border-gray-400 bg-[#C0C0C0] text-[10px] flex items-center px-1">
                 <span>For Help, click Help Topics on the Help Menu.</span>
            </div>
        </div>
    );
};
