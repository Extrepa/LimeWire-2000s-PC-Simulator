
import React, { useEffect } from 'react';

// Added onRestart to the props definition to allow the calling component (App.tsx) to handle restart/recovery from the crash screen.
export const BSOD = ({ 
  error = "IRQL_NOT_LESS_OR_EQUAL", 
  onRestart 
}: { 
  error?: string; 
  onRestart?: () => void; 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // If an onRestart handler exists, any key (except refresh shortcuts) will trigger a "restart"
        if (onRestart && !(e.key === 'F5' || (e.ctrlKey && e.key === 'r'))) {
            onRestart();
            return;
        }

        // Prevent default actions to simulate lock up, but allow reload
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) return;
        e.preventDefault();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRestart]);

  return (
    <div 
      className="fixed inset-0 bg-[#000082] text-white font-mono p-12 cursor-none z-[9999] select-none text-lg leading-7"
      onClick={onRestart} // Allow clicking the screen to restart/exit BSOD
    >
      <p className="mb-8">
        A problem has been detected and Windows has been shut down to prevent damage
        to your computer.
      </p>

      <p className="mb-8 font-bold">{error}</p>

      <p className="mb-8">
        If this is the first time you've seen this stop error screen,
        restart your computer. If this screen appears again, follow
        these steps:
      </p>

      <p className="mb-8">
        Check to make sure any new hardware or software is properly installed.
        If this is a new installation, ask your hardware or software manufacturer
        for any Windows updates you might need.
      </p>

      <p className="mb-8">
        If problems continue, disable or remove any newly installed hardware
        or software. Disable BIOS memory options such as caching or shadowing.
        If you need to use Safe Mode to remove or disable components, restart
        your computer, press F8 to select Advanced Startup Options, and then
        select Safe Mode.
      </p>

      <p className="mb-12">
        Technical information:
      </p>

      <p>
        *** STOP: 0x0000000A (0x00000010, 0x00000002, 0x00000000, 0x8051AA3C)
      </p>
    </div>
  );
};
