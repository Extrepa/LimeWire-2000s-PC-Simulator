import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tab, SearchResult, DownloadItem, DownloadStatus, LibraryItem, LimeWireSkin } from './types';
import { searchGeminiFiles } from './services/geminiService';
import { playSystemSound } from './services/soundService';
import { LogoIcon, QualityStars, FileIcon, RefreshCw, Volume2, Wifi, FileText, Zap, Monitor, Trash2, User, Play, Power, Star, Search, Library, Globe, Film, Music, ShieldAlert, X, Minus, MessageCircle, ShieldCheck } from './components/Icons';
import { BSOD } from './components/BSOD';
import { DesktopIcon } from './components/DesktopIcon';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { Notepad } from './components/Notepad';
import { Clippy } from './components/Clippy';
import { InternetExplorer } from './components/InternetExplorer';
import { Minesweeper } from './components/Minesweeper';
import { Winamp } from './components/Winamp';
import { Paint } from './components/Paint';
import { FileExplorer } from './components/FileExplorer';
import { ShutdownDialog } from './components/ShutdownDialog';
import { RunDialog } from './components/RunDialog';
import { Messenger } from './components/Messenger';
import { DisplayProperties } from './components/DisplayProperties';
import { TaskManager } from './components/TaskManager';
import { VolumeControl } from './components/VolumeControl';
import { Screensaver } from './components/Screensaver';
import { RecycleBin } from './components/RecycleBin';
import { TipOfDay } from './components/TipOfDay';
import { ForumWindow } from './components/ForumWindow';
import { BonziBuddy } from './components/BonziBuddy';
import { DesktopContextMenu } from './components/DesktopContextMenu';
import { DialUpConnection } from './components/DialUpConnection';
import { VirusPopup } from './components/VirusPopup';
import { FreddyFishSim } from './components/FreddyFishSim';
import { WindowsMediaPlayer } from './components/WindowsMediaPlayer';
import { Pinball } from './components/Pinball';
import { Solitaire } from './components/Solitaire';
import { SpiderSolitaire } from './components/SpiderSolitaire';
import { BootScreen, LoginScreen, WelcomeScreen } from './components/BootSequence';
import { CommandPrompt } from './components/CommandPrompt';
import { Calculator } from './components/Calculator';
import { DiskDefragmenter } from './components/DiskDefragmenter';
import { RegistryEditor } from './components/RegistryEditor';
import { SoundRecorder } from './components/SoundRecorder';
import { WordPad } from './components/WordPad';
import { OutlookExpress } from './components/OutlookExpress';
import { Snake } from './components/Snake';
import { TicTacToe } from './components/TicTacToe';
import { Encarta } from './components/Encarta';
import { AIM } from './components/AIM';
import { BitziPopup } from './components/BitziPopup';
import { Narrator } from './components/Narrator';
import { SystemProperties } from './components/SystemProperties';
import { CharacterMap } from './components/CharacterMap';
import { AddressBook } from './components/AddressBook';
import { ErrorBlaster } from './components/ErrorBlaster';
import { NotificationBubble } from './components/NotificationBubble';
import { DateTimeProperties } from './components/DateTimeProperties';
import { WindowsUpdate } from './components/WindowsUpdate';
import { AssistantRover } from './components/AssistantRover';
import { MovieMaker } from './components/MovieMaker';
import { ControlPanel } from './components/ControlPanel';
import { TweakUI } from './components/TweakUI';
import { DxDiag } from './components/DxDiag';
import { Hearts } from './components/Hearts';
import { HyperCam, HyperCamWatermark } from './components/HyperCam';
import { DiskCleanup } from './components/DiskCleanup';
import { SystemInfo } from './components/SystemInfo';
import { HardwareWizard } from './components/HardwareWizard';
import { AppCrashDialog } from './components/AppCrashDialog';
import { AboutWindow } from './components/AboutWindow';
import { SettingsWindow } from './components/SettingsWindow';
import { LimeWire } from './components/LimeWire';
import { PeerProfile } from './components/PeerProfile';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

