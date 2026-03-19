import React from 'react';
import Courses from '../components/Courses';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import DigitalLoomBackground from '@/components/ui/digital-loom-background';

export default function CoursesPage() {
  return (
    <DigitalLoomBackground 
      backgroundColor="#ffffff" 
      threadCount={30}
      className="min-h-screen"
    >
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 section-container relative z-20">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Sparkles size={12} />
            Hệ thống đào tạo chuẩn quốc tế
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-[1.1] mb-6 tracking-tighter"
          >
            Khóa học của <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              chúng tôi
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 mb-10 leading-relaxed font-light"
          >
            Lộ trình đào tạo bài bản, hiện đại, giúp trẻ làm chủ tương lai số.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/roadmap" className="btn-primary inline-flex items-center gap-3 px-8 py-3.5 group">
              Xem lộ trình học tập chi tiết
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className="relative z-20">
        <Courses hideHeader={true} />
      </div>
    </DigitalLoomBackground>
  );
}
