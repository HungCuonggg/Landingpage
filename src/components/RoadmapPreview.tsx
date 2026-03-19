import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TiltCard } from './ui/tilt-card';

const steps = [
  { age: '6-8', title: 'Khám phá', color: 'bg-emerald-500' },
  { age: '9-12', title: 'Sáng tạo', color: 'bg-indigo-500' },
  { age: '13-15', title: 'Chuyên sâu', color: 'bg-amber-500' },
  { age: '16+', title: 'Bứt phá', color: 'bg-rose-500' },
];

export default function RoadmapPreview() {
  return (
    <section className="py-12 bg-transparent text-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10" />
      
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[9px] font-bold uppercase tracking-widest mb-3"
            >
              <Sparkles size={10} />
              Lộ trình học tập
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif font-black mb-3 leading-tight"
            >
              Định hướng tương lai <br />
              <span className="text-indigo-400">từng bước một</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-sm font-light"
            >
              Từ những khối lệnh đầu tiên đến những dự án AI phức tạp, chúng tôi đồng hành cùng học viên trên mọi chặng đường phát triển.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/roadmap" className="group inline-flex items-center gap-3 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-black hover:bg-indigo-50 transition-all shadow-xl shadow-white/5 text-xs">
              Xem chi tiết lộ trình
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

{steps.map((step, index) => (
  <motion.div
    key={step.title}
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      type: "spring",
      stiffness: 45,
      damping: 20,
      mass: 1.1,
      delay: index * 0.08 
    }}
    className="group"
  >
    <TiltCard 
      rotateRange={10} 
      scale={1.06}
      className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      <div className="p-5 h-full flex flex-col relative" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div 
          style={{ transform: "translateZ(30px)" }}
          className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-white font-black mb-4 shadow-md shadow-slate-200 group-hover:scale-105 transition-transform text-[10px] relative z-10`}
        >
          {step.age}
        </div>
        <h3 
          style={{ transform: "translateZ(40px)" }}
          className="text-lg font-serif font-black mb-1.5 text-slate-900 group-hover:text-indigo-600 transition-colors relative z-10"
        >
          {step.title}
        </h3>
        <p 
          style={{ transform: "translateZ(25px)" }}
          className="text-slate-500 text-[10px] font-light leading-relaxed relative z-10 line-clamp-2"
        >
          Giai đoạn phát triển lõi và tư duy đột phá.
        </p>
        
        <div 
          style={{ transform: "translateZ(35px)" }}
          className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0 relative z-10"
        >
          <ArrowRight size={14} className="text-indigo-500" />
        </div>
      </div>
    </TiltCard>
  </motion.div>
))}
        </div>
      </div>
    </section>
  );
}
