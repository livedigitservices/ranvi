import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  ChevronDown,
  ChevronUp,
  RotateCcw,
  GraduationCap,
  FileText,
  ClipboardList,
  Mail,
} from 'lucide-react';

// ========================================================
// 1. TILE HELPER FUNCTIONS (FAST CACHED TITLES & SUBTITLES)
// ========================================================
const shortNameCache = new Map();
const getTileShortName = (course) => {
  if (!course) return 'PROGRAM';
  const id = course._id || course.slug || course.title || course.name;
  if (id && shortNameCache.has(id)) return shortNameCache.get(id);

  let result = 'PROGRAM';
  if (course?.tileShortName) result = course.tileShortName;
  else if (course?.name && !course?.title) result = course.name;
  else {
    const t = course?.title || course?.name || '';
    if (!t) result = 'PROGRAM';
    else if (/^JAIIB/i.test(t)) result = 'JAIIB';
    else if (/^CAIIB/i.test(t)) result = 'CAIIB';
    else if (/\bDBF\b/i.test(t)) result = 'DBF';
    else if (/\bDTM\b/i.test(t)) result = 'DTM';
    else if (/\bAMFI\b/i.test(t)) result = 'AMFI';
    else if (/\bNISM\b/i.test(t)) result = 'NISM (SEBI)';
    else if (/\bIRDAI\b/i.test(t)) result = 'IRDAI';
    else if (/\bDRA\b/i.test(t)) result = 'DRA';
    else if (/^IBPS/i.test(t)) result = 'IBPS';
    else if (/^SBI/i.test(t)) result = 'SBI';
    else if (/^RBI/i.test(t)) result = 'RBI';
    else if (/^SSC/i.test(t)) result = 'SSC';
    else if (/\bRailways\b|\bRRB\b/i.test(t)) result = 'RAILWAYS';
    else if (/Police/i.test(t)) result = 'POLICE & DEFENCE';
    else if (/LIC/i.test(t)) result = 'LIC / INSURANCE';
    else if (/Teaching/i.test(t)) result = 'TEACHING';
    else if (/^JEE/i.test(t)) result = 'JEE';
    else if (/^NEET/i.test(t)) result = 'NEET-UG';
    else if (/^CUET/i.test(t)) result = 'CUET';
    else if (/AP EAPCET/i.test(t)) result = 'AP EAPCET';
    else if (/TG EAPCET/i.test(t)) result = 'TG EAPCET';
    else if (/CLAT/i.test(t)) result = 'CLAT';
    else if (/NDA/i.test(t)) result = 'NDA';
    else if (/POLYCET/i.test(t)) result = 'POLYCET';
    else if (/APRJC/i.test(t)) result = 'APRJC CET';
    else if (/TGCET/i.test(t)) result = 'TGCET';
    else {
      const parts = t.split(' ');
      result = parts.length > 1 && parts[0].length <= 4 ? `${parts[0]} ${parts[1]}` : parts[0];
    }
  }

  if (id) shortNameCache.set(id, result);
  return result;
};

