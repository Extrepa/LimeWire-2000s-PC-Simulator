import React from 'react';
import { Tab, SearchResult, DownloadItem, DownloadStatus, LibraryItem, LimeWireSkin } from '../types';
import { LogoIcon, QualityStars, FileIcon, X, Minus, Search, Library, Monitor, MessageCircle, Globe, RefreshCw, Zap, Play, Trash2, Star, Music } from './Icons';
import { ChatTab } from './ChatTab';
import { ConnectionsTab } from './ConnectionsTab';

interface LimeWireProps {
  active: boolean;
  onClick: () => void;
  onMinimize: () => void;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  position: { x: number, y: number };
  zIndex: number;
  // State from App
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  searchResults: SearchResult[];
  startDownload: (res: SearchResult) => void;
  downloads: DownloadItem[];
  library: LibraryItem[];
  currentTrack: LibraryItem | null;
  setCurrentTrack: (t: LibraryItem | null) => void;
  setBitziTarget: (res: SearchResult | null) => void;
  setPeerToBrowse: (peerId: string | null) => void;
  lwSkin: LimeWireSkin;
  setLwSkin: (s: LimeWireSkin) => void;
  isTurboCharged: boolean;
  setIsTurboCharged: (b: boolean) => void;
  karma: number;
  searchHistory: string[];
  isAdvancedSearch: boolean;
  setIsAdvancedSearch: (b: boolean) => void;
  selectedLibraryItem: LibraryItem | null;
  setSelectedLibraryItem: (t: LibraryItem | null) => void;
  setShowAbout: (b: boolean) => void;
  setShowSettings: (b: boolean) => void;
  toggleWindow: (id: string, force?: boolean) => void;
}

