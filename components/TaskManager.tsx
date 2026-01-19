
import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, FileText } from 'lucide-react';
import { LogoIcon } from './Icons';

interface TaskManagerProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
    windows: Array<{ id: string, title: string, isOpen: boolean }>;
    onCloseWindow: (id: string) => void;
    onBsod: () => void;
}

const SYSTEM_PROCESSES = [
    { name: 'System Idle Process', user: 'SYSTEM', mem: '16 K', critical: false },
    { name: 'System', user: 'SYSTEM', mem: '212 K', critical: true },
    { name: 'smss.exe', user: 'SYSTEM', mem: '344 K', critical: true },
    { name: 'csrss.exe', user: 'SYSTEM', mem: '3,420 K', critical: true },
    { name: 'winlogon.exe', user: 'SYSTEM', mem: '2,900 K', critical: true },
    { name: 'services.exe', user: 'SYSTEM', mem: '4,100 K', critical: true },
    { name: 'lsass.exe', user: 'SYSTEM', mem: '1,500 K', critical: true },
    { name: 'svchost.exe', user: 'SYSTEM', mem: '4,500 K', critical: false },
    { name: 'explorer.exe', user: 'Administrator', mem: '18,432 K', critical: false },
    { name: 'taskmgr.exe', user: 'Administrator', mem: '4,200 K', critical: false },
    { name: 'limewire.exe', user: 'Administrator', mem: '45,100 K', critical: false },
];