const subtitleCache = new Map();
const getTileSubtitle = (course, fallbackSubtitle = '') => {
  const id = course?._id || course?.slug || course?.title;
  if (id && subtitleCache.has(id)) return subtitleCache.get(id);

  const t = (course?.title || course?.name || '').toLowerCase();
  const slug = (course?.slug || '').toLowerCase();
  const rawSub = course?.tileSubtitle || course?.subtitle || '';

  let result = '';
  // 1. Direct canonical mappings matching reference UI perfectly
  if (slug.includes('jaiib') || t.includes('jaiib')) result = 'Junior Associate of IIBF';
  else if (slug.includes('caiib') || t.includes('caiib')) result = 'Certified Associate of IIBF';
  else if (slug.includes('dbf') || t.includes('diploma in banking')) result = 'Diploma in Banking & Finance';
  else if (slug.includes('dtm') || t.includes('treasury')) result = 'Treasury & Risk Management';
  else if (slug.includes('amfi') || t.includes('mutual fund')) result = 'Mutual Fund Certification';
  else if (slug.includes('nism') || t.includes('sebi')) result = 'Securities Market Certification';
  else if (slug.includes('irdai') || t.includes('insurance regulatory')) result = 'Insurance Agent & Broker';
  else if (slug.includes('dra') || t.includes('debt recovery')) result = 'Debt Recovery Agent';
  else if (slug.includes('ibps') || t.startsWith('ibps')) result = 'PO / Clerk / SO / RRB';
  else if (slug.includes('sbi') || t.startsWith('sbi')) result = 'PO / Clerk / Specialist';
  else if (slug.includes('rbi') || t.startsWith('rbi')) result = 'Grade B / Assistant';
  else if (slug.includes('ssc') || t.startsWith('ssc')) result = 'CGL / CHSL / MTS';
  else if (slug.includes('railway') || slug.includes('rrb') || t.includes('railway')) result = 'RRB NTPC / Group D';
  else if (slug.includes('police') || t.includes('police')) result = 'SI / Constable / Defence';
  else if (slug.includes('lic') || t.includes('lic')) result = 'AAO / ADO / Assistant';
  else if (slug.includes('teaching') || t.includes('teaching') || t.includes('ctet') || t.includes('dsc')) result = 'TET / CTET / DSC';
  else if (slug.includes('jee') || t.startsWith('jee')) result = 'Main / Advanced';
  else if (slug.includes('neet') || t.startsWith('neet')) result = 'Medical Entrance';
  else if (slug.includes('cuet') || t.startsWith('cuet')) result = 'Central Universities';
  else if (slug.includes('ap-eapcet') || t.includes('ap eapcet')) result = 'Engineering / Agriculture';
  else if (slug.includes('tg-eapcet') || t.includes('tg eapcet')) result = 'Engineering / Agriculture';
  else if (slug.includes('clat') || t.startsWith('clat')) result = 'Law Entrance';
  else if (slug.includes('nda') || t.startsWith('nda')) result = 'Defence Academy';
  else if (slug.includes('polycet') || t.includes('polycet')) result = 'Polytechnic Diploma';
  else if (slug.includes('aprjc') || t.includes('aprjc')) result = 'Intermediate Courses';
  else if (slug.includes('tgcet') || t.includes('tgcet')) result = 'Gurukul Schools';
  else if (rawSub) {
    result = rawSub
      .replace(/\s*•\s*/g, ' / ')
      .replace(/\s*,\s*/g, ' / ')
      .replace(/Certified Course/gi, '')
      .replace(/Comprehensive Batch/gi, '')
      .replace(/Target Coaching Batch/gi, '')
      .replace(/Prep Series/gi, '')
      .replace(/Certification Batch/gi, '')
      .replace(/Master Batch/gi, '')
      .replace(/Super 60 Batch/gi, '')
      .replace(/Intensive Batch/gi, '')
      .replace(/Foundation Batch/gi, '')
      .replace(/Foundation Course/gi, '')
      .trim();
  } else {
    result = fallbackSubtitle || course?.shortDescription || '';
  }

  if (id) subtitleCache.set(id, result);
  return result;
};

