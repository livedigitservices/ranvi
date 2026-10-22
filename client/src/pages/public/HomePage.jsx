import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import {
  Sparkles,
  BookOpen,
  Users,
  Shield,
  Star,
  MonitorPlay,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  GraduationCap,
  FileText,
  ClipboardList,
  Mail,
} from 'lucide-react';

export const HomePage = () => {
  const { settings } = useSiteSettings();

  // ----------------------------------------------------
  // 1. STATE & DATA HOOKS
  // ----------------------------------------------------
  const [courses, setCourses] = useState([]);
  const [availableStates, setAvailableStates] = useState([
    'All India',
    'Andhra Pradesh',
    'Telangana',
    'Karnataka',
    'Tamil Nadu',
    'Maharashtra',
    'Delhi',
    'Uttar Pradesh',
    'Kerala',
  ]);
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');
  const [coursesLoading, setCoursesLoading] = useState(true);

  // Expanded "View All" state per coaching card
  const [expandedSection, setExpandedSection] = useState({
    bankers: false,
    competitive: false,
    entrance: false,
  });

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  // Fetch available states with silent fallback
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await courseService.getAvailableStates();
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setAvailableStates(res.data);
        }
      } catch (err) {
        // Fallback pre-populated in initial state
      }
    };
    fetchStates();
  }, []);

  // Fetch courses whenever selectedState changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        const params = { limit: 100 };
        if (selectedState && selectedState !== 'ALL' && selectedState !== 'All India') {
          params.state = selectedState;
        }
        const res = await courseService.getCourses(params);
        if (res?.success) {
          let list = Array.isArray(res.data?.courses)
            ? res.data.courses
            : Array.isArray(res.data)
            ? res.data
            : [];

          // Client-side filter guarantee if remote backend has not re-seeded with state filters yet
          if (selectedState && selectedState !== 'ALL' && selectedState !== 'All India') {
            const stateMatches = list.filter((c) => {
              if (!c.states || c.states.length === 0) return true;
              return (
                c.states.some((s) => s.toLowerCase() === selectedState.toLowerCase()) ||
                c.states.some((s) => s.toLowerCase() === 'all india')
              );
            });
            list = stateMatches;
          }
          setCourses(list);
        }
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, [selectedState]);

  // ----------------------------------------------------
  // 2. HERO BANNER SLIDES CONFIGURATION (DYNAMIC SLIDING)
  // ----------------------------------------------------
  const defaultSlides = [
    {
      image: '/assets/hero-banner.png',
      badgeText: "India's Premier Coaching for Banking & Government Exams",
      headlinePrefix: 'Build Your',
      headlineHighlight: 'Banking & Government',
      headlineSuffix: 'Career with Us',
      subheadline:
        'Expert-led coaching, live interactive Zoom classes, high-yield study material, and 10–20 real-pattern online mock tests to help you achieve your next career milestone.',
      primaryCtaText: "Explore Banker's Path",
      primaryCtaLink: '/bankers-path',
      secondaryCtaText: 'Book Free Demo',
      secondaryCtaLink: '/enquiry',
      tagline: 'Learn • Excel • Achieve',
    },
    {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
      badgeText: 'Proven Results in IBPS, SBI, SSC & Railways Recruitment',
      headlinePrefix: 'Crack Top',
      headlineHighlight: 'Competitive Exams',
      headlineSuffix: 'in 1st Attempt',
      subheadline:
        'Master speed mathematics, high-difficulty analytical reasoning, and current affairs with personalized faculty mentorship and 20+ full-length model papers.',
      primaryCtaText: 'View Competitive Exams',
      primaryCtaLink: '/competitive-exams',
      secondaryCtaText: 'Take Free Mock Test',
      secondaryCtaLink: '/mock-tests',
      tagline: 'Practice • Master • Succeed',
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1400&auto=format&fit=crop',
      badgeText: 'National & State Level Admissions Coaching',
      headlinePrefix: 'Excel in Top',
      headlineHighlight: 'Entrance Exams',
      headlineSuffix: 'with Ranvi',
      subheadline:
        'Targeted coaching for JEE Main, NEET-UG, CUET, AP EAPCET, TG EAPCET, and POLYCET by master educators with NCERT line-by-line problem solving.',
      primaryCtaText: 'Explore Entrance Exams',
      primaryCtaLink: '/entrance-exams',
      secondaryCtaText: 'Get Free Guidance',
      secondaryCtaLink: '/enquiry',
      tagline: 'Aspire • Learn • Excel',
    },
  ];

  const slides =
    settings?.heroBanner?.slides && settings.heroBanner.slides.length > 0
      ? settings.heroBanner.slides
      : defaultSlides;

  // Auto-advance slides every 5.5s, pause on hover
  useEffect(() => {
    if (isSliderHovered || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isSliderHovered, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // ----------------------------------------------------
  // 3. COURSE CATEGORIZATION & UTILITIES
  // ----------------------------------------------------
  const bankersCourses = courses.filter((c) => c.division === 'BANKERS_PATH');
  const competitiveCourses = courses.filter((c) => c.division === 'COMPETITIVE_EXAMS');
  const entranceCourses = courses.filter((c) => c.division === 'ENTRANCE_EXAMS');

  // Exact fallback 8 tiles matching reference image
  const defaultBankersTiles = [
    { name: 'JAIIB', subtitle: 'Junior Associate of IIBF', color: '#008080', slug: 'jaiib-master-class-2026' },
    { name: 'CAIIB', subtitle: 'Certified Associate of IIBF', color: '#7A1D5A', slug: 'caiib-advanced-comprehensive-batch' },
    { name: 'DBF', subtitle: 'Diploma in Banking & Finance', color: '#48631E', slug: 'dbf-diploma-banking-finance' },
    { name: 'DTM', subtitle: 'Diploma in Treasury Management', color: '#B94715', slug: 'dtm-treasury-management' },
    { name: 'AMFI', subtitle: 'Mutual Fund Certification', color: '#2D5482', slug: 'amfi-mutual-funds-certification' },
    { name: 'NISM (SEBI)', subtitle: 'Securities Market Certification', color: '#96372B', slug: 'nism-sebi-certification' },
    { name: 'IRDAI', subtitle: 'Insurance Regulatory', color: '#22636B', slug: 'irdai-insurance-certification' },
    { name: 'DRA', subtitle: 'Debt Recovery Agent', color: '#512D6D', slug: 'dra-debt-recovery-agent' },
  ];

  const defaultCompetitiveTiles = [
    { name: 'IBPS', subtitle: 'PO / Clerk / SO / RRB', color: '#008080', slug: 'ibps-po-clerk-so-rrb' },
    { name: 'SBI', subtitle: 'PO / Clerk / Specialist', color: '#7A1D5A', slug: 'sbi-po-clerk-target-batch' },
    { name: 'RBI', subtitle: 'Grade B / Assistant', color: '#48631E', slug: 'rbi-grade-b-assistant' },
    { name: 'SSC', subtitle: 'CGL / CHSL / MTS', color: '#B94715', slug: 'ssc-cgl-chsl-cpo-mts' },
    { name: 'RAILWAYS', subtitle: 'RRB NTPC / Group D', color: '#2D5482', slug: 'railways-rrb-ntpc-group-d' },
    { name: 'POLICE & DEFENCE', subtitle: 'SI / Constable / Defence', color: '#96372B', slug: 'police-si-constable-defence-batch' },
    { name: 'LIC / INSURANCE', subtitle: 'AAO / ADO / Assistant', color: '#22636B', slug: 'lic-aao-ado-insurance-recruitment' },
    { name: 'TEACHING', subtitle: 'TET / CTET / DSC', color: '#512D6D', slug: 'teaching-ctet-dsc-state-tet' },
  ];

  const defaultEntranceTiles = [
    { name: 'JEE', subtitle: 'Main / Advanced', color: '#008080', slug: 'jee-main-advanced-engineering' },
    { name: 'NEET-UG', subtitle: 'Medical Entrance', color: '#7A1D5A', slug: 'neet-ug-medical-entrance' },
    { name: 'CUET', subtitle: 'UG / PG', color: '#48631E', slug: 'cuet-ug-central-universities' },
    { name: 'AP EAPCET', subtitle: 'Engineering / Agriculture', color: '#B94715', slug: 'ap-eapcet-engineering-agriculture' },
    { name: 'TG EAPCET', subtitle: 'Engineering / Agriculture', color: '#2D5482', slug: 'tg-eapcet-engineering-agriculture' },
    { name: 'CLAT', subtitle: 'Law Entrance', color: '#96372B', slug: 'clat-common-law-admission-test' },
    { name: 'NDA', subtitle: 'National Defence Academy', color: '#22636B', slug: 'nda-national-defence-academy' },
    { name: 'POLYCET', subtitle: 'Polytechnic Diploma', color: '#512D6D', slug: 'polycet-diploma-entrance-exam' },
  ];

  // Helper to extract clean acronym for tiles
  const getTileShortName = (course) => {
    if (!course?.title) return 'PROGRAM';
    const t = course.title;
    if (/^JAIIB/i.test(t)) return 'JAIIB';
    if (/^CAIIB/i.test(t)) return 'CAIIB';
    if (/\bDBF\b/i.test(t)) return 'DBF';
    if (/\bDTM\b/i.test(t)) return 'DTM';
    if (/\bAMFI\b/i.test(t)) return 'AMFI';
    if (/\bNISM\b/i.test(t)) return 'NISM (SEBI)';
    if (/\bIRDAI\b/i.test(t)) return 'IRDAI';
    if (/\bDRA\b/i.test(t)) return 'DRA';
    if (/^IBPS/i.test(t)) return 'IBPS';
    if (/^SBI/i.test(t)) return 'SBI';
    if (/^RBI/i.test(t)) return 'RBI';
    if (/^SSC/i.test(t)) return 'SSC';
    if (/\bRailways\b|\bRRB\b/i.test(t)) return 'RAILWAYS';
    if (/Police/i.test(t)) return 'POLICE & DEFENCE';
    if (/LIC/i.test(t)) return 'LIC / INSURANCE';
    if (/Teaching/i.test(t)) return 'TEACHING';
    if (/^JEE/i.test(t)) return 'JEE';
    if (/^NEET/i.test(t)) return 'NEET-UG';
    if (/^CUET/i.test(t)) return 'CUET';
    if (/AP EAPCET/i.test(t)) return 'AP EAPCET';
    if (/TG EAPCET/i.test(t)) return 'TG EAPCET';
    if (/CLAT/i.test(t)) return 'CLAT';
    if (/NDA/i.test(t)) return 'NDA';
    if (/POLYCET/i.test(t)) return 'POLYCET';
    const parts = t.split(' ');
    return parts.length > 1 && parts[0].length <= 4 ? `${parts[0]} ${parts[1]}` : parts[0];
  };

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 bg-[#F8FAFC] overflow-x-hidden">
      {/* ========================================================
          HERO BANNER: DYNAMIC SLIDING CAROUSEL (EXCEPT HERO)
      ======================================================== */}
      <section
        className="relative w-full overflow-hidden bg-[#081A36] text-white shadow-2xl"
        onMouseEnter={() => setIsSliderHovered(true)}
        onMouseLeave={() => setIsSliderHovered(false)}
      >
        <div className="absolute inset-0 z-0">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={s.image || '/assets/hero-banner.png'}
                alt={`Hero Slide ${idx + 1}`}
                className="w-full h-full object-cover object-right scale-105 transition-transform duration-7000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081A36] via-[#081A36]/95 via-40% to-transparent sm:via-[#081A36]/90 sm:via-48% lg:via-[#081A36]/80 lg:via-55%"></div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-12 pb-10 sm:pb-14">
          <div className="max-w-xl text-left space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F4B942] text-[10px] sm:text-xs font-black tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeSlide.badgeText || "India's Premier Coaching Institute"}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-[1.15] text-white drop-shadow-md">
              {activeSlide.headlinePrefix}{' '}
              <span className="text-[#F4B942]">{activeSlide.headlineHighlight}</span>
              {activeSlide.headlineSuffix ? ` ${activeSlide.headlineSuffix}` : ''}
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-lg">
              {activeSlide.subheadline}
            </p>

            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <div>
                <div className="relative mb-1.5 flex items-center justify-center">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.8]" />
                  <Star className="w-3 h-3 text-[#F4B942] fill-[#F4B942] absolute inset-0 m-auto" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-white leading-tight block">
                  Expert<br />Faculty
                </span>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.8]" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-white leading-tight block">
                  Updated<br />Material
                </span>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-center">
                  <MonitorPlay className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.8]" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-white leading-tight block">
                  Online &<br />Offline
                </span>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.8]" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-white leading-tight block">
                  Personal<br />Guidance
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={activeSlide.primaryCtaLink || '/bankers-path'}
                className="inline-flex items-center gap-2 bg-[#1769D2] hover:bg-[#1257b0] text-white px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-md active:scale-95"
              >
                {activeSlide.primaryCtaText || "Explore Banker's Path"} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={activeSlide.secondaryCtaLink || '/enquiry'}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-4 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95"
              >
                {activeSlide.secondaryCtaText || 'Book Free Demo'}
              </Link>
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-11 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentSlide
                      ? 'w-6 h-2 bg-[#F4B942]'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="w-full bg-[#F4B942] py-2 px-4 shadow-md relative z-20 text-center">
          <span className="text-[#0B1E3D] font-black text-xs sm:text-sm tracking-widest uppercase font-heading">
            {activeSlide.tagline || 'Learn • Excel • Achieve'}
          </span>
        </div>
      </section>

      {/* ========================================================
          1. "SELECT YOUR STATE" CARD (EXACT MATCH TO REFERENCE)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F0F7FF] rounded-2xl p-4 sm:p-6 border border-[#BEE3F8] shadow-xs space-y-3">
          <div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#1769D2] block">
              PREPARE FOR STATE & CENTRAL EXAMS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0B2545] font-serif tracking-tight mt-0.5">
              Select Your State
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              Choose your state to filter and explore the relevant government exams, entrance exams, and syllabus available for your state.
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-black text-slate-800">
              Your State / UT
            </label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-bold text-[#0B2545] shadow-xs cursor-pointer focus:ring-2 focus:ring-[#1769D2] outline-none"
              >
                <option value="All India">All India</option>
                {availableStates
                  .filter((s) => s !== 'All India')
                  .map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-600">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase block pt-0.5">
              CHOOSE A STATE TO SEE TAILORED EXAMS, NOTIFICATIONS, SYLLABUS, AND TEST SERIES.
            </span>
          </div>

          {/* Quick State Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5">
            {['All India', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedState(st)}
                className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap transition-all shrink-0 ${
                  selectedState === st
                    ? 'bg-[#1769D2] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {selectedState !== 'All India' && (
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#1769D2] font-bold">
                Filtered by: <u>{selectedState}</u>
              </span>
              <button
                type="button"
                onClick={() => setSelectedState('All India')}
                className="inline-flex items-center gap-1 text-rose-600 font-bold hover:underline"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          2. OUR COACHING PROGRAMS (3 DISTINCT CARDS WITH 4x2 TILES)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4 relative">
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B2545] font-serif tracking-tight">
            Our Coaching Programs
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Choose your desired path and start preparing for bank, government, or entrance examinations.
          </p>
        </div>

        {/* Floating Learning Platform Side Pill */}
        <Link
          to="/student"
          className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-[#0B2545] hover:bg-[#12356B] text-white px-2 sm:px-3 py-2 rounded-l-xl shadow-2xl flex items-center gap-1.5 transition-all duration-200 border-y border-l border-white/20 group hover:pr-3.5"
          title="Open Student Learning Platform"
        >
          <GraduationCap className="w-4 h-4 text-[#F4B942] shrink-0" />
          <span className="text-[10px] sm:text-xs font-black tracking-wide text-white">
            <span className="inline sm:hidden">Portal</span>
            <span className="hidden sm:inline">Learning Platform</span>
          </span>
        </Link>

        {/* ---------------- CARD 1: BANKER'S PATH ---------------- */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0B2545] font-serif">
                Banker's Path
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Banking • Insurance • Finance
              </p>
            </div>
            {bankersCourses.length > 8 ? (
              <button
                type="button"
                onClick={() =>
                  setExpandedSection((prev) => ({ ...prev, bankers: !prev.bankers }))
                }
                className="bg-[#0B2545] hover:bg-[#12356B] active:scale-95 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-all flex items-center gap-1 shadow-xs"
              >
                {expandedSection.bankers ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>View All ({bankersCourses.length}) <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            ) : (
              <Link
                to="/bankers-path"
                className="bg-[#0B2545] hover:bg-[#12356B] text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
              >
                View All
              </Link>
            )}
          </div>

          {/* 4 columns x 2 rows Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
            {(bankersCourses.length > 0
              ? expandedSection.bankers
                ? bankersCourses
                : bankersCourses.slice(0, 8)
              : coursesLoading
              ? []
              : defaultBankersTiles
            ).map((course, idx) => {
              const shortName = course.slug ? getTileShortName(course) : course.name;
              const subtitle = course.tileSubtitle || course.subtitle || course.shortDescription;
              const color = course.tileColor || course.color || '#008080';
              const slug = course.slug || defaultBankersTiles[idx % 8]?.slug;

              return (
                <Link
                  key={course._id || idx}
                  to={`/courses/${slug}`}
                  className="group min-w-0 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between min-h-[56px] sm:min-h-[64px] md:min-h-[70px] text-center overflow-hidden"
                  style={{ backgroundColor: color }}
                  title={course.title || course.name}
                >
                  <div className="font-black text-[10px] sm:text-xs md:text-sm tracking-tight sm:tracking-wide uppercase leading-tight drop-shadow-xs truncate w-full px-0.5">
                    {shortName}
                  </div>
                  <div className="text-[7.5px] sm:text-[9.5px] text-white/90 font-medium truncate w-full mt-0.5 leading-tight px-0.5">
                    {subtitle}
                  </div>
                </Link>
              );
            })}
          </div>

          {bankersCourses.length > 8 && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection((prev) => ({ ...prev, bankers: !prev.bankers }))
                }
                className="font-bold text-[#1769D2] hover:underline inline-flex items-center gap-1"
              >
                {expandedSection.bankers ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>View All {bankersCourses.length} Courses <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
              <Link
                to="/bankers-path"
                className="font-bold text-slate-600 hover:text-[#1769D2] inline-flex items-center gap-0.5 text-[11px]"
              >
                Banker's Path Page <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* ---------------- CARD 2: COMPETITIVE EXAMS ---------------- */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0B2545] font-serif">
                Competitive Exams
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Government Jobs • Banking • Railways • Defence & More
              </p>
            </div>
            {competitiveCourses.length > 8 ? (
              <button
                type="button"
                onClick={() =>
                  setExpandedSection((prev) => ({ ...prev, competitive: !prev.competitive }))
                }
                className="bg-[#0B2545] hover:bg-[#12356B] active:scale-95 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-all flex items-center gap-1 shadow-xs"
              >
                {expandedSection.competitive ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>View All ({competitiveCourses.length}) <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            ) : (
              <Link
                to="/competitive-exams"
                className="bg-[#0B2545] hover:bg-[#12356B] text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
              >
                View All
              </Link>
            )}
          </div>

          {/* 4 columns x 2 rows Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
            {(competitiveCourses.length > 0
              ? expandedSection.competitive
                ? competitiveCourses
                : competitiveCourses.slice(0, 8)
              : coursesLoading
              ? []
              : defaultCompetitiveTiles
            ).map((course, idx) => {
              const shortName = course.slug ? getTileShortName(course) : course.name;
              const subtitle = course.tileSubtitle || course.subtitle || course.shortDescription;
              const color = course.tileColor || course.color || '#7A1D5A';
              const slug = course.slug || defaultCompetitiveTiles[idx % 8]?.slug;

              return (
                <Link
                  key={course._id || idx}
                  to={`/courses/${slug}`}
                  className="group min-w-0 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between min-h-[56px] sm:min-h-[64px] md:min-h-[70px] text-center overflow-hidden"
                  style={{ backgroundColor: color }}
                  title={course.title || course.name}
                >
                  <div className="font-black text-[10px] sm:text-xs md:text-sm tracking-tight sm:tracking-wide uppercase leading-tight drop-shadow-xs truncate w-full px-0.5">
                    {shortName}
                  </div>
                  <div className="text-[7.5px] sm:text-[9.5px] text-white/90 font-medium truncate w-full mt-0.5 leading-tight px-0.5">
                    {subtitle}
                  </div>
                </Link>
              );
            })}
          </div>

          {competitiveCourses.length > 8 && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection((prev) => ({ ...prev, competitive: !prev.competitive }))
                }
                className="font-bold text-[#1769D2] hover:underline inline-flex items-center gap-1"
              >
                {expandedSection.competitive ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>View All {competitiveCourses.length} Courses <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
              <Link
                to="/competitive-exams"
                className="font-bold text-slate-600 hover:text-[#1769D2] inline-flex items-center gap-0.5 text-[11px]"
              >
                Competitive Exams Page <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* ---------------- CARD 3: ENTRANCE EXAMS ---------------- */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0B2545] font-serif">
                Entrance Exams
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Engineering • Medical • Central Universities & State CETs
              </p>
            </div>
            {entranceCourses.length > 8 ? (
              <button
                type="button"
                onClick={() =>
                  setExpandedSection((prev) => ({ ...prev, entrance: !prev.entrance }))
                }
                className="bg-[#0B2545] hover:bg-[#12356B] active:scale-95 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-all flex items-center gap-1 shadow-xs"
              >
                {expandedSection.entrance ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>View All ({entranceCourses.length}) <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            ) : (
              <Link
                to="/entrance-exams"
                className="bg-[#0B2545] hover:bg-[#12356B] text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
              >
                View All
              </Link>
            )}
          </div>

          {/* 4 columns x 2 rows Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
            {(entranceCourses.length > 0
              ? expandedSection.entrance
                ? entranceCourses
                : entranceCourses.slice(0, 8)
              : coursesLoading
              ? []
              : defaultEntranceTiles
            ).map((course, idx) => {
              const shortName = course.slug ? getTileShortName(course) : course.name;
              const subtitle = course.tileSubtitle || course.subtitle || course.shortDescription;
              const color = course.tileColor || course.color || '#48631E';
              const slug = course.slug || defaultEntranceTiles[idx % 8]?.slug;

              return (
                <Link
                  key={course._id || idx}
                  to={`/courses/${slug}`}
                  className="group min-w-0 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between min-h-[56px] sm:min-h-[64px] md:min-h-[70px] text-center overflow-hidden"
                  style={{ backgroundColor: color }}
                  title={course.title || course.name}
                >
                  <div className="font-black text-[10px] sm:text-xs md:text-sm tracking-tight sm:tracking-wide uppercase leading-tight drop-shadow-xs truncate w-full px-0.5">
                    {shortName}
                  </div>
                  <div className="text-[7.5px] sm:text-[9.5px] text-white/90 font-medium truncate w-full mt-0.5 leading-tight px-0.5">
                    {subtitle}
                  </div>
                </Link>
              );
            })}
          </div>

          {entranceCourses.length > 8 && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection((prev) => ({ ...prev, entrance: !prev.entrance }))
                }
                className="font-bold text-[#1769D2] hover:underline inline-flex items-center gap-1"
              >
                {expandedSection.entrance ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>View All {entranceCourses.length} Courses <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
              <Link
                to="/entrance-exams"
                className="font-bold text-slate-600 hover:text-[#1769D2] inline-flex items-center gap-0.5 text-[11px]"
              >
                Entrance Exams Page <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          3. 4 ACTION CARDS (2x2 GRID MATCHING REFERENCE UI)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Card 1: Enquiry & Demo (Blue) */}
          <Link
            to="/enquiry"
            className="p-2.5 sm:p-4 rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between group"
            style={{ backgroundColor: '#0080FF' }}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-xs sm:text-sm leading-tight text-white">
                  Enquiry & Demo
                </h4>
                <p className="text-[8px] sm:text-[10px] text-white/90 font-medium line-clamp-1">
                  Join our free demo classes
                </p>
              </div>
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </Link>

          {/* Card 2: Materials (Orange) */}
          <Link
            to="/recorded-classes"
            className="p-2.5 sm:p-4 rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between group"
            style={{ backgroundColor: '#FF8C00' }}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-xs sm:text-sm leading-tight text-white">
                  Materials
                </h4>
                <p className="text-[8px] sm:text-[10px] text-white/90 font-medium line-clamp-1">
                  Get study notes
                </p>
              </div>
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </Link>

          {/* Card 3: Classes (Green) */}
          <Link
            to="/online-classes"
            className="p-2.5 sm:p-4 rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between group"
            style={{ backgroundColor: '#00C853' }}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <MonitorPlay className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-xs sm:text-sm leading-tight text-white">
                  Classes
                </h4>
                <p className="text-[8px] sm:text-[10px] text-white/90 font-medium line-clamp-1">
                  Live & Recorded
                </p>
              </div>
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </Link>

          {/* Card 4: Exams (Purple) */}
          <Link
            to="/mock-tests"
            className="p-2.5 sm:p-4 rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between group"
            style={{ backgroundColor: '#9B51E0' }}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <ClipboardList className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-xs sm:text-sm leading-tight text-white">
                  Exams
                </h4>
                <p className="text-[8px] sm:text-[10px] text-white/90 font-medium line-clamp-1">
                  Mock tests & Online tests
                </p>
              </div>
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================
          4. "LEARN WITH A CLEAR PLAN" (EXACT MATCH TO REFERENCE)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          {/* Header with floating graduation cap badge */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                PREPARE WITH STRUCTURED METHODOLOGY
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2545] font-serif tracking-tight mt-0.5">
                Learn with a Clear Plan
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Follow our proven, step-by-step methodology to crack your exams with confidence.
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#0B2545] to-[#1976D2] text-[#F4B942] flex items-center justify-center shrink-0 shadow-md">
              <GraduationCap className="w-6 h-6 text-[#F4B942]" />
            </div>
          </div>

          {/* 4 Feature Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Card 1: Daily Planner */}
            <div className="p-4 rounded-xl bg-[#EBF5FB] border border-[#D4EBF8] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0070F3] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#0070F3]" />
                </div>
                <h4 className="font-extrabold text-sm text-[#0B2545]">Daily Planner</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Structured daily schedule to cover complete syllabus on time.
                </p>
              </div>
              <Link
                to="/recorded-classes"
                className="text-[11px] font-black text-[#0070F3] hover:underline inline-flex items-center gap-1.5 pt-1"
              >
                <span>VIEW SYLLABUS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Classes */}
            <div className="p-4 rounded-xl bg-[#EAF9F1] border border-[#D1F2DF] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#00A86B] flex items-center justify-center">
                  <MonitorPlay className="w-4 h-4 text-[#00A86B]" />
                </div>
                <h4 className="font-extrabold text-sm text-[#0B2545]">Classes</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Interactive live & high quality recorded video lectures.
                </p>
              </div>
              <Link
                to="/online-classes"
                className="text-[11px] font-black text-[#00A86B] hover:underline inline-flex items-center gap-1.5 pt-1"
              >
                <span>EXPLORE CLASSES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Practice Exams */}
            <div className="p-4 rounded-xl bg-[#F6EEFD] border border-[#E9D5FA] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#8A2BE2] flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-[#8A2BE2]" />
                </div>
                <h4 className="font-extrabold text-sm text-[#0B2545]">Practice Exams</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Chapter-wise quizzes and full-length online mock tests.
                </p>
              </div>
              <Link
                to="/mock-tests"
                className="text-[11px] font-black text-[#8A2BE2] hover:underline inline-flex items-center gap-1.5 pt-1"
              >
                <span>ATTEMPT MOCK TEST</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4: Expert Guidance */}
            <div className="p-4 rounded-xl bg-[#FFF8EC] border border-[#FEE7C3] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#D97706] flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#D97706]" />
                </div>
                <h4 className="font-extrabold text-sm text-[#0B2545]">Expert Guidance</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Doubt sessions and personal mentoring by retired bankers & rankers.
                </p>
              </div>
              <Link
                to="/faculty"
                className="text-[11px] font-black text-[#D97706] hover:underline inline-flex items-center gap-1.5 pt-1"
              >
                <span>MEET OUR FACULTY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3 Step-by-Step Roadmap items */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-[#1769D2] font-black text-xs flex items-center justify-center shrink-0">
                01
              </span>
              <div>
                <h5 className="font-bold text-xs text-[#0B2545]">Enroll in your course</h5>
                <p className="text-[10px] text-slate-500">Get instant access to study material & video lectures.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-[#1769D2] font-black text-xs flex items-center justify-center shrink-0">
                02
              </span>
              <div>
                <h5 className="font-bold text-xs text-[#0B2545]">Learn & Practice</h5>
                <p className="text-[10px] text-slate-500">Join daily live classes & take chapter-wise mock tests.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-[#1769D2] font-black text-xs flex items-center justify-center shrink-0">
                03
              </span>
              <div>
                <h5 className="font-bold text-xs text-[#0B2545]">Crack Exam & Reach Goal</h5>
                <p className="text-[10px] text-slate-500">Achieve top ranks with continuous guidance & analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
