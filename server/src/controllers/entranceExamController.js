const EntranceExam = require('../models/EntranceExam');
const { sendSuccess, sendError } = require('../utils/responseHelper');

const DEFAULT_ENTRANCE_EXAMS = [
  {
    title: 'JEE Main',
    shortCode: 'JEE MAIN',
    slug: 'jee-main',
    category: 'Engineering & Technology',
    badge: 'National Level',
    description: 'Admission to B.Tech programs at NITs, IIITs, and other engineering institutions.',
    targetAdmissions: 'B.Tech / B.E. at NITs, IIITs, CFTIs & State Tech Colleges',
    eligibility: '12th Standard / Intermediate with Physics, Chemistry & Mathematics (PCM)',
    conductingBody: 'National Testing Agency (NTA)',
    examPattern: 'Computer-Based Test (CBT) • 3 Hours • MCQs + Numerical Values',
    syllabusHighlights: ['Physics', 'Chemistry', 'Mathematics'],
    iconName: 'GraduationCap',
    colorTheme: 'blue',
    displayOrder: 1,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'NEET-UG',
    shortCode: 'NEET-UG',
    slug: 'neet-ug',
    category: 'Medical & Healthcare',
    badge: 'National Level',
    description: 'Admission to MBBS, BDS, and other eligible medical courses.',
    targetAdmissions: 'MBBS, BDS, BAMS, BHMS, BSMS & All India Medical Seats',
    eligibility: '12th Standard / Intermediate with Physics, Chemistry & Biology (PCB)',
    conductingBody: 'National Testing Agency (NTA)',
    examPattern: 'Pen-and-Paper (OMR) • 3 Hours 20 Mins • 200 Questions',
    syllabusHighlights: ['Physics', 'Chemistry', 'Botany', 'Zoology'],
    iconName: 'Stethoscope',
    colorTheme: 'emerald',
    displayOrder: 2,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'CUET-UG',
    shortCode: 'CUET-UG',
    slug: 'cuet-ug',
    category: 'Central Universities',
    badge: 'National Level',
    description: 'Admission to undergraduate degree programs at Central Universities.',
    targetAdmissions: 'BA, B.Sc, B.Com, BBA across DU, BHU, JNU, HCU & 45+ Central Universities',
    eligibility: '12th Standard / Intermediate in any stream (Science, Commerce, Arts)',
    conductingBody: 'National Testing Agency (NTA)',
    examPattern: 'Computer-Based Test (CBT) • Domain Subjects + Language + General Test',
    syllabusHighlights: ['Domain Subjects', 'Language Comprehension', 'General Mental Ability'],
    iconName: 'Building2',
    colorTheme: 'purple',
    displayOrder: 3,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'AP EAPCET',
    shortCode: 'AP EAPCET',
    slug: 'ap-eapcet',
    category: 'State Level (Andhra Pradesh)',
    badge: 'State Level - Andhra Pradesh',
    description: 'Admission to Engineering, Agriculture, and Pharmacy courses in Andhra Pradesh.',
    targetAdmissions: 'B.Tech, B.Sc (Agri), B.Pharmacy in Government & Private Colleges across AP',
    eligibility: 'Intermediate 2nd Year / Class 12 with MPC / BiPC from recognized board',
    conductingBody: 'JNTU Kakinada on behalf of APSCHE',
    examPattern: 'Computer-Based Test (CBT) • 160 Questions • 3 Hours • No Negative Marks',
    syllabusHighlights: ['Mathematics / Biology', 'Physics', 'Chemistry'],
    iconName: 'Award',
    colorTheme: 'teal',
    displayOrder: 4,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'TG EAPCET',
    shortCode: 'TG EAPCET',
    slug: 'tg-eapcet',
    category: 'State Level (Telangana)',
    badge: 'State Level - Telangana',
    description: 'Admission to Engineering, Agriculture, and Pharmacy courses in Telangana.',
    targetAdmissions: 'B.Tech, B.Sc (Hons) Agriculture, B.Pharmacy in Top Telangana Institutions',
    eligibility: 'Intermediate / Class 12 with MPC / BiPC from recognized board',
    conductingBody: 'JNTU Hyderabad on behalf of TGCHE',
    examPattern: 'Computer-Based Test (CBT) • 160 Questions • 3 Hours • No Negative Marking',
    syllabusHighlights: ['Mathematics / Biology', 'Physics', 'Chemistry'],
    iconName: 'Award',
    colorTheme: 'indigo',
    displayOrder: 5,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'AP POLYCET',
    shortCode: 'AP POLYCET',
    slug: 'ap-polycet',
    category: 'Polytechnic Diploma',
    badge: 'State Level - Andhra Pradesh',
    description: 'Admission to Polytechnic Diploma courses in Andhra Pradesh.',
    targetAdmissions: '3-Year Technical Engineering & Non-Engineering Diploma Programs (Direct Lateral Entry to B.Tech 2nd Year)',
    eligibility: 'SSC / 10th Class Passed or Appearing with Mathematics',
    conductingBody: 'State Board of Technical Education and Training (SBTET), AP',
    examPattern: 'Offline OMR • 120 Questions (Maths 60, Physics 30, Chemistry 30) • 2 Hours',
    syllabusHighlights: ['SSC Mathematics', 'SSC Physics', 'SSC Chemistry'],
    iconName: 'Cpu',
    colorTheme: 'amber',
    displayOrder: 6,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'TG POLYCET',
    shortCode: 'TG POLYCET',
    slug: 'tg-polycet',
    category: 'Polytechnic Diploma',
    badge: 'State Level - Telangana',
    description: 'Admission to Polytechnic Diploma courses in Telangana.',
    targetAdmissions: 'Diploma in Engineering & Technology, Agricultural Polytechnic & PJTSAU Programs',
    eligibility: 'SSC / 10th Class Passed or Appearing with Mathematics',
    conductingBody: 'State Board of Technical Education and Training (SBTET), Telangana',
    examPattern: 'Offline OMR • 120 / 150 Questions • 2 Hours 30 Mins',
    syllabusHighlights: ['Mathematics', 'Physics', 'Chemistry', 'Biology (Optional for Agri)'],
    iconName: 'Cpu',
    colorTheme: 'rose',
    displayOrder: 7,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'APRJC CET',
    shortCode: 'APRJC CET',
    slug: 'aprjc-cet',
    category: 'Residential Colleges',
    badge: 'State Level - Andhra Pradesh',
    description: 'Admission to Intermediate courses at Andhra Pradesh Residential Junior Colleges.',
    targetAdmissions: 'Intermediate 1st Year (MPC, BPC, CEC, MEC, EET) with Free Residential Education & Food',
    eligibility: 'SSC / 10th Class Passed in First Attempt in Andhra Pradesh',
    conductingBody: 'Andhra Pradesh Residential Educational Institutions Society (APREIS)',
    examPattern: 'Offline Objective Test • 150 Marks • 2 Hours 30 Mins',
    syllabusHighlights: ['10th Standard State Syllabus relevant to chosen group'],
    iconName: 'School',
    colorTheme: 'cyan',
    displayOrder: 8,
    isActive: true,
    isFeatured: true,
  },
  {
    title: 'TGCET',
    shortCode: 'TGCET',
    slug: 'tgcet',
    category: 'Residential Schools',
    badge: 'State Level - Telangana',
    description: 'Admission to Telangana Gurukul Residential Schools.',
    targetAdmissions: 'Admissions into Class 5 & Intermediate in TSWREIS, TTWREIS, MJPTBCWREIS & TREIS Gurukuls',
    eligibility: '4th Class / 10th Class passed students belonging to Telangana State',
    conductingBody: 'Telangana Gurukul Vidyalayas Common Entrance Test Convenor',
    examPattern: 'OMR Based Exam • Telugu/English, Mathematics, Science, Social Studies',
    syllabusHighlights: ['Class-appropriate State Syllabus in Core Subjects'],
    iconName: 'BookOpen',
    colorTheme: 'blue',
    displayOrder: 9,
    isActive: true,
    isFeatured: true,
  },
];