// ========================================================
// 2. REUSABLE PROGRAM CARD COMPONENT (4x2 EXPANDABLE TILES)
// ========================================================
const ProgramCard = React.memo(({
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
}) => {
  // Always render defaultTiles instantly if courses not yet loaded to prevent any blank state
  const displayCourses =
    courses && courses.length > 0
      ? isExpanded
        ? courses
        : courses.slice(0, 8)
      : defaultTiles;

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200 shadow-xs space-y-3">
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
            className="bg-[#0B2545] hover:bg-[#12356B] active:scale-95 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-md transition-all flex items-center gap-1 shadow-xs cursor-pointer"
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
          const fallback = defaultTiles[idx % defaultTiles.length] || {};
          const shortName = getTileShortName(course) || fallback.name;
          const courseSubtitle = getTileSubtitle(course, fallback.subtitle);
          const color = course.tileColor || course.color || fallback.color || fallbackColor;
          const slug = course.slug || fallback.slug;

          return (
            <Link
              key={course._id || idx}
              to={`/courses/${slug}`}
              className="group min-w-0 px-1 py-1.5 sm:px-2 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center text-center gap-0.5 sm:gap-1 min-h-[58px] sm:min-h-[66px] md:min-h-[72px] overflow-hidden"
              style={{ backgroundColor: color }}
              title={course.title || course.name}
            >
              <div className="font-black text-[9.5px] sm:text-xs md:text-sm tracking-tight uppercase leading-[1.1] drop-shadow-xs w-full px-0.5 break-words line-clamp-2 text-center">
                {shortName}
              </div>
              <div className="text-[7.5px] sm:text-[9px] md:text-[9.5px] lg:text-[10px] text-white/95 font-medium leading-[1.15] w-full px-0.5 break-words line-clamp-2 text-center">
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
            className="font-bold text-[#1769D2] hover:underline inline-flex items-center gap-1 cursor-pointer"
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
});

// Pre-load from sessionStorage for instantaneous 0ms display on repeat visits
const getInitialCachedCourses = (state) => {
  try {
    if (typeof window !== 'undefined') {
      const raw = sessionStorage.getItem(`ranvi_courses_${state || 'all'}`);
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {}
  return [];
};

// Module-level cached states list
let cachedAvailableStates = [
  'All India',
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Delhi',
  'Uttar Pradesh',
  'Kerala',
];

export const HomePage = () => {
  const { settings } = useSiteSettings();

  // ----------------------------------------------------
  // 1. STATE & DATA HOOKS (WITH INSTANT CACHED FIRST PAINT)
  // ----------------------------------------------------
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');
  const [courses, setCourses] = useState(() => getInitialCachedCourses('Andhra Pradesh'));
  const [availableStates, setAvailableStates] = useState(cachedAvailableStates);
  const [coursesLoading, setCoursesLoading] = useState(() => getInitialCachedCourses('Andhra Pradesh').length === 0);

  // Expanded "View All" state per coaching card
  const [expandedSection, setExpandedSection] = useState({
    bankers: false,
    competitive: false,
    entrance: false,
  });

  // Hero Static Headline & Tagline from Settings
  const heroHeadlinePrefix = settings?.heroBanner?.headlinePrefix || 'Build Your';
  const heroHeadlineHighlight =
    settings?.heroBanner?.headlineHighlight ||
    settings?.heroBanner?.highlightWord ||
    'Banking & Government';
  const heroHeadlineSuffix =
    settings?.heroBanner?.headlineSuffix !== undefined
      ? settings?.heroBanner?.headlineSuffix
      : 'Career with Us';
  const bannerStripTagline =
    settings?.bannerStripText ||
    settings?.bannerStrip?.tagline ||
    settings?.supportingMessage ||
    'Learn • Excel • Achieve';

  // Fetch available states once with caching
  useEffect(() => {
    let isMounted = true;
    const fetchStates = async () => {
      try {
        const res = await courseService.getAvailableStates();
        if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
          cachedAvailableStates = res.data;
          setAvailableStates(res.data);
        }
      } catch (err) {
        // Fallback pre-populated in initial state
      }
    };
    fetchStates();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch courses whenever selectedState changes (with SWR caching)
  useEffect(() => {
    let isMounted = true;

    // Check if we have cached courses for this state to show instantly
    const cached = getInitialCachedCourses(selectedState);
    if (cached.length > 0) {
      setCourses(cached);
      setCoursesLoading(false);
    } else {
      setCoursesLoading(true);
    }

    const fetchCourses = async () => {
      try {
        const params = { limit: 100 };
        if (selectedState && selectedState !== 'ALL' && selectedState !== 'All India') {
          params.state = selectedState;
        }
        const res = await courseService.getCourses(params);
        if (isMounted && res?.success) {
          let list = Array.isArray(res.data?.courses)
            ? res.data.courses
            : Array.isArray(res.data)
            ? res.data
            : [];

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
          try {
            sessionStorage.setItem(`ranvi_courses_${selectedState || 'all'}`, JSON.stringify(list));
          } catch (e) {}
        }
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        if (isMounted) {
          setCoursesLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [selectedState]);

  // ----------------------------------------------------
  // 2. MEMOIZED COURSE CATEGORIZATION & UTILITIES
  // ----------------------------------------------------
  const bankersCourses = useMemo(
    () => courses.filter((c) => c.division === 'BANKERS_PATH'),
    [courses]
  );
  const competitiveCourses = useMemo(
    () => courses.filter((c) => c.division === 'COMPETITIVE_EXAMS'),
    [courses]
  );
  const entranceCourses = useMemo(
    () => courses.filter((c) => c.division === 'ENTRANCE_EXAMS'),
    [courses]
  );

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



  // 4 Action Hub Cards Config (Dynamic from Site Settings if configured)
  const defaultActionCards = [
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

  const actionCards =
    Array.isArray(settings?.actionCards) && settings.actionCards.length === 4
      ? settings.actionCards.map((card, idx) => ({
          ...defaultActionCards[idx],
          title: card.title || defaultActionCards[idx].title,
          subtitle: card.subtitle || defaultActionCards[idx].subtitle,
          path: card.path || card.link || defaultActionCards[idx].path,
          bgColor: card.bgColor || defaultActionCards[idx].bgColor,
          icon: defaultActionCards[idx].icon,
        }))
      : defaultActionCards;

  // 4 Learn with a Clear Plan Feature Cards Config (Dynamic from Settings)
  const defaultPlanFeatures = [
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

  const planFeatures =
    Array.isArray(settings?.clearPlanSection?.features) &&
    settings.clearPlanSection.features.length === 4
      ? settings.clearPlanSection.features.map((f, idx) => ({
          ...defaultPlanFeatures[idx],
          title: f.title || defaultPlanFeatures[idx].title,
          desc: f.desc || defaultPlanFeatures[idx].desc,
        }))
      : defaultPlanFeatures;

  // 3 Roadmap Steps Config (Dynamic from Settings)
  const defaultRoadmapSteps = [
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

  const roadmapSteps =
    Array.isArray(settings?.roadmapSection?.steps) &&
    settings.roadmapSection.steps.length === 3
      ? settings.roadmapSection.steps.map((s, idx) => ({
          ...defaultRoadmapSteps[idx],
          step: s.step || defaultRoadmapSteps[idx].step,
          title: s.title || defaultRoadmapSteps[idx].title,
          desc: s.desc || defaultRoadmapSteps[idx].desc,
        }))
      : defaultRoadmapSteps;

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 bg-[#F8FAFC] overflow-x-hidden">
      {/* ========================================================
          HERO BANNER: STATIC DESIGN MATCHING REFERENCE (FIXED IMAGE)
      ======================================================== */}
      <section className="relative w-full overflow-hidden bg-[#081A36] text-white shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-banner.png"
            alt="Ranvi Institutions Hero"
            onError={(e) => {
              e.currentTarget.src = '/hero-banner.png';
            }}
            className="w-full h-full object-cover object-right scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081A36] via-[#081A36]/95 via-40% to-transparent sm:via-[#081A36]/90 sm:via-48% lg:via-[#081A36]/80 lg:via-55%"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-12 pb-10 sm:pb-14">
          <div className="max-w-[30vh] sm:max-w-xl text-left space-y-5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-[1.15] text-white drop-shadow-md">
              {heroHeadlinePrefix}{' '}
              <span className="text-[#F4B942]">{heroHeadlineHighlight}</span>
              {heroHeadlineSuffix ? ` ${heroHeadlineSuffix}` : ''}
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

        <div className="w-full bg-[#F4B942] py-2 px-4 shadow-md relative z-20 text-center">
          <span className="text-[#0B1E3D] font-black text-xs sm:text-sm tracking-widest uppercase font-heading">
            {bannerStripTagline}
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
          title={settings?.bankersPathSection?.title || "Banker's Path"}
          subtitle={settings?.bankersPathSection?.subtitle || "Banking • Insurance • Finance"}
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
          title={settings?.competitiveExamsSection?.title || settings?.competitiveSection?.title || "Competitive Exams"}
          subtitle={settings?.competitiveExamsSection?.subtitle || settings?.competitiveSection?.subtitle || "Government Jobs • Banking • Railways • Defence & More"}
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
          title={settings?.entranceExamsSection?.title || "Entrance Exams"}
          subtitle={settings?.entranceExamsSection?.subtitle || "Engineering • Medical • Central Universities & State CETs"}
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
                {settings?.clearPlanSection?.badge || 'PREPARE WITH STRUCTURED METHODOLOGY'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2545] font-serif tracking-tight mt-0.5">
                {settings?.clearPlanSection?.title || 'Learn with a Clear Plan'}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {settings?.clearPlanSection?.description ||
                  'Follow our proven, step-by-step methodology to crack your exams with confidence.'}
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