export const LimeWire: React.FC<LimeWireProps> = (props) => {
  const { 
    active, onClick, onMinimize, onClose, onMouseDown, onTouchStart, position, zIndex,
    activeTab, setActiveTab, searchQuery, setSearchQuery, handleSearch, isSearching, searchResults,
    startDownload, downloads, library, currentTrack, setCurrentTrack, setBitziTarget,
    setPeerToBrowse, lwSkin, setLwSkin, isTurboCharged, setIsTurboCharged, karma,
    searchHistory, isAdvancedSearch, setIsAdvancedSearch, selectedLibraryItem,
    setSelectedLibraryItem, setShowAbout, setShowSettings, toggleWindow
  } = props;

  const getLwThemeClasses = () => {
    switch(lwSkin) {
        case 'lime': return {
            border: 'border-[#32CD32]',
            title: 'bg-gradient-to-r from-[#32CD32] via-[#228B22] to-[#32CD32]',
            accent: 'text-lime-600',
            highlight: 'bg-lime-500'
        };
        case 'stealth': return {
            border: 'border-[#333333]',
            title: 'bg-gradient-to-r from-[#444444] via-[#222222] to-[#444444]',
            accent: 'text-gray-400',
            highlight: 'bg-gray-600'
        };
        default: return { // cobalt pro
            border: 'border-[#0055EA]',
            title: 'bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA]',
            accent: 'text-blue-600',
            highlight: 'bg-blue-600'
        };
    }
  };

  const lwTheme = getLwThemeClasses();

  return (
    <div 
        style={{ left: position.x, top: position.y, zIndex }}
        className={`absolute w-[95vw] md:w-[880px] h-[85vh] md:h-[600px] bg-[#EBE9ED] border-2 ${lwTheme.border} shadow-2xl flex flex-col font-sans text-xs win-shadow rounded-t-lg overflow-hidden transition-colors duration-500`}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
        {/* LimeWire Title Bar */}
        <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className={`h-7 flex items-center justify-between px-1 select-none ${active ? lwTheme.title : 'bg-[#7899CC]'}`}>
             <div className="flex items-center text-white space-x-2 pl-1 font-bold">
                <LogoIcon />
                <span className="drop-shadow-sm text-[13px]">LimeWire PRO 4.12.6</span>
             </div>
             <div className="flex space-x-0.5">
                <button 
                  onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
                  className="w-6 h-6 bg-white/10 border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110 active:scale-95"
                >
                  <Minus size={14}/>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onClose(); }} 
                  className="w-6 h-6 bg-[#E81123] border border-white/30 rounded-sm flex items-center justify-center text-white hover:brightness-110 active:scale-95"
                >
                  <X size={14}/>
                </button>
             </div>
        </div>

        {/* LimeWire Menu */}
        <div className="bg-[#EBE9ED] flex items-center px-1 border-b border-gray-400 py-0.5 font-bold text-gray-800">
             {['File', 'Navigation', 'View', 'Resources', 'Tools', 'Help'].map(m => (
                 <div key={m} className="relative group">
                     <span className="px-2 hover:bg-[#316AC5] hover:text-white cursor-default rounded-sm">{m}</span>
                     {m === 'Tools' && (
                         <div className="hidden group-hover:block absolute top-full left-0 bg-[#EBE9ED] border border-gray-400 shadow-xl z-50 min-w-[150px] font-normal">
                             <div onClick={() => setShowSettings(true)} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">Options...</div>
                             <div className="h-[1px] bg-gray-300 my-1"></div>
                             <div className="px-4 py-1 font-bold text-[9px] uppercase text-gray-500">Apply Skin</div>
                             <div onClick={() => setLwSkin('cobalt')} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer flex items-center space-x-2">
                                 <div className="w-2 h-2 bg-blue-600"></div> <span>Cobalt Pro</span>
                             </div>
                             <div onClick={() => setLwSkin('lime')} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer flex items-center space-x-2">
                                 <div className="w-2 h-2 bg-lime-600"></div> <span>Lime Classic</span>
                             </div>
                             <div onClick={() => setLwSkin('stealth')} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer flex items-center space-x-2">
                                 <div className="w-2 h-2 bg-gray-600"></div> <span>Stealth Mode</span>
                             </div>
                         </div>
                     )}
                     {m === 'Help' && (
                         <div className="hidden group-hover:block absolute top-full left-0 bg-[#EBE9ED] border border-gray-400 shadow-xl z-50 min-w-[150px] font-normal">
                             <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">About LimeWire</div>
                         </div>
                     )}
                 </div>
             ))}
        </div>

        {/* LimeWire Tabs */}
        <div className="bg-[#EBE9ED] flex items-end px-1 space-x-1 border-b border-gray-400 pt-1">
            {[Tab.SEARCH, Tab.MONITOR, Tab.LIBRARY, Tab.CHAT, Tab.CONNECTIONS].map(t => (
                <button 
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`
                        px-4 py-1.5 rounded-t-md border-t border-l border-r border-gray-400 transition-all font-bold text-[11px]
                        ${activeTab === t ? 'bg-white border-b-white -mb-[1px] z-10 shadow-sm' : 'bg-[#D4D0C8] hover:bg-gray-100'}
                    `}
                >
                    <span className={`flex items-center space-x-2 ${activeTab === t ? lwTheme.accent : ''}`}>
                        {t === Tab.SEARCH && <Search size={14}/>}
                        {t === Tab.MONITOR && <Monitor size={14}/>}
                        {t === Tab.LIBRARY && <Library size={14}/>}
                        {t === Tab.CHAT && <MessageCircle size={14}/>}
                        {t === Tab.CONNECTIONS && <Globe size={14}/>}
                        <span className="hidden sm:inline">{t}</span>
                    </span>
                </button>
            ))}
        </div>

        {/* LimeWire Main Content */}
        <div className={`flex-1 flex overflow-hidden bg-white shadow-inner relative ${isTurboCharged ? 'ring-1 ring-blue-400/20' : ''}`}>
            {activeTab === Tab.SEARCH && (
                <div className="flex flex-1">
                    <div className="w-56 bg-[#EBE9ED] border-r border-gray-400 p-3 flex flex-col space-y-4 shadow-sm">
                        <div className="space-y-1">
                            <label className="font-bold text-gray-600 block flex items-center justify-between">
                                <span>Search For:</span>
                                <div onClick={() => setIsAdvancedSearch(!isAdvancedSearch)} className="text-[9px] text-blue-700 hover:underline cursor-pointer font-bold">ADVANCED</div>
                            </label>
                            <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full border border-gray-400 p-1 outline-none focus:border-blue-500 shadow-inner" placeholder="e.g. Linkin Park" />
                                {isAdvancedSearch && (
                                    <div className="bg-white/40 p-2 border border-dashed border-gray-400 space-y-2 rounded-sm animate-in fade-in slide-in-from-top-2">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-gray-500">MIN BITRATE:</span>
                                            <select className="text-[10px] border border-gray-300"><option>Any</option><option>128kbps</option><option>192kbps</option><option>320kbps</option></select>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" defaultChecked /> <span className="text-[10px]">Filter Adult Content</span>
                                        </div>
                                    </div>
                                )}
                                <button type="submit" disabled={isSearching} className={`bg-gradient-to-b from-blue-400 to-blue-700 text-white font-bold py-1 px-4 rounded shadow-sm hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all`}>Search</button>
                            </form>
                        </div>
                        <div className="border-t border-gray-300 pt-4 space-y-2">
                            <div className="font-bold text-gray-600 uppercase text-[10px] flex items-center"><Star size={10} className="mr-1"/> Recent Searches</div>
                            <div className="pl-2 space-y-1">
                                {searchHistory.map(h => (
                                    <div key={h} onClick={() => { setSearchQuery(h); }} className="text-blue-800 hover:underline cursor-pointer truncate text-[11px] font-medium">{h}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="bg-[#ECE9D8] px-3 py-1.5 font-bold border-b border-gray-300 flex justify-between items-center shadow-sm">
                            <span className="text-gray-700">Search Results</span>
                            <span className="text-[10px] text-gray-500">{searchResults.length} results found</span>
                        </div>
                        <div className="flex-1 overflow-auto scrollbar-retro">
                            {isSearching ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4">
                                    <RefreshCw size={32} className="animate-spin text-blue-600" />
                                    <p className="font-bold text-blue-900 italic animate-pulse">Searching Gnutella Network...</p>
                                </div>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-100 sticky top-0 z-10 border-b border-gray-300">
                                        <tr className="text-[10px] font-black uppercase text-gray-600">
                                            <th className="p-2 border-r border-gray-200">Name</th>
                                            <th className="p-2 border-r border-gray-200 w-16">Size</th>
                                            <th className="p-2 border-r border-gray-200 w-16">Type</th>
                                            <th className="p-2 border-r border-gray-200 w-16">Speed</th>
                                            <th className="p-2 w-24">Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchResults.map(res => (
                                            <tr 
                                                key={res.id} 
                                                onDoubleClick={() => startDownload(res)}
                                                className="hover:bg-blue-50 border-b border-gray-100 group cursor-pointer"
                                            >
                                                <td className="p-2 truncate flex items-center space-x-2">
                                                    <FileIcon type={res.type} />
                                                    <span className="font-bold text-[11px] group-hover:text-blue-900">{res.filename}</span>
                                                </td>
                                                <td className="p-2 text-gray-500 font-mono text-[10px]">{res.size}</td>
                                                <td className="p-2 font-black uppercase text-[9px] text-gray-400">{res.type}</td>
                                                <td className="p-2 text-blue-700 font-bold">{res.speed}</td>
                                                <td className="p-2">
                                                    <div className="flex items-center space-x-2">
                                                        <QualityStars count={res.quality}/>
                                                        <button onClick={(e) => { e.stopPropagation(); setBitziTarget(res); }} className="opacity-0 group-hover:opacity-100 text-[9px] bg-yellow-100 text-yellow-800 px-1 border border-yellow-200 rounded font-black">BITZI</button>
                                                        <button onClick={(e) => { e.stopPropagation(); setPeerToBrowse(`Host_${Math.floor(Math.random()*999)}`); }} className="opacity-0 group-hover:opacity-100 text-[9px] bg-blue-100 text-blue-800 px-1 border border-blue-200 rounded font-black">PEER</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {activeTab === Tab.MONITOR && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="bg-[#ECE9D8] px-3 py-1.5 font-bold border-b border-gray-400 flex justify-between">
                        <span>Download Transfers</span>
                        <div className="flex space-x-4 text-gray-500 font-bold">
                            <span className={isTurboCharged ? 'text-blue-600 underline' : ''}>Active: {downloads.filter(d => d.status === DownloadStatus.DOWNLOADING).length}</span>
                            <span>Queued: {downloads.filter(d => d.status === DownloadStatus.PENDING).length}</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto scrollbar-retro">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 sticky top-0 border-b border-gray-300">
                                <tr className="text-[10px] font-black uppercase text-gray-500">
                                    <th className="p-2">File</th>
                                    <th className="p-2 w-32">Progress</th>
                                    <th className="p-2 w-24">Speed</th>
                                    <th className="p-2 w-24">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {downloads.map(dl => (
                                    <tr key={dl.id} className="border-b border-gray-50 text-[11px] group hover:bg-gray-50 transition-colors">
                                        <td className="p-2 font-bold truncate max-w-[300px]">{dl.file.filename}</td>
                                        <td className="p-2">
                                            <div className={`w-full h-3 bg-gray-200 border border-gray-400 relative overflow-hidden shadow-inner ${isTurboCharged && dl.status === DownloadStatus.DOWNLOADING ? 'ring-1 ring-blue-500/50' : ''}`}>
                                                <div 
                                                    className={`h-full transition-all duration-500 ${dl.status === DownloadStatus.COMPLETE ? 'bg-green-600' : 'bg-blue-600'} ${isTurboCharged ? 'brightness-125' : ''}`} 
                                                    style={{ width: `${dl.progress}%` }}
                                                ></div>
                                                <span className="absolute inset-0 flex items-center justify-center text-[9px] text-gray-800 font-black drop-shadow-sm">{Math.floor(dl.progress)}%</span>
                                            </div>
                                        </td>
                                        <td className={`p-2 font-mono ${isTurboCharged ? 'text-blue-900 font-black' : 'text-blue-600'}`}>{dl.speed}</td>
                                        <td className="p-2 font-bold flex items-center justify-between">
                                            <span className={dl.status === DownloadStatus.COMPLETE ? 'text-green-700' : dl.status === DownloadStatus.FAILED ? 'text-red-600' : 'text-blue-800'}>{dl.status}</span>
                                            {dl.status === DownloadStatus.COMPLETE && <div className="p-1 hover:bg-blue-100 rounded cursor-pointer" onClick={() => { setActiveTab(Tab.LIBRARY); toggleWindow('wmp', true); }}><Play size={10}/></div>}
                                        </td>
                                    </tr>
                                ))}
                                {downloads.length === 0 && (
                                    <tr><td colSpan={4} className="p-20 text-center text-gray-400 italic font-medium">No active downloads. Use Search to find files.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {activeTab === Tab.LIBRARY && (
                <div className="flex-1 flex overflow-hidden">
                     <div className="w-48 bg-[#EBE9ED] border-r border-gray-400 p-2 space-y-4 shadow-inner">
                        <div className="space-y-1">
                            <div className="font-bold text-gray-600 uppercase text-[10px]">Library Folders</div>
                            <div className="pl-2 space-y-1">
                                <div className="flex items-center space-x-2 text-blue-900 font-bold bg-white/50 p-1 rounded-sm shadow-sm cursor-pointer"><div className="w-3 h-3 bg-yellow-400 border border-yellow-600"></div> <span>Saved Files</span></div>
                                <div className="flex items-center space-x-2 text-gray-600 p-1 hover:bg-gray-100 rounded-sm cursor-pointer"><div className="w-3 h-3 bg-gray-200 border border-gray-400"></div> <span>Incomplete</span></div>
                                <div className="flex items-center space-x-2 text-gray-600 p-1 hover:bg-gray-100 rounded-sm cursor-pointer"><div className="w-3 h-3 bg-gray-200 border border-gray-400"></div> <span>Shared</span></div>
                            </div>
                        </div>
                     </div>
                     <div className="flex-1 flex flex-col">
                        <div className="flex-1 overflow-auto scrollbar-retro">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100 sticky top-0 z-10 border-b border-gray-300">
                                    <tr className="text-[10px] font-black uppercase text-gray-600">
                                        <th className="p-2">Name</th>
                                        <th className="p-2 w-16">Size</th>
                                        <th className="p-2 w-24">Added</th>
                                        <th className="p-2 w-16">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {library.map(item => (
                                        <tr 
                                            key={item.id} 
                                            onClick={() => setSelectedLibraryItem(item)}
                                            onDoubleClick={() => { setCurrentTrack(item); toggleWindow('wmp', true); }} 
                                            className={`hover:bg-blue-50 border-b border-gray-100 group cursor-pointer transition-colors ${selectedLibraryItem?.id === item.id ? 'bg-blue-100' : ''}`}
                                        >
                                            <td className="p-2 flex items-center space-x-2">
                                                <FileIcon type={item.type} />
                                                <span className="font-bold text-[11px] group-hover:text-blue-900">{item.filename}</span>
                                            </td>
                                            <td className="p-2 text-gray-500 font-mono text-[10px]">{item.size}</td>
                                            <td className="p-2 text-[9px] text-gray-400">{new Date(item.dateAdded).toLocaleDateString()}</td>
                                            <td className="p-2"><QualityStars count={item.quality}/></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Library Integrated Previewer */}
                        <div className="h-28 bg-[#ECE9D8] border-t border-gray-300 p-3 flex items-start space-x-6 shadow-inner">
                            <div className="w-20 h-20 bg-black rounded-sm border border-gray-500 flex items-center justify-center overflow-hidden group shadow-md">
                                 {selectedLibraryItem ? (
                                     <div className="relative w-full h-full flex flex-col items-center justify-center space-y-1">
                                         <Music size={24} className="text-blue-400 animate-pulse"/>
                                         <span className="text-[8px] text-blue-200 font-mono">192 KBPS</span>
                                     </div>
                                 ) : (
                                     <LogoIcon />
                                 )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between h-full overflow-hidden">
                                <div className="overflow-hidden">
                                    <div className="font-black text-blue-900 truncate uppercase tracking-tighter">{selectedLibraryItem?.filename || 'No Selection'}</div>
                                    <div className="text-[10px] text-gray-600 font-bold truncate">Artist: {selectedLibraryItem?.artist || '---'}</div>
                                    <div className="text-[10px] text-gray-500 italic truncate">Album: {selectedLibraryItem?.album || '---'}</div>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                    <button onClick={() => { if(selectedLibraryItem) { setCurrentTrack(selectedLibraryItem); toggleWindow('wmp', true); } }} className="flex items-center space-x-1 px-4 py-1 bg-white border border-gray-400 font-black text-[10px] hover:bg-gray-50 active:shadow-inner uppercase shadow-sm"><Play size={12}/> <span>Play</span></button>
                                    <button className="flex items-center space-x-1 px-4 py-1 bg-white border border-gray-400 font-black text-[10px] hover:bg-gray-50 active:shadow-inner uppercase shadow-sm"><Trash2 size={12}/> <span>Remove</span></button>
                                </div>
                            </div>
                            <div className="w-32 flex flex-col items-end text-right">
                                 <div className="text-[9px] font-black text-gray-400 uppercase">Bitzi Score</div>
                                 <div className="text-green-600 font-black text-xs uppercase underline">Verified</div>
                                 <div className="mt-auto text-[8px] text-gray-500 italic">Added {selectedLibraryItem ? new Date(selectedLibraryItem.dateAdded).toLocaleDateString() : '--/--/----'}</div>
                            </div>
                        </div>
                     </div>
                </div>
            )}
            {activeTab === Tab.CHAT && <ChatTab />}
            {activeTab === Tab.CONNECTIONS && <ConnectionsTab />}
        </div>

        {/* LimeWire PRO Status Bar */}
        <div className={`h-6 ${lwSkin === 'stealth' ? 'bg-[#333] text-gray-400' : 'bg-[#D4D0C8] text-gray-700'} border-t border-white flex items-center px-4 justify-between font-bold text-[10px] shadow-inner transition-colors`}>
            <div className="flex items-center space-x-4">
                <span className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse shadow-[0_0_4px_#00ff00]"></div> Connected: 4,892,102 hosts</span>
                <div onClick={() => setIsTurboCharged(!isTurboCharged)} className={`flex items-center space-x-1 cursor-pointer px-2 py-0.5 rounded transition-all ${isTurboCharged ? 'bg-blue-600 text-white shadow-[0_0_8px_rgba(0,0,255,0.5)]' : 'hover:bg-black/10'}`}>
                    <Zap size={10} fill={isTurboCharged ? "white" : "currentColor"} className={isTurboCharged ? 'animate-pulse' : ''}/>
                    <span>Turbo-Charged: {isTurboCharged ? 'ON' : 'OFF'}</span>
                </div>
            </div>
            <div className="flex items-center space-x-4 uppercase tracking-tighter">
                <span>{library.length} Shared Files</span>
                <span className={lwTheme.accent}>Karma: {karma} ({karma > 1000 ? 'Legend' : karma > 500 ? 'Ultrapeer' : 'Pro'})</span>
            </div>
        </div>
    </div>
  );
};