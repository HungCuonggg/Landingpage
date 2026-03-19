import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Facebook, Youtube, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Rocket size={18} />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-black tracking-tighter text-white leading-none">
                  STEAM
                </span>
                <span className="text-[9px] font-serif italic font-medium tracking-[0.3em] text-indigo-400 uppercase ml-0.5">
                  ACADEMY
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed mb-8 text-slate-400 font-light">
              Hệ thống đào tạo lập trình và công nghệ cho trẻ em hàng đầu Việt Nam. Nơi khơi nguồn sáng tạo và tư duy logic cho thế hệ tương lai.
            </p>
            <div className="flex gap-3">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-lg hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[9px]">Khóa học</h4>
            <ul className="space-y-4 text-xs font-light">
              <li><Link to="/courses" className="hover:text-indigo-400 transition-colors">Lập trình Scratch</Link></li>
              <li><Link to="/courses" className="hover:text-indigo-400 transition-colors">Phát triển Website</Link></li>
              <li><Link to="/courses" className="hover:text-indigo-400 transition-colors">Thiết kế Game</Link></li>
              <li><Link to="/courses" className="hover:text-indigo-400 transition-colors">Trí tuệ nhân tạo (AI)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[9px]">Hỗ trợ</h4>
            <ul className="space-y-4 text-xs font-light">
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Chính sách bảo mật</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 transition-colors">Tuyển dụng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[9px]">Liên hệ</h4>
            <ul className="space-y-5 text-xs font-light">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="leading-relaxed">123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
                  <Phone size={16} />
                </div>
                <span>1900 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail size={16} />
                </div>
                <span>contact@steamacademy.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-slate-500 uppercase tracking-widest font-bold">
          <p>© 2026 STEAM Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

