import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  BookOpen,
  ChevronRight,
  Sparkles,
  Smartphone,
  GraduationCap,
  FileCheck2,
  Trophy,
} from 'lucide-react';

export const Footer = () => {
  const { settings } = useSiteSettings();
  const contact = settings?.contactInfo || {
    address: 'Vijayawada, Andhra Pradesh',
    phone: '9876543210',
    email: 'bankerspath01@gmail.com',
  };

  return (
    <footer className="bg-[#040D1A] text-slate-200 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* ========================================================
            1. TOP GRADUATION BANNER MATCHING REFERENCE IMAGE
        ======================================================== */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0E2849] via-[#1B4373] to-[#0E2849] p-4 sm:p-6 text-white border border-blue-400/30 shadow-2xl">
          {/* Subtle decorative background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            {/* Center Emblem & Brand Name */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Ranvi Institutions Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-md rounded-full bg-white/10 p-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="text-left">
                <h3 className="text-lg sm:text-2xl font-black font-serif tracking-wide text-white drop-shadow-sm uppercase">
                  Ranvi Institutions
                </h3>
                <div className="inline-block bg-[#F4B942] text-[#0A2540] text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase mt-0.5">
                  Your Next Career Milestones
                </div>
              </div>
            </div>

            {/* Call / WhatsApp CTA Button */}
            <a
              href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 bg-[#F4B942] hover:bg-amber-300 text-[#0A2540] font-black text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 fill-[#0A2540]" />
              <span>Call / WhatsApp: {contact.phone || '9876543210'}</span>
            </a>

            {/* 4 Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-2 text-[10px] sm:text-[11px] font-bold text-blue-100 border-t border-white/15">
              <div className="flex items-center justify-center gap-1">
                <span className="text-[#F4B942]">⭐</span>
                <span>100% Exam Aligned</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-emerald-400">🛡️</span>
                <span>Verified Mentors</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-amber-300">🏆</span>
                <span>High Success Rate</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-cyan-300">📱</span>
                <span>Single-Device Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. QUICK LINKS & STUDENT SERVICES (2 COLUMNS)
        ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Column 1: Quick Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm uppercase tracking-wider">
              <span className="w-6 h-6 rounded-md bg-[#1976D2] flex items-center justify-center text-white text-xs">
                ≡
              </span>
              <span>Quick Links</span>
            </div>
            <ul className="divide-y divide-white/10 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Home</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>About Us</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/bankers-path" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Courses</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Gallery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Contact Us</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Student Services */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm uppercase tracking-wider">
              <span className="w-6 h-6 rounded-md bg-[#1976D2] flex items-center justify-center text-white text-xs">
                🎓
              </span>
              <span>Student Services</span>
            </div>
            <ul className="divide-y divide-white/10 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/faculty" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Faculty</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Admissions</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/recorded-classes" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/online-classes" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Live Classes</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center justify-between py-2 hover:text-[#F4B942] transition-colors">
                  <span>Help Centre</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================
            3. CONTACT & SUPPORT SECTION (EXACT REFERENCE UI)
        ======================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-extrabold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-[#1976D2] flex items-center justify-center text-white text-xs">
              💬
            </span>
            <span>Contact & Support</span>
          </div>

          <div className="bg-[#08182D] rounded-2xl p-4 sm:p-5 border border-blue-900/40 space-y-3 text-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-0.5">
                Call / WhatsApp
              </span>
              <a
                href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`}
                className="text-white font-extrabold text-sm hover:text-[#F4B942] transition-colors"
              >
                {contact.phone || '9876543210'}
              </a>
            </div>

            <div className="border-t border-white/5 pt-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-0.5">
                Email
              </span>
              <a
                href={`mailto:${contact.email || 'bankerspath01@gmail.com'}`}
                className="text-white font-bold text-xs hover:text-[#F4B942] transition-colors"
              >
                {contact.email || 'bankerspath01@gmail.com'}
              </a>
            </div>

            <div className="border-t border-white/5 pt-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-0.5">
                Location
              </span>
              <span className="text-white font-bold text-xs block">
                {contact.address || 'Vijayawada, Andhra Pradesh'}
              </span>
            </div>
          </div>

          {/* Connect With Us (4 Social Buttons in 2x2 Grid) */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-400 block">Connect with us:</span>
            <div className="grid grid-cols-2 gap-2.5">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '') || '919876543210'}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#08182D] hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 text-slate-200 text-xs font-bold transition-all shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[10px]">
                  WA
                </span>
                <span>WhatsApp</span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#08182D] hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000]/50 text-slate-200 text-xs font-bold transition-all shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-[10px]">
                  YT
                </span>
                <span>YouTube</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#08182D] hover:bg-pink-600/20 border border-white/10 hover:border-pink-500/50 text-slate-200 text-xs font-bold transition-all shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500 text-white flex items-center justify-center text-[10px]">
                  IG
                </span>
                <span>Instagram</span>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#08182D] hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2]/50 text-slate-200 text-xs font-bold transition-all shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px]">
                  FB
                </span>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. 4 TRUST BADGES IN 2x2 GRID
        ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#08182D]/70 border border-white/10">
            <span className="text-[#F4B942] text-lg shrink-0">✦</span>
            <div>
              <div className="text-xs font-extrabold text-white">Single-Device Protection</div>
              <div className="text-[10px] text-slate-400">Secured Student Account</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#08182D]/70 border border-white/10">
            <span className="text-emerald-400 text-lg shrink-0">🎓</span>
            <div>
              <div className="text-xs font-extrabold text-white">Ex-Banker Mentors</div>
              <div className="text-[10px] text-slate-400">Learn From Industry Veterans</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#08182D]/70 border border-white/10">
            <span className="text-cyan-400 text-lg shrink-0">📝</span>
            <div>
              <div className="text-xs font-extrabold text-white">Exact Exam Pattern</div>
              <div className="text-[10px] text-slate-400">10–20 Full-Length Mocks</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#08182D]/70 border border-white/10">
            <span className="text-purple-400 text-lg shrink-0">✨</span>
            <div>
              <div className="text-xs font-extrabold text-white">Result-Oriented Prep</div>
              <div className="text-[10px] text-slate-400">Proven Rankers Track Record</div>
            </div>
          </div>
        </div>

        {/* ========================================================
            5. LEGAL LINKS & COPYRIGHT
        ======================================================== */}
        <div className="border-t border-white/10 pt-6 text-center space-y-3 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-semibold uppercase tracking-wider">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Sitemap</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-white transition-colors">FAQs</Link>
          </div>
          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} RANVI INSTITUTIONS. All rights reserved. Designed for excellence in competitive coaching.
          </p>
        </div>
      </div>
    </footer>
  );
};
