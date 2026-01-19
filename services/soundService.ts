
export const playSystemSound = (type: 'startup' | 'shutdown' | 'error' | 'recycle' | 'download_complete' | 'click') => {
    const sounds: Record<string, string> = {
        startup: 'https://www.winhistory.de/more/winstart/mp3/winxp.mp3',
        shutdown: 'https://www.winhistory.de/more/winstart/mp3/winxpsh.mp3',
        error: 'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Windows+XP+Error&filename=mt/MTI3NDM4NDAxMjc0Mzk5_f3vH_2b_2f_2fmOqU.mp3',
        recycle: 'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Recycle+Bin+Empty&filename=mt/MTI3NDM4NDAxMjc0Mzk5_9_2b_2f_2f_2b_2f_2f_2b_2f_2f_2b_2f_2f_2b_2f_2f_2b_2f_2f.mp3',
        download_complete: 'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=LimeWire+Finish&filename=mz/MTkyNDc1NTgxOTI0NzU1_G_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f.mp3',
        click: 'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=XP+Click&filename=mt/MTI3NDM4NDAxMjc0Mzk5_1_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f_2f.mp3'
    };

    try {
        const audio = new Audio(sounds[type]);
        audio.volume = 0.4;
        audio.play().catch(() => { /* User hasn't interacted yet */ });
    } catch (e) {
        console.debug("Audio playback failed", e);
    }
};
