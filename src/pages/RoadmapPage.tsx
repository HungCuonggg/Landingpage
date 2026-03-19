import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Rocket, Code, Gamepad2, Blocks, Brain, Trophy } from 'lucide-react';
import { WarpBackground } from '@/components/ui/warp-background';
import { Card, CardContent } from '@/components/ui/card';

const roadmapSteps = [
  {
    title: 'Khám phá (6-8 tuổi)',
    description: 'Làm quen với tư duy máy tính thông qua các trò chơi logic và Scratch Jr. Xây dựng nền tảng sáng tạo.',
    icon: Blocks,
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    status: 'completed',
    skills: ['Tư duy Logic', 'Kể chuyện số', 'Cơ bản Scratch Jr']
  },
  {
    title: 'Sáng tạo (9-12 tuổi)',
    description: 'Thành thạo Scratch, bắt đầu làm quen với Python cơ bản. Tự tay tạo ra các trò chơi và ứng dụng đơn giản.',
    icon: Code,
    color: 'bg-indigo-500',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-600',
    status: 'current',
    skills: ['Lập trình Scratch', 'Python cơ bản', 'Giải quyết vấn đề']
  },
  {
    title: 'Chuyên sâu (13-15 tuổi)',
    description: 'Phát triển Website chuyên nghiệp, lập trình Game với Unity hoặc Python nâng cao. Hiểu về cấu trúc dữ liệu.',
    icon: Gamepad2,
    color: 'bg-amber-500',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    status: 'upcoming',
    skills: ['HTML/CSS/JS', 'Unity 3D', 'Cấu trúc dữ liệu']
  },
  {
    title: 'Bứt phá (16+ tuổi)',
    description: 'Trí tuệ nhân tạo (AI), Machine Learning và các dự án thực tế. Chuẩn bị hành trang cho đại học và sự nghiệp.',
    icon: Brain,
    color: 'bg-rose-500',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-600',
    status: 'upcoming',
    skills: ['AI/Machine Learning', 'Data Science', 'Dự án thực tế']
  },
  {
    title: 'Thành công',
    description: 'Trở thành những nhà sáng tạo công nghệ, sẵn sàng chinh phục các cuộc thi quốc tế và học bổng danh giá.',
    icon: Trophy,
    color: 'bg-violet-500',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-600',
    status: 'upcoming',
    skills: ['Học bổng quốc tế', 'Khởi nghiệp trẻ', 'Chuyên gia công nghệ']
  }
];

export default function RoadmapPage() {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <WarpBackground 
        className="border-none rounded-none min-h-screen bg-white p-0" 
        gridColor="rgba(99, 102, 241, 0.25)"
        beamsPerSide={12}
        beamDuration={5}
        perspective={150}
        beamSize={10}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          {/* Header */}
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100"
            >
              <Rocket size={16} />
              HÀNH TRÌNH TƯƠNG LAI
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-6 tracking-tight"
            >
              Lộ trình <span className="text-indigo-600">Phát triển</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Chúng tôi thiết kế lộ trình học tập cá nhân hóa, giúp học sinh từng bước chinh phục thế giới công nghệ từ những bước chân đầu tiên.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 via-indigo-100 to-transparent hidden md:block" />

            <div className="space-y-24 relative">
              {roadmapSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 flex justify-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} px-4 md:px-8`}>
                    <Card className={`relative p-7 rounded-[1.8rem] bg-white/80 backdrop-blur-sm border-2 ${step.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 group max-w-sm w-full`}>
                      <CardContent className="p-0">
                        <div className={`absolute -top-6 ${index % 2 === 0 ? 'md:-right-6' : 'md:-left-6'} left-6 md:left-auto p-3.5 rounded-xl ${step.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <step.icon size={24} />
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center gap-2 mb-3">
                            {step.status === 'completed' ? (
                              <CheckCircle2 className="text-emerald-500" size={20} />
                            ) : step.status === 'current' ? (
                              <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                            ) : (
                              <Circle className="text-slate-300" size={20} />
                            )}
                            <span className={`text-xs font-black uppercase tracking-widest ${step.textColor}`}>
                              {step.status === 'completed' ? 'Đã hoàn thành' : step.status === 'current' ? 'Đang diễn ra' : 'Sắp tới'}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-serif font-black text-slate-900 mb-4">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 mb-6 font-light leading-relaxed">
                            {step.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {step.skills.map(skill => (
                              <span key={skill} className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <div className={`w-10 h-10 rounded-full bg-white border-4 ${step.borderColor} shadow-lg z-10 flex items-center justify-center`}>
                      <div className={`w-3 h-3 rounded-full ${step.color}`} />
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="w-full md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 p-10 rounded-[2.5rem] bg-slate-900 text-white text-center relative overflow-hidden group shadow-2xl shadow-indigo-100 max-w-4xl mx-auto"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-black mb-6">Sẵn sàng bắt đầu hành trình?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                Hãy để chúng tôi đồng hành cùng con bạn trên con đường chinh phục công nghệ và kiến tạo tương lai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-500 transition-colors shadow-xl">
                  Đăng ký tư vấn
                </button>
                <button className="bg-white/10 text-white px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm">
                  Xem lịch khai giảng
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </WarpBackground>
    </div>
  );
}