const INITIAL_LIBRARY: LibraryItem[] = [
  { id: 'init-1', filename: 'Linkin_Park_-_Numb_RIP.mp3', size: '4.2 MB', type: 'audio/mp3', bitrate: '128kbps', speed: 'T3', artist: 'Linkin Park', album: 'Hybrid Theory', quality: 5, dateAdded: Date.now() - 10000000 },
  { id: 'init-2', filename: 'Darude_-_Sandstorm_Full.mp3', size: '5.1 MB', type: 'audio/mp3', bitrate: '192kbps', speed: 'Cable', artist: 'Darude', album: 'Before the Storm', quality: 4, dateAdded: Date.now() - 5000000 }
];

const App = () => {
  // System States
  const [bootState, setBootState] = useState<'boot' | 'login' | 'welcome' | 'desktop'>('boot');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [bsod, setBsod] = useState(false);
  const [shuttingDown, setShuttingDown] = useState(false);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState('');
  const [theme, setTheme] = useState<'blue' | 'olive' | 'silver'>('blue');
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showDialer, setShowDialer] = useState(false);
  const [virusAlert, setVirusAlert] = useState(false);
  const [bitziTarget, setBitziTarget] = useState<SearchResult | null>(null);
  const [activeWindow, setActiveWindow] = useState('limewire');
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [notification, setNotification] = useState<{ title: string, message: string } | null>(null);
  const [peerToBrowse, setPeerToBrowse] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [crashedApp, setCrashedApp] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // LimeWire PRO Features
  const [lwSkin, setLwSkin] = useState<LimeWireSkin>('cobalt');
  const [isTurboCharged, setIsTurboCharged] = useState(true);
  const [karma, setKarma] = useState(421);
  const [searchHistory, setSearchHistory] = useState<string[]>(['numb', 'sandstorm', 'shrek 2 rip']);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<LibraryItem | null>(null);

  // LimeWire Core States
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SEARCH);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>(() => {
      const saved = localStorage.getItem('limewire_library');
      return saved ? JSON.parse(saved) : INITIAL_LIBRARY;
  });
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<LibraryItem | null>(null);

  const desktopRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{ id: string, startX: number, startY: number, initialX: number, initialY: number } | null>(null);

  // Optimized for Mobile: Adaptive centering
  const getCenteredPosition = (width: number, height: number, offset: {x: number, y: number} = {x: 0, y: 0}) => {
    const desktopW = window.innerWidth;
    const desktopH = window.innerHeight - 32;
    
    // If mobile or window exceeds screen, clamp to 0 and allow scrolling if necessary
    const x = width >= desktopW ? 2 : Math.max(5, (desktopW - width) / 2) + offset.x;
    const y = height >= desktopH ? 2 : Math.max(5, (desktopH - height) / 2) + offset.y;
    return { x, y };
  };

  const [windows, setWindows] = useState<Record<string, WindowState>>({
    limewire: { isOpen: true, isMinimized: false, position: getCenteredPosition(880, 600), zIndex: 10 },
    winamp: { isOpen: false, isMinimized: false, position: getCenteredPosition(275, 116, {x: 50, y: 50}), zIndex: 9 },
    wmp: { isOpen: false, isMinimized: false, position: getCenteredPosition(700, 520), zIndex: 9 },
    ie: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 600), zIndex: 9 },
    messenger: { isOpen: false, isMinimized: false, position: getCenteredPosition(300, 500, {x: -100, y: 20}), zIndex: 9 },
    forum: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 550), zIndex: 9 },
    notepad: { isOpen: false, isMinimized: false, position: getCenteredPosition(400, 300), zIndex: 9 },
    paint: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 450), zIndex: 9 },
    minesweeper: { isOpen: false, isMinimized: false, position: getCenteredPosition(200, 250), zIndex: 9 },
    pinball: { isOpen: false, isMinimized: false, position: getCenteredPosition(320, 660), zIndex: 9 },
    solitaire: { isOpen: false, isMinimized: false, position: getCenteredPosition(500, 400), zIndex: 9 },
    spider: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 450), zIndex: 9 },
    freddy: { isOpen: false, isMinimized: false, position: getCenteredPosition(640, 480), zIndex: 9 },
    explorer: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 600, {x: -20, y: -20}), zIndex: 9 },
    cmd: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 350), zIndex: 9 },
    calc: { isOpen: false, isMinimized: false, position: getCenteredPosition(260, 300), zIndex: 9 },
    regedit: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 450), zIndex: 9 },
    defrag: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 450), zIndex: 9 },
    wordpad: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 450), zIndex: 9 },
    outlook: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 600), zIndex: 9 },
    encarta: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 580), zIndex: 9 },
    aim: { isOpen: false, isMinimized: false, position: getCenteredPosition(240, 520, {x: 200, y: 0}), zIndex: 9 },
    hearts: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 450), zIndex: 9 },
    moviemaker: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 550), zIndex: 9 },
    control: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 550), zIndex: 9 },
    tweakui: { isOpen: false, isMinimized: false, position: getCenteredPosition(500, 450), zIndex: 9 },
    dxdiag: { isOpen: false, isMinimized: false, position: getCenteredPosition(500, 520), zIndex: 9 },
    hypercam: { isOpen: false, isMinimized: false, position: getCenteredPosition(220, 200), zIndex: 9 },
    sysinfo: { isOpen: false, isMinimized: false, position: getCenteredPosition(650, 480), zIndex: 9 },
    diskcleanup: { isOpen: false, isMinimized: false, position: getCenteredPosition(380, 400), zIndex: 9 },
    hardware: { isOpen: false, isMinimized: false, position: getCenteredPosition(500, 380), zIndex: 12 },
    sysprop: { isOpen: false, isMinimized: false, position: getCenteredPosition(420, 480), zIndex: 9 },
    datetime: { isOpen: false, isMinimized: false, position: getCenteredPosition(400, 450), zIndex: 9 },
    charmap: { isOpen: false, isMinimized: false, position: getCenteredPosition(450, 400), zIndex: 9 },
    addressbook: { isOpen: false, isMinimized: false, position: getCenteredPosition(600, 400), zIndex: 9 },
    soundrec: { isOpen: false, isMinimized: false, position: getCenteredPosition(300, 180), zIndex: 9 },
    narrator: { isOpen: false, isMinimized: false, position: getCenteredPosition(350, 250), zIndex: 9 },
    recycle: { isOpen: false, isMinimized: false, position: getCenteredPosition(800, 600), zIndex: 9 },
    taskmgr: { isOpen: false, isMinimized: false, position: getCenteredPosition(420, 520), zIndex: 50 },
    rover: { isOpen: false, isMinimized: false, position: getCenteredPosition(350, 400), zIndex: 9 },
    wu: { isOpen: false, isMinimized: false, position: getCenteredPosition(750, 550), zIndex: 9 },
    snake: { isOpen: false, isMinimized: false, position: getCenteredPosition(410, 460), zIndex: 9 },
    tictactoe: { isOpen: false, isMinimized: false, position: getCenteredPosition(250, 300), zIndex: 9 },
    blaster: { isOpen: false, isMinimized: false, position: getCenteredPosition(350, 300), zIndex: 9 },
  });

  // Window Management
  const toggleWindow = (id: string, force?: boolean) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: force !== undefined ? force : !prev[id].isOpen, isMinimized: false, zIndex: maxZIndex + 1 }
    }));
    if (force !== false) {
        setMaxZIndex(z => z + 1);
        setActiveWindow(id);
    }
  };

  const focusWindow = (id: string) => {
    setMaxZIndex(z => z + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZIndex + 1, isMinimized: false }
    }));
    setActiveWindow(id);
  };

  const minimizeWindow = (id: string) => {
      setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }));
      if (activeWindow === id) setActiveWindow('');
  };

  // Improved dragging with Clamping
  const onWindowMouseDown = (id: string, e: React.MouseEvent) => {
    focusWindow(id);
    dragInfo.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: windows[id].position.x,
      initialY: windows[id].position.y
    };
  };

  const onWindowTouchStart = (id: string, e: React.TouchEvent) => {
    focusWindow(id);
    const touch = e.touches[0];
    dragInfo.current = {
        id,
        startX: touch.clientX,
        startY: touch.clientY,
        initialX: windows[id].position.x,
        initialY: windows[id].position.y
    };
  };

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!dragInfo.current) return;
      const { id, startX, startY, initialX, initialY } = dragInfo.current;
      const dx = clientX - startX;
      const dy = clientY - startY;
      
      let newX = initialX + dx;
      let newY = initialY + dy;

      // Coordinate Clamping logic to prevent window loss
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight - 32;
      newX = Math.max(-50, Math.min(newX, viewportW - 50));
      newY = Math.max(0, Math.min(newY, viewportH - 20));

      setWindows(prev => ({
        ...prev,
        [id]: { ...prev[id], position: { x: newX, y: newY } }
      }));
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
    };

    const onEnd = () => dragInfo.current = null;
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [windows]);

  // LimeWire Business Logic
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (!isConnected) {
        setShowDialer(true);
        return;
    }
    setIsSearching(true);
    if (!searchHistory.includes(searchQuery.toLowerCase())) {
        setSearchHistory(prev => [searchQuery.toLowerCase(), ...prev].slice(0, 10));
    }
    const results = await searchGeminiFiles(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const startDownload = (file: SearchResult) => {
    const newDownload: DownloadItem = {
      id: `dl-${Date.now()}`,
      file,
      progress: 0,
      status: DownloadStatus.CONNECTING,
      speed: "0 KB/s",
      timeLeft: "Calculating..."
    };
    setDownloads(prev => [...prev, newDownload]);
    toggleWindow('limewire', true);
    setActiveTab(Tab.MONITOR);
    playSystemSound('click');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads(prev => prev.map(dl => {
        if (dl.status === DownloadStatus.COMPLETE || dl.status === DownloadStatus.FAILED) return dl;
        
        let newStatus = dl.status;
        let newProgress = dl.progress;
        
        if (dl.status === DownloadStatus.CONNECTING && Math.random() > 0.7) {
            newStatus = DownloadStatus.DOWNLOADING;
        }
        
        if (newStatus === DownloadStatus.DOWNLOADING) {
            const speedMultiplier = isTurboCharged ? 3.5 : 1;
            newProgress += Math.random() * 2 * speedMultiplier;
            if (newProgress >= 100) {
                newProgress = 100;
                newStatus = DownloadStatus.COMPLETE;
                setLibrary(lib => [...lib, { ...dl.file, dateAdded: Date.now() }]);
                setKarma(k => k + 5);
                setNotification({ title: 'Download Complete', message: `Finished downloading: ${dl.file.filename}` });
                playSystemSound('download_complete');
            }
        }
        
        return {
          ...dl,
          progress: newProgress,
          status: newStatus,
          speed: newStatus === DownloadStatus.DOWNLOADING ? `${(Math.random() * 50 + (isTurboCharged ? 150 : 10)).toFixed(1)} KB/s` : "0 KB/s",
          timeLeft: newStatus === DownloadStatus.DOWNLOADING ? `${Math.ceil((100 - newProgress) / (isTurboCharged ? 8 : 2))} mins` : "-"
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTurboCharged]);

  useEffect(() => {
      localStorage.setItem('limewire_library', JSON.stringify(library));
  }, [library]);

  // Boot & System Events
  useEffect(() => {
    if (bootState === 'desktop') {
        playSystemSound('startup');
        setTimeout(() => toggleWindow('limewire', true), 1000);
        setTimeout(() => toggleWindow('hardware', true), 5000);
    }
  }, [bootState]);

  if (bsod) return <BSOD onRestart={() => setBsod(false)} />;
  if (bootState === 'boot') return <BootScreen onComplete={() => setBootState('login')} />;
  if (bootState === 'login') return <LoginScreen onLogin={(user) => { setCurrentUser(user); setBootState('welcome'); }} />;
  if (bootState === 'welcome') return <WelcomeScreen user={currentUser || 'Guest'} onComplete={() => setBootState('desktop')} />;

  return (
    <div 
        ref={desktopRef}
        className="fixed inset-0 overflow-hidden bg-cover bg-center select-none"
        style={{ 
            backgroundImage: wallpaper ? `url(${wallpaper})` : 'url(https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=80)',
            backgroundColor: '#2b4f6b'
        }}
        onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
        onClick={() => { setStartMenuOpen(false); setContextMenu(null); setSelectedIcon(null); }}
    >
        {isRecording && <HyperCamWatermark />}

        {/* Desktop Icons */}
        <div className="absolute inset-0 p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,minmax(100px,1fr))] gap-4 content-start justify-start">
            <DesktopIcon label="My Computer" icon="computer" selected={selectedIcon === 'comp'} onClick={() => setSelectedIcon('comp')} onDoubleClick={() => toggleWindow('explorer', true)} />
            <DesktopIcon label="Recycle Bin" icon="trash" selected={selectedIcon === 'trash'} onClick={() => setSelectedIcon('trash')} onDoubleClick={() => toggleWindow('recycle', true)} />
            <DesktopIcon label="LimeWire PRO" icon="limewire" selected={selectedIcon === 'lime'} onClick={() => setSelectedIcon('lime')} onDoubleClick={() => toggleWindow('limewire', true)} />
            <DesktopIcon label="Paint" icon="paint" selected={selectedIcon === 'paint'} onClick={() => setSelectedIcon('paint')} onDoubleClick={() => toggleWindow('paint', true)} />
            <DesktopIcon label="Winamp" icon="winamp" selected={selectedIcon === 'winamp'} onClick={() => setSelectedIcon('winamp')} onDoubleClick={() => toggleWindow('winamp', true)} />
            <DesktopIcon label="Freddi Fish" icon="freddy" selected={selectedIcon === 'freddy'} onClick={() => setSelectedIcon('freddy')} onDoubleClick={() => toggleWindow('freddy', true)} />
            <DesktopIcon label="3D Pinball" icon="pinball" selected={selectedIcon === 'pinball'} onClick={() => setSelectedIcon('pinball')} onDoubleClick={() => toggleWindow('pinball', true)} />
            <DesktopIcon label="WMP 9" icon="wmp" selected={selectedIcon === 'wmp'} onClick={() => setSelectedIcon('wmp')} onDoubleClick={() => toggleWindow('wmp', true)} />
        </div>

        {/* Window Manager Loop */}
        {(Object.entries(windows) as [string, WindowState][]).map(([id, state]) => {
            if (!state.isOpen) return null;
            
            const commonProps = {
                key: id,
                position: state.position,
                onMouseDown: (e: React.MouseEvent) => onWindowMouseDown(id, e),
                onTouchStart: (e: React.TouchEvent) => onWindowTouchStart(id, e),
                zIndex: state.zIndex,
                active: activeWindow === id,
                onClick: () => { focusWindow(id); },
                onClose: () => setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false } })),
                onMinimize: () => minimizeWindow(id)
            };

            return (
                <div key={id} className={state.isMinimized ? 'hidden' : ''}>
                    {(() => {
                        switch(id) {
                            case 'limewire': return (
                                <LimeWire 
                                    {...commonProps} 
                                    activeTab={activeTab} setActiveTab={setActiveTab}
                                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                    handleSearch={handleSearch} isSearching={isSearching}
                                    searchResults={searchResults} startDownload={startDownload}
                                    downloads={downloads} library={library}
                                    currentTrack={currentTrack} setCurrentTrack={setCurrentTrack}
                                    setBitziTarget={setBitziTarget} setPeerToBrowse={setPeerToBrowse}
                                    lwSkin={lwSkin} setLwSkin={setLwSkin}
                                    isTurboCharged={isTurboCharged} setIsTurboCharged={setIsTurboCharged}
                                    karma={karma} searchHistory={searchHistory}
                                    isAdvancedSearch={isAdvancedSearch} setIsAdvancedSearch={setIsAdvancedSearch}
                                    selectedLibraryItem={selectedLibraryItem} setSelectedLibraryItem={setSelectedLibraryItem}
                                    setShowAbout={setShowAbout} setShowSettings={setShowSettings}
                                    toggleWindow={toggleWindow}
                                />
                            );
                            case 'ie': return <InternetExplorer {...commonProps} />;
                            case 'notepad': return <Notepad {...commonProps} />;
                            case 'minesweeper': return <Minesweeper {...commonProps} />;
                            case 'winamp': return <Winamp {...commonProps} currentTrack={currentTrack} />;
                            case 'paint': return <Paint {...commonProps} />;
                            case 'explorer': return <FileExplorer {...commonProps} onBsod={() => setBsod(true)} onOpenFile={(f) => { if(f.type==='txt') toggleWindow('notepad', true); else if(f.type==='mp3') toggleWindow('wmp', true); }} onItemContextMenu={() => {}} />;
                            case 'messenger': return <Messenger {...commonProps} />;
                            case 'display': return <DisplayProperties {...commonProps} setWallpaper={setWallpaper} currentWallpaper={wallpaper} theme={theme} onThemeChange={setTheme} />;
                            case 'taskmgr': return <TaskManager {...commonProps} windows={(Object.entries(windows) as [string, any][]).map(([id, s]) => ({ id, title: id.toUpperCase(), isOpen: s.isOpen }))} onCloseWindow={(wid) => toggleWindow(wid, false)} onBsod={() => setBsod(true)} />;
                            case 'forum': return <ForumWindow {...commonProps} />;
                            case 'freddy': return <FreddyFishSim {...commonProps} />;
                            case 'wmp': return <WindowsMediaPlayer {...commonProps} currentTrack={currentTrack} playlist={library} onSelectTrack={setCurrentTrack} />;
                            case 'pinball': return <Pinball {...commonProps} />;
                            case 'solitaire': return <Solitaire {...commonProps} />;
                            case 'spider': return <SpiderSolitaire {...commonProps} />;
                            case 'cmd': return <CommandPrompt {...commonProps} />;
                            case 'calc': return <Calculator {...commonProps} />;
                            case 'regedit': return <RegistryEditor {...commonProps} />;
                            case 'defrag': return <DiskDefragmenter {...commonProps} />;
                            case 'wordpad': return <WordPad {...commonProps} />;
                            case 'outlook': return <OutlookExpress {...commonProps} />;
                            case 'encarta': return <Encarta {...commonProps} />;
                            case 'aim': return <AIM {...commonProps} />;
                            case 'hearts': return <Hearts {...commonProps} />;
                            case 'moviemaker': return <MovieMaker {...commonProps} />;
                            case 'control': return <ControlPanel {...commonProps} onOpenApp={(aid) => toggleWindow(aid, true)} />;
                            case 'tweakui': return <TweakUI {...commonProps} />;
                            case 'dxdiag': return <DxDiag {...commonProps} />;
                            case 'hypercam': return <HyperCam {...commonProps} onToggleRecording={setIsRecording} />;
                            case 'sysinfo': return <SystemInfo {...commonProps} />;
                            case 'diskcleanup': return <DiskCleanup {...commonProps} />;
                            case 'sysprop': return <SystemProperties {...commonProps} />;
                            case 'datetime': return <DateTimeProperties {...commonProps} />;
                            case 'charmap': return <CharacterMap {...commonProps} />;
                            case 'addressbook': return <AddressBook {...commonProps} />;
                            case 'soundrec': return <SoundRecorder {...commonProps} />;
                            case 'narrator': return <Narrator {...commonProps} />;
                            case 'recycle': return <RecycleBin {...commonProps} />;
                            case 'rover': return <AssistantRover {...commonProps} />;
                            case 'wu': return <WindowsUpdate {...commonProps} />;
                            case 'snake': return <Snake {...commonProps} />;
                            case 'tictactoe': return <TicTacToe {...commonProps} />;
                            case 'blaster': return <ErrorBlaster {...commonProps} onBlast={(c) => setNotification({ title: c.title, message: c.message })} />;
                            case 'hardware': return <HardwareWizard {...commonProps} />;
                            default: return null;
                        }
                    })()}
                </div>
            );
        })}

        {/* Taskbar & Shell Overlays */}
        <Taskbar 
            onToggleStart={() => setStartMenuOpen(!startMenuOpen)} 
            startMenuOpen={startMenuOpen}
            windows={(Object.entries(windows) as [string, WindowState][]).map(([id, s]) => ({
                id,
                title: id === 'limewire' ? 'LimeWire PRO' : id.toUpperCase(),
                icon: id === 'limewire' ? 'limewire' : 'notepad',
                isOpen: s.isOpen,
                isMinimized: s.isMinimized,
                isActive: activeWindow === id
            }))}
            onWindowClick={(id) => {
                if (windows[id].isMinimized || activeWindow !== id) focusWindow(id);
                else minimizeWindow(id);
            }}
            onVolumeClick={(e) => { e.stopPropagation(); setVolumeOpen(!volumeOpen); }}
            onClockClick={() => toggleWindow('datetime', true)}
            onContextMenu={() => {}}
            themeConfig={theme === 'blue' ? undefined : theme === 'olive' ? { taskbar: 'from-[#6E8D42] via-[#6E8D42] to-[#5A7436]', border: '#8DA66A', accent: '#6E8D42' } : { taskbar: 'from-[#A0A2A4] via-[#A0A2A4] to-[#808080]', border: '#D6D3CE', accent: '#A0A2A4' }}
        />

        {startMenuOpen && <div className="fixed bottom-8 left-0 z-[201]"><StartMenu onOpenApp={(aid) => toggleWindow(aid, true)} onShutdown={() => setShowShutdownDialog(true)} onRun={() => setShowRunDialog(true)} onClose={() => setStartMenuOpen(false)} /></div>}
        {volumeOpen && <VolumeControl onClose={() => setVolumeOpen(false)} position={{ x: window.innerWidth - 100, y: window.innerHeight - 32 }} />}
        {showShutdownDialog && <ShutdownDialog onCancel={() => setShowShutdownDialog(false)} onShutdown={() => setBootState('boot')} onRestart={() => window.location.reload()} onStandby={() => setBootState('boot')} />}
        {showTip && <TipOfDay onClose={() => setShowTip(false)} />}
        {virusAlert && <VirusPopup onClose={() => setVirusAlert(false)} />}
        {bitziTarget && <BitziPopup file={bitziTarget} onClose={() => setBitziTarget(null)} />}
        {notification && <NotificationBubble title={notification.title} message={notification.message} onClose={() => setNotification(null)} position={{ x: window.innerWidth - 20, y: window.innerHeight - 40 }} />}
        {contextMenu && <DesktopContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} onAction={(a) => { if(a==='properties') toggleWindow('display', true); }} />}
        {showAbout && <AboutWindow onClose={() => setShowAbout(false)} />}
        {showSettings && <SettingsWindow onClose={() => setShowSettings(false)} />}
        {showDialer && <DialUpConnection onClose={() => setShowDialer(false)} onConnect={() => { setIsConnected(true); setShowDialer(false); setNotification({ title: 'Internet Connected', message: 'You are now connected at 56.0 Kbps.' }); }} />}
        {peerToBrowse && <PeerProfile peerId={peerToBrowse} onClose={() => setPeerToBrowse(null)} onDownload={startDownload} />}

        <Clippy />
        <BonziBuddy />
    </div>
  );
};

export default App;