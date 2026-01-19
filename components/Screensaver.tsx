import React, { useEffect, useRef } from 'react';

export const Screensaver = ({ active, onDismiss }: { active: boolean, onDismiss: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        let pipes: Pipe[] = [];
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#FFFFFF'];
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        class Pipe {
            x: number;
            y: number;
            z: number;
            dir: number; // 0: +x, 1: -x, 2: +y, 3: -y, 4: +z, 5: -z (simulated)
            color: string;
            radius: number;
            alive: boolean;

            constructor() {
                this.x = Math.floor(Math.random() * width);
                this.y = Math.floor(Math.random() * height);
                this.z = 0;
                this.dir = Math.floor(Math.random() * 4); // Stick to 2D plane for simpler canvas logic usually, but let's try pseudo 3D
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.radius = 10 + Math.random() * 20;
                this.alive = true;
            }

            update() {
                if (!this.alive) return;

                // Chance to change direction
                if (Math.random() < 0.05) {
                    this.dir = Math.floor(Math.random() * 4);
                }

                // Draw segment
                if (ctx) {
                    ctx.beginPath();
                    ctx.fillStyle = this.color;
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Highlight for 3D effect
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Outline
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
                    ctx.lineWidth = 1;
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Move
                const speed = this.radius * 0.5;
                switch (this.dir) {
                    case 0: this.x += speed; break; // Right
                    case 1: this.x -= speed; break; // Left
                    case 2: this.y += speed; break; // Down
                    case 3: this.y -= speed; break; // Up
                }

                // Boundary check
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.alive = false;
                    // Respawn a new pipe
                    pipes.push(new Pipe());
                }
            }
        }

        // Init pipes
        for (let i = 0; i < 5; i++) {
            pipes.push(new Pipe());
        }

        // Clear screen black initially
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        const render = () => {
            pipes.forEach(p => p.update());
            pipes = pipes.filter(p => p.alive);
            if (pipes.length < 5) pipes.push(new Pipe());
            animationFrame = requestAnimationFrame(render);
        };

        render();

        const handleInteraction = () => onDismiss();
        window.addEventListener('mousemove', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('mousedown', handleInteraction);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('mousedown', handleInteraction);
        };
    }, [active, onDismiss]);

    if (!active) return null;

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 z-[99999] cursor-none"
        />
    );
};
