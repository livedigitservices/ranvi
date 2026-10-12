const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const QuestionSchema = new mongoose.Schema({
  mockTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MockTest',
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  questionImage: {
    type: String,
    default: '',
  },
  options: {
    type: [OptionSchema],
    validate: [
      (val) => val.length >= 2,
      'A question must have at least 2 options',
    ],
  },
  marks: {
    type: Number,
    default: 1,
  },
  negativeMarks: {
    type: Number,
    default: 0.25,
  },
  explanation: {
    type: String,
    default: '',
  },
  subject: {
    type: String,
    default: 'General',
  },
  topic: {
    type: String,
    default: '',
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

QuestionSchema.index({ mockTestId: 1, sortOrder: 1 });

module.exports = mongoose.model('Question', QuestionSchema);
