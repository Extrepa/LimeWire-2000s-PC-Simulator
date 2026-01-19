import React from 'react';

interface DesktopContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onAction: (action: string) => void;
}

export const DesktopContextMenu = ({ x, y, onClose, onAction }: DesktopContextMenuProps) => {
    const items = [
        { label: 'Arrange Icons By', hasSub: true },
        { label: 'Refresh', action: 'refresh' },
        { type: 'separator' },
        { label: 'Paste', disabled: true },
        { label: 'Paste Shortcut', disabled: true },
        { type: 'separator' },
        { label: 'New', hasSub: true },
        { type: 'separator' },
        { label: 'Properties', action: 'properties', bold: true }
    ];

    return (
        <>
            <div className="fixed inset-0 z-[49]" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }}></div>
            <div 
                style={{ left: x, top: y }}
                className="fixed z-[50] w-40 bg-[#ECE9D8] border border-gray-500 shadow-md p-0.5 font-sans text-xs select-none"
                onContextMenu={(e) => e.preventDefault()}
            >
                {items.map((item, i) => (
                    item.type === 'separator' ? (
                        <div key={i} className="h-[1px] bg-gray-400 my-1 mx-0.5"></div>
                    ) : (
                        <div 
                            key={i}
                            onClick={() => { if(!item.disabled) { item.action && onAction(item.action); onClose(); } }}
                            className={`
                                flex justify-between items-center px-4 py-1 cursor-default
                                ${item.disabled ? 'text-gray-400' : 'hover:bg-[#316AC5] hover:text-white'}
                            `}
                        >
                            <span className={item.bold ? 'font-bold' : ''}>{item.label}</span>
                            {item.hasSub && <span>►</span>}
                        </div>
                    )
                ))}
            </div>
        </>
    );
};
