
import React, { useState, useEffect } from 'react';
import { X, Minus, Square, ChevronLeft, ChevronRight, RefreshCw, Home, Search, Globe, Video, Mail, ShieldAlert, Users, Music, Info, ExternalLink, ShieldCheck } from 'lucide-react';

interface InternetExplorerProps {
    onClose: () => void;
    onMinimize: () => void;
    position: { x: number, y: number };
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    zIndex: number;
    active: boolean;
    onClick: () => void;
}

export const InternetExplorer = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: InternetExplorerProps) => {
    const [url, setUrl] = useState('http://www.google.com');
    const [page, setPage] = useState<'home' | 'google' | 'myspace' | 'youtube' | 'custom'>('google');
    const [isLoading, setIsLoading] = useState(false);
    const [showPopupBar, setShowPopupBar] = useState(false);

    const navigate = (target: string) => {
        setIsLoading(true);
        setShowPopupBar(false);
        const cleanTarget = target.toLowerCase();
        
        // Randomly show popup bar logic
        if (Math.random() > 0.6) {
            setTimeout(() => setShowPopupBar(true), 1500);
        }

        setTimeout(() => {
            if (cleanTarget.includes('google')) setPage('google');
            else if (cleanTarget.includes('myspace')) setPage('myspace');
            else if (cleanTarget.includes('youtube')) setPage('youtube');
            else if (cleanTarget === 'home' || cleanTarget === 'msn') setPage('home');
            else setPage('custom');
            
            setUrl(target.startsWith('http') ? target : `http://${target}`);
            setIsLoading(false);
        }, 800);
    };

    const MySpaceSim = () => (
        <div className="bg-[#003399] min-h-full font-serif p-4 text-white overflow-x-hidden">
            <div className="max-w-4xl mx-auto bg-white text-black p-4 shadow-2xl border-4 border-blue-800">
                <div className="bg-[#003399] p-2 flex justify-between items-center mb-4">
                    <h1 className="text-white font-bold text-2xl tracking-tighter italic">myspace.com | a place for friends</h1>
                    <div className="text-[10px] text-blue-200">Home | Browse | Search | Invite | Film | Mail | Blog</div>
                </div>
                
                <div className="grid grid-cols-[250px_1fr] gap-6">
                    <div className="space-y-4">
                        <div className="border border-blue-800 p-2 text-center">
                            <h2 className="font-bold text-lg mb-2">Tom</h2>
                            <div className="w-full aspect-square bg-gray-200 mb-2 border border-black flex items-center justify-center relative group">
                                <img src="https://miro.medium.com/v2/resize:fit:1400/1*m_T_2_H7i7f_D50o8lq72A.jpeg" className="w-full h-full object-cover" alt="Tom" />
                            </div>
                            <div className="text-xs">"I'm your first friend!"</div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-orange-100 border border-orange-300 p-3 mb-4">
                            <h3 className="font-bold text-orange-800 mb-1 italic">Tom's Blurbs</h3>
                            <div className="text-sm font-bold text-orange-900 mb-2 underline">About me:</div>
                            <p className="text-xs leading-relaxed mb-4">Hey everyone! Thanks for joining MySpace. This is a place where you can express yourself and meet new people.</p>
                        </div>
                        <div className="border border-blue-800 p-2">
                            <h3 className="font-bold bg-blue-800 text-white px-2 py-1 mb-2">Tom's Friend Space</h3>
                            <div className="font-bold text-xs mb-2">Tom has <span className="text-red-600">284,912,482</span> friends.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const HomePortal = () => (
        <div className="bg-[#f0f0f0] min-h-full p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif font-black text-blue-900 mb-2 italic">MSN World</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">Your Window to the Web in 2005</p>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <FavoriteCard title="Google" desc="Search the web." icon={<Search size={32} className="text-blue-500"/>} onClick={() => navigate('http://www.google.com')} />
                    <FavoriteCard title="MySpace" desc="Connect with friends." icon={<Users size={32} className="text-blue-600"/>} onClick={() => navigate('http://www.myspace.com')} />
                    <FavoriteCard title="YouTube" desc="Watch videos." icon={<Video size={32} className="text-red-600"/>} onClick={() => navigate('http://www.youtube.com')} />
                </div>
            </div>
        </div>
    );

    const FavoriteCard = ({ title, desc, icon, onClick }: any) => (
        <div onClick={onClick} className="bg-white border-2 border-gray-300 p-4 flex flex-col items-center text-center group cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all">
            <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
            <h3 className="font-bold text-blue-900 mb-1">{title}</h3>
            <p className="text-[10px] text-gray-500">{desc}</p>
        </div>
    );

    return (
        <div style={{ left: position.x, top: position.y, zIndex }} className="absolute w-[95vw] md:w-[800px] h-[75vh] md:h-[600px] bg-[#D4D0C8] border-2 border-[#0055EA] shadow-2xl flex flex-col font-sans text-xs win-shadow rounded-t-lg overflow-hidden" onClick={onClick}>
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className={`h-8 flex items-center justify-between px-1 select-none ${active ? 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]' : 'bg-[#7899CC]'}`}>
                <div className="flex items-center text-white space-x-2 pl-2 truncate font-bold">
                    <div className="w-4 h-4 bg-white text-blue-800 flex items-center justify-center text-[10px] font-serif font-bold rounded-sm border border-blue-900 shadow-inner">e</div>
                    <span className="truncate drop-shadow-md">Microsoft Internet Explorer</span>
                </div>
                <div className="flex space-x-0.5" onMouseDown={e => e.stopPropagation()}>
                     <button onClick={onMinimize} className="w-6 h-6 bg-[#0055EA] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><Minus size={14}/></button>
                     <button className="w-6 h-6 bg-[#0055EA] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><Square size={12}/></button>
                     <button onClick={onClose} className="w-6 h-6 bg-[#E81123] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110"><X size={14} strokeWidth={3}/></button>
                </div>
            </div>

            <div className="bg-[#EBE9ED] flex items-center px-1 border-b border-gray-400 py-0.5 font-bold text-gray-800">
               {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(m => (
                   <span key={m} className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default rounded-sm">{m}</span>
               ))}
            </div>

            <div className="bg-[#EBE9ED] p-1 border-b border-gray-400 flex items-center space-x-2">
                <div className="flex space-x-1 text-gray-700">
                    <button className="p-1 rounded-full border border-transparent hover:border-gray-400 hover:bg-white transition-colors" onClick={() => navigate('home')}><Home size={18}/></button>
                    <button className="p-1 rounded-full border border-transparent hover:border-gray-400 hover:bg-white transition-colors"><ChevronLeft size={18}/></button>
                    <button className="p-1 rounded-full border border-transparent hover:border-gray-400 hover:bg-white transition-colors"><ChevronRight size={18}/></button>
                </div>
                <div className="flex-1 bg-white border border-gray-500 h-6 px-2 flex items-center text-gray-800 font-mono shadow-inner overflow-hidden">
                    <span className="text-gray-400 mr-2">Address</span>
                    <input className="w-full border-none outline-none" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && navigate(url)} />
                </div>
            </div>

            {showPopupBar && (
                <div className="bg-[#FFFFCC] border-b border-yellow-600 px-4 py-1 flex items-center justify-between text-[11px] animate-slide-up">
                    <div className="flex items-center space-x-2">
                        <ShieldAlert size={14} className="text-yellow-600" />
                        <span className="font-bold">A popup window was blocked. To see this popup and other options click here...</span>
                    </div>
                    <button onClick={() => setShowPopupBar(false)} className="hover:bg-yellow-200 p-0.5 rounded"><X size={12}/></button>
                </div>
            )}

            <div className="flex-1 bg-white overflow-auto scrollbar-retro relative">
                {isLoading ? (
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-blue-900 font-bold italic animate-pulse">Contacting Web Server...</span>
                    </div>
                ) : (
                    <>
                        {page === 'home' && <HomePortal />}
                        {page === 'google' && (
                            <div className="flex flex-col items-center justify-center h-full space-y-8 p-10">
                                <div className="text-6xl font-serif font-bold tracking-tight">
                                    <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500 italic">e</span>
                                </div>
                                <div className="w-full max-w-md space-y-4">
                                    <input className="w-full border border-gray-400 shadow-sm p-1.5 outline-none focus:border-blue-500" />
                                    <div className="flex justify-center space-x-4">
                                        <button className="bg-[#f2f2f2] border border-gray-300 px-6 py-1 hover:border-gray-500">Google Search</button>
                                        <button className="bg-[#f2f2f2] border border-gray-300 px-6 py-1 hover:border-gray-500">I'm Feeling Lucky</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {page === 'myspace' && <MySpaceSim />}
                        {page === 'youtube' && (
                            <div className="h-full bg-white flex flex-col items-center justify-center text-center p-20 space-y-4">
                                <div className="text-3xl font-black italic"><span className="text-red-600">You</span>Tube™ <span className="bg-red-600 text-white px-2 rounded ml-1">BETA</span></div>
                                <p className="text-gray-500 font-bold">Broadcast Yourself!</p>
                                <div className="bg-gray-100 p-8 border-4 border-dashed border-gray-300 rounded-xl">
                                    <Video size={64} className="text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-400 italic">"The site is currently under high load. Please try again in 2006."</p>
                                </div>
                            </div>
                        )}
                        {page === 'custom' && (
                            <div className="p-20 text-center space-y-4">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500">
                                    <Globe size={40} className="text-blue-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-blue-900">The page cannot be displayed</h1>
                                <p className="text-sm text-gray-600 max-w-md mx-auto">The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or you may need to adjust your browser settings.</p>
                                <div className="pt-10 space-y-2 text-blue-600 underline text-xs cursor-pointer">
                                    <div>Detect Network Settings</div>
                                    <div onClick={() => navigate('home')}>Return to Homepage</div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="h-6 bg-[#EBE9ED] border-t border-gray-400 flex items-center px-4 text-[10px] text-gray-600 font-bold justify-between">
                <span className="flex items-center space-x-2">
                    <Globe size={12} />
                    <span>Done</span>
                </span>
                <span className="flex items-center text-green-700 font-bold">
                    <ShieldCheck size={12} className="mr-1"/> Trusted Site
                </span>
            </div>
        </div>
    );
};
