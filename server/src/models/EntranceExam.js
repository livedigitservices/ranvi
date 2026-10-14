const mongoose = require('mongoose');

const entranceExamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Entrance exam title is required'],
      trim: true,
    },
    shortCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Engineering & Technology',
    },
    badge: {
      type: String,
      trim: true,
      default: 'National Level',
    },
    description: {
      type: String,
      required: [true, 'Program description is required'],
      trim: true,
    },
    targetAdmissions: {
      type: String,
      trim: true,
      default: '',
    },
    eligibility: {
      type: String,
      trim: true,
      default: '',
    },
    conductingBody: {
      type: String,
      trim: true,
      default: '',
    },
    examPattern: {
      type: String,
      trim: true,
      default: '',
    },
    syllabusHighlights: {
      type: [String],
      default: [],
    },
    iconName: {
      type: String,
      default: 'GraduationCap',
    },
    colorTheme: {
      type: String,
      enum: ['blue', 'teal', 'amber', 'purple', 'emerald', 'rose', 'indigo', 'cyan'],
      default: 'blue',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before saving if not provided
entranceExamSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  if (!this.shortCode && this.title) {
    this.shortCode = this.title.toUpperCase();
  }
  next();
});

module.exports = mongoose.model('EntranceExam', entranceExamSchema);
