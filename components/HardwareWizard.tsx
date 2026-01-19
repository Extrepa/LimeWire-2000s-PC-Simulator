import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Monitor, HardDrive } from 'lucide-react';

interface HardwareWizardProps {
    onClose: () => void;
    position: { x: number, y: number };
    zIndex: number;
}

export const HardwareWizard = ({ onClose, position, zIndex }: HardwareWizardProps) => {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [installing, setInstalling] = useState(false);

    useEffect(() => {
        let interval: any;
        if (installing) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        setInstalling(false);
                        setStep(2);
                        return 100;
                    }
                    return p + Math.random() * 5;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [installing]);

    const handleNext = () => {
        if (step === 0) {
            setStep(1);
            setInstalling(true);
            setProgress(0);
        } else if (step === 2) {
            onClose();
        }
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }}
            className="absolute w-[500px] h-[380px] bg-[#ECE9D8] border border-white shadow-xl flex flex-col font-sans text-xs win-shadow select-none"
        >
            {/* Title Bar */}
            <div className="h-6 bg-gradient-to-r from-[#0055EA] via-[#0873F3] to-[#0055EA] flex items-center justify-between px-2 select-none">
                <span className="text-white font-bold">Found New Hardware Wizard</span>
                <button onClick={onClose} className="w-5 h-5 bg-[#E81123] hover:bg-[#F04050] rounded-[3px] flex items-center justify-center text-white border border-white/30">
                    <X size={12} strokeWidth={3}/>
                </button>
            </div>

            <div className="flex flex-1">
                {/* Left Banner */}
                <div className="w-[180px] bg-[#003399] p-4 flex flex-col justify-start relative overflow-hidden">
                     <div className="text-white font-bold text-lg mb-2 z-10">Found New Hardware Wizard</div>
                     {/* Green circuit graphic approximation */}
                     <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #00ff00 2px, transparent 2px)', backgroundSize: '20px 20px'}}></div>
                     <HardDrive size={64} className="text-white absolute bottom-10 right-4 opacity-50"/>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                    {step === 0 && (
                        <>
                            <h3 className="font-bold text-sm mb-4">Welcome to the Found New Hardware Wizard</h3>
                            <p className="mb-4">This wizard helps you install software for:</p>
                            <p className="font-bold mb-4 ml-4">Unknown Device</p>
                            
                            <p className="mb-2">If your hardware came with an installation CD or floppy disk, insert it now.</p>
                            
                            <p className="mb-2">What do you want the wizard to do?</p>
                            
                            <div className="flex flex-col space-y-2 ml-4">
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="action" defaultChecked />
                                    <span>Install the software automatically (Recommended)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="action" />
                                    <span>Install from a list or specific location (Advanced)</span>
                                </label>
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <div className="flex flex-col justify-center h-full">
                            <p className="mb-2">Please wait while the wizard installs the software...</p>
                            
                            <div className="flex items-center justify-center mb-4">
                                <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
                            </div>

                            <p className="mb-1 text-gray-600">Setting up driver...</p>
                            <div className="w-full h-4 bg-white border border-gray-500 relative">
                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-100" style={{width: `${progress}%`}}></div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <h3 className="font-bold text-sm mb-4">Completing the Found New Hardware Wizard</h3>
                            <p className="mb-4">The wizard has finished installing the software for:</p>
                            <p className="font-bold mb-4 ml-4">USB Human Interface Device</p>
                            <p>Click Finish to close the wizard.</p>
                        </>
                    )}
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="h-12 border-t border-gray-400 flex items-center justify-end px-4 space-x-2 bg-[#ECE9D8]">
                {step < 2 && (
                    <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm disabled:text-gray-400" disabled={step === 0}>
                        &lt; Back
                    </button>
                )}
                {step < 2 ? (
                    <button onClick={handleNext} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200" disabled={installing}>
                        Next &gt;
                    </button>
                ) : (
                    <button onClick={handleNext} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200">
                        Finish
                    </button>
                )}
                <button onClick={onClose} className="px-4 py-1 bg-[#ECE9D8] border border-gray-500 shadow-sm active:bg-gray-200 ml-2">
                    Cancel
                </button>
            </div>
        </div>
    );
};
