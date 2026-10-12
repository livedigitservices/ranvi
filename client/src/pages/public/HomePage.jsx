import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService, examService, facultyService } from '../../services';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { CourseCard } from '../../components/course/CourseCard';
import {
  GraduationCap,
  Sparkles,
  PlayCircle,
  Award,
  BookOpen,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  Video,
  FileCheck2,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  Landmark,
  Building2,
  Shield,
  Train,
  FileText,
  Briefcase,
  ChevronRight,
  Star,
  MonitorPlay,
  ClipboardList,
  MessageSquare,
  UserCheck,
  Calendar,
  Clock,
  Laptop,
  Check,
  Zap,
  Target,
  Quote,
} from 'lucide-react';

export const HomePage = () => {
  const { settings } = useSiteSettings();

  const [courses, setCourses] = useState([]);
  const [demoExams, setDemoExams] = useState([]);
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, examRes, facultyRes] = await Promise.all([
          courseService.getCourses({ limit: 12 }),
          examService.getMockTests({ isDemoFree: 'true', limit: 4 }),
          facultyService.getFacultyList(),
        ]);

        if (courseRes?.success) {
          const courseList = Array.isArray(courseRes.data?.courses)
            ? courseRes.data.courses
            : Array.isArray(courseRes.data)
            ? courseRes.data
            : [];
          setCourses(courseList);
        }

        if (examRes?.success) {
          const examList = Array.isArray(examRes.data?.tests)
            ? examRes.data.tests
            : Array.isArray(examRes.data)
            ? examRes.data
            : [];
          setDemoExams(examList);
        }

        if (facultyRes?.success) {
          const rawFaculty = Array.isArray(facultyRes.data)
            ? facultyRes.data
            : Array.isArray(facultyRes.message)
            ? facultyRes.message
            : Array.isArray(facultyRes)
            ? facultyRes
            : [];
          if (rawFaculty.length > 0) {
            setFacultyMembers(rawFaculty.slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fallbacks for dynamic settings
  const hero = settings?.heroBanner || {
    badgeText: "India's Premier Coaching for Banking & Government Exams",
    headline: 'Build Your Banking & Government Career with Us',
    highlightWord: 'Banking & Government',
    subheadline:
      'Expert-led coaching, live interactive Zoom classes, high-yield study material, and 10–20 real-pattern online mock tests to help you achieve your next career milestone.',
    primaryCtaText: "Explore Banker's Path",
    primaryCtaLink: '/bankers-path',
    secondaryCtaText: 'Book Free Demo',
    secondaryCtaLink: '/enquiry',
    heroImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
  };

  const bannerStrip = settings?.bannerStrip || {
    tagline: 'Learn • Excel • Achieve',
  };

  const bankersSection = settings?.bankersPathSection || {
    title: "Banker's Path",
    subtitle: 'Banking • Insurance • Finance Career Programs',
    description:
      'Specialized professional coaching for banking employees, insurance professionals, and candidates pursuing career growth, certifications, and promotional examinations in the financial services sector.',
    tiles: [
      { name: 'JAIIB', path: '/courses/jaiib-master-class-2026', bg: 'from-[#0B63C5] to-[#084E9E]', subtitle: 'IE&IFS • PPB • AFM • RBWM' },
      { name: 'CAIIB', path: '/courses/caiib-advanced-comprehensive-batch', bg: 'from-[#D32F2F] to-[#B71C1C]', subtitle: 'ABM • BFM • ABFM • BRBL' },
      { name: 'DBF', path: '/bankers-path', bg: 'from-[#0F8A4B] to-[#0B6A39]', subtitle: 'Banking Diploma for Aspirants' },
      { name: 'DTM', path: '/bankers-path', bg: 'from-[#E58A00] to-[#C77500]', subtitle: 'Treasury & Risk Management' },
      { name: 'AMFI', path: '/bankers-path', bg: 'from-[#8E24AA] to-[#6A1B9A]', subtitle: 'Mutual Fund Certification' },
      { name: 'NISM (SEBI)', path: '/bankers-path', bg: 'from-[#1976D2] to-[#1565C0]', subtitle: 'Securities Market Modules' },
      { name: 'IRDAI', path: '/bankers-path', bg: 'from-[#E91E63] to-[#C2185B]', subtitle: 'Insurance Regulatory Exams' },
      { name: 'DRA', path: '/bankers-path', bg: 'from-[#00897B] to-[#00695C]', subtitle: 'Debt Recovery Agent IIBF' },
    ],
  };

  const competitiveSection = settings?.competitiveSection || {
    title: 'Competitive Exams Coaching',
    subtitle: 'Build Your Career. Prepare with Confidence.',
    description:
      'Comprehensive coaching for banking recruitment (IBPS, SBI, RBI), government staff selection (SSC), railways (RRB), insurance, defence, police, and state competitive examinations.',
    tiles: [
      { name: 'IBPS', path: '/competitive-exams' },
      { name: 'SBI', path: '/competitive-exams' },
      { name: 'RBI', path: '/competitive-exams' },
      { name: 'SSC', path: '/competitive-exams' },
      { name: 'RAILWAYS', path: '/competitive-exams' },
      { name: 'LIC', path: '/competitive-exams' },
      { name: 'POLICE', path: '/competitive-exams' },
      { name: 'DEFENCE', path: '/competitive-exams' },
      { name: 'TEACHING', path: '/competitive-exams' },
      { name: 'STATE GOVT', path: '/competitive-exams' },
      { name: 'OTHER EXAMS', path: '/competitive-exams' },
    ],
  };

  const actionHubs = settings?.quickActionHubs || [
    {
      title: 'Daily Live Classes',
      description: 'Interactive Zoom lectures with bank general managers & live doubt solving.',
      link: '/online-classes',
      buttonText: 'Join Live Batch',
      badge: 'Daily Live',
    },
    {
      title: 'Recorded Video Bank',
      description: 'Full syllabus chapter-wise HD videos with single-device secure streaming.',
      link: '/recorded-classes',
      buttonText: 'Watch Lessons',
      badge: '24/7 Access',
    },
    {
      title: 'Exam Room & Mock Papers',
      description: '10 to 20 full-length real test pattern papers with instant percentile rank.',
      link: '/mock-tests',
      buttonText: 'Take Free Test',
      badge: 'Real Simulation',
    },
    {
      title: 'Expert Mentorship',
      description: 'Personal study roadmaps, exam strategy reviews, and interview guidance.',
      link: '/faculty',
      buttonText: 'Meet Faculty',
      badge: '1-on-1 Guidance',
    },
  ];

  const zoomInfo = settings?.zoomSection || {
    headline: 'Live Interactive Zoom Batches with Ex-Bank Executives',
    schedule: 'Mon – Sat | 7:30 PM to 9:00 PM IST',
    description:
      'Experience two-way real-time learning designed specifically for working bankers and serious aspirants.',
  };

  const modelTestInfo = settings?.modelTestSection || {
    headline: '10 to 20 Full-Length Online Mock Test Papers per Subject',
    paperCountText: '10 to 20 Full-Length Mock Papers',
    description:
      'Exact replicas of IIBF JAIIB/CAIIB, IBPS PO, and SBI online exam interfaces with negative marking and sectional timers.',
  };

  const roadmapSteps = settings?.roadmapSection?.steps || [
    { title: 'Foundational Concepts', description: 'Master core banking laws, economic frameworks, and speed mathematics.' },
    { title: 'Interactive Live Batches', description: 'Attend daily evening Zoom classes led by veteran banking directors.' },
    { title: 'Chapter-Wise Quizzes', description: 'Reinforce each topic immediately after lecture with practice drills.' },
    { title: 'Full-Length Mock Papers', description: 'Attempt 10-20 exam simulations with real timer & negative marking.' },
    { title: 'Performance Analytics', description: 'Review detailed speed-accuracy breakdown and weak chapter alerts.' },
    { title: 'Exam Day Success', description: 'Walk into the examination hall with total clarity and confidence.' },
  ];

  const testimonialsList = settings?.testimonials || [
    {
      name: 'Pooja Verma',
      designation: 'Assistant Manager, Union Bank of India',
      exam: 'Cleared JAIIB (1st Attempt - 84%)',
      quote: 'The live evening Zoom batches by Dr. Rajesh Sharma made AFM and PPB concepts so crystal clear. The 10 mock test papers matched the exact IIBF exam screen format!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    },
    {
      name: 'Karthik Raman',
      designation: 'Probationary Officer, State Bank of India',
      exam: 'Cleared SBI PO 2025 (AIR 64)',
      quote: 'Ranvi Institutions gave me the exact speed techniques for DI and Reasoning. The sectional mock tests and negative marking analytics pinpointed my weak areas instantly.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    },
    {
      name: 'Sneha Kulkarni',
      designation: 'Scale-II Manager, Bank of Baroda',
      exam: 'Cleared CAIIB (All 5 Papers in 1st Attempt)',
      quote: 'Managing bank hours and preparing for CAIIB was tough, but the recorded video library and doubt clearing sessions allowed me to study at my own pace with single-device ease.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    },
  ];

  const faqsList = settings?.faqs || [
    {
      question: 'What makes Ranvi Institutions different from other coaching platforms?',
      answer:
        'Ranvi Institutions combines veteran banking directors (Ex-AGM SBI, Ex-Treasury Heads) with state-of-the-art interactive live classes, exact-pattern mock tests, and single-device protected learning.',
    },
    {
      question: 'Can I access recorded video classes if I miss the live Zoom session?',
      answer:
        'Yes! Every single live lecture is recorded and uploaded to your secure student dashboard within 2 hours of completion, accessible 24/7 throughout your validity.',
    },
    {
      question: 'How many online mock test papers are included with each course?',
      answer:
        'Each major course program includes 10 to 20 full-length model test papers plus chapter-wise practice tests with automated scoring and comprehensive solution explanations.',
    },
  ];

  const defaultFaculty = [
    {
      name: 'Dr. Rajesh Sharma',
      designation: 'Chief Academic Director & Banking Mentor',
      experience: 'Ex-General Manager, State Bank of India • 28+ Yrs Exp',
      specialization: 'JAIIB / CAIIB, Banking Regulations & Retail Banking',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Prof. Ananya Sen',
      designation: 'Head of Quantitative Aptitude & DI',
      experience: 'Ex-IBPS Chief Trainer • 14+ Yrs Teaching',
      specialization: 'Speed Math, Data Interpretation, High-Yield Shortcuts',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Vikas Deshmukh (CA, CFA)',
      designation: 'Lead Mentor - Treasury & Investment Banking',
      experience: 'Ex-Treasury Head, Punjab National Bank • 19+ Yrs Exp',
      specialization: 'Treasury Management (DTM), NISM, AMFI & Forex Operations',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const displayFaculty = Array.isArray(facultyMembers) && facultyMembers.length > 0 ? facultyMembers : defaultFaculty;

  const validCourses = Array.isArray(courses) ? courses : [];
  const filteredDisplayCourses =
    activeTab === 'ALL'
      ? validCourses
      : activeTab === 'BANKERS'
      ? validCourses.filter((c) => c.division === 'BANKERS_PATH')
      : validCourses.filter((c) => c.division === 'COMPETITIVE_EXAMS');

  return (
    <div className="space-y-12 sm:space-y-16 pb-24 bg-[#F8FAFC]">
      {/* ========================================================
          1. HERO BANNER (100% DYNAMIC VIA ADMIN SETTINGS)
      ======================================================== */}
      <section className="relative bg-gradient-to-br from-[#0B1E3D] via-[#12356B] to-[#0A1A33] text-white pt-6 pb-0 overflow-hidden shadow-2xl">
        {/* Ambient Decorative Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1769D2]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#F4B942]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left py-4 sm:py-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-xs font-bold text-[#F4B942] shadow-inner">
                <Sparkles className="w-4 h-4" />
                <span>{hero.badgeText}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight font-heading leading-tight text-white">
                {hero.headline}
              </h1>

              <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {hero.subheadline}
              </p>

              {/* 4 Feature Icon Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all hover:-translate-y-1 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-[#F4B942] mb-1.5 shrink-0" />
                  <span className="text-xs font-bold text-white">Expert Faculty</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all hover:-translate-y-1 shadow-sm">
                  <BookOpen className="w-6 h-6 text-[#F4B942] mb-1.5 shrink-0" />
                  <span className="text-xs font-bold text-white">Updated Material</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all hover:-translate-y-1 shadow-sm">
                  <MonitorPlay className="w-6 h-6 text-[#F4B942] mb-1.5 shrink-0" />
                  <span className="text-xs font-bold text-white">Live & Recorded</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all hover:-translate-y-1 shadow-sm">
                  <Users className="w-6 h-6 text-[#F4B942] mb-1.5 shrink-0" />
                  <span className="text-xs font-bold text-white">Personal Mentorship</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
                <Link
                  to={hero.primaryCtaLink || '/bankers-path'}
                  className="bg-[#F4B942] hover:bg-amber-300 text-[#0B1E3D] font-black px-7 py-3.5 rounded-xl text-sm sm:text-base shadow-lg shadow-amber-400/20 transition-all hover:scale-105 flex items-center gap-2"
                >
                  {hero.primaryCtaText || "Explore Banker's Path"} <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={hero.secondaryCtaLink || '/enquiry'}
                  className="bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base border border-white/20 transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <PlayCircle className="w-5 h-5 text-[#F4B942]" /> {hero.secondaryCtaText || 'Book Free Demo'}
                </Link>
              </div>
            </div>

            {/* Right Hero Student Visual */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Floating Achievement Card */}
                <div className="absolute -top-4 -left-4 z-30 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-slate-100 text-[#0B1E3D] flex items-center gap-3 hidden sm:flex animate-float">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">JAIIB / CAIIB</p>
                    <p className="text-xs font-extrabold text-[#0B1E3D]">89.4% 1st-Attempt Pass</p>
                  </div>
                </div>

                {/* Main Hero Student Photo */}
                <div className="relative rounded-t-3xl overflow-hidden shadow-2xl border-t border-x border-white/20">
                  <img
                    src={hero.heroImage}
                    alt="Ranvi Aspirant Preparing for Banking & Government Exams"
                    className="w-full h-84 sm:h-104 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-transparent to-transparent opacity-85"></div>
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-3 left-3 right-3 z-20 bg-gradient-to-r from-[#12356B]/95 to-[#1769D2]/95 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F4B942] animate-ping"></span>
                      <p className="text-[11px] font-black text-[#F4B942] uppercase tracking-wider">
                        Banking • Current Affairs • GA
                      </p>
                    </div>
                    <p className="text-xs font-extrabold text-white">
                      100% Exam-Aligned Study Modules
                    </p>
                  </div>
                  <Link
                    to="/mock-tests"
                    className="bg-[#F4B942] hover:bg-amber-300 text-[#0B1E3D] px-3 py-1.5 rounded-lg text-xs font-black shadow-sm"
                  >
                    Try Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gold Strip: Learn • Excel • Achieve */}
        <div className="w-full bg-[#F4B942] py-2.5 px-4 shadow-md relative z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
            <span className="text-[#0B1E3D] font-black text-base sm:text-xl tracking-widest uppercase">
              {bannerStrip.tagline || 'Learn • Excel • Achieve'}
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BANKER'S PATH SECTION (DYNAMIC TILES & CONTENT)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#EAF3FF] to-[#F2F7FF] rounded-3xl p-5 sm:p-8 border border-blue-200 shadow-md">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-blue-100 text-[#12356B] flex items-center justify-center shadow-xs border border-blue-200">
                <Landmark className="w-7 h-7 text-[#1769D2]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-black text-[#0B1E3D] font-serif tracking-tight">
                  {bankersSection.title}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-600">
                  {bankersSection.subtitle}
                </p>
              </div>
            </div>

            <Link
              to="/bankers-path"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black text-[#1769D2] hover:text-[#12356B] bg-white px-4 py-2 rounded-xl border border-blue-200 shadow-xs"
            >
              View Full Programs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-medium max-w-4xl">
            {bankersSection.description}
          </p>

          {/* 8 Color-Coded Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {Array.isArray(bankersSection?.tiles) &&
              bankersSection.tiles.map((tile, idx) => {
                const bgGradients = [
                  'from-[#0B63C5] to-[#084E9E]',
                  'from-[#D32F2F] to-[#B71C1C]',
                  'from-[#0F8A4B] to-[#0B6A39]',
                  'from-[#E58A00] to-[#C77500]',
                  'from-[#8E24AA] to-[#6A1B9A]',
                  'from-[#1976D2] to-[#1565C0]',
                  'from-[#E91E63] to-[#C2185B]',
                  'from-[#00897B] to-[#00695C]',
                ];
                const gradientClass = tile.bg || bgGradients[idx % bgGradients.length];

                return (
                  <Link
                    key={idx}
                    to={tile.path || '/bankers-path'}
                    className={`bg-gradient-to-br ${gradientClass} text-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-103 transition-all duration-300 flex flex-col justify-between min-h-24 sm:min-h-28 border border-white/10 group`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-base sm:text-xl font-black tracking-wide drop-shadow-xs">
                        {tile.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all" />
                    </div>
                    {tile.subtitle && (
                      <span className="text-[10px] sm:text-xs font-semibold text-white/90 mt-2 line-clamp-1">
                        {tile.subtitle}
                      </span>
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. COMPETITIVE EXAMS SECTION (DYNAMIC RECRUITMENT TILES)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#FFF7ED] to-[#FFFBEB] rounded-3xl p-5 sm:p-8 border border-amber-200 shadow-md">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-xs border border-amber-200">
                <GraduationCap className="w-7 h-7 text-amber-700" />
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-black text-[#0B1E3D] font-serif tracking-tight">
                  {competitiveSection.title}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-amber-900">
                  {competitiveSection.subtitle}
                </p>
              </div>
            </div>

            <Link
              to="/competitive-exams"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black text-amber-900 hover:text-amber-950 bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-xs"
            >
              Explore All Exams <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-medium max-w-4xl">
            {competitiveSection.description}
          </p>

          {/* 11 Colorful Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {Array.isArray(competitiveSection?.tiles) &&
              competitiveSection.tiles.map((tile, idx) => {
                const compGradients = [
                  'from-[#0284C7] to-[#0369A1]',
                  'from-[#DC2626] to-[#B91C1C]',
                  'from-[#059669] to-[#047857]',
                  'from-[#EA580C] to-[#C2410C]',
                  'from-[#7C3AED] to-[#6D28D9]',
                  'from-[#1E40AF] to-[#1E3A8A]',
                  'from-[#DB2777] to-[#BE185D]',
                  'from-[#0D9488] to-[#0F766E]',
                  'from-[#D97706] to-[#B45309]',
                  'from-[#6B21A8] to-[#581C87]',
                  'from-[#4D7C0F] to-[#3F6212]',
                ];
                const gradientClass = tile.bg || compGradients[idx % compGradients.length];

                return (
                  <Link
                    key={idx}
                    to={tile.path || '/competitive-exams'}
                    className={`bg-gradient-to-br ${gradientClass} text-white p-3.5 sm:p-4 rounded-xl shadow-xs hover:shadow-md hover:scale-103 transition-all text-center flex items-center justify-center font-black text-xs sm:text-sm tracking-wider uppercase border border-white/10`}
                  >
                    {tile.name}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. 4 QUICK ACTION LEARNING HUBS (DYNAMIC)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.isArray(actionHubs) &&
            actionHubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group card-hover-effect"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769D2] flex items-center justify-center font-black text-lg border border-blue-100 group-hover:scale-110 transition-transform">
                    {idx === 0 ? <Video className="w-6 h-6" /> : idx === 1 ? <MonitorPlay className="w-6 h-6" /> : idx === 2 ? <FileCheck2 className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                  </div>
                  {hub.badge && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EAF3FF] text-[#12356B]">
                      {hub.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-[#0B1E3D] font-heading">
                  {hub.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {hub.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link
                  to={hub.link || '/courses'}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#1769D2] group-hover:text-[#12356B] transition-colors"
                >
                  {hub.buttonText || 'Explore Now'} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. INTERACTIVE LIVE ZOOM CLASSROOM CALLOUT
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#0B1E3D] via-[#12356B] to-[#1769D2] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#F4B942] text-[#0B1E3D] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span>Daily Evening Live Classes</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading leading-tight">
                {zoomInfo.headline}
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                {zoomInfo.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-white/90">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                  <Clock className="w-4 h-4 text-[#F4B942]" />
                  <span>{zoomInfo.schedule}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                  <Laptop className="w-4 h-4 text-[#F4B942]" />
                  <span>Interactive High-Definition Zoom</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
              <Link
                to="/online-classes"
                className="w-full sm:w-auto text-center bg-[#F4B942] hover:bg-amber-300 text-[#0B1E3D] font-black px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
              >
                Join Live Batch Today
              </Link>
              <Link
                to="/enquiry"
                className="w-full sm:w-auto text-center bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-2.5 rounded-xl text-xs border border-white/20 backdrop-blur-md"
              >
                Request Free Live Demo Pass
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FEATURED COURSES PROGRAM CATALOGUE
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1769D2] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" /> Comprehensive Programs
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading">
              Featured Coaching Programs & Batches
            </h2>
          </div>

          {/* Division Filter Tabs */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-2xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'ALL'
                  ? 'bg-white text-[#0B1E3D] shadow-xs'
                  : 'text-slate-600 hover:text-[#0B1E3D]'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab('BANKERS')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'BANKERS'
                  ? 'bg-[#12356B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B1E3D]'
              }`}
            >
              Banker's Path
            </button>
            <button
              onClick={() => setActiveTab('COMPETITIVE')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'COMPETITIVE'
                  ? 'bg-[#12356B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B1E3D]'
              }`}
            >
              Competitive Exams
            </button>
          </div>
        </div>

        {/* Dynamic Course Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-slate-500 font-bold">Loading courses catalogue...</p>
          </div>
        ) : filteredDisplayCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500 text-xs">
            No courses found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDisplayCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* ========================================================
          7. MODEL MOCK TESTS SHOWCASE
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-black text-[#1769D2] uppercase tracking-wider">
                Exam-Simulation Lab
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading mt-1">
                {modelTestInfo.headline}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal">
                {modelTestInfo.description}
              </p>
            </div>

            <Link
              to="/mock-tests"
              className="inline-flex items-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white text-xs font-black px-5 py-3 rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              Explore All Mock Tests <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <ClipboardList className="w-6 h-6 text-[#1769D2]" />
              <h4 className="font-extrabold text-xs text-[#0B1E3D]">Exact IIBF & IBPS Interface</h4>
              <p className="text-[11px] text-slate-600">
                Familiarize with the real exam screen palette, question navigation, and timer constraints.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Zap className="w-6 h-6 text-amber-500" />
              <h4 className="font-extrabold text-xs text-[#0B1E3D]">Instant AI Scorecard</h4>
              <p className="text-[11px] text-slate-600">
                Detailed sectional analytics, negative mark calculation, percentile rank, and speed breakdown.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h4 className="font-extrabold text-xs text-[#0B1E3D]">Comprehensive Explanations</h4>
              <p className="text-[11px] text-slate-600">
                Step-by-step solved rationales for every single question prepared by subject matter experts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Award className="w-6 h-6 text-purple-600" />
              <h4 className="font-extrabold text-xs text-[#0B1E3D]">All-India Rank Benchmarking</h4>
              <p className="text-[11px] text-slate-600">
                Compare your readiness against thousands of active bankers and competitive aspirants nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. 6-STEP CAREER ROADMAP (DYNAMIC)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#1769D2] uppercase tracking-wider">
            Structured Learning Path
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading">
            Your 6-Step Milestone Roadmap to Success
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A proven, battle-tested methodology followed by over 25,000 successful bank officers and exam toppers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(roadmapSteps) &&
            roadmapSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all relative overflow-hidden"
            >
              <div className="text-4xl font-black text-slate-100 absolute top-4 right-4 select-none">
                0{idx + 1}
              </div>
              <div className="relative z-10 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#12356B] font-black text-xs inline-flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-base font-extrabold text-[#0B1E3D] font-heading">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          9. DISTINGUISHED FACULTY SHOWCASE (DYNAMIC DATABASE QUERY)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-[#1769D2] uppercase tracking-wider">
              Academic Mentors
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading mt-1">
              Learn from India's Premier Banking Educators
            </h2>
          </div>

          <Link
            to="/faculty"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#1769D2] hover:text-[#12356B] bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs"
          >
            View All Faculty Mentors <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(displayFaculty) &&
            displayFaculty.map((member, idx) => (
            <div
              key={member._id || idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group card-hover-effect"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-200 shadow-sm group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#12356B] to-[#1769D2] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      {member.name?.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-extrabold text-[#0B1E3D] font-heading">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#1769D2] font-bold">{member.designation}</p>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      {member.experience || `${member.experienceYears || 12}+ Yrs Experience`}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {member.specialization || member.bio || 'Specialist mentor in banking regulations and numerical shortcuts.'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-bold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Mentor
                </span>
                <span className="font-extrabold text-amber-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {member.rating || 4.9}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          10. STUDENT SUCCESS STORIES (DYNAMIC REVIEWS)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#1769D2] uppercase tracking-wider">
            Verified Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading">
            Voices of Cleared Officers & Toppers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(testimonialsList) &&
            testimonialsList.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-7 h-7 text-blue-200" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-[#12356B] flex items-center justify-center font-bold text-xs">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-extrabold text-[#0B1E3D]">{t.name}</h4>
                  <p className="text-[11px] font-bold text-[#1769D2]">{t.exam}</p>
                  <span className="text-[10px] text-slate-500">{t.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          11. FAQS SECTION (DYNAMIC)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-[#1769D2] uppercase tracking-wider">
            Help & Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {Array.isArray(faqsList) &&
            faqsList.map((faq, idx) => (
            <details
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs group cursor-pointer"
            >
              <summary className="font-extrabold text-xs sm:text-sm text-[#0B1E3D] flex items-center justify-between list-none">
                <span>{faq.question}</span>
                <ChevronRight className="w-4 h-4 text-[#1769D2] group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100 font-medium">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ========================================================
          12. FINAL HIGH-CONVERTING CTA BANNER
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B1E3D] via-[#12356B] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black text-[#F4B942] uppercase tracking-widest">
              Ready to Achieve Your Next Career Milestone?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
              Join Ranvi Institutions Today & Start Your Guided Preparation
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
              Get immediate access to daily live Zoom classes, recorded video bank, chapter notes, and exam-pattern mock tests.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="bg-[#F4B942] hover:bg-amber-300 text-[#0B1E3D] font-black px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
              >
                Enroll Now
              </Link>
              <Link
                to="/enquiry"
                className="bg-white/15 hover:bg-white/25 text-white font-bold px-7 py-3.5 rounded-xl text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all"
              >
                Book a Free Demo Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
