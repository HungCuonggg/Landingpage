import React, { useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { Code, Gamepad2, Blocks, ArrowRight, Rocket, CheckCircle2 } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const courses = [
  {
    id: 'scratch-jr',
    title: 'Khám phá (6-8 tuổi)',
    description: 'Làm quen với tư duy máy tính thông qua các trò chơi logic và Scratch Jr. Xây dựng nền tảng sáng tạo.',
    status: 'ĐÃ HOÀN THÀNH',
    tags: ['Tư duy Logic', 'Kể chuyện số', 'Cơ bản Scratch Jr'],
    icon: Blocks,
    color: 'text-emerald-500',
  },
  {
    id: 'scratch-pro',
    title: 'Sáng tạo (9-11 tuổi)',
    description: 'Phát triển các dự án game và hoạt hình phức tạp hơn với Scratch. Rèn luyện tư duy giải quyết vấn đề.',
    status: 'ĐANG TUYỂN SINH',
    tags: ['Lập trình Game', 'Hoạt hình', 'Thuật toán'],
    icon: Gamepad2,
    color: 'text-indigo-500',
  },
  {
    id: 'web-dev',
    title: 'Chinh phục (12-15 tuổi)',
    description: 'Xây dựng website thực tế với HTML, CSS và JavaScript. Hiểu về cấu trúc internet và thiết kế UI/UX.',
    status: 'ĐANG TUYỂN SINH',
    tags: ['Web Design', 'Frontend', 'JavaScript'],
    icon: Code,
    color: 'text-amber-500',
  },
  {
    id: 'python-ai',
    title: 'Làm chủ (15+ tuổi)',
    description: 'Tiếp cận ngôn ngữ Python và các khái niệm cơ bản về AI. Chuẩn bị hành trang cho sự nghiệp công nghệ.',
    status: 'SẮP RA MẮT',
    tags: ['Python', 'Data Science', 'AI Basics'],
    icon: Rocket,
    color: 'text-violet-500',
  }
];

import { TiltCard } from './ui/tilt-card';

function CourseCard({ course, index }: { course: any, index: number, key?: any }) {
  const Icon = course.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        stiffness: 45,
        damping: 20,
        mass: 1.1,
        delay: index * 0.1 
      }}
      className="group h-full"
    >
      <TiltCard 
        rotateRange={10} 
        scale={1.03}
        className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] p-1 overflow-hidden h-full"
      >
        <div className="relative h-full flex flex-col p-5 md:p-6" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
          {/* Top Row: Icon & Status */}
          <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(30px)" }}>
            <div className={`w-12 h-12 rounded-xl bg-white shadow-lg shadow-slate-200/40 flex items-center justify-center ${course.color} transition-transform group-hover:scale-105 group-hover:rotate-6`}>
              <Icon size={24} strokeWidth={2.5} />
            </div>
            
            <div className="flex flex-col items-end gap-0.5">
              <span className="px-2 py-0.5 rounded-full bg-slate-900/5 text-[8px] font-black tracking-widest text-slate-500 uppercase">
                Khóa học
              </span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                <CheckCircle2 size={9} className="fill-emerald-500/10" />
                <span className="text-[9px] font-bold uppercase tracking-tight">
                  {course.status}
                </span>
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-6" style={{ transform: "translateZ(40px)" }}>
            <h3 className="text-xl md:text-2xl font-serif font-black text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light line-clamp-3">
              {course.description}
            </p>
          </div>

          {/* Tags & Action Overlay */}
          <div className="mt-auto flex flex-wrap gap-1.5" style={{ transform: "translateZ(25px)" }}>
            {course.tags.slice(0, 3).map((tag: string) => (
              <span 
                key={tag}
                className="px-2 py-1 rounded-md bg-white/50 text-slate-500 text-[9px] font-bold border border-slate-100 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Aesthetic Gradient Ornaments */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Courses({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="courses" className={`py-12 bg-transparent overflow-hidden ${hideHeader ? 'pt-0' : ''}`}>
      <div className="section-container">
        {!hideHeader && (
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif font-black text-slate-900 mb-2 tracking-tight"
            >
              Khóa học <span className="text-indigo-600">Nổi bật</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm text-slate-600 max-w-2xl mx-auto font-light"
            >
              Lộ trình học tập bài bản, từ làm quen đến thành thạo, giúp trẻ phát triển toàn diện kỹ năng số.
            </motion.p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
