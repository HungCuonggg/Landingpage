"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const COLORS = [
  "rgba(14, 165, 233, 1)",   // sky-500
  "rgba(236, 72, 153, 1)",   // pink-500
  "rgba(34, 197, 94, 1)",    // green-500
  "rgba(234, 179, 8, 1)",    // yellow-500
  "rgba(239, 68, 68, 1)",     // red-500
  "rgba(168, 85, 247, 1)",   // purple-500
  "rgba(59, 130, 246, 1)",    // blue-500
  "rgba(99, 102, 241, 1)",   // indigo-500
  "rgba(139, 92, 246, 1)",   // violet-500
  "rgba(20, 184, 166, 1)",   // teal-500
  "rgba(249, 115, 22, 1)",   // orange-500
  "rgba(217, 70, 239, 1)",   // fuchsia-500
  "rgba(6, 182, 212, 1)",    // cyan-500
  "rgba(132, 204, 22, 1)",   // lime-500
  "rgba(244, 63, 94, 1)",    // rose-500
  "rgba(107, 114, 128, 1)",  // gray-500
];

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<{ id: number, pos: number[], color: string }[]>([]);

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function generateSquares(count: number) {
    if (!dimensions.width || !dimensions.height) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
      color: getRandomColor(),
    }));
  }

  const updateSquarePosition = (id: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
            ...sq,
            pos: getPos(),
            color: getRandomColor(),
          }
          : sq,
      ),
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-slate-200/50 stroke-slate-200/50",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [cx, cy], id, color }, index) => (
          <g key={`${cx}-${cy}-${index}`}>
            <motion.rect
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: maxOpacity, filter: "blur(8px)" }}
              transition={{
                duration,
                repeat: 1,
                delay: index * 0.1,
                repeatType: "reverse",
              }}
              width={width - 1}
              height={height - 1}
              x={cx * width + 1}
              y={cy * height + 1}
              fill={color}
              strokeWidth="0"
            />
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration,
                repeat: 1,
                delay: index * 0.1,
                repeatType: "reverse",
              }}
              onAnimationComplete={() => updateSquarePosition(id)}
              width={width - 1}
              height={height - 1}
              x={cx * width + 1}
              y={cy * height + 1}
              fill={color}
              strokeWidth="0"
            />
          </g>
        ))}
      </svg>
    </svg>
  );
}