// Public: Get all entrance exams (with filters and sorting)
exports.getEntranceExams = async (req, res, next) => {
  try {
    const { category, search, includeInactive, isFeatured } = req.query;
    const query = {};

    // By default, public only sees active programs unless includeInactive is explicitly true (for admin)
    if (includeInactive !== 'true') {
      query.isActive = true;
    }

    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    if (category && category !== 'ALL') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortCode: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { targetAdmissions: { $regex: search, $options: 'i' } },
      ];
    }

    let exams = await EntranceExam.find(query).sort({ displayOrder: 1, createdAt: -1 });

    // Auto-seed if database is currently empty
    if (exams.length === 0 && !search && (!category || category === 'ALL')) {
      const count = await EntranceExam.countDocuments();
      if (count === 0) {
        await EntranceExam.insertMany(DEFAULT_ENTRANCE_EXAMS);
        exams = await EntranceExam.find(query).sort({ displayOrder: 1, createdAt: -1 });
      }
    }

    return sendSuccess(res, exams, 'Entrance exams retrieved successfully');
  } catch (err) {
    next(err);
  }
};

// Public/Admin: Get single entrance exam by ID or slug
exports.getEntranceExamById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let exam;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      exam = await EntranceExam.findById(id);
    } else {
      exam = await EntranceExam.findOne({ slug: id });
    }

    if (!exam) {
      return sendError(res, 'Entrance exam program not found', 404);
    }

    return sendSuccess(res, exam);
  } catch (err) {
    next(err);
  }
};

