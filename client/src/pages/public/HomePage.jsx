import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService, examService, facultyService } from '../../services';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { CourseCard } from '../../components/course/CourseCard';
import { EntranceExamsSection } from '../../components/home/EntranceExamsSection';
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
  MessageSquareQuote,
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
  const hero = {
    badgeText:
      settings?.heroBanner?.badgeText ||
      "India's Premier Coaching for Banking & Government Exams",
    headline:
      settings?.heroBanner?.headline ||
      (settings?.heroBanner?.headlinePrefix
        ? `${settings.heroBanner.headlinePrefix} ${settings.heroBanner.headlineHighlight || ''} ${settings.heroBanner.headlineSuffix || ''}`.trim()
        : 'Build Your Banking & Government Career with Us'),
    highlightWord:
      settings?.heroBanner?.highlightWord ||
      settings?.heroBanner?.headlineHighlight ||
      'Banking & Government',
    subheadline:
      settings?.heroBanner?.subheadline ||
      'Expert-led coaching, live interactive Zoom classes, high-yield study material, and 10–20 real-pattern online mock tests to help you achieve your next career milestone.',
    primaryCtaText: settings?.heroBanner?.primaryCtaText || "Explore Banker's Path",
    primaryCtaLink: settings?.heroBanner?.primaryCtaLink || '/bankers-path',
    secondaryCtaText: settings?.heroBanner?.secondaryCtaText || 'Book Free Demo',
    secondaryCtaLink: settings?.heroBanner?.secondaryCtaLink || '/enquiry',
    heroImage:
      settings?.heroBanner?.heroImage ||
      settings?.heroBanner?.heroImageUrl ||
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
  };

  const bannerStrip = settings?.bannerStrip || {
    tagline: 'Learn • Excel • Achieve',
  };

  const defaultBankersTiles = [
    { name: 'JAIIB', path: '/courses/jaiib-master-class-2026', bg: 'from-[#0066CC] to-[#004C99]', arrowColor: 'text-[#0066CC]' },
    { name: 'CAIIB', path: '/courses/caiib-advanced-comprehensive-batch', bg: 'from-[#E52D27] to-[#B31217]', arrowColor: 'text-[#D32F2F]' },
    { name: 'DBF', path: '/bankers-path?category=DBF', bg: 'from-[#00A86B] to-[#008050]', arrowColor: 'text-[#00A86B]' },
    { name: 'DTM', path: '/bankers-path?category=DTM', bg: 'from-[#F2A900] to-[#D48800]', arrowColor: 'text-[#D48800]' },
    { name: 'AMFI', path: '/bankers-path?category=AMFI', bg: 'from-[#8E24AA] to-[#6A1B9A]', arrowColor: 'text-[#8E24AA]' },
    { name: 'NISM (SEBI)', path: '/bankers-path?category=NISM', bg: 'from-[#1E90FF] to-[#0066CC]', arrowColor: 'text-[#1976D2]' },
    { name: 'IRDAI', path: '/bankers-path?category=IRDAI', bg: 'from-[#E91E63] to-[#C2185B]', arrowColor: 'text-[#E91E63]' },
    { name: 'DRA', path: '/bankers-path?category=DRA', bg: 'from-[#00897B] to-[#00695C]', arrowColor: 'text-[#00897B]' },
  ];

  const bankersSection = {
    title: settings?.bankersPathSection?.title || "Banker's Path",
    subtitle: settings?.bankersPathSection?.subtitle || 'Banking • Insurance • Finance Career Programs',
    buttonText: settings?.bankersPathSection?.buttonText || 'View All',
    buttonLink: settings?.bankersPathSection?.buttonLink || '/bankers-path',
    tiles: defaultBankersTiles,
  };

  const defaultCompTiles = [
    { name: 'IBPS', path: '/competitive-exams?cat=IBPS', bg: 'from-[#1E88E5] to-[#1565C0]', arrowColor: 'text-[#1976D2]' },
    { name: 'SBI', path: '/competitive-exams?cat=SBI', bg: 'from-[#E53935] to-[#C62828]', arrowColor: 'text-[#E53935]' },
    { name: 'RBI', path: '/competitive-exams?cat=RBI', bg: 'from-[#00897B] to-[#00695C]', arrowColor: 'text-[#00897B]' },
    { name: 'SSC', path: '/competitive-exams?cat=SSC', bg: 'from-[#EF6C00] to-[#E65100]', arrowColor: 'text-[#EF6C00]' },
    { name: 'RAILWAYS', path: '/competitive-exams?cat=RAILWAYS', bg: 'from-[#7B1FA2] to-[#6A1B9A]', arrowColor: 'text-[#7B1FA2]' },
    { name: 'LIC', path: '/competitive-exams?cat=LIC', bg: 'from-[#1565C0] to-[#0D47A1]', arrowColor: 'text-[#1565C0]' },
    { name: 'POLICE', path: '/competitive-exams?cat=POLICE', bg: 'from-[#D81B60] to-[#C2185B]', arrowColor: 'text-[#D81B60]' },
    { name: 'DEFENCE', path: '/competitive-exams?cat=DEFENCE', bg: 'from-[#00897B] to-[#00695C]', arrowColor: 'text-[#00897B]' },
    { name: 'TEACHING', path: '/competitive-exams?cat=TEACHING', bg: 'from-[#F59E0B] to-[#D97706]', arrowColor: 'text-[#D97706]' },
    { name: 'STATE GOVT', path: '/competitive-exams?cat=STATE GOVT', bg: 'from-[#5E35B1] to-[#4527A0]', arrowColor: 'text-[#5E35B1]' },
    { name: 'OTHER EXAMS', path: '/competitive-exams?cat=ALL', bg: 'from-[#558B2F] to-[#33691E]', arrowColor: 'text-[#558B2F]' },
  ];

  const competitiveSection = {
    title: settings?.competitiveSection?.title || settings?.competitiveExamsSection?.title || 'All Competitive Exams Coaching',
    subtitle: settings?.competitiveSection?.subtitle || settings?.competitiveExamsSection?.subtitle || 'Government Jobs • Banking • Railways • Insurance • Defence & More',
    buttonText: settings?.competitiveSection?.buttonText || 'View All',
    buttonLink: settings?.competitiveSection?.buttonLink || '/competitive-exams',
    tiles: defaultCompTiles,
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
      {/* ========================================================
          1. HERO BANNER (MATCHING REFERENCE BANNER EXACTLY)
      ======================================================== */}
      <section className="relative w-full overflow-hidden bg-[#081A36] text-white shadow-2xl">
        {/* Background Banner Image with Student & Academic Setting */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-banner.png"
            alt="Ranvi Institutions Hero Banner"
            className="w-full h-full object-cover object-right lg:object-right"
          />
          {/* Seamless Deep Navy Gradient Mask to Ensure High Contrast & Crisp Typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#081A36] via-[#081A36]/95 via-40% to-transparent sm:via-[#081A36]/90 sm:via-48% lg:via-[#081A36]/80 lg:via-55% xl:via-[#081A36]/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-12 lg:pt-16 pb-10 sm:pb-14 lg:pb-20">
          <div className="max-w-2xl text-left space-y-6 sm:space-y-8">
            {/* Main Headline Recreating the Reference Typography */}
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.12] text-white drop-shadow-md">
              {hero.headline === 'Build Your Banking & Government Career with Us' || !hero.headline ? (
                <>
                  Build Your<br />
                  <span className="text-[#F4B942]">Banking & Government</span><br />
                  Career with Us
                </>
              ) : hero.highlightWord && hero.headline.includes(hero.highlightWord) ? (
                <>
                  {hero.headline.split(hero.highlightWord)[0]}
                  <span className="text-[#F4B942]">{hero.highlightWord}</span>
                  {hero.headline.split(hero.highlightWord).slice(1).join(hero.highlightWord)}
                </>
              ) : (
                hero.headline
              )}
            </h1>

            {/* 4 Feature Icons Row Exactly Like Reference Banner */}
            <div className="grid grid-cols-4 gap-1 sm:gap-4 max-w-lg">
              {/* Feature 1: Expert Faculty */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2 flex items-center justify-center">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[1.8]" />
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4B942] fill-[#F4B942] absolute inset-0 m-auto translate-y-[-1px]" />
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white leading-tight">
                  Expert<br />Faculty
                </span>
              </div>

              {/* Feature 2: Updated Study Material */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[1.8]" />
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white leading-tight">
                  Updated<br />Study Material
                </span>
              </div>

              {/* Feature 3: Online & Offline Classes */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 flex items-center justify-center">
                  <MonitorPlay className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[1.8]" />
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white leading-tight">
                  Online &<br />Offline Classes
                </span>
              </div>

              {/* Feature 4: Personal Guidance */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 flex items-center justify-center">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[1.8]" />
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white leading-tight">
                  Personal<br />Guidance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gold Strip: Learn • Excel • Achieve */}
        <div className="w-full bg-[#F4B942] py-2 sm:py-2.5 px-4 shadow-md relative z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
            <span className="text-[#0B1E3D] font-black text-xs sm:text-sm md:text-base lg:text-lg tracking-widest uppercase">
              {bannerStrip.tagline || 'Learn • Excel • Achieve'}
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BANKER'S PATH SECTION (DYNAMIC TILES & CONTENT)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EBF4FE] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#D0E2FB] shadow-sm">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4E6FA] text-[#0B3B70] flex items-center justify-center shrink-0 shadow-xs">
                <Landmark className="w-6 h-6 sm:w-7 sm:h-7 text-[#0B3B70]" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-serif tracking-tight leading-tight">
                  {bankersSection.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                  {bankersSection.subtitle}
                </p>
              </div>
            </div>

            <Link
              to={bankersSection.buttonLink || '/bankers-path'}
              className="inline-flex items-center gap-1.5 bg-[#1976D2] hover:bg-[#1565C0] text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-3 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all shrink-0"
            >
              <span>{bankersSection.buttonText || 'View All'}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          {/* 8 Color-Coded Tiles Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
            {bankersSection.tiles.map((tile, idx) => (
              <Link
                key={idx}
                to={tile.path || '/bankers-path'}
                className={`bg-gradient-to-r ${tile.bg} text-white px-4 py-3 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-between group min-h-[54px]`}
              >
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-white drop-shadow-xs leading-tight">
                  {tile.name === 'NISM (SEBI)' ? (
                    <span className="flex flex-col text-left">
                      <span>NISM</span>
                      <span className="text-[11px] sm:text-xs font-bold opacity-90">(SEBI)</span>
                    </span>
                  ) : (
                    tile.name
                  )}
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] ${tile.arrowColor || 'text-[#1976D2]'}`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. ALL COMPETITIVE EXAMS COACHING SECTION
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF9EE] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#FFE8BF] shadow-sm">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFE5A3] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A2540]" />
              </div>
              <div  >
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-serif tracking-tight leading-tight">
                  {competitiveSection.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                  {competitiveSection.subtitle}
                </p>
              </div>
            </div>

            <Link
              to={competitiveSection.buttonLink || '/competitive-exams'}
              className="inline-flex items-center gap-1.5 bg-[#1976D2] hover:bg-[#1565C0] text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-3 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all shrink-0"
            >
              <span>{competitiveSection.buttonText || 'View All'}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          {/* 11 Colorful Tiles: Rows 1 & 2 (4 cols) and Row 3 (3 cols) */}
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {competitiveSection.tiles.slice(0, 8).map((tile, idx) => (
                <Link
                  key={idx}
                  to={tile.path || '/competitive-exams'}
                  className={`bg-gradient-to-r ${tile.bg} text-white px-4 py-3 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-between group min-h-[54px]`}
                >
                  <span className="font-bold text-sm sm:text-base tracking-wide text-white drop-shadow-xs">
                    {tile.name}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] ${tile.arrowColor || 'text-[#1976D2]'}`} />
                  </div>
                </Link>
              ))}
            </div>

            {/* Row 3: 3 items spread across 3 equal columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {competitiveSection.tiles.slice(8, 11).map((tile, idx) => (
                <Link
                  key={idx + 8}
                  to={tile.path || '/competitive-exams'}
                  className={`bg-gradient-to-r ${tile.bg} text-white px-4 py-3 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-between group min-h-[54px]`}
                >
                  <span className="font-extrabold text-sm sm:text-base tracking-wide text-white drop-shadow-xs">
                    {tile.name}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] ${tile.arrowColor || 'text-[#1976D2]'}`} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. ALL ENTRANCE EXAMS COACHING SECTION (MATCHING REFERENCE UI)
      ======================================================== */}
      <EntranceExamsSection />

      {/* ========================================================
          5. 4 QUICK ACTION HUBS (2x2 GRID MATCHING REFERENCE)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4">
          {/* Card 1: Classes */}
          <Link
            to="/online-classes"
            className="bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white p-2 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <MonitorPlay className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Classes
                </h3>
                <p className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
                  Live & Recorded Learning
                </p>
              </div>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/25 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
          </Link>

          {/* Card 2: Exams */}
          <Link
            to="/mock-tests"
            className="bg-gradient-to-r from-[#00897B] to-[#00695C] text-white p-2 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Exams
                </h3>
                <p className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
                  Online Tests & Mock Tests
                </p>
              </div>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/25 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
          </Link>

          {/* Card 3: Enquiry */}
          <Link
            to="/enquiry"
            className="bg-[#FCE4EC] border border-[#F8BBD0] text-[#0B1E3D] p-2 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#C2185B] flex items-center justify-center shrink-0 shadow-xs text-white">
                <MessageSquareQuote className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#C2185B] leading-tight">
                  Material
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#880E4F]/85 mt-0.5">
                  Get the Material
                </p>
              </div>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C2185B] flex items-center justify-center shrink-0 text-white shadow-xs group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
          </Link>

          {/* Card 4: Enroll Now */}
          <Link
            to="/bankers-path"
            className="bg-[#FFE082] border border-[#FFD54F] text-[#0B1E3D] p-2 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFA000] flex items-center justify-center shrink-0 shadow-xs text-[#0B1E3D]">
                <Users className="w-5 h-5 text-[#0B1E3D]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B1E3D] leading-tight">
                  Enroll Now
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#78350F]/85 mt-0.5">
                  Start Your Learning Journey
                </p>
              </div>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFA000] flex items-center justify-center shrink-0 text-white shadow-xs group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
          </Link>
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
