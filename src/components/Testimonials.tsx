import React, { useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    role: 'Phụ huynh',
    content: 'Con tôi đã thay đổi rất nhiều sau khóa học Scratch. Bé không chỉ biết lập trình mà còn tự tin hơn trong việc giải quyết vấn đề.',
    avatar: 'https://picsum.photos/seed/parent1/100/100'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    role: 'Học viên lớp Web',
    content: 'Em rất thích cách các thầy cô giảng dạy. Những kiến thức khô khan trở nên thú vị và dễ hiểu qua các dự án thực tế.',
    avatar: 'https://picsum.photos/seed/student2/100/100'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    role: 'Phụ huynh',
    content: 'Môi trường học tập tại STEAM Academy rất hiện đại và thân thiện. Con tôi luôn hào hứng mỗi khi đến lớp.',
    avatar: 'https://picsum.photos/seed/parent3/100/100'
  }
];

import { TiltCard } from './ui/tilt-card';

function TestimonialCard({ testimonial, index }: { testimonial: any, index: number, key?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        stiffness: 45,
        damping: 20,
        mass: 1,
        delay: index * 0.1 
      }}
      className="group"
    >
      <TiltCard 
        rotateRange={10} 
        scale={1.04}
        className="bg-white/70 backdrop-blur-3xl border border-white/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.04)] overflow-hidden"
      >
        <div className="relative flex h-full flex-col p-6 md:p-7" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
          {/* Quote Accent */}
          <div 
            style={{ transform: "translateZ(30px)" }}
            className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-full blur-xl group-hover:blur-lg transition-all"
          />
          
          <div 
            style={{ transform: "translateZ(25px)" }}
            className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform"
          >
            <Quote size={16} className="fill-indigo-600/10" />
          </div>
          
          <p 
            style={{ transform: "translateZ(40px)" }}
            className="text-slate-700 text-sm md:text-base italic leading-relaxed mb-8 font-medium tracking-tight"
          >
            "{testimonial.content}"
          </p>
          
          <div className="flex items-center gap-3 mt-auto" style={{ transform: "translateZ(30px)" }}>
            <div className="relative">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-11 h-11 rounded-xl object-cover border-2 border-white shadow-md z-10 relative"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white z-20">
                <Star size={8} fill="currentColor" />
              </div>
            </div>
            <div>
              <h4 className="font-serif font-black text-slate-900 text-sm tracking-tight">{testimonial.name}</h4>
              <p className="text-[8px] text-indigo-500 font-black uppercase tracking-[0.15em] opacity-80">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 bg-transparent overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif font-black text-slate-900 mb-2 tracking-tight"
          >
            Học viên <span className="text-indigo-600">& Phụ huynh</span> nói gì?
          </motion.h2>
          <div className="flex justify-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
