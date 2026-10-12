import React from 'react';
import { PageBanner } from '../../components/common/PageBanner';
import { Award, Target, Eye, ShieldCheck, CheckCircle2, Users, BookOpen, Sparkles, Building2, TrendingUp, Landmark, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC]">
      <PageBanner
        title="About Ranvi Institutions"
        subtitle="Dedicated to transforming careers in the banking, financial services, and government recruitment sectors through excellence in coaching and state-of-the-art educational technology."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Heritage & Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase text-[#1769D2] bg-[#EAF3FF] px-3.5 py-1 rounded-full tracking-wider">
              Our Legacy of Excellence
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B1E3D] font-heading leading-tight">
              Shaping India's Next Generation of Banking Leaders & Public Servants
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Founded by veteran bankers and educationists, <strong>Ranvi Institutions</strong> stands at the forefront of career development for banking employees and competitive recruitment aspirants.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We specialize in IIBF-accredited certifications (JAIIB, CAIIB, DBF, DTM) and premier government examinations (IBPS PO/Clerk, SBI PO, RBI Grade B, SSC CGL, Railways). Our pedagogical model pairs conceptual mastery with rigorous computer-based exam simulations.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-3 text-center">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-[#0B1E3D] block">25,000+</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase">Students Trained</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-[#1769D2] block">89.4%</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase">1st Attempt Clear</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-amber-600 block">45+</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase">Ex-Banker Faculty</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=900&auto=format&fit=crop"
                alt="Ranvi Institutions Class"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl text-xs text-[#0B1E3D] flex items-center justify-between shadow-lg">
                <div>
                  <p className="font-extrabold text-sm">State-of-the-Art Digital Studios</p>
                  <p className="text-slate-600 text-[11px]">Equipped for Ultra-HD Zoom live broadcasts & doubt resolutions</p>
                </div>
                <Sparkles className="w-6 h-6 text-[#F4B942] shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF3FF] text-[#1769D2] flex items-center justify-center shadow-xs">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#0B1E3D] font-heading">Our Mission</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              To deliver accessible, result-driven, and ethically grounded coaching that empowers every banking professional and competitive exam aspirant to achieve their highest career milestones with confidence and conceptual clarity.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#0B1E3D] font-heading">Our Vision</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              To be recognized as India's most trusted educational institution for professional banking certifications and government recruitment, setting the standard for quality pedagogy and student success rates.
            </p>
          </div>
        </div>

        {/* Why Choose Ranvi Institutions */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#1769D2] bg-[#EAF3FF] px-3.5 py-1 rounded-full uppercase tracking-wider">
              The Ranvi Edge
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading mt-2">
              Why Professionals & Aspirants Choose Ranvi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Ex-Banker Faculty Team',
                desc: 'Taught by retired Senior Managers, AGMs, and practicing Financial Analysts who understand actual bank operations.',
              },
              {
                title: 'Live Zoom & High-Def Library',
                desc: 'Daily interactive live classes via Zoom with instant question-and-answer support and crystal-clear recordings.',
              },
              {
                title: '10–20 Real Pattern Model Papers',
                desc: 'Exam simulation platform with exact timing, negative marking, and detailed step-by-step solutions.',
              },
              {
                title: 'Single-Device Security Portal',
                desc: 'Personalized secure portal ensuring focused learning, seamless progress tracking, and dedicated student privacy.',
              },
              {
                title: 'Concise High-Yield Formula Notes',
                desc: 'Downloadable PDF summaries, memory mnemonics, and ratio formula sheets updated for 2026 exam blueprints.',
              },
              {
                title: 'Personalized Doubt Support',
                desc: 'Direct interaction with mentors through structured doubt-clearing sessions and batch Telegram channels.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 hover:bg-white hover:shadow-md transition-all">
                <CheckCircle2 className="w-5 h-5 text-[#1769D2]" />
                <h4 className="text-base font-black text-[#0B1E3D] font-heading">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-[#0B1E3D] via-[#12356B] to-[#1769D2] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black font-heading">Start Your Career Milestone Today</h3>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Book a free demo session or speak with an academic advisor to find the right batch for your schedule.
          </p>
          <div className="pt-2">
            <Link
              to="/enquiry"
              className="inline-flex items-center gap-2 bg-[#F4B942] hover:bg-amber-300 text-[#0B1E3D] font-black px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg hover:scale-105"
            >
              Book Free Demo Session
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
