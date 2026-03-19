"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  rotateRange?: number;
  scale?: number;
  perspective?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  containerClassName,
  rotateRange = 15,
  scale = 1.05,
  perspective = 1000,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Optimized Silk feeling: Snappy enough to track but smooth enough to feel liquid
  const springConfig = { stiffness: 120, damping: 25, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateRange, -rotateRange]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateRange, rotateRange]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
        perspective: `${perspective}px`,
      }}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={cn(
        "relative w-full h-full rounded-4xl transform-gpu will-change-transform", // REMOVED transition-all duration-300
        containerClassName
      )}
    >
      <div 
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
          perspective,
        }}
        className={cn(
          "w-full h-full rounded-4xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden",
          className
        )}
      >
        {children}
      </div>
      
      {/* Dynamic Shine Effect */}
      <motion.div
        style={{
          background: useTransform(
            [x, y],
            ([vx, vy]: any[]) => 
              `radial-gradient(circle at ${(vx + 0.5) * 100}% ${(vy + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 80%)`
          ),
          transform: "translateZ(51px)",
        }}
        className="absolute inset-0 pointer-events-none rounded-4xl"
      />
    </motion.div>
  );
};
