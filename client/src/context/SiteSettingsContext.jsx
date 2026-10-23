import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services';
import { useRealtimeEvent } from './SocketContext';

const defaultSiteSettings = {
  institutionName: 'RANVI INSTITUTIONS',
  tagline: 'Your Next Career Milestones',
  supportingMessage: 'Learn • Excel • Achieve',
  bannerStripText: 'Learn • Excel • Achieve',
  topAnnouncement: {
    badgeText: 'Admissions Open 2026',
    message: 'New Batches for JAIIB, CAIIB, IBPS PO & SBI PO starting this week!',
    phone: '+91 98765 43210',
    isActive: true,
  },
  contactInfo: {
    address: 'Ranvi Knowledge Tower, MG Road Coaching Hub, India',
    phone: '+91 98765 43210',
    email: 'admissions@ranviinstitutions.com',
    workingHours: 'Mon - Sat: 8:00 AM - 8:00 PM',
    whatsapp: '+91 98765 43210',
  },
  socialLinks: {
    whatsapp: 'https://wa.me/919876543210',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    telegram: 'https://telegram.org',
  },
  heroBanner: {
    badgeText: "India's Premier Coaching for Banking & Government Exams",
    headline: 'Build Your Banking & Government Career with Us',
    highlightWord: 'Banking & Government',
    headlinePrefix: 'Build Your',
    headlineHighlight: 'Banking & Government',
    headlineSuffix: 'Career with Us',
    subheadline:
      'Expert-led coaching, live interactive Zoom classes, high-yield study material, and 10–20 real-pattern online mock tests to help you achieve your next career milestone.',
    primaryCtaText: "Explore Banker's Path",
    primaryCtaLink: '/bankers-path',
    secondaryCtaText: 'Book Free Demo',
    secondaryCtaLink: '/enquiry',
    heroImage: '/assets/hero-banner.png',
  },
  bankersPathSection: {
    title: "Banker's Path",
    subtitle: 'Banking • Insurance • Finance',
  },
  competitiveExamsSection: {
    title: 'Competitive Exams',
    subtitle: 'Government Jobs • Banking • Railways • Defence & More',
  },
  entranceExamsSection: {
    title: 'Entrance Exams',
    subtitle: 'Engineering • Medical • Central Universities & State CETs',
  },
  actionCards: [
    {
      title: 'Enquiry & Demo',
      subtitle: 'Join our free demo classes',
      path: '/enquiry',
      bgColor: '#0080FF',
      icon: 'Mail',
    },
    {
      title: 'Materials',
      subtitle: 'Get study notes',
      path: '/recorded-classes',
      bgColor: '#FF8C00',
      icon: 'FileText',
    },
    {
      title: 'Classes',
      subtitle: 'Live & Recorded',
      path: '/online-classes',
      bgColor: '#00C853',
      icon: 'MonitorPlay',
    },
    {
      title: 'Exams',
      subtitle: 'Mock tests & Online tests',
      path: '/mock-tests',
      bgColor: '#9B51E0',
      icon: 'ClipboardList',
    },
  ],
  clearPlanSection: {
    badge: 'PREPARE WITH STRUCTURED METHODOLOGY',
    title: 'Learn with a Clear Plan',
    description: 'Focus on what matters most with our structured approach that turns aspirants into achievers.',
    features: [
      {
        title: 'Daily Planner',
        desc: 'Structured daily schedule to cover complete syllabus on time.',
        icon: 'FileText',
      },
      {
        title: 'Classes',
        desc: 'Interactive live & high quality recorded video lectures.',
        icon: 'MonitorPlay',
      },
      {
        title: 'Practice Exams',
        desc: 'Chapter-wise quizzes and full-length online mock tests.',
        icon: 'ClipboardList',
      },
      {
        title: 'Expert Guidance',
        desc: 'Doubt sessions and personal mentoring by retired bankers & rankers.',
        icon: 'Users',
      },
    ],
  },
  roadmapSection: {
    title: 'Roadmap',
    steps: [
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
    ],
  },
  demoPolicy: {
    freeRecordedLessonsLimit: 2,
    freeMockTestsLimit: 1,
  },
};

