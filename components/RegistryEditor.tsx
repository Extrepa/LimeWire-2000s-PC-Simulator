
import React, { useState } from 'react';
import { X, Minus, Square, Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';

interface RegistryEditorProps {
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

const TREE_DATA = [
    { name: 'My Computer', type: 'root', children: [
        { name: 'HKEY_CLASSES_ROOT', type: 'hive', children: [] },
        { name: 'HKEY_CURRENT_USER', type: 'hive', children: [
            { name: 'AppEvents', type: 'key', children: [] },
            { name: 'Console', type: 'key', children: [] },
            { name: 'Control Panel', type: 'key', children: [
                { name: 'Desktop', type: 'key', children: [] },
                { name: 'Mouse', type: 'key', children: [] }
            ]},
            { name: 'Environment', type: 'key', children: [] },
            { name: 'Software', type: 'key', children: [
                { name: 'Microsoft', type: 'key', children: [] },
                { name: 'LimeWire', type: 'key', children: [] }
            ]}
        ]},
        { name: 'HKEY_LOCAL_MACHINE', type: 'hive', children: [
            { name: 'HARDWARE', type: 'key', children: [] },
            { name: 'SAM', type: 'key', children: [] },
            { name: 'SECURITY', type: 'key', children: [] },
            { name: 'SOFTWARE', type: 'key', children: [] },
            { name: 'SYSTEM', type: 'key', children: [] }
        ]},
        { name: 'HKEY_USERS', type: 'hive', children: [] },
        { name: 'HKEY_CURRENT_CONFIG', type: 'hive', children: [] }
    ]}
];

const MOCK_VALUES = [
    { name: '(Default)', type: 'REG_SZ', data: '(value not set)' },
    { name: 'ColorTable00', type: 'REG_DWORD', data: '0x00000000 (0)' },
    { name: 'CursorSize', type: 'REG_DWORD', data: '0x00000019 (25)' },
    { name: 'FaceName', type: 'REG_SZ', data: 'Lucida Console' },
    { name: 'FontFamily', type: 'REG_DWORD', data: '0x00000036 (54)' },
    { name: 'FontSize', type: 'REG_DWORD', data: '0x000c0000 (786432)' },
    { name: 'HistoryNoDup', type: 'REG_DWORD', data: '0x00000000 (0)' }
];

export const RegistryEditor = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: RegistryEditorProps) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['My Computer']));
    const [selectedPath, setSelectedPath] = useState('My Computer');

    const toggleNode = (name: string) => {
        const newSet = new Set(expandedNodes);
        if (newSet.has(name)) newSet.delete(name);
        else newSet.add(name);
        setExpandedNodes(newSet);
    };

    const renderTree = (nodes: any[], depth = 0) => {
        return nodes.map(node => (
            <div key={node.name} style={{ paddingLeft: `${depth * 16}px` }}>
                <div 
                    className={`flex items-center py-0.5 cursor-pointer hover:bg-blue-50 ${selectedPath === node.name ? 'bg-[#316AC5] text-white' : 'text-black'}`}
                    onClick={() => { setSelectedPath(node.name); }}
                >
                    {node.children.length > 0 ? (
                        <div onClick={(e) => { e.stopPropagation(); toggleNode(node.name); }} className="w-4 h-4 flex items-center justify-center mr-1 border border-gray-400 bg-white text-black text-[9px] cursor-pointer">
                            {expandedNodes.has(node.name) ? '-' : '+'}
                        </div>
                    ) : <div className="w-4 h-4 mr-1"></div>}
                    
                    {node.type === 'root' ? <div className="w-4 h-4 mr-1"><img src="https://winaero.com/blog/wp-content/uploads/2018/12/regedit-icon.png" className="w-full h-full object-contain" alt="" onError={(e) => (e.target as any).style.display='none'}/></div> : 
                     node.type === 'hive' ? <Folder size={14} className="text-yellow-500 fill-yellow-500 mr-1" /> :
                     <Folder size={14} className="text-yellow-500 fill-yellow-500 mr-1" />}
                    
                    <span>{node.name}</span>
                </div>
                {expandedNodes.has(node.name) && node.children.length > 0 && (
                    <div>{renderTree(node.children, 1)}</div>
                )}
            </div>
        ));
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[600px] h-[450px] bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
             {/* Title Bar - Added onTouchStart for mobile window dragging */}
            <div 
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className={`h-6 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}
            >
                <div className="flex items-center text-white space-x-2 pl-1">
                     <div className="w-3 h-3 bg-blue-300 border border-white flex items-center justify-center">
                         <div className="bg-white w-1 h-1"></div>
                     </div>
                     <span className="font-bold drop-shadow-sm">Registry Editor</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Minus size={10} strokeWidth={3}/></button>
                     <button className={`w-5 h-5 rounded-[3px] flex items-center justify-center text-white border border-white/30 hover:bg-white/10 ${active ? 'bg-[#0055EA]' : 'bg-[#7899CC]'}`}><Square size={9} strokeWidth={2}/></button>
                     <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30"><X size={12} strokeWidth={3}/></button>
                </div>
            </div>

            {/* Menu */}
            <div className="flex space-x-2 px-1 text-black border-b border-gray-400 pb-1 mb-1">
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Edit</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">View</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Favorites</span>
                <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
            </div>

            <div className="flex flex-1 gap-1 overflow-hidden">
                {/* Tree View */}
                <div className="w-1/3 bg-white border border-gray-500 overflow-auto p-1">
                    {renderTree(TREE_DATA)}
                </div>

                {/* List View */}
                <div className="flex-1 bg-white border border-gray-500 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-1 font-normal text-gray-500 border-b border-gray-200 border-r w-1/3">Name</th>
                                <th className="p-1 font-normal text-gray-500 border-b border-gray-200 border-r w-16">Type</th>
                                <th className="p-1 font-normal text-gray-500 border-b border-gray-200">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_VALUES.map((val, i) => (
                                <tr key={i} className="hover:bg-gray-100">
                                    <td className="p-1 flex items-center">
                                        <div className="w-3 h-3 mr-1 bg-red-100 border border-red-300 text-[8px] flex items-center justify-center text-red-800">ab</div>
                                        {val.name}
                                    </td>
                                    <td className="p-1">{val.type}</td>
                                    <td className="p-1 font-mono text-[11px]">{val.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-5 border-t border-gray-400 bg-[#ECE9D8] text-gray-600 px-1 pt-0.5">
                My Computer\{selectedPath}
            </div>
        </div>
    );
};
