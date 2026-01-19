
import React, { useState, useEffect } from 'react';
import { X, Minus, Square, Search, Globe, Image, Film, BookOpen, Map, HelpCircle, ChevronRight, Play, Award, RotateCcw } from 'lucide-react';

interface EncartaProps {
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

const ARTICLES: Record<string, { title: string, content: string, media: string, category: string }> = {
    'dinosaurs': { 
        title: 'Dinosaurs: Giants of the Mesozoic', 
        category: 'Science & Nature',
        content: 'Dinosaurs were a diverse group of animals that appeared during the Triassic period. For over 150 million years, they were the dominant terrestrial vertebrates on Earth. The name "dinosaur" was coined in 1842 by Sir Richard Owen and is derived from Greek words meaning "terrible lizard". While many were giant, some were small as chickens. Modern birds are now considered to be highly specialized theropod dinosaurs.',
        media: 'T-Rex Skull 3D Rendering'
    },
    'space': { 
        title: 'Space Exploration History', 
        category: 'Technology',
        content: 'Space exploration began in the late 1950s with the launch of Sputnik 1. The "Space Race" between the US and the USSR led to the first human in space (Yuri Gagarin) and the first Moon landing in 1969. In 2005, deep-space probes like Voyager are still transmitting data from the edge of our solar system, while the Hubble Space Telescope continues to revolutionize our view of the universe.',
        media: 'Eagle Nebula Pillars of Creation'
    },
    'egypt': { 
        title: 'Ancient Egypt', 
        category: 'History',
        content: 'Ancient Egypt was a civilization of ancient North Africa, concentrated along the lower reaches of the Nile River. It followed prehistoric Egypt and coalesced around 3100 BC. The civilization is famous for its pyramids, the Sphinx, and its complex hieroglyphic writing system. Pharoahs were considered living gods, and their tombs were filled with gold to ensure a safe journey to the afterlife.',
        media: 'The Great Pyramid of Giza (1900 Photo)'
    },
    'internet': {
        title: 'The World Wide Web',
        category: 'Society',
        content: 'Proposed by Tim Berners-Lee in 1989, the Web became a global phenomenon in the 1990s. By 2005, it has completely changed how humans communicate, work, and share information. Dial-up is slowly being replaced by high-speed "Broadband" connections, allowing for peer-to-peer file sharing and video streaming.',
        media: 'Browser Screenshot (Netscape)'
    }
};

const TRIVIA = [
    { q: "Which dinosaur name translates to 'three-horned face'?", a: ["Stegosaurus", "Triceratops", "Velociraptor"], correct: 1 },
    { q: "Who was the first person to walk on the moon?", a: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong"], correct: 2 },
    { q: "What is the capital of Ancient Egypt during the Old Kingdom?", a: ["Memphis", "Thebes", "Cairo"], correct: 0 },
    { q: "What year did the World Wide Web become public domain?", a: ["1989", "1993", "1999"], correct: 1 }
];

export const Encarta = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: EncartaProps) => {
    const [search, setSearch] = useState('');
    const [view, setView] = useState<'home' | 'article' | 'maze'>('home');
    const [activeArticle, setActiveArticle] = useState<string | null>(null);
    const [mazeStep, setMazeStep] = useState(0);
    const [mazeScore, setMazeScore] = useState(0);
    const [mazeState, setMazeState] = useState<'intro' | 'playing' | 'end'>('intro');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const key = search.toLowerCase();
        if (ARTICLES[key]) {
            setActiveArticle(key);
            setView('article');
        } else {
            const foundKey = Object.keys(ARTICLES).find(k => k.includes(key));
            if (foundKey) {
                setActiveArticle(foundKey);
                setView('article');
            } else {
                alert("Topic not found in this edition of Encarta.");
            }
        }
    };

    const handleAnswer = (idx: number) => {
        if (idx === TRIVIA[mazeStep].correct) {
            setMazeScore(s => s + 100);
        }
        if (mazeStep < TRIVIA.length - 1) {
            setMazeStep(s => s + 1);
        } else {
            setMazeState('end');
        }
    };