// Admin: Create new entrance exam program
exports.createEntranceExam = async (req, res, next) => {
  try {
    const {
      title,
      shortCode,
      category,
      badge,
      description,
      targetAdmissions,
      eligibility,
      conductingBody,
      examPattern,
      syllabusHighlights,
      iconName,
      colorTheme,
      displayOrder,
      isActive,
      isFeatured,
    } = req.body;

    if (!title || !title.trim()) {
      return sendError(res, 'Exam title is required', 400);
    }
    if (!description || !description.trim()) {
      return sendError(res, 'Exam description is required', 400);
    }

    // Generate unique slug
    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (await EntranceExam.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const exam = await EntranceExam.create({
      title: title.trim(),
      shortCode: shortCode ? shortCode.trim().toUpperCase() : title.trim().toUpperCase(),
      slug,
      category: category || 'Engineering & Technology',
      badge: badge || 'National Level',
      description: description.trim(),
      targetAdmissions: targetAdmissions || '',
      eligibility: eligibility || '',
      conductingBody: conductingBody || '',
      examPattern: examPattern || '',
      syllabusHighlights: Array.isArray(syllabusHighlights)
        ? syllabusHighlights
        : typeof syllabusHighlights === 'string'
        ? syllabusHighlights.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      iconName: iconName || 'GraduationCap',
      colorTheme: colorTheme || 'blue',
      displayOrder: Number(displayOrder) || 0,
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured !== undefined ? isFeatured : true,
    });

    return sendSuccess(res, exam, 'Entrance exam program created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// Admin: Update entrance exam program
exports.updateEntranceExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.title) {
      updateData.title = updateData.title.trim();
    }
    if (updateData.description) {
      updateData.description = updateData.description.trim();
    }
    if (typeof updateData.syllabusHighlights === 'string') {
      updateData.syllabusHighlights = updateData.syllabusHighlights
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const exam = await EntranceExam.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!exam) {
      return sendError(res, 'Entrance exam program not found', 404);
    }

    return sendSuccess(res, exam, 'Entrance exam program updated successfully');
  } catch (err) {
    next(err);
  }
};

// Admin: Delete entrance exam program
exports.deleteEntranceExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exam = await EntranceExam.findByIdAndDelete(id);

    if (!exam) {
      return sendError(res, 'Entrance exam program not found', 404);
    }

    return sendSuccess(res, { id }, 'Entrance exam program deleted successfully');
  } catch (err) {
    next(err);
  }
};

// Admin: Reset/Seed default 9 entrance exams
exports.seedDefaultEntranceExams = async (req, res, next) => {
  try {
    for (const item of DEFAULT_ENTRANCE_EXAMS) {
      await EntranceExam.findOneAndUpdate(
        { slug: item.slug },
        { $set: item },
        { upsert: true, new: true }
      );
    }

    const exams = await EntranceExam.find().sort({ displayOrder: 1 });
    return sendSuccess(res, exams, 'Default entrance exam programs seeded successfully');
  } catch (err) {
    next(err);
  }
};

exports.DEFAULT_ENTRANCE_EXAMS = DEFAULT_ENTRANCE_EXAMS;
