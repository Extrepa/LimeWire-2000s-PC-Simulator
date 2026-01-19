import React from 'react';

interface AboutWindowProps {
  onClose: () => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onClose }) => {
  return (
    <div 
        onClick={onClose}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 cursor-pointer"
    >
      <div className="bg-white p-1 shadow-2xl border-2 border-white rounded-lg">
          <div className="bg-lime-500 w-96 h-64 flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-gray-600">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '20px 20px' }}></div>
             
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 z-10 animate-bounce">
                <div className="w-16 h-16 border-4 border-lime-500 rounded-full border-t-transparent animate-spin"></div>
             </div>
             
             <h1 className="text-4xl font-bold text-white italic drop-shadow-md z-10">LimeWire</h1>
             <p className="text-lime-100 font-bold z-10">PRO 4.12.6</p>
             
             <div className="absolute bottom-2 text-[10px] text-lime-800 text-center w-full">
                Running on Gnutella Network<br/>
                Java 1.5.0_06
             </div>
          </div>
      </div>
    </div>
  );
};