    return (
        <div style={{ left: position.x, top: position.y, zIndex }} className="absolute w-[800px] h-[580px] bg-[#102040] border-2 border-[#506080] shadow-2xl flex flex-col font-sans text-xs win-shadow overflow-hidden rounded-sm" onClick={onClick}>
            {/* Encarta Title Bar - Added onTouchStart for mobile window dragging */}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className="h-8 bg-gradient-to-r from-[#000033] via-[#103070] to-[#000033] flex items-center justify-between px-2 cursor-move border-b border-[#ffffff33]">
                <div className="flex items-center text-white space-x-2 pl-1 font-bold italic tracking-wider">
                     <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center"><BookOpen size={12} className="text-blue-900"/></div>
                     <span>Microsoft® Encarta® 2005 Premium</span>
                </div>
                <div className="flex space-x-1">
                     <button onClick={onMinimize} className="w-5 h-5 hover:bg-white/20 text-white flex items-center justify-center rounded-sm">-</button>
                     <button onClick={onClose} className="w-5 h-5 hover:bg-red-600 text-white flex items-center justify-center rounded-sm">x</button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Navigation Sidebar */}
                <div className="w-48 bg-[#102040] border-r border-[#304060] p-4 flex flex-col space-y-6">
                    <div className="space-y-2">
                        <NavBtn icon={<Globe size={16}/>} label="Atlas" onClick={() => {}} />
                        <NavBtn icon={<Map size={16}/>} label="Timeline" onClick={() => {}} />
                        <NavBtn icon={<HelpCircle size={16}/>} label="MindMaze" onClick={() => { setView('maze'); setMazeState('intro'); setMazeStep(0); setMazeScore(0); }} />
                        <NavBtn icon={<Image size={16}/>} label="Media Gallery" onClick={() => {}} />
                        <NavBtn icon={<BookOpen size={16}/>} label="Dictionary" onClick={() => {}} />
                    </div>

                    <div className="flex-1"></div>

