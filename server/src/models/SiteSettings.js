const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'global_settings',
    unique: true,
  },
  institutionName: {
    type: String,
    default: 'RANVI INSTITUTIONS',
  },
  tagline: {
    type: String,
    default: 'Your Next Career Milestones',
  },
  supportingMessage: {
    type: String,
    default: 'Learn • Excel • Achieve',
  },
  topAnnouncement: {
    badgeText: { type: String, default: 'Admissions Open 2026' },
    message: { type: String, default: 'New Batches for JAIIB, CAIIB, IBPS PO & SBI PO starting this week!' },
    phone: { type: String, default: '+91 98765 43210' },
    isActive: { type: Boolean, default: true },
  },
  heroBanner: {
    badgeText: { type: String, default: "India's Premier Coaching for Banking & Government Exams" },
    headline: { type: String, default: 'Build Your Banking & Government Career with Us' },
    highlightWord: { type: String, default: 'Banking & Government' },
    heroImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
    },
    headlinePrefix: { type: String, default: 'Build Your' },
    headlineHighlight: { type: String, default: 'Banking & Government' },
    headlineSuffix: { type: String, default: 'Career with Us' },
    subheadline: {
      type: String,
      default: 'Expert-led coaching, live interactive Zoom classes, high-yield study material, and 10–20 real-pattern online mock tests to help you achieve your next career milestone.',
    },
    primaryCtaText: { type: String, default: "Explore Banker's Path" },
    primaryCtaLink: { type: String, default: '/bankers-path' },
    secondaryCtaText: { type: String, default: 'Book Free Demo' },
    secondaryCtaLink: { type: String, default: '/enquiry' },
    heroImageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
    },
    benefits: [{
      icon: { type: String, default: 'ShieldCheck' },
      title: { type: String, default: 'Expert Faculty' },
    }],
    floatingCard: {
      tag: { type: String, default: 'JAIIB / CAIIB' },
      metric: { type: String, default: '89.4% 1st-Attempt Pass' },
      active: { type: Boolean, default: true },
    },
    booksBadge: {
      tag: { type: String, default: 'Banking • Current Affairs • GA' },
      title: { type: String, default: '100% Exam-Aligned Study Modules' },
      buttonText: { type: String, default: 'Try Free' },
      buttonLink: { type: String, default: '/mock-tests' },
    },
  },
  bannerStripText: {
    type: String,
    default: 'Learn • Excel • Achieve',
  },
  bankersPathSection: {
    title: { type: String, default: "Banker's Path" },
    subtitle: { type: String, default: 'Banking • Insurance • Finance Career Programs' },
    buttonText: { type: String, default: 'View All' },
    buttonLink: { type: String, default: '/bankers-path' },
    tiles: [{
      name: { type: String, required: true },
      path: { type: String, required: true },
      bgGradient: { type: String, default: 'from-[#0B63C5] to-[#084E9E]' },
      subtitle: { type: String, default: '' },
    }],
  },
  competitiveExamsSection: {
    title: { type: String, default: 'All Competitive Exams Coaching' },
    subtitle: { type: String, default: 'Government Jobs • Banking • Railways • Insurance • Defence & More' },
    buttonText: { type: String, default: 'View All' },
    buttonLink: { type: String, default: '/competitive-exams' },
    tiles: [{
      name: { type: String, required: true },
      path: { type: String, required: true },
      bgGradient: { type: String, default: 'from-[#0284C7] to-[#0369A1]' },
    }],
  },
  actionCards: [{
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    link: { type: String, required: true },
    colorType: { type: String, default: 'blue' }, // blue, green, pink, amber
    icon: { type: String, default: 'MonitorPlay' },
  }],
  zoomSection: {
    badge: { type: String, default: 'Live Interactive Zoom Batches' },
    title: { type: String, default: 'Learn Live with Senior Ex-Bankers & Master Faculty' },
    description: {
      type: String,
      default: 'Direct two-way interaction, live doubt clearing, formula revisions, and real-time case studies. Every live session is recorded and uploaded to your student portal within 2 hours.',
    },
    scheduleCtaText: { type: String, default: 'View Live Batch Schedule' },
    scheduleCtaLink: { type: String, default: '/online-classes' },
    demoCtaText: { type: String, default: 'Book Free Live Demo' },
    demoCtaLink: { type: String, default: '/enquiry' },
    previewImageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    },
    sampleTopic: { type: String, default: 'JAIIB: Principles & Practices of Banking (PPB)' },
    sampleFaculty: { type: String, default: 'Dr. Rajesh Sharma • 140+ Active Bankers Connected' },
  },
  modelPapersSection: {
    badge: { type: String, default: 'Online CBT Examination Engine' },
    title: { type: String, default: 'Attempt 10–20 Real Pattern Online Mock Tests' },
    description: {
      type: String,
      default: 'Experience the identical interface of IIBF & IBPS computer-based tests. Complete with countdown timer, autosave, negative marking calculation, question palette, and detailed step-by-step explanations for every question.',
    },
    demoTitle: { type: String, default: 'Paper 01 Free Demo' },
    demoDesc: { type: String, default: 'Instant score report, accuracy breakdown, and national percentile benchmark.' },
    demoButtonText: { type: String, default: 'Start Free Demo Test Now' },
  },
  learningMethodology: {
    badge: { type: String, default: 'Proven Learning Roadmap' },
    title: { type: String, default: 'How Our Preparation Works' },
    subtitle: { type: String, default: 'Engineered for guaranteed 1st-attempt clearing with structured milestones.' },
    steps: [{
      step: { type: String, default: '01' },
      title: { type: String, default: 'Learn' },
      desc: { type: String, default: 'Concept clarity from veteran bankers' },
    }],
  },
  aboutSection: {
    legacyTitle: { type: String, default: 'Shaping India’s Next Generation of Banking Leaders & Public Servants' },
    legacyText1: {
      type: String,
      default: 'Founded by veteran bankers and educationists, Ranvi Institutions stands at the forefront of career development for banking employees and competitive recruitment aspirants.',
    },
    legacyText2: {
      type: String,
      default: 'We specialize in IIBF-accredited certifications (JAIIB, CAIIB, DBF, DTM) and premier government examinations (IBPS PO/Clerk, SBI PO, RBI Grade B, SSC CGL, Railways). Our pedagogical model pairs conceptual mastery with rigorous computer-based exam simulations.',
    },
    stats: [{
      label: { type: String, default: 'Students Trained' },
      value: { type: String, default: '25,000+' },
    }],
    missionText: {
      type: String,
      default: 'To deliver accessible, result-driven, and ethically grounded coaching that empowers every banking professional and competitive exam aspirant to achieve their highest career milestones with confidence and conceptual clarity.',
    },
    visionText: {
      type: String,
      default: 'To be recognized as India’s most trusted educational institution for professional banking certifications and government recruitment, setting the standard for quality pedagogy and student success rates.',
    },
    advantages: [{
      title: { type: String, required: true },
      desc: { type: String, required: true },
    }],
  },
  testimonials: [{
    name: { type: String, required: true },
    designation: { type: String, required: true },
    exam: { type: String, required: true },
    quote: { type: String, required: true },
    image: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
    stars: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: true },
  }],
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
  }],
  contactInfo: {
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'admissions@ranviinstitutions.com' },
    whatsapp: { type: String, default: '+91 98765 43210' },
    address: { type: String, default: 'Ranvi Knowledge Tower, MG Road Coaching Hub, India' },
    workingHours: { type: String, default: 'Mon - Sat: 8:00 AM - 8:00 PM' },
    mapEmbedUrl: { type: String, default: '' },
  },
  socialLinks: {
    facebook: { type: String, default: 'https://facebook.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    youtube: { type: String, default: 'https://youtube.com' },
    telegram: { type: String, default: 'https://telegram.org' },
    linkedin: { type: String, default: 'https://linkedin.com' },
  },
  finalCtaBanner: {
    title: { type: String, default: 'Ready to Achieve Your Next Career Milestone?' },
    description: { type: String, default: 'Join thousands of successful banking employees and competitive exam aspirants who cleared their exams with Ranvi Institutions.' },
    primaryBtnText: { type: String, default: "Explore Banker's Path Courses" },
    primaryBtnLink: { type: String, default: '/bankers-path' },
    secondaryBtnText: { type: String, default: 'Speak with a Counselor' },
    secondaryBtnLink: { type: String, default: '/enquiry' },
  },
}, {
  timestamps: true,
  strict: false,
});

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
