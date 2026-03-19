"use client";

import React, { useRef, useEffect } from "react";

const COLORS = [
  "rgba(14, 165, 233, 0.9)",   // sky-500
  "rgba(236, 72, 153, 0.9)",   // pink-500
  "rgba(34, 197, 94, 0.9)",    // green-500
  "rgba(234, 179, 8, 0.9)",    // yellow-500
  "rgba(239, 68, 68, 0.9)",     // red-500
  "rgba(168, 85, 247, 0.9)",   // purple-500
  "rgba(59, 130, 246, 0.9)",    // blue-500
  "rgba(99, 102, 241, 0.9)",    // indigo-500
  "rgba(20, 184, 166, 0.9)",   // teal-500
  "rgba(249, 115, 22, 0.9)",   // orange-500
];

interface RhythmicRipplesBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;
  rippleCount?: number;
}

const RhythmicRipplesBackground: React.FC<RhythmicRipplesBackgroundProps> = ({
  children,
  backgroundColor = "#ffffff", 
  rippleCount = 6,             
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ripples: Drop[] = [];
    let animationFrameId: number;

    class Drop {
      x: number;
      y: number;
      y_current: number;
      fallSpeed: number;
      radius: number;
      maxRadius: number;
      rippleSpeed: number;
      color: string;
      phase: "falling" | "rippling";

      constructor() {
        this.reset();
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.y_current = this.y - (Math.random() * 300 + 150); 
        this.fallSpeed = Math.random() * 0.4 + 1.2; // Optimized fallSpeed around 1.4
        
        this.radius = 0;
        this.maxRadius = Math.random() * 120 + 70; 
        this.rippleSpeed = Math.random() * 1.5 + 0.8;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.phase = "falling";
      }

      update() {
        if (this.phase === "falling") {
          this.y_current += this.fallSpeed;
          if (this.y_current >= this.y) {
            this.y_current = this.y;
            this.phase = "rippling";
          }
        } else {
          this.radius += this.rippleSpeed;
          if (this.radius > this.maxRadius) {
            this.reset();
          }
        }
      }

      draw() {
        if (this.phase === "falling") {
          // Draw a TAPERED raindrop (longer and thicker at the bottom)
          ctx!.save();
          
          const tailLength = 45; // Longer tail as requested
          const headWidth = 4.5; // Thicker bottom
          
          // Draw the tapered body using a path
          ctx!.beginPath();
          ctx!.moveTo(this.x, this.y_current - tailLength); // Top point (tail)
          ctx!.lineTo(this.x - headWidth/2, this.y_current); // Bottom Left
          ctx!.arc(this.x, this.y_current, headWidth/2, Math.PI, 0, true); // Rounded bottom
          ctx!.lineTo(this.x, this.y_current - tailLength); // Back to tail
          
          const grad = ctx!.createLinearGradient(this.x, this.y_current - tailLength, this.x, this.y_current);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.5, this.color.replace(/0\.9\)$/, "0.4)"));
          grad.addColorStop(1, this.color);
          
          ctx!.fillStyle = grad;
          ctx!.shadowBlur = 10;
          ctx!.shadowColor = this.color;
          ctx!.fill();
          
          ctx!.restore();

        } else {
          // Draw the ripple
          const alpha = Math.pow(1 - this.radius / this.maxRadius, 2); 
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = this.color;
          
          const drawColor = this.color.replace(/[\d\.]+\)$/, `${alpha * 0.45})`);
          ctx!.strokeStyle = drawColor;
          ctx!.lineWidth = 1.2; 
          ctx!.stroke();
          
          ctx!.shadowBlur = 0;
        }
      }
    }

    const setup = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.scrollHeight;
        ripples = Array.from({ length: rippleCount }, () => new Drop());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.forEach((r) => {
        r.update();
        r.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    
    const observer = new ResizeObserver(setup);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [rippleCount]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
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

export default RhythmicRipplesBackground;