                    <div className="bg-[#ffffff11] p-3 border border-[#ffffff33] rounded">
                        <div className="text-[10px] text-blue-300 font-bold mb-1 uppercase">Recommended</div>
                        <div className="text-white font-bold hover:underline cursor-pointer" onClick={() => { setSearch('dinosaurs'); setView('article'); setActiveArticle('dinosaurs'); }}>Dinosaurs</div>
                        <div className="text-white font-bold hover:underline cursor-pointer mt-1" onClick={() => { setSearch('internet'); setView('article'); setActiveArticle('internet'); }}>History of WWW</div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-[#f0f4f8]">
                    {/* Header Controls */}
                    <div className="h-14 bg-white border-b border-gray-300 flex items-center px-6 justify-between shadow-sm z-10">
                        <form onSubmit={handleSearch} className="flex items-center bg-[#f0f0f0] border border-gray-400 rounded-full px-3 py-1 w-64 shadow-inner">
                            <Search size={14} className="text-gray-500 mr-2"/>
                            <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-[11px] w-full" placeholder="Search the library..." />
                        </form>
                        <div className="flex space-x-4">
                            <button onClick={() => setView('home')} className="text-[#102040] font-black uppercase tracking-tighter hover:underline">Home</button>
                            <button className="text-gray-400 font-bold uppercase tracking-tighter cursor-not-allowed">Back</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-8 scrollbar-retro">
                        {view === 'home' && (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="text-6xl font-serif font-black text-blue-900 mb-4 italic tracking-tighter opacity-10 select-none">ENCARTA</div>
                                <h1 className="text-4xl font-serif font-bold text-[#102040] mb-8">Ready to discover the world?</h1>
                                <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                                    <FeatureCard title="Space Exploration" desc="The final frontier." category="Tech" onClick={() => { setSearch('space'); setView('article'); setActiveArticle('space'); }} />
                                    <FeatureCard title="Ancient Egypt" desc="Secrets of the Nile." category="History" onClick={() => { setSearch('egypt'); setView('article'); setActiveArticle('egypt'); }} />
                                    <FeatureCard title="Dinosaurs" desc="Prehistoric giants." category="Nature" onClick={() => { setSearch('dinosaurs'); setView('article'); setActiveArticle('dinosaurs'); }} />
                                    <FeatureCard title="World Wide Web" desc="A global network." category="Society" onClick={() => { setSearch('internet'); setView('article'); setActiveArticle('internet'); }} />
                                </div>
                            </div>
                        )}

                        {view === 'article' && activeArticle && (
                            <div className="max-w-2xl animate-in fade-in duration-500">
                                <div className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-widest">{ARTICLES[activeArticle].category}</div>
                                <h1 className="text-3xl font-serif font-bold text-blue-900 mb-6 border-b-2 border-blue-900 pb-2">{ARTICLES[activeArticle].title}</h1>
                                <div className="flex space-x-6">
                                    <div className="flex-1 text-sm leading-relaxed text-gray-800 font-serif whitespace-pre-wrap">
                                        {ARTICLES[activeArticle].content}
                                    </div>
                                    <div className="w-56 flex-shrink-0">
                                        <div className="bg-white border-2 border-gray-300 p-1 shadow-md mb-4 group cursor-zoom-in">
                                            <div className="h-36 bg-[#222] flex items-center justify-center text-center text-[10px] text-gray-500 italic p-4 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-blue-500/10 group-hover:opacity-0 transition-opacity"></div>
                                                [IMAGE: {ARTICLES[activeArticle].media}]
                                            </div>
                                            <div className="text-[9px] text-gray-400 mt-1 p-1 flex items-center justify-between">
                                                <span>Encarta Media 2.0</span>
                                                <Image size={10}/>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 p-3 border border-blue-100 text-[10px] text-blue-900 rounded-sm">
                                            <div className="font-black mb-1 underline uppercase">Related Topics:</div>
                                            <ul className="space-y-1">
                                                <li className="hover:underline cursor-pointer">Evolutionary Biology</li>
                                                <li className="hover:underline cursor-pointer">Fossil Record</li>
                                                <li className="hover:underline cursor-pointer">Geology</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {view === 'maze' && (
                            <div className="h-full flex flex-col items-center justify-center bg-[#000] rounded-lg p-6 border-4 border-[#333] shadow-inner relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #00FF00 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                                
                                {mazeState === 'intro' && (
                                    <div className="text-center z-10">
                                        <h2 className="text-[#00FF00] font-black text-6xl mb-6 italic tracking-tighter drop-shadow-[0_0_10px_#00FF00]">MIND MAZE</h2>
                                        <p className="text-white mb-8 text-lg font-serif">Test your knowledge of the world in the legendary trivia challenge.</p>
                                        <button 
                                            onClick={() => setMazeState('playing')}
                                            className="bg-[#00FF00] text-black px-10 py-3 font-black text-xl hover:brightness-110 active:scale-95 shadow-lg"
                                        >
                                            ENTER THE MAZE
                                        </button>
                                    </div>
                                )}

                                {mazeState === 'playing' && (
                                    <div className="bg-[#111] w-full max-w-lg p-8 border-2 border-[#00FF00] text-white text-center shadow-[0_0_30px_#00FF0033] relative z-10">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black px-4 text-[#00FF00] font-black tracking-widest text-[10px]">QUESTION {mazeStep + 1} / {TRIVIA.length}</div>
                                        <p className="text-xl font-bold mb-8 italic font-serif leading-relaxed text-[#00FF00]">"{TRIVIA[mazeStep].q}"</p>
                                        <div className="space-y-4">
                                            {TRIVIA[mazeStep].a.map((ans, idx) => (
                                                <button 
                                                    key={idx}
                                                    onClick={() => handleAnswer(idx)}
                                                    className="w-full py-3 border-2 border-gray-600 hover:border-[#00FF00] hover:bg-[#00FF00]/10 transition-all font-bold text-left px-6 relative group"
                                                >
                                                    <span className="text-gray-500 mr-4 group-hover:text-[#00FF00]">{String.fromCharCode(65 + idx)})</span>
                                                    {ans}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-8 flex justify-between text-[10px] font-black text-gray-500">
                                            <span>SCORE: {mazeScore}</span>
                                            <span>LIVES: 3</span>
                                        </div>
                                    </div>
                                )}

                                {mazeState === 'end' && (
                                    <div className="text-center z-10">
                                        <Award size={64} className="text-yellow-400 mx-auto mb-4 drop-shadow-[0_0_15px_gold]" />
                                        <h2 className="text-[#00FF00] font-black text-4xl mb-2 italic">CHALLENGE COMPLETE</h2>
                                        <div className="text-white text-xl mb-8">FINAL SCORE: <span className="text-4xl text-yellow-400 font-black">{mazeScore}</span></div>
                                        <div className="flex space-x-4 justify-center">
                                            <button 
                                                onClick={() => { setMazeState('playing'); setMazeStep(0); setMazeScore(0); }}
                                                className="bg-blue-600 text-white px-6 py-2 font-bold flex items-center space-x-2 hover:bg-blue-500"
                                            >
                                                <RotateCcw size={16}/> <span>RETRY</span>
                                            </button>
                                            <button 
                                                onClick={() => setView('home')}
                                                className="border-2 border-white text-white px-6 py-2 font-bold hover:bg-white hover:text-black"
                                            >
                                                EXIT TO LIBRARY
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="h-6 bg-[#102040] border-t border-[#304060] flex items-center px-4 text-[9px] text-blue-300">
                <span className="mr-6">Encarta® 2005 Premium Edition. Part of Microsoft® Student.</span>
                <span className="flex-1">Ready to explore: {view === 'article' ? activeArticle : 'Home'}</span>
                <span className="font-bold">UPGRADE AVAILABLE</span>
            </div>
        </div>
    );
};

const NavBtn = ({ icon, label, onClick }: any) => (
    <button onClick={onClick} className="flex items-center space-x-3 text-white/70 hover:text-white group w-full transition-colors p-1">
        <div className="p-1 group-hover:bg-white/10 rounded">{icon}</div>
        <span className="font-bold tracking-tight">{label}</span>
    </button>
);

const FeatureCard = ({ title, desc, category, onClick }: any) => (
    <div onClick={onClick} className="bg-white p-4 border border-gray-300 shadow-md hover:scale-105 hover:shadow-xl transition-all cursor-pointer group rounded-sm text-left">
        <div className="text-[8px] font-black text-blue-600 mb-1 uppercase">{category}</div>
        <div className="h-24 bg-gray-100 mb-3 flex items-center justify-center text-gray-400 overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-900/5 group-hover:opacity-0"></div>
            <Play size={20} className="text-gray-300 opacity-50"/>
        </div>
        <div className="font-black text-[#102040] text-sm group-hover:text-blue-700">{title}</div>
        <div className="text-[10px] text-gray-500 italic mt-1">{desc}</div>
    </div>
);
