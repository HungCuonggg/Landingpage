import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Code, Gamepad2, Blocks, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Boxes } from './ui/background-boxes';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Parallax transforms for floating elements
  const floatX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-35, 35]), springConfig);
  const floatY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-35, 35]), springConfig);
  
  const floatX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [50, -50]), springConfig);
  const floatY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [50, -50]), springConfig);
  
  const floatX3 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);
  const floatY3 = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), springConfig);

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
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden perspective-1000 bg-transparent"
    >
      {/* Hero Specific Background Elements - Fading at bottom */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,white_70%,transparent_100%)] opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from)_0%,transparent_50%)] from-indigo-100/40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-from)_0%,transparent_50%)] from-emerald-100/30" />
        
        {/* Animated Background Shapes */}
        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute top-1/4 right-10 w-64 h-64 bg-indigo-200/20 rounded-[40%] blur-3xl" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" 
        />
      </div>

      <div className="section-container relative z-10 pointer-events-none">
        <div className="grid lg:grid-cols-2 gap-16 items-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-700 text-[9px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              <Sparkles size={12} className="text-amber-500" />
              Tuyển sinh khóa hè 2026
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-[1.1] mb-4 tracking-tighter">
              Khơi nguồn <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Sáng tạo
              </span> <br />
              Công nghệ
            </h1>
            
            <p className="text-base text-slate-600 mb-8 leading-relaxed max-w-lg font-light">
              Học lập trình, thiết kế game và khám phá thế giới số cùng STEAM Academy. Nơi ươm mầm những tài năng công nghệ tương lai.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="btn-primary text-sm px-6 py-2.5 group">
                Đăng ký ngay
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link to="/courses" className="btn-secondary text-sm px-6 py-2.5">
                Xem khóa học
              </Link>
              <Link to="/roadmap" className="btn-secondary text-sm px-6 py-2.5 border-dashed border-indigo-200 hover:border-indigo-400">
                Lộ trình học
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.img 
                    key={i}
                    whileHover={{ y: -5, zIndex: 10 }}
                    src={`https://picsum.photos/seed/student${i}/100/100`}
                    alt="Student"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <p className="text-xs font-medium text-slate-500">
                <span className="text-slate-900 font-bold text-base">500+</span> <br />
                Học viên tin tưởng
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ rotateX, rotateY, willChange: "transform" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative preserve-3d"
          >
            <motion.div 
              className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.2)] border-[12px] border-white/50 backdrop-blur-sm"
            >
              <img 
                src="https://picsum.photos/seed/steam-hero/1000/1200" 
                alt="STEAM Education" 
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10 p-8 glass-card rounded-3xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <Code size={20} />
                  </div>
                  <h4 className="text-slate-900 font-bold">Lập trình Web</h4>
                </div>
                <p className="text-slate-600 text-sm font-light">Xây dựng tương lai từ những dòng code đầu tiên.</p>
              </div>
            </motion.div>

            {/* 3D Floating Elements with enhanced depth and mouse tracking */}
            <motion.div 
              style={{ 
                z: 100,
                x: floatX1,
                y: floatY1
              }}
              animate={{ 
                rotate: [0, 10, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-emerald-500 z-20 border border-slate-100"
            >
              <Code size={28} />
            </motion.div>
            
            <motion.div 
              style={{ 
                z: 150,
                x: floatX2,
                y: floatY2
              }}
              animate={{ 
                rotate: [0, -15, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-[1.5rem] shadow-2xl flex items-center justify-center text-indigo-500 z-20 border border-slate-100"
            >
              <Gamepad2 size={40} />
            </motion.div>
            
            <motion.div 
              style={{ 
                z: 200,
                x: floatX3,
                y: floatY3
              }}
              animate={{ 
                rotate: [0, 15, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -right-8 w-14 h-14 bg-white rounded-xl shadow-2xl flex items-center justify-center text-amber-500 z-20 border border-slate-100"
            >
              <Blocks size={24} />
            </motion.div>

            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              style={{ z: -50 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

