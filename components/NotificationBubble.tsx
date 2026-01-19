import React, { useEffect, useState } from 'react';
import { X, Info } from 'lucide-react';

interface NotificationBubbleProps {
    title: string;
    message: string;
    onClose: () => void;
    position: { x: number, y: number };
}

export const NotificationBubble = ({ title, message, onClose, position }: NotificationBubbleProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Pop in animation
        setTimeout(() => setVisible(true), 100);
        // Auto close
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500); // Wait for fade out
        }, 6000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div 
            style={{ left: position.x - 280, top: position.y - 100 }}
            className={`
                fixed w-[280px] z-[9999] transition-opacity duration-500
                ${visible ? 'opacity-100' : 'opacity-0'}
            `}
        >
            <div className="relative bg-[#FFFFE1] border border-black rounded shadow-lg p-2 text-xs font-sans text-black">
                <button onClick={onClose} className="absolute top-1 right-1 hover:bg-[#FFA500] hover:text-white rounded">
                    <X size={12} />
                </button>
                <div className="flex items-start space-x-2">
                    <Info size={24} className="text-[#316AC5] flex-shrink-0 mt-1" />
                    <div>
                        <div className="font-bold mb-1">{title}</div>
                        <p>{message}</p>
                    </div>
                </div>
                {/* Arrow pointing down-right roughly to tray */}
                <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#FFFFE1] border-b border-r border-black transform rotate-45"></div>
            </div>
        </div>
    );
};
