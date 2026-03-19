"use client";

import React, { useRef, useEffect } from "react";

interface DigitalLoomBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;   // default "#000000"
  threadCount?: number;       // default 80
  className?: string;
}

const DigitalLoomBackground: React.FC<DigitalLoomBackgroundProps> = ({
  children,
  backgroundColor = "#000000",
  threadCount = 80,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let threads: Thread[] = [];
    let animId: number;
    let width: number, height: number;

    const isLightBackground = (color: string) => {
      const c = color.toLowerCase();
      return c === "#ffffff" || c === "white" || c.startsWith("rgba(255, 255, 255");
    };

    const colors = [
      "hsl(0, 80%, 60%)",    // Red
      "hsl(30, 80%, 60%)",   // Orange
      "hsl(60, 80%, 60%)",   // Yellow
      "hsl(120, 80%, 60%)",  // Green
      "hsl(180, 80%, 60%)",  // Cyan
      "hsl(240, 80%, 60%)",  // Blue
      "hsl(280, 80%, 60%)",  // Purple
      "hsl(330, 80%, 60%)",  // Pink
    ];

    class Thread {
      x: number;
      y: number;
      speed: number;
      amplitude: number;
      frequency: number;
      phase: number;
      color: string;

      constructor() {
        this.color = colors[Math.floor(Math.random() * colors.length)]; 
        this.reset();
      }

      reset() {
        width = containerRef.current?.clientWidth || window.innerWidth;
        height = containerRef.current?.clientHeight || window.innerHeight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Consistent and smooth silk movement
        this.speed = Math.random() * 1.5 + 1.2; 
        this.amplitude = Math.random() * 20 + 10;
        this.frequency = Math.random() * 0.008 + 0.004; 
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speed;
        if (this.x > width + 200) {
          this.x = -200;
          this.y = Math.random() * height;
          this.color = colors[Math.floor(Math.random() * colors.length)]; 
        }
      }

      draw() {
        const startX = this.x - 300; 
        
        ctx.beginPath();
        ctx.moveTo(
          startX,
          this.y + Math.sin(startX * this.frequency + this.phase) * this.amplitude
        );
        for (let i = startX; i < this.x; i += 10) { // Increased step to 10 for performance
          ctx.lineTo(
            i,
            this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude
          );
        }
        
        const gradient = ctx.createLinearGradient(startX, this.y, this.x, this.y);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(0.7, this.color);
        gradient.addColorStop(1, "transparent");
        
        // Use two strokes instead of shadowBlur for better performance
        // Outer glow
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 10;
        ctx.stroke();
        
        // Inner vibrant core
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5; 
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    const setup = () => {
      width = containerRef.current?.clientWidth || window.innerWidth;
      height = containerRef.current?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      threads = Array.from({ length: threadCount }, () => new Thread());
      // initial fill
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      ctx.globalCompositeOperation = "source-over";
      // Adjust fade color based on background
      if (isLightBackground(backgroundColor)) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      }
      
      ctx.fillRect(0, 0, width, height);
      
      if (isLightBackground(backgroundColor)) {
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.globalCompositeOperation = "lighter";
      }

      threads.forEach((thread) => {
        thread.update();
        thread.draw();
      });
      animId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    
    const resizeObserver = new ResizeObserver(() => {
      setup();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [threadCount, backgroundColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default DigitalLoomBackground;
