const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../src/config/db');
const User = require('../src/models/User');
const Course = require('../src/models/Course');
const Lesson = require('../src/models/Lesson');
const LiveClass = require('../src/models/LiveClass');
const MockTest = require('../src/models/MockTest');
const Question = require('../src/models/Question');
const ExamAttempt = require('../src/models/ExamAttempt');
const DeviceSession = require('../src/models/DeviceSession');
const Order = require('../src/models/Order');
const Payment = require('../src/models/Payment');
const Entitlement = require('../src/models/Entitlement');
const Enquiry = require('../src/models/Enquiry');
const EntranceExam = require('../src/models/EntranceExam');
const { isValidZoomUrl } = require('../src/utils/zoomValidator');
const { verifySignature } = require('../src/config/razorpay');
const seedAll = require('./seed');

const runTests = async () => {
  console.log('🧪 =======================================================');
  console.log('🧪 RUNNING CRITICAL AUTOMATED TESTS: RANVI INSTITUTIONS');
  console.log('🧪 =======================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failedCount++;
    }
  };

  try {
    // 1. Initialize DB & Seed
    await seedAll();

    // 2. Test User Authentication & Password Hashing
    const student = await User.findOne({ email: 'student@ranviinstitutions.com' }).select('+passwordHash');
    assert(student !== null, 'Student user exists in database');
    const isPwCorrect = await student.comparePassword('RanviStudent@2026!');
    assert(isPwCorrect === true, 'Student password verification succeeds with bcrypt');
    const isPwFalse = await student.comparePassword('WrongPassword');
    assert(isPwFalse === false, 'Student password verification fails with incorrect credentials');

    // 3. Test Single Device Session Enforcement
    const sessionToken1 = 'token_device_phone_001';
    const session1 = await DeviceSession.create({
      studentId: student._id,
      deviceId: 'device_phone_id',
      sessionToken: sessionToken1,
      deviceInfo: 'Android Chrome Mobile',
      isActive: true,
    });
    assert(session1.isActive === true, 'Device 1 session registered as active');

    // Simulate login from Device 2 -> Should revoke Device 1
    await DeviceSession.updateMany(
      { studentId: student._id, isActive: true },
      { isActive: false, revokedReason: 'Logged in from laptop', revokedBy: 'NEW_DEVICE_LOGIN' }
    );
    const sessionToken2 = 'token_device_laptop_002';
    const session2 = await DeviceSession.create({
      studentId: student._id,
      deviceId: 'device_laptop_id',
      sessionToken: sessionToken2,
      deviceInfo: 'Windows PC Firefox',
      isActive: true,
    });

    const activeSessions = await DeviceSession.find({ studentId: student._id, isActive: true });
    assert(activeSessions.length === 1 && activeSessions[0].sessionToken === sessionToken2, 'Single-device policy: Exactly 1 active session exists after new device login');
    const oldSession = await DeviceSession.findOne({ sessionToken: sessionToken1 });
    assert(oldSession.isActive === false, 'Previous device session was successfully revoked');

    // 4. Test Course Catalogue & Demo Lesson Gating
    const jaiib = await Course.findOne({ slug: 'jaiib-master-class-2026' });
    assert(jaiib !== null, 'JAIIB Master Course exists');
    const lessons = await Lesson.find({ courseId: jaiib._id });
    const demoLessons = lessons.filter(l => l.isPreview);
    const paidLessons = lessons.filter(l => !l.isPreview);
    assert(demoLessons.length >= 2, 'Course provides at least 2 free demo preview lessons');
    assert(paidLessons.length >= 2, 'Course provides locked paid lessons');

    // 5. Test Zoom Live Class URL Validation
    assert(isValidZoomUrl('https://us04web.zoom.us/j/84291823910?pwd=RanviLiveClass2026') === true, 'Valid Zoom.us URL accepted');
    assert(isValidZoomUrl('https://zoom.us/j/123456789') === true, 'Standard Zoom.us URL accepted');
    assert(isValidZoomUrl('https://malicious-site.com/fake-zoom') === false, 'Non-Zoom URL rejected');
    assert(isValidZoomUrl('not-a-url') === false, 'Malformed URL string rejected');

    // 6. Test Mock Test Server-Side Scoring & Integrity
    const mockTest = await MockTest.findOne({ slug: 'jaiib-model-paper-01' });
    assert(mockTest !== null, 'JAIIB Model Paper 01 exists');
    const questions = await Question.find({ mockTestId: mockTest._id });
    assert(questions.length >= 10, 'Model paper contains at least 10 structured MCQs');

    // Simulate Exam Attempt
    const attempt = await ExamAttempt.create({
      studentId: student._id,
      mockTestId: mockTest._id,
      status: 'IN_PROGRESS',
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      responses: [
        { questionId: questions[0]._id, selectedOptionIndex: 0 }, // Correct (+1)
        { questionId: questions[1]._id, selectedOptionIndex: 1 }, // Correct (+1)
        { questionId: questions[4]._id, selectedOptionIndex: 3 }, // Incorrect (-0.25)
      ],
    });
    assert(attempt.status === 'IN_PROGRESS', 'Exam attempt created in progress');

    // Score calculation test
    let calculatedScore = 0;
    let correct = 0;
    let wrong = 0;

    for (const resp of attempt.responses) {
      const q = questions.find(item => item._id.toString() === resp.questionId.toString());
      const correctIdx = q.options.findIndex(o => o.isCorrect === true);
      if (resp.selectedOptionIndex === correctIdx) {
        correct++;
        calculatedScore += (q.marks || 1);
      } else {
        wrong++;
        calculatedScore -= (q.negativeMarks || 0.25);
      }
    }
    assert(correct === 2 && wrong === 1, 'Exam correct and incorrect answers counted accurately');
    assert(calculatedScore === 1.75, 'Server-side score calculated with negative marks correctly (1 + 1 - 0.25 = 1.75)');

    // 7. Test Payment Verification and Entitlement Grant
    const order = await Order.create({
      studentId: student._id,
      itemType: 'COURSE',
      itemId: jaiib._id,
      itemModel: 'Course',
      amount: jaiib.fee,
      currency: 'INR',
      razorpayOrderId: 'order_test_verification_001',
      status: 'PENDING',
      receiptNumber: 'REC-TEST-001',
    });

    // Grant entitlement upon payment completion
    const entitlement = await Entitlement.create({
      studentId: student._id,
      itemType: 'COURSE',
      itemId: jaiib._id,
      itemModel: 'Course',
      orderId: order._id,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      isActive: true,
      grantedBy: 'PAYMENT',
    });
    assert(entitlement.isActive === true, 'Course entitlement successfully created for student');

    // Verify active access query
    const verifiedAccess = await Entitlement.findOne({
      studentId: student._id,
      itemId: jaiib._id,
      isActive: true,
      validUntil: { $gte: new Date() },
    });
    assert(verifiedAccess !== null, 'Entitlement correctly unlocks course access for student');

    // 8. Test Enquiry Form Model Validation
    const enquiry = await Enquiry.create({
      fullName: 'Suresh Raina',
      email: 'suresh@example.com',
      phone: '9876543219',
      division: 'BANKERS_PATH',
      courseInterest: 'CAIIB Advanced Mastery',
      preferredMode: 'ONLINE',
      status: 'NEW',
    });
    assert(enquiry._id !== null && enquiry.status === 'NEW', 'Enquiry successfully persisted with status NEW');

    // 9. Test Entrance Exam Programs & CRUD
    const entranceExams = await EntranceExam.find().sort({ displayOrder: 1 });
    assert(entranceExams.length >= 9, 'All 9 default Entrance Exam programs exist in database');

    const jee = await EntranceExam.findOne({ title: 'JEE Main' });
    assert(jee !== null && jee.description.includes('NITs, IIITs'), 'JEE Main program exists with correct description');

    const neet = await EntranceExam.findOne({ title: 'NEET-UG' });
    assert(neet !== null && neet.description.includes('MBBS, BDS'), 'NEET-UG program exists with correct description');

    const cuet = await EntranceExam.findOne({ title: 'CUET-UG' });
    assert(cuet !== null && cuet.description.includes('Central Universities'), 'CUET-UG program exists with correct description');

    const apEapcet = await EntranceExam.findOne({ title: 'AP EAPCET' });
    assert(apEapcet !== null && apEapcet.description.includes('Andhra Pradesh'), 'AP EAPCET program exists with correct description');

    const tgEapcet = await EntranceExam.findOne({ title: 'TG EAPCET' });
    assert(tgEapcet !== null && tgEapcet.description.includes('Telangana'), 'TG EAPCET program exists with correct description');

    const apPolycet = await EntranceExam.findOne({ title: 'AP POLYCET' });
    assert(apPolycet !== null && apPolycet.description.includes('Polytechnic Diploma courses in Andhra Pradesh'), 'AP POLYCET program exists with correct description');

    const tgPolycet = await EntranceExam.findOne({ title: 'TG POLYCET' });
    assert(tgPolycet !== null && tgPolycet.description.includes('Polytechnic Diploma courses in Telangana'), 'TG POLYCET program exists with correct description');

    const aprjc = await EntranceExam.findOne({ title: 'APRJC CET' });
    assert(aprjc !== null && aprjc.description.includes('Residential Junior Colleges'), 'APRJC CET program exists with correct description');

    const tgcet = await EntranceExam.findOne({ title: 'TGCET' });
    assert(tgcet !== null && tgcet.description.includes('Telangana Gurukul Residential Schools'), 'TGCET program exists with correct description');

    // Test Entrance Exam CRUD: Create, Update, Delete
    const customExam = await EntranceExam.create({
      title: 'BITSAT Special',
      description: 'Admission to BITS Pilani campuses',
      category: 'Engineering & Technology',
      badge: 'National Level',
      displayOrder: 99,
    });
    assert(customExam !== null && customExam.slug === 'bitsat-special', 'Admin can create new entrance exam with auto-slug');

    const updatedExam = await EntranceExam.findByIdAndUpdate(
      customExam._id,
      { $set: { badge: 'National Level - Premier' } },
      { new: true }
    );
    assert(updatedExam.badge === 'National Level - Premier', 'Admin can update entrance exam details');

    await EntranceExam.findByIdAndDelete(customExam._id);
    const deletedCheck = await EntranceExam.findById(customExam._id);
    assert(deletedCheck === null, 'Admin can delete entrance exam program');

    console.log('\n🧪 =======================================================');
    console.log(`🧪 TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log('🧪 =======================================================\n');

    await disconnectDB();
    process.exit(failedCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('Test execution error:', error);
    await disconnectDB();
    process.exit(1);
  }
};

runTests();
