import React from 'react';
import Testimonials from '../components/Testimonials';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { AnimatedGridPattern } from '../components/ui/animated-grid-pattern';
import { Quote, Sparkles } from 'lucide-react';

export default function TestimonialsPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <main
      className="relative min-h-screen bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Animated Grid - Interaction Enabled */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 w-full h-full bg-white/40 z-20 pointer-events-none [mask-image:radial-gradient(transparent,white)]" />
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.7}
          duration={3}
          repeatDelay={1}
          className="stroke-slate-200 z-10"
        />
      </div>

      {/* Hero Section with 3D Tracking */}
      <div className="pt-32 pb-20 relative z-30 perspective-1000">
        <motion.div
          style={{ rotateX, rotateY, willChange: "transform" }}
          className="section-container text-center preserve-3d"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8"
          >
            <Sparkles size={12} className="text-amber-500" />
            Góc nhìn từ học viên
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-6 tracking-tighter" style={{ transform: "translateZ(50px)" }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Cảm nhận</span> <br />
            đầy cảm hứng
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light mb-12" style={{ transform: "translateZ(30px)" }}>
            Những câu chuyện thành công chân thực nhất từ cộng đồng STEAM Academy.
          </p>
        </motion.div>
      </div>

      {/* Testimony List Section */}
      <div className="relative z-30 pb-20">
        <div className="section-container">
          <Testimonials />
        </div>
      </div>
    </main>
  );
}
