import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import {
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

// ========================================================
// 1. REUSABLE PROGRAM CARD COMPONENT (4x2 EXPANDABLE TILES)
// ========================================================
const ProgramCard = ({
  title,
  subtitle,
  courses,
  defaultTiles,
  isExpanded,
  onToggleExpand,
  pageLink,
  pageLinkLabel,
  fallbackColor,
  loading,
  getTileShortName,
}) => {
  const displayCourses =
    courses.length > 0
      ? isExpanded
        ? courses
        : courses.slice(0, 8)
      : loading
      ? []
      : defaultTiles;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
      {/* Card Header with in-place toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0B2545] font-serif">
            {title}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            {subtitle}
          </p>
        </div>
        {courses.length > 8 ? (
          <button
            type="button"
            onClick={onToggleExpand}
            className="bg-[#0B2545] hover:bg-[#12356B] active:scale-95 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-all flex items-center gap-1 shadow-xs"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                View All ({courses.length}) <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        ) : (
          <Link
            to={pageLink}
            className="bg-[#0B2545] hover:bg-[#12356B] text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
          >
            View All
          </Link>
        )}
      </div>

      {/* 4 columns x 2 rows Responsive Grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
        {displayCourses.map((course, idx) => {
          const shortName = course.slug ? getTileShortName(course) : course.name;
          const courseSubtitle =
            course.tileSubtitle || course.subtitle || course.shortDescription;
          const color = course.tileColor || course.color || fallbackColor;
          const slug = course.slug || defaultTiles[idx % 8]?.slug;

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
                {courseSubtitle}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom expansion toggle & dedicated full page link */}
      {courses.length > 8 && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={onToggleExpand}
            className="font-bold text-[#1769D2] hover:underline inline-flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                View All {courses.length} Courses <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
          <Link
            to={pageLink}
            className="font-bold text-slate-600 hover:text-[#1769D2] inline-flex items-center gap-0.5 text-[11px]"
          >
            <span>{pageLinkLabel}</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
};

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
      headlinePrefix: 'Build Your',
      headlineHighlight: 'Banking & Government',
      headlineSuffix: 'Career with Us',
      tagline: 'Learn • Excel • Achieve',
    },
    {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
      headlinePrefix: 'Crack Top',
      headlineHighlight: 'Competitive Exams',
      headlineSuffix: 'in 1st Attempt',
      tagline: 'Practice • Master • Succeed',
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1400&auto=format&fit=crop',
      headlinePrefix: 'Excel in Top',
      headlineHighlight: 'Entrance Exams',
      headlineSuffix: 'with Ranvi',
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

  // 4 Action Hub Cards Config
  const actionCards = [
    {
      title: 'Enquiry & Demo',
      subtitle: 'Join our free demo classes',
      path: '/enquiry',
      bgColor: '#0080FF',
      icon: Mail,
    },
    {
      title: 'Materials',
      subtitle: 'Get study notes',
      path: '/recorded-classes',
      bgColor: '#FF8C00',
      icon: FileText,
    },
    {
      title: 'Classes',
      subtitle: 'Live & Recorded',
      path: '/online-classes',
      bgColor: '#00C853',
      icon: MonitorPlay,
    },
    {
      title: 'Exams',
      subtitle: 'Mock tests & Online tests',
      path: '/mock-tests',
      bgColor: '#9B51E0',
      icon: ClipboardList,
    },
  ];

  // 4 Learn with a Clear Plan Feature Cards Config
  const planFeatures = [
    {
      title: 'Daily Planner',
      desc: 'Structured daily schedule to cover complete syllabus on time.',
      icon: FileText,
      iconColor: '#0070F3',
      iconBg: 'bg-blue-100',
      cardBg: 'bg-[#EBF5FB]',
      border: 'border-[#D4EBF8]',
    },
    {
      title: 'Classes',
      desc: 'Interactive live & high quality recorded video lectures.',
      icon: MonitorPlay,
      iconColor: '#00A86B',
      iconBg: 'bg-emerald-100',
      cardBg: 'bg-[#EAF9F1]',
      border: 'border-[#D1F2DF]',
    },
    {
      title: 'Practice Exams',
      desc: 'Chapter-wise quizzes and full-length online mock tests.',
      icon: ClipboardList,
      iconColor: '#8A2BE2',
      iconBg: 'bg-purple-100',
      cardBg: 'bg-[#F6EEFD]',
      border: 'border-[#E9D5FA]',
    },
    {
      title: 'Expert Guidance',
      desc: 'Doubt sessions and personal mentoring by retired bankers & rankers.',
      icon: Users,
      iconColor: '#D97706',
      iconBg: 'bg-amber-100',
      cardBg: 'bg-[#FFF8EC]',
      border: 'border-[#FEE7C3]',
    },
  ];

  // 3 Roadmap Steps Config
  const roadmapSteps = [
    {
      step: '01',
      title: 'Enroll in your course',
      desc: 'Get instant access to study material & video lectures.',
    },
    {
      step: '02',
      title: 'Learn & Practice',
      desc: 'Join daily live classes & take chapter-wise mock tests.',
    },
    {
      step: '03',
      title: 'Crack Exam & Reach Goal',
      desc: 'Achieve top ranks with continuous guidance & analysis.',
    },
  ];

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
          <div className="max-w-[30vh] sm:max-w-xl text-left space-y-5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-[1.15] text-white drop-shadow-md">
              {activeSlide.headlinePrefix}{' '}
              <span className="text-[#F4B942]">{activeSlide.headlineHighlight}</span>
              {activeSlide.headlineSuffix ? ` ${activeSlide.headlineSuffix}` : ''}
            </h1>

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
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B2545] font-serif tracking-tight">
            Our Coaching Programs
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Choose your desired path and start preparing for bank, government, or entrance examinations.
          </p>
        </div>

        {/* Card 1: Banker's Path */}
        <ProgramCard
          title="Banker's Path"
          subtitle="Banking • Insurance • Finance"
          courses={bankersCourses}
          defaultTiles={defaultBankersTiles}
          isExpanded={expandedSection.bankers}
          onToggleExpand={() =>
            setExpandedSection((prev) => ({ ...prev, bankers: !prev.bankers }))
          }
          pageLink="/bankers-path"
          pageLinkLabel="Banker's Path Page"
          fallbackColor="#008080"
          loading={coursesLoading}
          getTileShortName={getTileShortName}
        />

        {/* Card 2: Competitive Exams */}
        <ProgramCard
          title="Competitive Exams"
          subtitle="Government Jobs • Banking • Railways • Defence & More"
          courses={competitiveCourses}
          defaultTiles={defaultCompetitiveTiles}
          isExpanded={expandedSection.competitive}
          onToggleExpand={() =>
            setExpandedSection((prev) => ({ ...prev, competitive: !prev.competitive }))
          }
          pageLink="/competitive-exams"
          pageLinkLabel="Competitive Exams Page"
          fallbackColor="#7A1D5A"
          loading={coursesLoading}
          getTileShortName={getTileShortName}
        />

        {/* Card 3: Entrance Exams */}
        <ProgramCard
          title="Entrance Exams"
          subtitle="Engineering • Medical • Central Universities & State CETs"
          courses={entranceCourses}
          defaultTiles={defaultEntranceTiles}
          isExpanded={expandedSection.entrance}
          onToggleExpand={() =>
            setExpandedSection((prev) => ({ ...prev, entrance: !prev.entrance }))
          }
          pageLink="/entrance-exams"
          pageLinkLabel="Entrance Exams Page"
          fallbackColor="#48631E"
          loading={coursesLoading}
          getTileShortName={getTileShortName}
        />
      </section>

      {/* ========================================================
          3. 4 ACTION CARDS (2x2 GRID MATCHING REFERENCE UI)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.path}
                className="p-2.5 sm:p-4 rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between group"
                style={{ backgroundColor: card.bgColor }}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <h4 className="font-black text-xs sm:text-sm leading-tight text-white truncate">
                      {card.title}
                    </h4>
                    <p className="text-[8px] sm:text-[10px] text-white/90 font-medium truncate">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform ml-1">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          4. "LEARN WITH A CLEAR PLAN" (EXACT MATCH TO REFERENCE)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          {/* Header with graduation cap badge */}
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
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-1">
            {planFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`p-3 sm:p-4 rounded-xl ${item.cardBg} border ${item.border} space-y-1.5 flex flex-col justify-between`}
                >
                  <div className="space-y-1 sm:space-y-1.5">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${item.iconBg} flex items-center justify-center`}
                    >
                      <Icon
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        style={{ color: item.iconColor }}
                      />
                    </div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#0B2545]">
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3 Step-by-Step Roadmap items */}
          <div className="pt-2 space-y-2">
            {roadmapSteps.map((stepItem) => (
              <div
                key={stepItem.step}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <span className="w-7 h-7 rounded-full bg-blue-100 text-[#1769D2] font-black text-xs flex items-center justify-center shrink-0">
                  {stepItem.step}
                </span>
                <div>
                  <h5 className="font-bold text-xs text-[#0B2545]">
                    {stepItem.title}
                  </h5>
                  <p className="text-[10px] text-slate-500">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
