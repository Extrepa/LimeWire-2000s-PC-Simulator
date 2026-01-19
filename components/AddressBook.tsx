import React, { useState } from 'react';
import { X, Minus, Square, User, Users, Folder, Mail, Phone, Home } from 'lucide-react';

interface AddressBookProps {
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

const INITIAL_CONTACTS = [
    { name: 'Administrator', email: 'admin@limewire-sim.com', phone: '555-0100' },
    { name: 'Bill Gates', email: 'billg@microsoft.com', phone: '555-0199' },
    { name: 'Support', email: 'help@support.com', phone: '1-800-HELP' },
    { name: 'Mom', email: 'mom@aol.com', phone: '555-MOTHER' },
];

export const AddressBook = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: AddressBookProps) => {
    const [contacts, setContacts] = useState(INITIAL_CONTACTS);
    const [selectedContact, setSelectedContact] = useState<string | null>(null);

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[600px] h-[400px] bg-[#ECE9D8] border-2 border-[#0055EA] shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile dragging support */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                        <Users size={12} className="text-[#215DC6]"/>
                     </div>
                     <span className="font-bold drop-shadow-sm">Address Book - Main Identity</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="flex space-x-2 px-1 text-black border-b border-gray-400 pb-1 bg-[#ECE9D8]">
                {['File', 'Edit', 'View', 'Tools', 'Help'].map(m => (
                    <span key={m} className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">{m}</span>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center space-x-2 px-2 py-1 border-b border-gray-400 bg-[#ECE9D8]">
                <ToolbarButton icon={<User size={16}/>} label="New" />
                <ToolbarButton icon={<Folder size={16}/>} label="Properties" />
                <ToolbarButton icon={<Mail size={16}/>} label="Delete" />
                <div className="w-[1px] h-6 bg-gray-400"></div>
                <ToolbarButton icon={<Phone size={16}/>} label="Find People" />
                <ToolbarButton icon={<Home size={16}/>} label="Print" />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Tree View */}
                <div className="w-48 bg-white border border-gray-400 m-1 p-1 overflow-y-auto">
                    <div className="flex items-center space-x-1 px-1 py-0.5 bg-[#316AC5] text-white">
                        <Users size={14} />
                        <span className="font-bold">Main Identity's Contacts</span>
                    </div>
                    <div className="pl-4 pt-1 space-y-1">
                        <div className="flex items-center space-x-1 text-gray-700">
                            <Folder size={14} className="text-yellow-500 fill-yellow-500"/>
                            <span>Shared Contacts</span>
                        </div>
                    </div>
                </div>

                {/* List View */}
                <div className="flex-1 bg-white border border-gray-400 m-1 ml-0 overflow-y-auto">
                    <table className="w-full text-left collapse">
                        <thead>
                            <tr className="border-b border-gray-300 bg-[#ECE9D8]">
                                <th className="p-1 font-normal border-r border-gray-300 w-1/3 hover:bg-gray-200">Name</th>
                                <th className="p-1 font-normal border-r border-gray-300 w-1/3 hover:bg-gray-200">E-mail Address</th>
                                <th className="p-1 font-normal w-1/3 hover:bg-gray-200">Business Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c, i) => (
                                <tr 
                                    key={i} 
                                    onClick={() => setSelectedContact(c.name)}
                                    className={`cursor-default ${selectedContact === c.name ? 'bg-[#316AC5] text-white' : 'hover:bg-gray-100 text-black'}`}
                                >
                                    <td className="p-1 border-r border-dotted border-gray-200 flex items-center">
                                        <User size={12} className="mr-1"/> {c.name}
                                    </td>
                                    <td className="p-1 border-r border-dotted border-gray-200">{c.email}</td>
                                    <td className="p-1">{c.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="h-5 border-t border-gray-400 bg-[#ECE9D8] text-gray-600 px-2 pt-0.5">
                {contacts.length} items
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex flex-col items-center justify-center px-2 py-0.5 hover:bg-white border border-transparent hover:border-gray-400 rounded-sm cursor-pointer group active:border-gray-600 active:bg-gray-200">
        {icon}
        <span className="text-[10px]">{label}</span>
    </div>
);