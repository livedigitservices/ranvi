const mongoose = require('mongoose');

const ExamAttemptSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mockTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MockTest',
    required: true,
  },
  status: {
    type: String,
    enum: ['IN_PROGRESS', 'SUBMITTED', 'EXPIRED'],
    default: 'IN_PROGRESS',
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  submittedAt: {
    type: Date,
  },
  timeSpentSeconds: {
    type: Number,
    default: 0,
  },
  responses: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    selectedOptionIndex: {
      type: Number,
      default: null,
    },
    isMarkedForReview: {
      type: Boolean,
      default: false,
    },
    isCorrect: {
      type: Boolean,
      default: null,
    },
    marksAwarded: {
      type: Number,
      default: 0,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  score: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 0,
  },
  correctCount: {
    type: Number,
    default: 0,
  },
  incorrectCount: {
    type: Number,
    default: 0,
  },
  unansweredCount: {
    type: Number,
    default: 0,
  },
  accuracyPercentage: {
    type: Number,
    default: 0,
  },
  isPassed: {
    type: Boolean,
    default: false,
  },
  subjectAnalysis: [{
    subject: String,
    total: Number,
    correct: Number,
    incorrect: Number,
    unanswered: Number,
    score: Number,
  }],
}, {
  timestamps: true,
});

ExamAttemptSchema.index({ studentId: 1, mockTestId: 1 });
ExamAttemptSchema.index({ studentId: 1, status: 1 });

module.exports = mongoose.model('ExamAttempt', ExamAttemptSchema);
