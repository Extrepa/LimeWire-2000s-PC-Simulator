
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface CommandPromptProps {
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

export const CommandPrompt = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: CommandPromptProps) => {
    const [history, setHistory] = useState<string[]>(['Microsoft Windows XP [Version 5.1.2600]', '(C) Copyright 1985-2001 Microsoft Corp.', '']);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (active) inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [history, active]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim();
        const newHistory = [...history, `C:\\Documents and Settings\\Administrator>${input}`];
        
        // Command Logic
        const lowerCmd = cmd.toLowerCase();
        if (lowerCmd === 'help') {
            newHistory.push(
                'DIR            Displays a list of files and subdirectories in a directory.',
                'CLS            Clears the screen.',
                'EXIT           Quits the CMD.EXE program.',
                'IPCONFIG       Display Windows IP Configuration.',
                'PING           Ping a network host.',
                'COLOR          Sets the default console foreground and background colors.',
                'HACK           Initiate mainframe penetration sequence.'
            );
        } else if (lowerCmd === 'cls') {
            setHistory([]);
            setInput('');
            return;
        } else if (lowerCmd === 'dir') {
            newHistory.push(
                ' Volume in drive C has no label.',
                ' Volume Serial Number is 1337-BEEF',
                '',
                ' Directory of C:\\Documents and Settings\\Administrator',
                '',
                '05/23/2005  09:00 PM    <DIR>          .',
                '05/23/2005  09:00 PM    <DIR>          ..',
                '05/21/2005  10:32 AM    <DIR>          My Documents',
                '05/22/2005  02:15 PM    <DIR>          Start Menu',
                '01/10/2005  11:00 AM             1,024 secret_passwords.txt',
                '               1 File(s)          1,024 bytes',
                '               4 Dir(s)  42,949,672,960 bytes free'
            );
        } else if (lowerCmd === 'ipconfig') {
             newHistory.push(
                '',
                'Windows IP Configuration',
                '',
                'Ethernet adapter Local Area Connection:',
                '',
                '   Connection-specific DNS Suffix  . : ',
                '   IP Address. . . . . . . . . . . . : 192.168.1.101',
                '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
                '   Default Gateway . . . . . . . . . : 192.168.1.1'
             );
        } else if (lowerCmd.startsWith('ping')) {
            const target = cmd.split(' ')[1] || 'www.google.com';
            newHistory.push(
                '',
                `Pinging ${target} [216.58.214.14] with 32 bytes of data:`,
                `Reply from 216.58.214.14: bytes=32 time=24ms TTL=54`,
                `Reply from 216.58.214.14: bytes=32 time=28ms TTL=54`,
                `Reply from 216.58.214.14: bytes=32 time=22ms TTL=54`,
                `Reply from 216.58.214.14: bytes=32 time=26ms TTL=54`,
                '',
                `Ping statistics for 216.58.214.14:`,
                `    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`
            );
        } else if (lowerCmd === 'hack') {
            newHistory.push('Accessing mainframe...', 'Bypassing firewall...', 'Cracking encryption...', 'Access GRANTED.');
        } else if (lowerCmd === 'exit') {
            onClose();
            return;
        } else if (cmd !== '') {
            newHistory.push(`'${cmd.split(' ')[0]}' is not recognized as an internal or external command,`, 'operable program or batch file.');
        }

        newHistory.push(''); // spacing
        setHistory(newHistory);
        setInput('');
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[600px] h-[350px] bg-black border border-[#0055EA] shadow-xl flex flex-col font-mono text-sm win-shadow"
            onClick={onClick}
        >
            {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <div className="w-3 h-3 bg-black border border-white flex items-center justify-center text-[8px] font-bold text-white">C:\</div>
                     <span className="font-bold drop-shadow-sm">Command Prompt</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Content */}
            <div 
                className="flex-1 overflow-auto p-1 text-gray-300" 
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-tight">{line}</div>
                ))}
                <form onSubmit={handleCommand} className="flex">
                    <span className="mr-0">C:\Documents and Settings\Administrator&gt;</span>
                    <input 
                        ref={inputRef}
                        className="flex-1 bg-transparent border-none outline-none text-gray-300 ml-1" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoFocus
                    />
                </form>
                <div ref={bottomRef}></div>
            </div>
        </div>
    );
};
