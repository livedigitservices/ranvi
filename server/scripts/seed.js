const mongoose = require('mongoose');
const User = require('../src/models/User');
const Category = require('../src/models/Category');
const Course = require('../src/models/Course');
const Lesson = require('../src/models/Lesson');
const LiveClass = require('../src/models/LiveClass');
const MockTest = require('../src/models/MockTest');
const Question = require('../src/models/Question');
const Faculty = require('../src/models/Faculty');
const SiteSettings = require('../src/models/SiteSettings');
const EntranceExam = require('../src/models/EntranceExam');
const DeviceSession = require('../src/models/DeviceSession');
const Order = require('../src/models/Order');
const Payment = require('../src/models/Payment');
const Entitlement = require('../src/models/Entitlement');
const Enquiry = require('../src/models/Enquiry');
const ExamAttempt = require('../src/models/ExamAttempt');
const { DEFAULT_ENTRANCE_EXAMS } = require('../src/controllers/entranceExamController');
const { connectDB } = require('../src/config/db');

const seedAll = async () => {
  try {
    console.log('[Seeder] Connecting to database...');
    await connectDB();

    console.log('[Seeder] Clearing previous collections...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await LiveClass.deleteMany({});
    await MockTest.deleteMany({});
    await Question.deleteMany({});
    await Faculty.deleteMany({});
    await SiteSettings.deleteMany({});
    await EntranceExam.deleteMany({});
    await DeviceSession.deleteMany({});
    await Order.deleteMany({});
    await Payment.deleteMany({});
    await Entitlement.deleteMany({});
    await Enquiry.deleteMany({});
    await ExamAttempt.deleteMany({});

    console.log('[Seeder] 1. Creating Users...');
    const superAdminPassword = await User.hashPassword('RanviAdmin@2026!');
    const facultyPassword = await User.hashPassword('RanviFaculty@2026!');
    const studentPassword = await User.hashPassword('RanviStudent@2026!');

    const superAdmin = await User.create({
      name: 'Ranvi Super Admin',
      email: 'admin@ranviinstitutions.com',
      phone: '9876543210',
      passwordHash: superAdminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    });

    const facultyUser = await User.create({
      name: 'Dr. Rajesh Sharma (Ex-AGM SBI)',
      email: 'faculty.rajesh@ranviinstitutions.com',
      phone: '9876543211',
      passwordHash: facultyPassword,
      role: 'FACULTY',
      isActive: true,
    });

    const student = await User.create({
      name: 'Aditya Verma',
      email: 'student@ranviinstitutions.com',
      phone: '9876543212',
      passwordHash: studentPassword,
      role: 'STUDENT',
      targetExam: 'JAIIB & SBI PO',
      isActive: true,
    });

    console.log('[Seeder] 2. Creating Faculty Profiles...');
    const facultyData = [
      {
        name: 'Dr. Rajesh Sharma',
        designation: 'Chief Academic Director & Banking Mentor',
        qualifications: 'Ph.D. in Banking & Finance, M.Com, CAIIB',
        experience: 'Ex-General Manager, State Bank of India • 28+ Yrs Exp',
        experienceYears: 28,
        bio: 'Senior banking trainer and author of multiple JAIIB & CAIIB preparatory handbooks. Dedicated to imparting practical bank operational knowledge.',
        specialization: 'JAIIB / CAIIB, Banking Law & Financial Management',
        subjects: ['Principles & Practices of Banking (PPB)', 'Indian Economy & IFS', 'Accounting & Financial Management (AFM)'],
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
        email: 'rajesh.sharma@ranviinstitutions.com',
        phone: '+91 98765 43211',
        rating: 4.9,
        studentsTrained: '15,000+',
        displayOrder: 1,
        isFeatured: true,
        isActive: true,
      },
      {
        name: 'Prof. Ananya Sen',
        designation: 'Senior Faculty - Quantitative Aptitude & DI',
        qualifications: 'M.Sc. Mathematics, Certified Aptitude Trainer',
        experience: 'Ex-IBPS Chief Trainer • 14+ Yrs Teaching',
        experienceYears: 14,
        bio: 'Specialist in Vedic mathematics and high-speed data interpretation. Has trained thousands of aspirants who secured top ranks in SBI and IBPS exams.',
        specialization: 'Speed Math, Data Interpretation, Logical Reasoning',
        subjects: ['Quantitative Aptitude', 'Data Interpretation (DI)', 'Analytical Puzzles'],
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
        email: 'ananya.sen@ranviinstitutions.com',
        rating: 4.9,
        studentsTrained: '12,000+',
        displayOrder: 2,
        isFeatured: true,
        isActive: true,
      },
      {
        name: 'Vikas Deshmukh (CA, CFA)',
        designation: 'Head of Treasury & Investment Banking Programs',
        qualifications: 'Chartered Accountant (ICAI), CFA Charterholder',
        experience: 'Ex-Treasury Head, Punjab National Bank • 19+ Yrs Exp',
        experienceYears: 19,
        bio: 'Expert in money markets, derivatives, foreign exchange operations, and regulatory capital requirements under Basel III.',
        specialization: 'Treasury Management (DTM), NISM, AMFI & Forex',
        subjects: ['Diploma in Treasury Management (DTM)', 'NISM Modules', 'AMFI Mutual Funds'],
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        email: 'vikas.deshmukh@ranviinstitutions.com',
        rating: 4.8,
        studentsTrained: '8,500+',
        displayOrder: 3,
        isFeatured: true,
        isActive: true,
      },
      {
        name: 'Shri Arvind Narayanan',
        designation: 'Lead Faculty - Advanced Risk & Regulations',
        qualifications: 'M.Sc., CAIIB, Former Chief Manager',
        experience: 'Ex-Chief Manager, PNB • 24+ Yrs Exp',
        experienceYears: 24,
        bio: 'Specialist in Bank Financial Management (BFM), SARFAESI Act, and Insolvency & Bankruptcy Code provisions.',
        specialization: 'CAIIB (BFM & ABM), Banking Regulations',
        subjects: ['Bank Financial Management (BFM)', 'Banking Regulations & Business Laws'],
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        email: 'arvind.n@ranviinstitutions.com',
        rating: 4.9,
        studentsTrained: '9,000+',
        displayOrder: 4,
        isFeatured: true,
        isActive: true,
      },
    ];

    await Faculty.insertMany(facultyData);

    console.log('[Seeder] 3. Creating Course Categories...');
    const categoriesData = [
      // Banker's Path
      { name: 'JAIIB', slug: 'jaiib', division: 'BANKERS_PATH', icon: 'Landmark', color: '#1769D2', description: 'Junior Associate of Indian Institute of Bankers certification coaching' },
      { name: 'CAIIB', slug: 'caiib', division: 'BANKERS_PATH', icon: 'Award', color: '#12356B', description: 'Certified Associate of Indian Institute of Bankers advanced certification' },
      { name: 'DBF', slug: 'dbf', division: 'BANKERS_PATH', icon: 'BookOpen', color: '#0284C7', description: 'Diploma in Banking & Finance for bank aspirants' },
      { name: 'DTM', slug: 'dtm', division: 'BANKERS_PATH', icon: 'TrendingUp', color: '#0D9488', description: 'Diploma in Treasury, Investment & Risk Management' },
      { name: 'AMFI / Mutual Fund', slug: 'amfi', division: 'BANKERS_PATH', icon: 'PieChart', color: '#7C3AED', description: 'Association of Mutual Funds in India Certification' },
      { name: 'NISM (SEBI)', slug: 'nism', division: 'BANKERS_PATH', icon: 'ShieldCheck', color: '#EA580C', description: 'National Institute of Securities Markets SEBI certifications' },
      { name: 'IRDAI', slug: 'irdai', division: 'BANKERS_PATH', icon: 'Shield', color: '#16A34A', description: 'Insurance Regulatory and Development Authority certifications' },
      { name: 'DRA', slug: 'dra', division: 'BANKERS_PATH', icon: 'Briefcase', color: '#4F46E5', description: 'Debt Recovery Agent certification preparation' },

      // Competitive Exams
      { name: 'Banking Exams (IBPS / SBI / RBI)', slug: 'banking-recruitment', division: 'COMPETITIVE_EXAMS', icon: 'Building2', color: '#1769D2', description: 'IBPS PO/Clerk/RRB, SBI PO/Clerk, RBI Grade B & Assistant' },
      { name: 'Government & SSC Exams', slug: 'ssc-government', division: 'COMPETITIVE_EXAMS', icon: 'FileText', color: '#0284C7', description: 'SSC CGL, CHSL, MTS, and State Government examinations' },
      { name: 'Railways Recruitment (RRB)', slug: 'railways-rrb', division: 'COMPETITIVE_EXAMS', icon: 'Train', color: '#D97706', description: 'RRB NTPC, Group D, ALP, and Technical positions' },
      { name: 'Insurance Examinations', slug: 'insurance-exams', division: 'COMPETITIVE_EXAMS', icon: 'Umbrella', color: '#059669', description: 'LIC AAO/ADO, NIACL, GIC, and other insurance recruitments' },
      { name: 'Police & Defence', slug: 'police-defence', division: 'COMPETITIVE_EXAMS', icon: 'ShieldAlert', color: '#DC2626', description: 'State Police, SI, Constable, CDS, AFCAT, and CAPF' },
      { name: 'Teaching & State Exams', slug: 'teaching-state', division: 'COMPETITIVE_EXAMS', icon: 'GraduationCap', color: '#9333EA', description: 'CTET, State TET, DSSSB, and state public service exams' },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    const catMap = new Map(createdCategories.map(c => [c.slug, c._id]));

    console.log('[Seeder] 4. Creating Flagship Courses...');
    const coursesData = [
      {
        title: 'JAIIB Master Certification Program 2026',
        slug: 'jaiib-master-class-2026',
        division: 'BANKERS_PATH',
        categoryId: catMap.get('jaiib'),
        shortDescription: 'Comprehensive preparation for all 4 papers of JAIIB with live classes, recorded concepts, formula sheets, and 20+ full-length model papers.',
        fullDescription: 'The JAIIB (Junior Associate of Indian Institute of Bankers) exam is an essential milestone for banking professionals seeking career promotion and salary increments. Our master program is led by seasoned ex-bank executives and financial subject specialists.\n\nCovering Indian Economy & IFS, Principles & Practices of Banking, AFM, and Retail Banking & Wealth Management.',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
        mode: 'BOTH',
        duration: '4 Months',
        batchSchedule: 'Daily Live 7:30 PM - 9:00 PM & Weekend Special Sessions',
        fee: 3999,
        originalPrice: 6999,
        validityDays: 180,
        isDemoEligible: true,
        demoLessonsCount: 2,
        demoExamsCount: 1,
        isFeatured: true,
        enrolledStudentsCount: 420,
        learningObjectives: [
          'Master all 4 revised subjects of the IIBF JAIIB syllabus thoroughly.',
          'Solve 2000+ case-study oriented practice MCQs with detailed explanations.',
          'Learn practical banking accounting, financial ratios, and retail banking formulas.',
          'Clear all 4 papers in your first attempt with structured guidance.',
        ],
        syllabus: [
          {
            title: 'Paper 1: Indian Economy & Indian Financial System',
            description: 'Foundations of Indian economy, banking structure, RBI monetary policy, and financial markets.',
            topics: ['Economic Architecture & Reforms', 'Financial Regulators (RBI, SEBI, IRDAI)', 'Monetary Policy Framework', 'Money & Capital Markets'],
          },
          {
            title: 'Paper 2: Principles & Practices of Banking',
            description: 'Core banking operations, credit management, ethics, technology, and compliance.',
            topics: ['Banker-Customer Relationship', 'Operational Guidelines & KYC/AML', 'Lending Norms & Priority Sector Lending', 'Digital Banking Innovations'],
          },
          {
            title: 'Paper 3: Accounting & Financial Management for Bankers',
            description: 'Financial accounting standards, ratios, depreciation, and corporate balance sheet analysis.',
            topics: ['Accounting Principles & Standards', 'Depreciation & Ratio Analysis', 'Working Capital Assessment', 'Company Accounts & Forex'],
          },
          {
            title: 'Paper 4: Retail Banking & Wealth Management',
            description: 'Retail products, home/auto loans, wealth advisory, customer relationship, and recovery management.',
            topics: ['Retail Asset & Liability Products', 'Wealth Management Services', 'Mortgage & Housing Finance', 'Securitization & Recovery'],
          },
        ],
        faculty: [
          { name: 'Dr. Rajesh Sharma', designation: 'Ex-AGM SBI (28+ Yrs Exp)', experience: '28+ Years', bio: 'Chief Academic Director & Banking Mentor.' },
          { name: 'Vikas Deshmukh (CA, CFA)', designation: 'Head of Treasury & Finance', experience: '19+ Years', bio: 'Specialist in Financial Accounting and Ratios.' },
        ],
        features: ['Live Interactive Zoom Classes', 'High-Yield Video Library', '20+ Full Mock Tests', 'Downloadable PDF Notes', 'Doubt Clearing Telegram Group'],
        faqs: [
          { question: 'Who is eligible for the JAIIB course?', answer: 'Any employee working in recognized commercial banks, regional rural banks, or cooperative financial institutions.' },
          { question: 'Can I watch classes on mobile?', answer: 'Yes, our platform is fully responsive and supports live Zoom sessions as well as recorded lessons on desktop and mobile.' },
        ],
      },
      {
        title: 'CAIIB Advanced Professional Comprehensive Batch',
        slug: 'caiib-advanced-comprehensive-batch',
        division: 'BANKERS_PATH',
        categoryId: catMap.get('caiib'),
        shortDescription: 'Advanced banking concepts, risk management, corporate finance, and balance sheet regulations for senior bankers.',
        fullDescription: 'CAIIB is the premier certification for senior bankers aiming for Scale-II, Scale-III, and executive promotions. This course delivers deep conceptual mastery of Advanced Bank Management (ABM), Bank Financial Management (BFM), and Advanced Business & Financial Management (ABFM).',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
        mode: 'BOTH',
        duration: '5 Months',
        batchSchedule: 'Evenings 8:30 PM - 10:00 PM & Sunday Marathons',
        fee: 4999,
        originalPrice: 8999,
        validityDays: 240,
        isDemoEligible: true,
        demoLessonsCount: 2,
        demoExamsCount: 1,
        isFeatured: true,
        enrolledStudentsCount: 295,
        learningObjectives: [
          'Gain complete clarity on Basel III norms, ALM, and treasury risk management.',
          'Solve complex numerical problems in Forex, Derivatives, and Advanced Statistics.',
          'Understand corporate credit appraisal and NPA resolution frameworks under IBC.',
        ],
        syllabus: [
          {
            title: 'Paper 1: Advanced Bank Management (ABM)',
            description: 'Economic analysis, business mathematics, HR management, and credit management.',
            topics: ['Macro & Micro Economics', 'Business Statistics & Probability', 'Human Resource Management in Banks', 'Credit Monitoring & Loan Syndication'],
          },
          {
            title: 'Paper 2: Bank Financial Management (BFM)',
            description: 'International banking, forex, treasury operations, and Basel III risk management.',
            topics: ['Foreign Exchange & Letter of Credit', 'Treasury & Derivatives', 'Risk Management Framework', 'Basel III Capital Regulations'],
          },
        ],
        faculty: [
          { name: 'Shri Arvind Narayanan', designation: 'Ex-Chief Manager, PNB', experience: '24+ Years', bio: 'Specialist in International Banking and Foreign Exchange Operations.' },
        ],
        features: ['Live Zoom Sessions', 'Case-Study Solving Modules', '20+ CAIIB Model Papers', 'Formula Summaries'],
      },
      {
        title: 'Comprehensive Banking Recruitment (IBPS PO/Clerk & SBI PO/Clerk)',
        slug: 'comprehensive-banking-recruitment-ibps-sbi',
        division: 'COMPETITIVE_EXAMS',
        categoryId: catMap.get('banking-recruitment'),
        shortDescription: 'All-in-one foundation-to-advanced program for IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, and RBI Assistant exams.',
        fullDescription: 'Prepare for India’s top banking recruitment exams with our rigorous curriculum covering Quantitative Aptitude, Reasoning Ability, English Language, Banking & Financial Awareness, and Computer Knowledge.',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
        mode: 'BOTH',
        duration: '6 Months',
        batchSchedule: 'Daily Live 9:00 AM - 12:00 PM or 6:00 PM - 9:00 PM',
        fee: 4499,
        originalPrice: 7999,
        validityDays: 365,
        isDemoEligible: true,
        demoLessonsCount: 2,
        demoExamsCount: 1,
        isFeatured: true,
        enrolledStudentsCount: 540,
        learningObjectives: [
          'Master speed-math shortcuts and high-level Data Interpretation.',
          'Solve advanced analytical and logical reasoning puzzles in under 3 minutes.',
          'Develop flawless grammar and reading comprehension speed.',
          'Cover 12 months of monthly banking and financial current affairs.',
        ],
        syllabus: [
          { title: 'Quantitative Aptitude', topics: ['Speed Calculation & Vedic Math', 'Data Interpretation (DI)', 'Arithmetic Word Problems', 'Number Series'] },
          { title: 'Reasoning Ability', topics: ['Seating Arrangement & Puzzles', 'Syllogism & Inequalities', 'Direction Sense & Blood Relations'] },
        ],
        faculty: [
          { name: 'Prof. Ananya Sen', designation: 'Head of Quant & DI', experience: '14+ Years', bio: 'Trained 12,000+ bank PO qualifiers.' },
        ],
        features: ['Daily Live Classes', 'Sectional & Full Mock Tests', 'Speed Practice Quizzes'],
      },
    ];

    const createdCourses = await Course.insertMany(coursesData);
    const jaiibCourse = createdCourses[0];
    const caiibCourse = createdCourses[1];
    const bankingCourse = createdCourses[2];

    console.log('[Seeder] 5. Creating Recorded Lessons with Demo Previews...');
    const lessonsData = [
      {
        courseId: jaiibCourse._id,
        moduleTitle: 'Module 1: Indian Financial Architecture',
        title: 'Introduction to Indian Economy & Financial Regulators',
        description: 'Comprehensive overview of RBI, SEBI, IRDAI and their statutory mandates in the banking system.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        durationMinutes: 45,
        sortOrder: 1,
        isPreview: true, // FREE DEMO
        studyMaterialUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        studyMaterialName: 'JAIIB_Module1_Overview_Notes.pdf',
      },
      {
        courseId: jaiibCourse._id,
        moduleTitle: 'Module 1: Indian Financial Architecture',
        title: 'Monetary Policy Committee (MPC) & Key Policy Rates',
        description: 'Deep-dive into Repo, Reverse Repo, SDF, MSF, and CRR/SLR liquidity mechanisms.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        durationMinutes: 52,
        sortOrder: 2,
        isPreview: true, // FREE DEMO
        studyMaterialUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        studyMaterialName: 'MPC_Policy_Rates_Formula_Sheet.pdf',
      },
      {
        courseId: jaiibCourse._id,
        moduleTitle: 'Module 2: Bank Accounting & AFM',
        title: 'Bank Accounting Principles & Balance Sheet Structure',
        description: 'Preparation of bank financial statements, Schedule 1 to 18, and asset categorization.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        durationMinutes: 58,
        sortOrder: 3,
        isPreview: false, // PAID
        studyMaterialUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        studyMaterialName: 'Bank_Accounting_Schedule_Guide.pdf',
      },
      {
        courseId: jaiibCourse._id,
        moduleTitle: 'Module 3: Retail Banking & Wealth Management',
        title: 'Retail Lending Products & Digital Banking Delivery Channels',
        description: 'Home loans, auto loans, credit cards, UPI architecture, and wealth advisory services.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        durationMinutes: 48,
        sortOrder: 4,
        isPreview: false, // PAID
        studyMaterialName: 'Retail_Banking_Master_Notes.pdf',
      },
      {
        courseId: bankingCourse._id,
        moduleTitle: 'Module 1: Speed Mathematics',
        title: 'Vedic Math Shortcuts & Percentage Approximations',
        description: 'Learn instant calculations, square roots, cube roots, and fast percentage splits.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        durationMinutes: 40,
        sortOrder: 1,
        isPreview: true, // FREE DEMO
        studyMaterialName: 'Speed_Math_Tricks.pdf',
      },
    ];

    await Lesson.insertMany(lessonsData);

    console.log('[Seeder] 6. Creating Zoom Live Classes...');
    const liveClassesData = [
      {
        title: 'JAIIB Paper 1 - Live Doubts & Revision Masterclass',
        courseId: jaiibCourse._id,
        subject: 'Indian Economy & IFS',
        batchName: 'JAIIB Evening Batch 2026',
        facultyName: 'Dr. Rajesh Sharma (Ex-AGM SBI)',
        scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        startTime: '19:30',
        durationMinutes: 75,
        zoomMeetingUrl: 'https://us04web.zoom.us/j/84291823910?pwd=RanviLiveClass2026',
        zoomMeetingId: '842 9182 3910',
        zoomPasscode: 'RANVI26',
        status: 'SCHEDULED',
        isPublished: true,
      },
      {
        title: 'Banking PO - High Level Caselet DI & Arithmetic Marathon',
        courseId: bankingCourse._id,
        subject: 'Quantitative Aptitude',
        batchName: 'PO Target Batch',
        facultyName: 'Prof. Ananya Sen',
        scheduledDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
        startTime: '18:00',
        durationMinutes: 90,
        zoomMeetingUrl: 'https://us02web.zoom.us/j/91283746501?pwd=BankersTarget2026',
        zoomMeetingId: '912 8374 6501',
        zoomPasscode: 'BANK2026',
        status: 'SCHEDULED',
        isPublished: true,
      },
    ];

    await LiveClass.insertMany(liveClassesData);

    console.log('[Seeder] 7. Creating Mock Tests & Questions...');
    const mockTestsToCreate = [];
    for (let i = 1; i <= 10; i++) {
      mockTestsToCreate.push({
        title: `JAIIB 2026 Full Length Model Paper ${i < 10 ? '0' + i : i}`,
        slug: `jaiib-model-paper-${i < 10 ? '0' + i : i}`,
        paperNumber: i,
        courseId: jaiibCourse._id,
        division: 'BANKERS_PATH',
        description: `Full syllabus simulation for JAIIB 2026 covering IE&IFS, PPB, AFM, and RBWM as per latest IIBF exam pattern.`,
        durationMinutes: 60,
        totalMarks: 100,
        passMarks: 50,
        negativeMarkingPerQuestion: 0.25,
        marksPerQuestion: 1,
        isDemoFree: i === 1,
        price: i === 1 ? 0 : 499,
        totalQuestions: 10,
        isPublished: true,
      });
    }

    const createdMockTests = await MockTest.insertMany(mockTestsToCreate);

    const sampleQuestions = [
      {
        questionText: 'Under the Reserve Bank of India Act, 1934, what is the primary objective of the Monetary Policy Framework in India?',
        options: [
          { text: 'To maintain price stability while keeping in mind the objective of growth', isCorrect: true },
          { text: 'To maximize government borrowing without interest rate escalation', isCorrect: false },
          { text: 'To eliminate private commercial banks and enforce state monopoly', isCorrect: false },
          { text: 'To peg the Indian Rupee permanently to the US Dollar', isCorrect: false },
        ],
        explanation: 'Section 45ZB of the RBI Act states that the primary objective of monetary policy is to maintain price stability while keeping in mind the objective of growth.',
        subject: 'Indian Economy & IFS',
        topic: 'Monetary Policy',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'What is the minimum statutory Capital Adequacy Ratio (CAR) prescribed by RBI for Scheduled Commercial Banks under Basel III norms in India?',
        options: [
          { text: '8.0%', isCorrect: false },
          { text: '9.0%', isCorrect: true },
          { text: '11.5%', isCorrect: false },
          { text: '12.0%', isCorrect: false },
        ],
        explanation: 'RBI mandates a minimum Capital Adequacy Ratio of 9.0% for Indian Commercial Banks, plus a 2.5% Capital Conservation Buffer (CCB).',
        subject: 'Principles & Practices of Banking',
        topic: 'Basel III Regulations',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'Which accounting concept states that financial statements must assume an enterprise will continue operations for the foreseeable future?',
        options: [
          { text: 'Accrual Concept', isCorrect: false },
          { text: 'Going Concern Concept', isCorrect: true },
          { text: 'Money Measurement Concept', isCorrect: false },
          { text: 'Conservatism Principle', isCorrect: false },
        ],
        explanation: 'The Going Concern Concept presumes that the business entity will continue in operation for an indefinite period.',
        subject: 'Accounting & Financial Management',
        topic: 'Accounting Standards',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'Which schedule of the Banking Regulation Act, 1949 deals with "Advances" in the balance sheet format?',
        options: [
          { text: 'Schedule 7', isCorrect: false },
          { text: 'Schedule 8', isCorrect: false },
          { text: 'Schedule 9', isCorrect: true },
          { text: 'Schedule 10', isCorrect: false },
        ],
        explanation: 'Schedule 9 of the third schedule to the Banking Regulation Act specifically governs Advances (loans, cash credits, overdrafts).',
        subject: 'Accounting & Financial Management',
        topic: 'Bank Balance Sheet Schedules',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'Under the SARFAESI Act, 2002, what is the notice period given to a defaulting borrower before enforcing security interest?',
        options: [
          { text: '30 Days', isCorrect: false },
          { text: '45 Days', isCorrect: false },
          { text: '60 Days', isCorrect: true },
          { text: '90 Days', isCorrect: false },
        ],
        explanation: 'Section 13(2) of SARFAESI Act specifies a mandatory 60 days demand notice to the borrower.',
        subject: 'Principles & Practices of Banking',
        topic: 'SARFAESI Act 2002',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'What is the maximum limit of deposit insurance per depositor per bank provided by DICGC in India?',
        options: [
          { text: '₹1,00,000', isCorrect: false },
          { text: '₹2,00,000', isCorrect: false },
          { text: '₹5,00,000', isCorrect: true },
          { text: '₹10,00,000', isCorrect: false },
        ],
        explanation: 'DICGC insures principal and interest up to a maximum of ₹5 Lakhs per depositor in each insured bank.',
        subject: 'Indian Economy & IFS',
        topic: 'Deposit Insurance',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'Which regulatory authority oversees the National Pension System (NPS) in India?',
        options: [
          { text: 'IRDAI', isCorrect: false },
          { text: 'PFRDA', isCorrect: true },
          { text: 'SEBI', isCorrect: false },
          { text: 'RBI', isCorrect: false },
        ],
        explanation: 'PFRDA (Pension Fund Regulatory and Development Authority) regulates the National Pension System.',
        subject: 'Indian Economy & IFS',
        topic: 'Financial Regulators',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'What does the abbreviation "CASA" stand for in banking operations?',
        options: [
          { text: 'Credit and Savings Account', isCorrect: false },
          { text: 'Current Account and Savings Account', isCorrect: true },
          { text: 'Cash and Security Asset', isCorrect: false },
          { text: 'Centralized Automated Settlement Account', isCorrect: false },
        ],
        explanation: 'CASA represents low-cost Current and Savings deposits for banks.',
        subject: 'Principles & Practices of Banking',
        topic: 'Bank Deposits',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'In retail banking, what is the typical tenure for a Term Loan classified under Medium Term?',
        options: [
          { text: 'Up to 1 year', isCorrect: false },
          { text: '1 year to 5 years', isCorrect: true },
          { text: '5 years to 15 years', isCorrect: false },
          { text: 'Above 20 years', isCorrect: false },
        ],
        explanation: 'Medium-term loans generally range between 1 to 5 years in retail banking terminology.',
        subject: 'Retail Banking & Wealth Management',
        topic: 'Retail Loans',
        marks: 1,
        negativeMarks: 0.25,
      },
      {
        questionText: 'Which of the following is considered an unfunded credit facility provided by banks?',
        options: [
          { text: 'Cash Credit', isCorrect: false },
          { text: 'Letter of Credit (LC)', isCorrect: true },
          { text: 'Term Loan', isCorrect: false },
          { text: 'Overdraft', isCorrect: false },
        ],
        explanation: 'Letters of Credit and Bank Guarantees are non-fund based (unfunded) contingent credit facilities.',
        subject: 'Principles & Practices of Banking',
        topic: 'Credit Facilities',
        marks: 1,
        negativeMarks: 0.25,
      },
    ];

    for (const test of createdMockTests) {
      const qDocs = sampleQuestions.map((q, idx) => ({
        ...q,
        mockTestId: test._id,
        sortOrder: idx + 1,
      }));
      await Question.insertMany(qDocs);
      await MockTest.findByIdAndUpdate(test._id, { totalQuestions: qDocs.length });
    }

    console.log('[Seeder] 8. Creating Full Dynamic Site Settings...');
    await SiteSettings.create({
      key: 'global_settings',
      institutionName: 'RANVI INSTITUTIONS',
      tagline: 'Your Next Career Milestones',
      supportingMessage: 'Learn • Excel • Achieve',
      topAnnouncement: {
        badgeText: 'Admissions Open 2026',
        message: 'New Batches for JAIIB, CAIIB, IBPS PO & SBI PO starting this week!',
        phone: '+91 98765 43210',
        isActive: true,
      },
      heroBanner: {
        headlinePrefix: 'Build Your',
        headlineHighlight: 'Banking & Government',
        headlineSuffix: 'Career with Us',
        subheadline: 'Expert-led coaching, live interactive Zoom classes, high-yield study material, and 10–20 real-pattern online mock tests to help you achieve your next career milestone.',
        primaryCtaText: "Explore Banker's Path",
        primaryCtaLink: '/bankers-path',
        secondaryCtaText: 'Book Free Demo',
        secondaryCtaLink: '/enquiry',
        heroImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
        benefits: [
          { icon: 'ShieldCheck', title: 'Expert Faculty' },
          { icon: 'BookOpen', title: 'Updated Study Material' },
          { icon: 'MonitorPlay', title: 'Online & Offline Classes' },
          { icon: 'Users', title: 'Personal Guidance' },
        ],
        floatingCard: {
          tag: 'JAIIB / CAIIB',
          metric: '89.4% 1st-Attempt Pass',
          active: true,
        },
        booksBadge: {
          tag: 'Banking • Current Affairs • GA',
          title: '100% Exam-Aligned Study Modules',
          buttonText: 'Try Free',
          buttonLink: '/mock-tests',
        },
      },
      bannerStripText: 'Learn • Excel • Achieve',
      bankersPathSection: {
        title: "Banker's Path",
        subtitle: 'Banking • Insurance • Finance Career Programs',
        buttonText: 'View All',
        buttonLink: '/bankers-path',
        tiles: [
          { name: 'JAIIB', path: '/courses/jaiib-master-class-2026', bgGradient: 'from-[#0B63C5] to-[#084E9E]', subtitle: 'IE&IFS • PPB • AFM • RBWM' },
          { name: 'CAIIB', path: '/courses/caiib-advanced-comprehensive-batch', bgGradient: 'from-[#D32F2F] to-[#B71C1C]', subtitle: 'ABM • BFM • ABFM • BRBL' },
          { name: 'DBF', path: '/bankers-path?category=DBF', bgGradient: 'from-[#0F8A4B] to-[#0B6A39]', subtitle: 'Banking Diploma for Aspirants' },
          { name: 'DTM', path: '/bankers-path?category=DTM', bgGradient: 'from-[#E58A00] to-[#C77500]', subtitle: 'Treasury & Risk Management' },
          { name: 'AMFI', path: '/bankers-path?category=AMFI', bgGradient: 'from-[#8E24AA] to-[#6A1B9A]', subtitle: 'Mutual Fund Certification' },
          { name: 'NISM (SEBI)', path: '/bankers-path?category=NISM', bgGradient: 'from-[#1976D2] to-[#1565C0]', subtitle: 'Securities Market Modules' },
          { name: 'IRDAI', path: '/bankers-path?category=IRDAI', bgGradient: 'from-[#E91E63] to-[#C2185B]', subtitle: 'Insurance Regulatory Exams' },
          { name: 'DRA', path: '/bankers-path?category=DRA', bgGradient: 'from-[#00897B] to-[#00695C]', subtitle: 'Debt Recovery Agent IIBF' },
        ],
      },
      competitiveExamsSection: {
        title: 'All Competitive Exams Coaching',
        subtitle: 'Government Jobs • Banking • Railways • Insurance • Defence & More',
        buttonText: 'View All',
        buttonLink: '/competitive-exams',
        tiles: [
          { name: 'IBPS', path: '/competitive-exams?cat=BANKING', bgGradient: 'from-[#0284C7] to-[#0369A1]' },
          { name: 'SBI', path: '/competitive-exams?cat=BANKING', bgGradient: 'from-[#DC2626] to-[#B91C1C]' },
          { name: 'RBI', path: '/competitive-exams?cat=BANKING', bgGradient: 'from-[#059669] to-[#047857]' },
          { name: 'SSC', path: '/competitive-exams?cat=GOVERNMENT', bgGradient: 'from-[#EA580C] to-[#C2410C]' },
          { name: 'RAILWAYS', path: '/competitive-exams?cat=RAILWAYS', bgGradient: 'from-[#7C3AED] to-[#6D28D9]' },
          { name: 'LIC', path: '/competitive-exams?cat=INSURANCE', bgGradient: 'from-[#1E40AF] to-[#1E3A8A]' },
          { name: 'POLICE', path: '/competitive-exams?cat=POLICE_DEFENCE', bgGradient: 'from-[#DB2777] to-[#BE185D]' },
          { name: 'DEFENCE', path: '/competitive-exams?cat=POLICE_DEFENCE', bgGradient: 'from-[#0D9488] to-[#0F766E]' },
          { name: 'TEACHING', path: '/competitive-exams?cat=TEACHING', bgGradient: 'from-[#D97706] to-[#B45309]' },
          { name: 'STATE GOVT', path: '/competitive-exams?cat=GOVERNMENT', bgGradient: 'from-[#6B21A8] to-[#581C87]' },
          { name: 'OTHER EXAMS', path: '/competitive-exams', bgGradient: 'from-[#4D7C0F] to-[#3F6212]' },
        ],
      },
      actionCards: [
        { title: 'Classes', subtitle: 'Live & Recorded Learning', link: '/online-classes', colorType: 'blue', icon: 'MonitorPlay' },
        { title: 'Exams', subtitle: 'Online Tests & Mock Tests', link: '/mock-tests', colorType: 'green', icon: 'ClipboardList' },
        { title: 'Enquiry', subtitle: 'Have Questions? Get in Touch', link: '/enquiry', colorType: 'pink', icon: 'MessageSquare' },
        { title: 'Enroll Now', subtitle: 'Start Your Learning Journey', link: '/bankers-path', colorType: 'amber', icon: 'UserCheck' },
      ],
      zoomSection: {
        badge: 'Live Interactive Zoom Batches',
        title: 'Learn Live with Senior Ex-Bankers & Master Faculty',
        description: 'Direct two-way interaction, live doubt clearing, formula revisions, and real-time case studies. Every live session is recorded and uploaded to your student portal within 2 hours.',
        scheduleCtaText: 'View Live Batch Schedule',
        scheduleCtaLink: '/online-classes',
        demoCtaText: 'Book Free Live Demo',
        demoCtaLink: '/enquiry',
        previewImageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
        sampleTopic: 'JAIIB: Principles & Practices of Banking (PPB)',
        sampleFaculty: 'Dr. Rajesh Sharma • 140+ Active Bankers Connected',
      },
      modelPapersSection: {
        badge: 'Online CBT Examination Engine',
        title: 'Attempt 10–20 Real Pattern Online Mock Tests',
        description: 'Experience the identical interface of IIBF & IBPS computer-based tests. Complete with countdown timer, autosave, negative marking calculation, question palette, and detailed step-by-step explanations for every question.',
        demoTitle: 'Paper 01 Free Demo',
        demoDesc: 'Instant score report, accuracy breakdown, and national percentile benchmark.',
        demoButtonText: 'Start Free Demo Test Now',
      },
      learningMethodology: {
        badge: 'Proven Learning Roadmap',
        title: 'How Our Preparation Works',
        subtitle: 'Engineered for guaranteed 1st-attempt clearing with structured milestones.',
        steps: [
          { step: '01', title: 'Learn', desc: 'Concept clarity from veteran bankers' },
          { step: '02', title: 'Practice', desc: 'Topic-wise high yield questions' },
          { step: '03', title: 'Test', desc: '10–20 timed model papers' },
          { step: '04', title: 'Analyse', desc: 'Instant accuracy & score metrics' },
          { step: '05', title: 'Improve', desc: 'Doubt clearing & formula revision' },
          { step: '06', title: 'Succeed', desc: 'Promotions & selection milestones' },
        ],
      },
      aboutSection: {
        legacyTitle: 'Shaping India’s Next Generation of Banking Leaders & Public Servants',
        legacyText1: 'Founded by veteran bankers and educationists, Ranvi Institutions stands at the forefront of career development for banking employees and competitive recruitment aspirants.',
        legacyText2: 'We specialize in IIBF-accredited certifications (JAIIB, CAIIB, DBF, DTM) and premier government examinations (IBPS PO/Clerk, SBI PO, RBI Grade B, SSC CGL, Railways). Our pedagogical model pairs conceptual mastery with rigorous computer-based exam simulations.',
        stats: [
          { label: 'Students Trained', value: '25,000+' },
          { label: '1st Attempt Clear', value: '89.4%' },
          { label: 'Ex-Banker Faculty', value: '45+' },
        ],
        missionText: 'To deliver accessible, result-driven, and ethically grounded coaching that empowers every banking professional and competitive exam aspirant to achieve their highest career milestones with confidence and conceptual clarity.',
        visionText: 'To be recognized as India’s most trusted educational institution for professional banking certifications and government recruitment, setting the standard for quality pedagogy and student success rates.',
        advantages: [
          { title: 'Ex-Banker Faculty Team', desc: 'Taught by retired Senior Managers, AGMs, and practicing Financial Analysts who understand actual bank operations.' },
          { title: 'Live Zoom & High-Def Library', desc: 'Daily interactive live classes via Zoom with instant question-and-answer support and crystal-clear recordings.' },
          { title: '10–20 Real Pattern Model Papers', desc: 'Exam simulation platform with exact timing, negative marking, and detailed step-by-step solutions.' },
          { title: 'Single-Device Security Portal', desc: 'Personalized secure portal ensuring focused learning, seamless progress tracking, and dedicated student privacy.' },
          { title: 'Concise High-Yield Formula Notes', desc: 'Downloadable PDF summaries, memory mnemonics, and ratio formula sheets updated for 2026 exam blueprints.' },
          { title: 'Personalized Doubt Support', desc: 'Direct interaction with mentors through structured doubt-clearing sessions and batch Telegram channels.' },
        ],
      },
      testimonials: [
        {
          name: 'Pooja Verma',
          designation: 'Assistant Manager, Union Bank of India',
          exam: 'Cleared JAIIB (1st Attempt - 84%)',
          quote: 'The live evening Zoom batches by Dr. Rajesh Sharma made AFM and PPB concepts so crystal clear. The 10 mock test papers matched the exact IIBF exam screen format!',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
          stars: 5,
          isFeatured: true,
        },
        {
          name: 'Karthik Raman',
          designation: 'Probationary Officer, State Bank of India',
          exam: 'Cleared SBI PO 2025 (AIR 64)',
          quote: 'Ranvi Institutions gave me the exact speed techniques for DI and Reasoning. The sectional mock tests and negative marking analytics pinpointed my weak areas instantly.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
          stars: 5,
          isFeatured: true,
        },
        {
          name: 'Sneha Kulkarni',
          designation: 'Scale-II Manager, Bank of Baroda',
          exam: 'Cleared CAIIB (All 5 Papers in 1st Attempt)',
          quote: 'Managing bank hours and preparing for CAIIB was tough, but the recorded video library and doubt clearing sessions allowed me to study at my own pace with single-device ease.',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
          stars: 5,
          isFeatured: true,
        },
      ],
      faqs: [
        {
          question: 'What is the schedule for Live Zoom Classes?',
          answer: 'Live batches are conducted predominantly in the evening (7:30 PM - 9:00 PM) and early morning to accommodate working bank officers and full-time aspirants.',
          category: 'Classes',
        },
        {
          question: 'How does the Single-Device policy work?',
          answer: 'For student security and fair usage, each account can be actively logged in on one device at a time. If you log in on a new computer or mobile browser, your previous session will automatically end.',
          category: 'Portal & Security',
        },
        {
          question: 'Are mock tests timed like the actual IIBF/IBPS exams?',
          answer: 'Yes, our online test engine simulates the exact exam countdown timer, question palette, negative marking (-0.25), and generates instant score analytics upon submission.',
          category: 'Mock Tests',
        },
      ],
      contactInfo: {
        phone: '+91 98765 43210',
        email: 'admissions@ranviinstitutions.com',
        whatsapp: '+91 98765 43210',
        address: 'Ranvi Knowledge Tower, MG Road Coaching Hub, India',
        workingHours: 'Monday - Saturday: 8:00 AM - 8:00 PM IST',
      },
      socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
        telegram: 'https://t.me/ranvi_institutions',
        linkedin: 'https://linkedin.com',
      },
      finalCtaBanner: {
        title: 'Ready to Achieve Your Next Career Milestone?',
        description: 'Join thousands of successful banking employees and competitive exam aspirants who cleared their exams with Ranvi Institutions.',
        primaryBtnText: "Explore Banker's Path Courses",
        primaryBtnLink: '/bankers-path',
        secondaryBtnText: 'Speak with a Counselor',
        secondaryBtnLink: '/enquiry',
      },
    });

    console.log('[Seeder] 9. Creating 9 Entrance Exam Programs...');
    await EntranceExam.insertMany(DEFAULT_ENTRANCE_EXAMS);

    console.log('---------------------------------------------------------');
    console.log('✅ DATABASE SEEDING COMPLETE FOR RANVI INSTITUTIONS!');
    console.log('Super Admin: admin@ranviinstitutions.com / RanviAdmin@2026!');
    console.log('Faculty:     faculty.rajesh@ranviinstitutions.com / RanviFaculty@2026!');
    console.log('Student:     student@ranviinstitutions.com / RanviStudent@2026!');
    console.log('---------------------------------------------------------');

    return true;
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedAll().then(() => {
    process.exit(0);
  });
}

module.exports = seedAll;
