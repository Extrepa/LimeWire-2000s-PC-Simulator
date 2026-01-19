import React, { useState, useEffect } from 'react';
import { ConnectionItem } from '../types';

const MOCK_CONNECTIONS: ConnectionItem[] = [
    { host: '68.12.99.102', status: 'Connected', uptime: '02:14:22', agent: 'LimeWire 4.10.2', isUltrapeer: true },
    { host: '24.55.12.01', status: 'Connected', uptime: '00:45:10', agent: 'BearShare 5.1', isUltrapeer: false },
    { host: '192.168.0.105', status: 'Handshaking', uptime: '00:00:02', agent: 'Gnutella', isUltrapeer: false },
    { host: '82.11.44.200', status: 'Connected', uptime: '05:33:11', agent: 'LimeWire 4.12.6', isUltrapeer: true },
    { host: '12.4.9.11', status: 'Connecting...', uptime: '-', agent: '-', isUltrapeer: false },
];

export const ConnectionsTab = () => {
    const [connections, setConnections] = useState(MOCK_CONNECTIONS);
    const [bandwidth, setBandwidth] = useState<number[]>(new Array(20).fill(10));

    useEffect(() => {
        const interval = setInterval(() => {
            // Update bandwidth graph
            setBandwidth(prev => {
                const next = [...prev.slice(1), Math.random() * 100];
                return next;
            });

            // Randomly update connection statuses
            setConnections(prev => prev.map(c => {
                if (c.status === 'Connecting...' && Math.random() > 0.9) return { ...c, status: 'Connected', uptime: '00:00:01', agent: 'LimeWire 4.8' };
                return c;
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col w-full h-full bg-white font-sans text-xs">
            <div className="bg-[#EBE9ED] p-2 border-b border-gray-400">
                <h3 className="font-bold text-gray-700">Gnutella Network Status</h3>
            </div>
            
            <div className="h-40 bg-black p-2 border-b border-gray-400 relative overflow-hidden">
                <div className="absolute top-2 left-2 text-lime-500 font-mono text-xs z-10">
                    Incoming Traffic: {(Math.random() * 50 + 20).toFixed(1)} KB/s
                </div>
                <div className="flex items-end h-full w-full space-x-1 pt-6">
                    {bandwidth.map((val, i) => (
                        <div 
                            key={i} 
                            className="flex-1 bg-lime-500/50 border-t border-lime-400" 
                            style={{ height: `${val}%` }}
                        />
                    ))}
                </div>
                {/* Grid lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, #333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#EBE9ED] sticky top-0">
                        <tr className="border-b border-gray-400 text-gray-700">
                            <th className="p-1 font-normal w-32 border-r border-gray-300">Host</th>
                            <th className="p-1 font-normal w-24 border-r border-gray-300">Status</th>
                            <th className="p-1 font-normal w-24 border-r border-gray-300">Uptime</th>
                            <th className="p-1 font-normal border-r border-gray-300">User Agent</th>
                            <th className="p-1 font-normal w-20">Type</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {connections.map((conn, i) => (
                            <tr key={i} className="border-b border-gray-100 text-gray-800 hover:bg-[#E0E0F0]">
                                <td className="p-1 border-r border-dotted border-gray-300 font-mono">{conn.host}</td>
                                <td className="p-1 border-r border-dotted border-gray-300">{conn.status}</td>
                                <td className="p-1 border-r border-dotted border-gray-300">{conn.uptime}</td>
                                <td className="p-1 border-r border-dotted border-gray-300">{conn.agent}</td>
                                <td className="p-1">
                                    {conn.isUltrapeer ? 
                                        <span className="bg-blue-100 text-blue-800 px-1 rounded border border-blue-200 text-[9px]">Ultrapeer</span> : 
                                        <span className="text-gray-500 text-[9px]">Leaf</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