export const TaskManager = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick, windows, onCloseWindow, onBsod }: TaskManagerProps) => {
    const [activeTab, setActiveTab] = useState('Applications');
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
    const [cpuUsage, setCpuUsage] = useState(0);
    const [memUsage, setMemUsage] = useState(120);
    const [showWarning, setShowWarning] = useState(false);
    
    const cpuCanvasRef = useRef<HTMLCanvasElement>(null);
    const memCanvasRef = useRef<HTMLCanvasElement>(null);
    const historyRef = useRef<{cpu: number[], mem: number[]}>({ cpu: Array(60).fill(0), mem: Array(60).fill(120) });

    const activeApps = windows.filter(w => w.isOpen && w.id !== 'taskmgr');

    useEffect(() => {
        const interval = setInterval(() => {
            const newCpu = Math.floor(Math.random() * 15) + (activeApps.length * 2);
            const newMem = Math.max(100, Math.min(512, memUsage + (Math.random() * 6 - 3)));
            
            setCpuUsage(newCpu);
            setMemUsage(newMem);
            
            historyRef.current.cpu.shift();
            historyRef.current.cpu.push(newCpu);
            historyRef.current.mem.shift();
            historyRef.current.mem.push(newMem);
            
            drawGraph(cpuCanvasRef.current, historyRef.current.cpu, 100);
            drawGraph(memCanvasRef.current, historyRef.current.mem, 512);
        }, 1000);
        return () => clearInterval(interval);
    }, [activeApps.length, memUsage]);

    const drawGraph = (canvas: HTMLCanvasElement | null, data: number[], max: number) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        
        // Grid
        ctx.strokeStyle = '#003300';
        ctx.lineWidth = 0.5;
        for(let x=0; x<w; x+=15) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for(let y=0; y<h; y+=15) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
        
        // Data Line
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const step = w / (data.length - 1);
        data.forEach((val, i) => {
            const x = i * step;
            const y = h - (val / max) * h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    };

    const handleEndTask = () => {
        if (selectedTask) {
            onCloseWindow(selectedTask);
            setSelectedTask(null);
        }
    };

    const handleEndProcess = () => {
        if (!selectedProcess) return;
        const proc = SYSTEM_PROCESSES.find(p => p.name === selectedProcess);
        if (proc?.critical) {
            setShowWarning(true);
        } else {
            setSelectedProcess(null);
        }
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[95vw] md:w-[420px] h-[520px] bg-[#ECE9D8] border-2 border-[#E0DFE3] border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {showWarning && (
                 <div className="absolute inset-0 z-[500] flex items-center justify-center bg-black/40 p-4">
                     <div className="w-full max-w-[320px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl p-4">
                         <div className="flex items-center mb-4">
                             <div className="w-10 h-10 bg-[#E81123] rounded-full text-white font-bold flex items-center justify-center mr-3 text-2xl border-2 border-white shadow-md">!</div>
                             <span className="font-bold text-red-700 text-sm uppercase">Critical Process Warning</span>
                         </div>
                         <p className="mb-6 text-gray-800 leading-tight font-bold">Terminating this system process will cause Windows to crash immediately. Are you sure you want to trigger a BSOD?</p>
                         <div className="flex justify-end space-x-3">
                             <button onClick={() => setShowWarning(false)} className="px-6 py-1 bg-white border border-gray-400 shadow-sm hover:bg-gray-100 font-bold active:bg-gray-200">No</button>
                             <button onClick={onBsod} className="px-6 py-1 bg-white border border-gray-400 shadow-sm font-bold text-red-700 hover:bg-gray-100 active:bg-gray-200">Yes</button>
                         </div>
                     </div>
                 </div>
             )}

            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-7 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1 truncate">
                     <div className="w-4 h-4 bg-green-500 border border-black flex items-center justify-center relative">
                         <div className="absolute inset-0 bg-black/20" style={{height: `${100-cpuUsage}%`}}></div>
                     </div>
                     <span className="font-bold drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)] text-[11px] truncate">Windows Task Manager</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="flex space-x-4 px-2 text-black border-b border-gray-400 pb-1 mb-1 bg-[#ECE9D8]">
                {['File', 'Options', 'View', 'Shut Down', 'Help'].map(m => (
                    <span key={m} className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default text-[11px] font-bold">{m}</span>
                ))}
            </div>

            <div className="flex px-1 pt-1 space-x-0.5 border-b border-gray-400 mb-2 overflow-x-auto whitespace-nowrap scrollbar-none">
                {['Applications', 'Processes', 'Performance', 'Networking', 'Users'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-t border-t border-l border-r border-gray-400 -mb-[1px] z-10 text-[10px] md:text-[11px] ${activeTab === tab ? 'bg-[#ECE9D8] font-bold border-b-[#ECE9D8]' : 'bg-[#E0DFE3] border-b-gray-400'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-1 border border-gray-400 bg-white mx-1 mb-2 overflow-hidden flex flex-col shadow-inner">
                {activeTab === 'Applications' && (
                    <div className="flex flex-col h-full bg-white">
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#ECE9D8] border-b border-gray-300 sticky top-0">
                                    <tr className="text-gray-800 text-[11px] font-bold">
                                        <th className="p-1.5 border-r border-gray-300 w-2/3">Task</th>
                                        <th className="p-1.5">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {activeApps.map(app => (
                                        <tr 
                                            key={app.id} 
                                            onClick={() => setSelectedTask(app.id)}
                                            className={`cursor-default ${selectedTask === app.id ? 'bg-[#316AC5] text-white' : 'hover:bg-blue-50 text-black'}`}
                                        >
                                            <td className="p-1.5 border-r border-dotted border-gray-200 flex items-center space-x-2 truncate">
                                                <div className="w-4 h-4 flex-shrink-0">
                                                    {app.id === 'limewire' ? <LogoIcon /> : <FileText size={14} className={selectedTask === app.id ? 'text-white' : 'text-blue-600'}/>}
                                                </div>
                                                <span className="truncate text-[11px] font-bold">{app.title}</span>
                                            </td>
                                            <td className="p-1.5 text-[11px]">Running</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-2 border-t border-gray-300 flex justify-end bg-[#ECE9D8]">
                            <button 
                                onClick={handleEndTask}
                                disabled={!selectedTask}
                                className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 disabled:text-gray-400 text-[11px] font-bold"
                            >
                                End Task
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Processes' && (
                    <div className="flex flex-col h-full bg-white">
                        <div className="overflow-y-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#ECE9D8] border-b border-gray-300 sticky top-0 z-10">
                                    <tr className="text-gray-800 text-[10px] font-bold">
                                        <th className="p-1 border-r border-gray-300">Image Name</th>
                                        <th className="p-1 border-r border-gray-300">User Name</th>
                                        <th className="p-1">Mem Usage</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] font-mono">
                                    {SYSTEM_PROCESSES.map(proc => (
                                        <tr 
                                            key={proc.name}
                                            onClick={() => setSelectedProcess(proc.name)}
                                            className={`cursor-default ${selectedProcess === proc.name ? 'bg-[#316AC5] text-white font-bold' : 'hover:bg-blue-50 text-black'}`}
                                        >
                                            <td className="p-1 border-r border-dotted border-gray-200 truncate">{proc.name}</td>
                                            <td className="p-1 border-r border-dotted border-gray-200">{proc.user}</td>
                                            <td className="p-1 text-right pr-4 font-bold">{proc.mem}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-2 border-t border-gray-300 flex justify-end bg-[#ECE9D8]">
                            <button 
                                onClick={handleEndProcess}
                                disabled={!selectedProcess}
                                className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 disabled:text-gray-400 text-[11px] font-bold"
                            >
                                End Process
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Performance' && (
                    <div className="p-3 flex flex-col space-y-4 bg-[#ECE9D8] h-full overflow-y-auto">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="mb-1 font-bold text-blue-900">CPU Usage History</span>
                                <div className="border-2 border-gray-400 bg-black p-1 relative h-32">
                                    <canvas ref={cpuCanvasRef} width={180} height={120} className="w-full h-full" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="mb-1 font-bold text-blue-900">PF Usage History</span>
                                <div className="border-2 border-gray-400 bg-black p-1 relative h-32">
                                    <canvas ref={memCanvasRef} width={180} height={120} className="w-full h-full" />
                                </div>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4 text-[10px] md:text-[11px] bg-white border border-gray-400 p-2 shadow-inner">
                             <div className="space-y-1">
                                <div className="flex justify-between border-b border-gray-200 pb-0.5 font-bold"><span className="text-blue-800">Physical Memory (K)</span></div>
                                <div className="flex justify-between"><span>Total</span><span className="font-bold">523,756</span></div>
                                <div className="flex justify-between text-green-700"><span>Available</span><span className="font-bold">312,448</span></div>
                                <div className="flex justify-between"><span>System Cache</span><span className="font-bold">241,104</span></div>
                             </div>
                             <div className="space-y-1">
                                <div className="flex justify-between border-b border-gray-200 pb-0.5 font-bold"><span className="text-blue-800">Commit Charge (K)</span></div>
                                <div className="flex justify-between"><span>Total</span><span className="font-bold">241,856</span></div>
                                <div className="flex justify-between"><span>Limit</span><span className="font-bold">1,281,488</span></div>
                                <div className="flex justify-between text-red-700"><span>Peak</span><span className="font-bold">284,912</span></div>
                             </div>
                         </div>
                    </div>
                )}
            </div>

            <div className="h-6 border-t border-gray-400 bg-[#ECE9D8] px-2 flex items-center justify-between text-[11px] text-gray-800 font-bold">
                <span className="flex-1 border-r border-gray-300 truncate">Processes: {SYSTEM_PROCESSES.length}</span>
                <span className="flex-1 border-r border-gray-300 px-2 truncate">CPU Usage: {cpuUsage}%</span>
                <span className="flex-1 px-2 truncate">Commit: 236M / 1251M</span>
            </div>
        </div>
    );
};