const SiteSettingsContext = createContext(null);

const getInitialSiteSettings = () => {
  try {
    if (typeof window !== 'undefined') {
      const raw = sessionStorage.getItem('ranvi_site_settings');
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...defaultSiteSettings,
          ...parsed,
          heroBanner: { ...defaultSiteSettings.heroBanner, ...(parsed.heroBanner || {}) },
          contactInfo: { ...defaultSiteSettings.contactInfo, ...(parsed.contactInfo || {}) },
          socialLinks: { ...defaultSiteSettings.socialLinks, ...(parsed.socialLinks || {}) },
          topAnnouncement: { ...defaultSiteSettings.topAnnouncement, ...(parsed.topAnnouncement || {}) },
          bankersPathSection: { ...defaultSiteSettings.bankersPathSection, ...(parsed.bankersPathSection || {}) },
          competitiveExamsSection: { ...defaultSiteSettings.competitiveExamsSection, ...(parsed.competitiveExamsSection || parsed.competitiveSection || {}) },
          entranceExamsSection: { ...defaultSiteSettings.entranceExamsSection, ...(parsed.entranceExamsSection || {}) },
          clearPlanSection: { ...defaultSiteSettings.clearPlanSection, ...(parsed.clearPlanSection || {}) },
          roadmapSection: { ...defaultSiteSettings.roadmapSection, ...(parsed.roadmapSection || {}) },
          demoPolicy: { ...defaultSiteSettings.demoPolicy, ...(parsed.demoPolicy || {}) },
        };
      }
    }
  } catch (e) {}
  return defaultSiteSettings;
};

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(getInitialSiteSettings);
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('ranvi_site_settings');
    } catch (e) {
      return true;
    }
  });

  const fetchSettings = async () => {
    try {
      const res = await adminService.getSiteSettings();
      if (res.success && res.data) {
        const merged = {
          ...defaultSiteSettings,
          ...res.data,
          heroBanner: {
            ...defaultSiteSettings.heroBanner,
            ...(res.data.heroBanner || {}),
          },
          contactInfo: {
            ...defaultSiteSettings.contactInfo,
            ...(res.data.contactInfo || {}),
          },
          socialLinks: {
            ...defaultSiteSettings.socialLinks,
            ...(res.data.socialLinks || {}),
          },
          topAnnouncement: {
            ...defaultSiteSettings.topAnnouncement,
            ...(res.data.topAnnouncement || {}),
          },
          bankersPathSection: {
            ...defaultSiteSettings.bankersPathSection,
            ...(res.data.bankersPathSection || {}),
          },
          competitiveExamsSection: {
            ...defaultSiteSettings.competitiveExamsSection,
            ...(res.data.competitiveExamsSection || res.data.competitiveSection || {}),
          },
          entranceExamsSection: {
            ...defaultSiteSettings.entranceExamsSection,
            ...(res.data.entranceExamsSection || {}),
          },
          clearPlanSection: {
            ...defaultSiteSettings.clearPlanSection,
            ...(res.data.clearPlanSection || {}),
          },
          roadmapSection: {
            ...defaultSiteSettings.roadmapSection,
            ...(res.data.roadmapSection || {}),
          },
          demoPolicy: {
            ...defaultSiteSettings.demoPolicy,
            ...(res.data.demoPolicy || {}),
          },
        };
        setSettings(merged);
        try {
          sessionStorage.setItem('ranvi_site_settings', JSON.stringify(res.data));
        } catch (e) {}
      }
    } catch (err) {
      console.error('Failed to load global site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useRealtimeEvent('announcement:updated', () => {
    fetchSettings();
  });

  const updateGlobalSettings = async (newData) => {
    try {
      const res = await adminService.updateSiteSettings(newData);
      if (res.success && res.data) {
        setSettings({ ...defaultSiteSettings, ...res.data });
        return res.data;
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
        updateGlobalSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
