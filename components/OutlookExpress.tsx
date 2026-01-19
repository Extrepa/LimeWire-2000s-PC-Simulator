
import React, { useState } from 'react';
import { X, Minus, Square, Mail, Inbox, Send, File, Trash2, Printer, Reply, Forward, AlertCircle } from 'lucide-react';

interface OutlookExpressProps {
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

const MOCK_EMAILS = [
    { id: 1, from: 'LimeWire Team', subject: 'Welcome to LimeWire PRO!', date: '10/24/2005', content: 'Thank you for installing LimeWire PRO. You now have access to Turbo-Charged download speeds, more search results, and personalized support.\n\nHappy Sharing!\nThe LimeWire Team' },
    { id: 2, from: 'Mom', subject: 'FW: Fwd: FUNNY CATS!!!', date: '10/23/2005', content: 'LOOK AT THIS IT IS SO FUNNY LOL.\n\nLOVE MOM\n\n(See attached: funny_cat_01.jpg, funny_cat_02.jpg)' },
    { id: 3, from: 'Bill Gates', subject: 'Money Transfer', date: '10/20/2005', content: 'Hello,\n\nI am Bill Gates. I want to share my fortune with you. Please reply with your bank details.\n\nSincerely,\nBill' },
    { id: 4, from: 'eBay', subject: 'Outbid notification: Rare Pokémon Card', date: '10/19/2005', content: 'You have been outbid on item #4928174 "Charizard Holo First Edition". Current bid: $45.00.' },
    { id: 5, from: 'Norton AntiVirus', subject: 'Subscription Expiring', date: '10/15/2005', content: 'Your virus protection definitions are out of date. Renew now to stay protected against the latest threats.' },
];

export const OutlookExpress = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: OutlookExpressProps) => {
    const [selectedFolder, setSelectedFolder] = useState('Inbox');
    const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

    const activeEmail = MOCK_EMAILS.find(e => e.id === selectedEmail);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[800px] h-[600px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <Mail size={14} />
                     <span className="font-bold drop-shadow-sm">Inbox - Outlook Express</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="flex space-x-2 px-1 text-black border-b border-gray-400 pb-1 bg-[#ECE9D8]">
                {['File', 'Edit', 'View', 'Tools', 'Message', 'Help'].map(m => (
                    <span key={m} className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">{m}</span>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center space-x-1 px-2 py-1 border-b border-gray-400 bg-[#ECE9D8]">
                <ToolbarButton icon={<File size={20}/>} label="Create Mail" />
                <div className="w-[1px] h-8 bg-gray-400 mx-1"></div>
                <ToolbarButton icon={<Reply size={20}/>} label="Reply" />
                <ToolbarButton icon={<Reply size={20} className="scale-x-[-1]"/>} label="Reply All" />
                <ToolbarButton icon={<Forward size={20}/>} label="Forward" />
                <div className="w-[1px] h-8 bg-gray-400 mx-1"></div>
                <ToolbarButton icon={<Printer size={20}/>} label="Print" />
                <ToolbarButton icon={<Trash2 size={20}/>} label="Delete" />
                <div className="w-[1px] h-8 bg-gray-400 mx-1"></div>
                <ToolbarButton icon={<Send size={20}/>} label="Send/Recv" />
            </div>

            {/* Main Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Folder List */}
                <div className="w-48 bg-white border-r border-gray-400 flex flex-col p-1">
                    <div className="text-[10px] text-gray-500 font-bold mb-1">Folders</div>
                    <FolderItem label="Outlook Express" icon={<Inbox size={14}/>} active={false} />
                    <div className="pl-4">
                        <FolderItem label="Local Folders" icon={<Inbox size={14}/>} active={false} />
                        <div className="pl-4">
                            <FolderItem label="Inbox" count={3} active={selectedFolder === 'Inbox'} onClick={() => setSelectedFolder('Inbox')} />
                            <FolderItem label="Outbox" active={selectedFolder === 'Outbox'} onClick={() => setSelectedFolder('Outbox')} />
                            <FolderItem label="Sent Items" active={selectedFolder === 'Sent'} onClick={() => setSelectedFolder('Sent')} />
                            <FolderItem label="Deleted Items" active={selectedFolder === 'Deleted'} onClick={() => setSelectedFolder('Deleted')} />
                            <FolderItem label="Drafts" active={selectedFolder === 'Drafts'} onClick={() => setSelectedFolder('Drafts')} />
                        </div>
                    </div>
                </div>

                {/* Split View */}
                <div className="flex-1 flex flex-col">
                    {/* Email List */}
                    <div className="h-1/2 bg-white border-b border-gray-400 overflow-y-auto">
                        <table className="w-full text-left collapse">
                            <thead className="bg-[#ECE9D8] border-b border-gray-400 sticky top-0">
                                <tr>
                                    <th className="p-1 font-normal border-r border-gray-300 w-6">!</th>
                                    <th className="p-1 font-normal border-r border-gray-300 w-1/4">From</th>
                                    <th className="p-1 font-normal border-r border-gray-300">Subject</th>
                                    <th className="p-1 font-normal w-24">Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_EMAILS.map((email) => (
                                    <tr 
                                        key={email.id} 
                                        onClick={() => setSelectedEmail(email.id)}
                                        className={`cursor-default ${selectedEmail === email.id ? 'bg-[#316AC5] text-white' : 'hover:bg-gray-100 text-black'}`}
                                    >
                                        <td className="p-1 border-r border-dotted border-gray-200 text-center">
                                            {email.id === 5 ? <AlertCircle size={10} className="text-red-500 inline"/> : <Mail size={10} className="text-gray-500 inline"/>}
                                        </td>
                                        <td className="p-1 border-r border-dotted border-gray-200 truncate">{email.from}</td>
                                        <td className="p-1 border-r border-dotted border-gray-200 truncate">{email.subject}</td>
                                        <td className="p-1 truncate">{email.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Preview Pane */}
                    <div className="flex-1 bg-white p-4 overflow-y-auto">
                        {activeEmail ? (
                            <div className="font-sans">
                                <div className="border-b-2 border-[#ECE9D8] pb-2 mb-2 bg-[#F3F8FC] p-2">
                                    <div className="font-bold text-lg mb-1">{activeEmail.subject}</div>
                                    <div className="text-gray-600">
                                        <span className="font-bold text-black">From:</span> {activeEmail.from} [example@domain.com]
                                    </div>
                                    <div className="text-gray-600">
                                        <span className="font-bold text-black">Date:</span> {activeEmail.date}
                                    </div>
                                    <div className="text-gray-600">
                                        <span className="font-bold text-black">To:</span> Administrator
                                    </div>
                                </div>
                                <pre className="font-sans whitespace-pre-wrap text-sm leading-relaxed">{activeEmail.content}</pre>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 italic">
                                Select an email to view its contents
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="h-5 border-t border-gray-400 bg-[#ECE9D8] text-gray-600 px-2 pt-0.5 flex justify-between">
                <span>{MOCK_EMAILS.length} message(s), 0 unread</span>
                <span>Working Online</span>
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex flex-col items-center justify-center px-2 py-0.5 hover:bg-white border border-transparent hover:border-gray-400 rounded-sm cursor-pointer group active:border-gray-600 active:bg-gray-200 min-w-[40px]">
        {icon}
        <span className="text-[10px] text-gray-600 group-hover:text-black">{label}</span>
    </div>
);

const FolderItem = ({ label, icon, active, count, onClick }: { label: string, icon?: React.ReactNode, active: boolean, count?: number, onClick?: () => void }) => (
    <div 
        onClick={onClick}
        className={`flex items-center space-x-1 px-1 py-0.5 cursor-pointer ${active ? 'bg-[#316AC5] text-white' : 'text-black hover:bg-gray-100'}`}
    >
        {icon || <div className="w-3 h-3 bg-yellow-200 border border-yellow-500"></div>}
        <span className="flex-1 truncate">{label}</span>
        {count && <span className={`text-[10px] ${active ? 'text-blue-200' : 'text-blue-600'} font-bold`}>({count})</span>}
    </div>
);
