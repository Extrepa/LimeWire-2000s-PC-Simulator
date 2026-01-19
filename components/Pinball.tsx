
import React, { useEffect, useRef, useState } from 'react';
import { X, Minus, Zap, Star, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface PinballProps {
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

export const Pinball = ({ onClose, onMinimize, position, onMouseDown, onTouchStart, zIndex, active, onClick }: PinballProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [balls, setBalls] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [isLeftFlipperActive, setIsLeftFlipperActive] = useState(false);
    const [isRightFlipperActive, setIsRightFlipperActive] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const GRAVITY = 0.22;
        const FRICTION = 0.995;
        const FLIPPER_SPEED = 0.45;
        
        let ball = { x: 285, y: 550, vx: 0, vy: 0, radius: 8, active: false };
        let leftFlipper = { x: 100, y: 520, angle: 0.3, targetAngle: 0.3, length: 60 };
        let rightFlipper = { x: 200, y: 520, angle: -0.3, targetAngle: -0.3, length: 60 };
        let currentScore = 0;

        const stars = Array.from({ length: 50 }).map(() => ({
            x: Math.random() * 300,
            y: Math.random() * 600,
            size: Math.random() * 2,
            opacity: Math.random()
        }));

        const bumpers = [
            { x: 150, y: 120, radius: 22, color: '#FF3333', glow: '#FF9999', active: 0, points: 500 },
            { x: 80, y: 200, radius: 18, color: '#3333FF', glow: '#9999FF', active: 0, points: 250 },
            { x: 220, y: 200, radius: 18, color: '#33FF33', glow: '#99FF99', active: 0, points: 250 },
            { x: 150, y: 280, radius: 15, color: '#FFFF33', glow: '#FFFF99', active: 0, points: 1000 }
        ];

        const walls = [
            { x1: 10, y1: 10, x2: 10, y2: 590, normal: { x: 1, y: 0 } }, // Left
            { x1: 10, y1: 10, x2: 290, y2: 10, normal: { x: 0, y: 1 } }, // Top
            { x1: 290, y1: 10, x2: 290, y2: 590, normal: { x: -1, y: 0 } }, // Right
            { x1: 270, y1: 100, x2: 270, y2: 590, normal: { x: -1, y: 0 } }, // Internal right wall for launch
            { x1: 10, y1: 450, x2: 80, y2: 520, normal: { x: 0.707, y: -0.707 } }, // Bottom left slant
            { x1: 270, y1: 450, x2: 220, y2: 520, normal: { x: -0.707, y: -0.707 } }, // Bottom right slant
        ];

        const keyDownHandler = (e: KeyboardEvent) => {
            if (e.code === 'KeyZ' || e.code === 'ArrowLeft') { leftFlipper.targetAngle = -0.8; setIsLeftFlipperActive(true); }
            if (e.code === 'KeyM' || e.code === 'KeyX' || e.code === 'Slash' || e.code === 'ArrowRight') { rightFlipper.targetAngle = 0.8; setIsRightFlipperActive(true); }
            if (e.code === 'Space') launchBall();
        };

        const keyUpHandler = (e: KeyboardEvent) => {
            if (e.code === 'KeyZ' || e.code === 'ArrowLeft') { leftFlipper.targetAngle = 0.3; setIsLeftFlipperActive(false); }
            if (e.code === 'KeyM' || e.code === 'KeyX' || e.code === 'Slash' || e.code === 'ArrowRight') { rightFlipper.targetAngle = -0.3; setIsRightFlipperActive(false); }
        };

        const launchBall = () => {
            if (!ball.active && ball.y > 500 && ball.x > 270) {
                ball.vy = -18 - Math.random() * 4;
                ball.vx = (Math.random() - 0.5) * 2;
                ball.active = true;
            }
        };

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        const update = () => {
            if (gameOver) return;

            // Sync with React State for Touch Controls
            leftFlipper.targetAngle = isLeftFlipperActive ? -0.8 : 0.3;
            rightFlipper.targetAngle = isRightFlipperActive ? 0.8 : -0.3;

            if (ball.active) {
                ball.vy += GRAVITY;
                ball.vx *= FRICTION;
                ball.vy *= FRICTION;
                ball.x += ball.vx;
                ball.y += ball.vy;
            }

            leftFlipper.angle += (leftFlipper.targetAngle - leftFlipper.angle) * FLIPPER_SPEED;
            rightFlipper.angle += (rightFlipper.targetAngle - rightFlipper.angle) * FLIPPER_SPEED;

            // Wall Collisions
            walls.forEach(w => {
                const dx = w.x2 - w.x1;
                const dy = w.y2 - w.y1;
                const len = Math.hypot(dx, dy);
                const dot = (((ball.x - w.x1) * dx) + ((ball.y - w.y1) * dy)) / (len * len);
                const closestX = w.x1 + dot * dx;
                const closestY = w.y1 + dot * dy;

                if (dot >= 0 && dot <= 1) {
                    const dist = Math.hypot(ball.x - closestX, ball.y - closestY);
                    if (dist < ball.radius) {
                        const dotProd = ball.vx * w.normal.x + ball.vy * w.normal.y;
                        ball.vx = (ball.vx - 2 * dotProd * w.normal.x) * 0.7;
                        ball.vy = (ball.vy - 2 * dotProd * w.normal.y) * 0.7;
                        ball.x += w.normal.x * (ball.radius - dist);
                        ball.y += w.normal.y * (ball.radius - dist);
                    }
                }
            });

            // Flipper Collisions
            const checkFlipper = (flipper: any, isLeft: boolean) => {
                const tipX = flipper.x + Math.cos(flipper.angle) * flipper.length * (isLeft ? 1 : -1);
                const tipY = flipper.y + Math.sin(flipper.angle) * flipper.length;
                const dx = tipX - flipper.x;
                const dy = tipY - flipper.y;
                const len = Math.hypot(dx, dy);
                const dot = (((ball.x - flipper.x) * dx) + ((ball.y - flipper.y) * dy)) / (len * len);

                if (dot >= 0 && dot <= 1) {
                    const cx = flipper.x + dot * dx;
                    const cy = flipper.y + dot * dy;
                    const dist = Math.hypot(ball.x - cx, ball.y - cy);
                    if (dist < ball.radius + 5) {
                        const flipSpeed = Math.abs(flipper.targetAngle - flipper.angle) * 20;
                        ball.vy = -12 - flipSpeed;
                        ball.vx += (isLeft ? 1 : -1) * (5 + flipSpeed);
                        ball.y = cy - (ball.radius + 5);
                    }
                }
            };

            checkFlipper(leftFlipper, true);
            checkFlipper(rightFlipper, false);

            // Bumpers
            bumpers.forEach(b => {
                const dist = Math.hypot(ball.x - b.x, ball.y - b.y);
                if (dist < ball.radius + b.radius) {
                    const angle = Math.atan2(ball.y - b.y, ball.x - b.x);
                    ball.vx = Math.cos(angle) * 14;
                    ball.vy = Math.sin(angle) * 14;
                    b.active = 10;
                    currentScore += b.points;
                    setScore(currentScore);
                }
                if (b.active > 0) b.active--;
            });

            // Out of bounds
            if (ball.y > 620) {
                setBalls(b => {
                    if (b <= 1) { setGameOver(true); return 0; }
                    ball.x = 285; ball.y = 550; ball.vx = 0; ball.vy = 0; ball.active = false;
                    return b - 1;
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            // Draw Background
            ctx.fillStyle = '#00001a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Stars
            stars.forEach(s => {
                ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Boundaries
            ctx.strokeStyle = '#2244aa';
            ctx.lineWidth = 4;
            ctx.strokeRect(10, 10, 280, 580);
            
            // Bumpers
            bumpers.forEach(b => {
                ctx.save();
                if (b.active > 0) {
                    ctx.shadowBlur = 25;
                    ctx.shadowColor = b.glow;
                    ctx.fillStyle = '#FFFFFF';
                } else {
                    ctx.fillStyle = b.color;
                }
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            });

            // Flippers
            const drawFlipper = (f: any, isLeft: boolean) => {
                ctx.save();
                ctx.translate(f.x, f.y);
                ctx.rotate(f.angle);
                const grad = ctx.createLinearGradient(0, -6, 0, 6);
                grad.addColorStop(0, '#ffff00');
                grad.addColorStop(1, '#ff8800');
                ctx.fillStyle = grad;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(255, 255, 0, 0.5)';
                ctx.beginPath();
                if (isLeft) {
                    ctx.roundRect(0, -6, f.length, 12, [0, 6, 6, 0]);
                } else {
                    ctx.roundRect(-f.length, -6, f.length, 12, [6, 0, 0, 6]);
                }
                ctx.fill();
                ctx.restore();
            };

            drawFlipper(leftFlipper, true);
            drawFlipper(rightFlipper, false);

            // Ball
            const ballGrad = ctx.createRadialGradient(ball.x - 3, ball.y - 3, 2, ball.x, ball.y, ball.radius);
            ballGrad.addColorStop(0, '#ffffff');
            ballGrad.addColorStop(1, '#666666');
            ctx.fillStyle = ballGrad;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();

            if (!gameOver) requestAnimationFrame(draw);
        };

        const interval = setInterval(update, 16);
        draw();

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        };
    }, [balls, gameOver, isLeftFlipperActive, isRightFlipperActive]);

    const resetGame = () => {
        setBalls(3);
        setScore(0);
        setGameOver(false);
    };

    return (
        <div 
            style={{ left: position.x, top: position.y, zIndex }} 
            className="absolute w-[320px] md:w-[480px] h-[660px] bg-[#C0C0C0] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl flex flex-col font-sans text-xs win-shadow select-none p-1"
            onClick={onClick}
        >
            {/* Added onTouchStart for mobile window dragging */}
            <div onMouseDown={onMouseDown} onTouchStart={onTouchStart} className={`h-7 flex items-center justify-between px-1 mb-1 select-none ${active ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]' : 'bg-gray-500'}`}>
                <div className="flex items-center text-white space-x-2 pl-1 font-bold italic">
                     <Zap size={14} fill="gold" className="animate-pulse"/>
                     <span className="truncate">3D Pinball: Space Cadet (Mobile Ready)</span>
                </div>
                <div className="flex space-x-0.5">
                     <button onClick={onMinimize} className="w-5 h-5 bg-[#D4D0C8] border border-white border-r-gray-600 border-b-gray-600 text-black flex items-center justify-center">-</button>
                     <button onClick={onClose} className="w-5 h-5 bg-red-600 border border-white/40 text-white flex items-center justify-center">x</button>
                </div>
            </div>
            
            <div className="bg-[#EBE9ED] flex space-x-3 px-1 mb-1 border-b border-gray-400 py-0.5 text-black">
                <span className="hover:bg-blue-800 hover:text-white px-1 cursor-default">Game</span>
                <span className="hover:bg-blue-800 hover:text-white px-1 cursor-default">Options</span>
                <span className="hover:bg-blue-800 hover:text-white px-1 cursor-default">Help</span>
            </div>

            <div className="flex-1 bg-black relative flex flex-col border-4 border-gray-600 rounded-sm overflow-hidden">
                <canvas ref={canvasRef} width={300} height={600} className="w-full h-auto max-h-[500px]" />
                
                {/* Mobile / Touch HUD */}
                <div className="flex-1 bg-[#111] flex flex-col p-2 space-y-2">
                    <div className="flex justify-between items-center text-white border-b border-white/20 pb-1">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-blue-400 font-bold uppercase">Mission Score</span>
                            <span className="text-xl font-mono text-green-400 tracking-widest">{score.toString().padStart(8, '0')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            {Array.from({length: balls}).map((_, i) => <Star key={i} size={14} fill="gold" className="text-yellow-400" />)}
                        </div>
                    </div>

                    <div className="flex justify-between gap-2 h-full">
                        <button 
                            onMouseDown={() => setIsLeftFlipperActive(true)}
                            onMouseUp={() => setIsLeftFlipperActive(false)}
                            onTouchStart={(e) => { e.preventDefault(); setIsLeftFlipperActive(true); }}
                            onTouchEnd={(e) => { e.preventDefault(); setIsLeftFlipperActive(false); }}
                            className={`flex-1 rounded-lg border-2 flex items-center justify-center transition-all ${isLeftFlipperActive ? 'bg-yellow-400 border-white scale-95' : 'bg-blue-900/40 border-blue-500 text-blue-300'}`}
                        >
                            <ChevronLeft size={32} />
                        </button>
                        
                        <div className="flex flex-col w-20 space-y-2">
                             <button 
                                onClick={() => {
                                    // Mock launch ball trigger through state or handled in loop
                                    const event = new KeyboardEvent('keydown', { code: 'Space' });
                                    window.dispatchEvent(event);
                                }}
                                className="flex-1 bg-red-600 rounded-lg border-2 border-red-400 flex items-center justify-center text-white active:scale-95"
                             >
                                <Play size={24} fill="white"/>
                             </button>
                        </div>

                        <button 
                            onMouseDown={() => setIsRightFlipperActive(true)}
                            onMouseUp={() => setIsRightFlipperActive(false)}
                            onTouchStart={(e) => { e.preventDefault(); setIsRightFlipperActive(true); }}
                            onTouchEnd={(e) => { e.preventDefault(); setIsRightFlipperActive(false); }}
                            className={`flex-1 rounded-lg border-2 flex items-center justify-center transition-all ${isRightFlipperActive ? 'bg-yellow-400 border-white scale-95' : 'bg-blue-900/40 border-blue-500 text-blue-300'}`}
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                </div>

                {gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
                        <div className="bg-[#ECE9D8] border-2 border-white border-r-gray-600 border-b-gray-600 p-6 text-center shadow-2xl">
                            <h2 className="font-black text-2xl mb-2 text-red-600 tracking-tighter">GAME OVER</h2>
                            <div className="text-sm font-bold mb-4">FINAL SCORE: <span className="text-xl text-blue-800">{score}</span></div>
                            <button onClick={resetGame} className="w-full bg-blue-700 text-white py-2 font-bold shadow-md hover:bg-blue-800 active:scale-95">REDEPLOY CADET</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
