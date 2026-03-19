import React from 'react';
import ContactForm from '../components/ContactForm';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import RhythmicRipplesBackground from '../components/ui/rhythmic-ripples-background';

export default function ContactPage() {
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
    <RhythmicRipplesBackground backgroundColor="#ffffff" rippleCount={20} rippleSpeed={0.4}>
      <main 
        className="relative min-h-screen overflow-hidden" 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
      >
        {/* Hero Section with 3D Tracking */}
        <div className="pt-32 pb-12 relative z-30 perspective-1000">
          <motion.div 
            style={{ rotateX, rotateY, willChange: "transform" }}
            className="section-container text-center preserve-3d"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/50 border border-indigo-100/50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm backdrop-blur-sm"
            >
              <PhoneCall size={12} className="text-indigo-500 animate-pulse" />
              Kết nối với STEAM Academy
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-6 tracking-tighter" style={{ transform: "translateZ(50px)" }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Liên hệ</span> <br />
              với chúng tôi
            </h1>
            
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light mb-4" style={{ transform: "translateZ(30px)" }}>
              Chúng tôi luôn sẵn sàng lắng nghe và tư vấn lộ trình học tập tốt nhất cho con bạn.
            </p>
          </motion.div>
        </div>

        {/* Main Content: Contact Form Area */}
        <div className="relative z-30 pb-20">
          <div className="section-container relative z-10">
            <ContactForm />
          </div>
        </div>
      </main>
    </RhythmicRipplesBackground>
  );
}
