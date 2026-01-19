import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface DateTimePropertiesProps {
    onClose: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    // Added onTouchStart to support mobile window dragging
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const DateTimeProperties = ({ onClose, position, onMouseDown, onTouchStart, zIndex, active, onClick }: DateTimePropertiesProps) => {
    const [activeTab, setActiveTab] = useState('Date & Time');
    const [date, setDate] = useState(new Date());
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (activeTab === 'Date & Time' && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const width = canvasRef.current.width;
                const height = canvasRef.current.height;
                const radius = width / 2 - 5;
                const centerX = width / 2;
                const centerY = height / 2;

                ctx.clearRect(0, 0, width, height);

                // Face
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.strokeStyle = '#999';
                ctx.stroke();

                // Ticks
                for (let i = 0; i < 12; i++) {
                    const angle = (i * 30) * Math.PI / 180;
                    const x1 = centerX + (radius - 5) * Math.cos(angle);
                    const y1 = centerY + (radius - 5) * Math.sin(angle);
                    const x2 = centerX + (radius - 2) * Math.cos(angle);
                    const y2 = centerY + (radius - 2) * Math.sin(angle);
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }

                const sec = date.getSeconds();
                const min = date.getMinutes();
                const hr = date.getHours();

                // Hour Hand
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                const hrAngle = ((hr % 12) * 30 + min * 0.5 - 90) * Math.PI / 180;
                ctx.lineTo(centerX + (radius * 0.5) * Math.cos(hrAngle), centerY + (radius * 0.5) * Math.sin(hrAngle));
                ctx.stroke();

                // Minute Hand
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                const minAngle = (min * 6 + sec * 0.1 - 90) * Math.PI / 180;
                ctx.lineTo(centerX + (radius * 0.75) * Math.cos(minAngle), centerY + (radius * 0.75) * Math.sin(minAngle));
                ctx.stroke();

                // Second Hand
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                const secAngle = (sec * 6 - 90) * Math.PI / 180;
                ctx.lineTo(centerX + (radius * 0.85) * Math.cos(secAngle), centerY + (radius * 0.85) * Math.sin(secAngle));
                ctx.stroke();
            }
        }
    }, [date, activeTab]);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[400px] h-[450px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <span className="font-bold drop-shadow-sm">Date and Time Properties</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex px-1 pt-1 space-x-1 border-b border-gray-400 mb-2">
                {['Date & Time', 'Time Zone', 'Internet Time'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2 py-1 rounded-t border-t border-l border-r border-gray-400 -mb-[1px] z-10 ${activeTab === tab ? 'bg-[#ECE9D8] font-bold border-b-[#ECE9D8]' : 'bg-[#E0DFE3] border-b-gray-400'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 border border-gray-400 bg-[#ECE9D8] mx-1 mb-2">
                {activeTab === 'Date & Time' ? (
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between mb-6">
                            {/* Calendar Mock */}
                            <div className="w-[180px]">
                                <div className="flex justify-between items-center mb-2">
                                    <select className="bg-white border border-gray-400 text-xs p-0.5" defaultValue="October">
                                        <option>October</option>
                                    </select>
                                    <input className="w-12 bg-white border border-gray-400 text-xs p-0.5" defaultValue="2005" />
                                </div>
                                <div className="bg-white border border-gray-400 p-1">
                                    <div className="grid grid-cols-7 text-center font-bold text-gray-500 mb-1">
                                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                    </div>
                                    <div className="grid grid-cols-7 text-center">
                                        <span className="text-gray-300">25</span><span className="text-gray-300">26</span><span className="text-gray-300">27</span><span className="text-gray-300">28</span><span className="text-gray-300">29</span><span className="text-gray-300">30</span>
                                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                                        <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
                                        <span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span className="bg-blue-600 text-white rounded-sm">23</span>
                                        <span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                                    </div>
                                </div>
                            </div>

                            {/* Clock */}
                            <div className="w-[150px] flex flex-col items-center justify-center border border-gray-300 bg-[#ECE9D8] p-2 rounded relative">
                                <div className="absolute inset-0 bg-white opacity-20 pointer-events-none"></div>
                                <canvas ref={canvasRef} width={100} height={100} className="mb-2" />
                                <div className="flex items-center bg-white border border-gray-400 px-1">
                                    <input 
                                        className="w-16 text-center outline-none"
                                        value={date.toLocaleTimeString()} 
                                        readOnly
                                    />
                                    <div className="flex flex-col ml-1 border-l border-gray-300">
                                        <button className="h-2 w-3 bg-[#ECE9D8] flex items-center justify-center hover:bg-gray-200 text-[8px]">▲</button>
                                        <button className="h-2 w-3 bg-[#ECE9D8] flex items-center justify-center hover:bg-gray-200 text-[8px]">▼</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-300 pt-2">
                            <p>Current time zone: Pacific Standard Time</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        This tab is not implemented in the simulator.
                    </div>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="h-8 flex items-center justify-end space-x-2 px-1">
                 <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">OK</button>
                 <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">Cancel</button>
                 <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm hover:bg-white active:bg-gray-200 min-w-[70px]">Apply</button>
            </div>
        </div>
    );
};