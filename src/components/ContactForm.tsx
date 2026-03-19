import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, Mail, Phone, User } from 'lucide-react';
import { TiltCard } from './ui/tilt-card';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'scratch'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-12 bg-transparent overflow-hidden">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Sẵn sàng <span className="text-indigo-600">Bắt đầu</span> Hành trình?
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Hãy để lại thông tin, đội ngũ tư vấn của STEAM Academy sẽ liên hệ với bạn trong vòng 24h để tư vấn lộ trình học tập phù hợp nhất.
            </p>

            <div className="space-y-6">
              {[
                { icon: User, label: 'Tư vấn 1:1', text: 'Lộ trình cá nhân hóa' },
                { icon: Mail, label: 'Email', text: 'contact@steamacademy.edu.vn' },
                { icon: Phone, label: 'Hotline', text: '1900 123 456' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard
              rotateRange={8}
              scale={1.01}
              className="bg-slate-50 p-5 md:p-8 border-slate-100 shadow-xl hover:shadow-2xl"
            >
              <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Đăng ký thành công!</h3>
                    <p className="text-slate-600 text-xs">Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ sớm nhất.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-20">
                    <div style={{ transform: "translateZ(5px)" }}>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Họ và tên</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white text-xs"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3" style={{ transform: "translateZ(10px)" }}>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1">Email</label>
                        <input 
                          required
                          type="email" 
                          placeholder="email@example.com"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white text-xs"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-1">Số điện thoại</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="0901 234 567"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white text-xs"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div style={{ transform: "translateZ(5px)" }}>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Khóa học quan tâm</label>
                      <select 
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white appearance-none text-xs"
                        value={formData.course}
                        onChange={(e) => setFormData({...formData, course: e.target.value})}
                      >
                        <option value="scratch">Lập trình Scratch</option>
                        <option value="web">Phát triển Website</option>
                        <option value="game">Thiết kế Game</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full py-3 text-sm group" style={{ transform: "translateZ(15px)" }}>
                      Gửi thông tin
                      <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                    </button>
                  </form>
                )}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
