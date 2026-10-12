const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  moduleTitle: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    required: true,
  },
  videoProvider: {
    type: String,
    enum: ['CLOUDINARY', 'VIMEO', 'YOUTUBE_EMBED', 'HLS_STREAM', 'CUSTOM'],
    default: 'CLOUDINARY',
  },
  durationMinutes: {
    type: Number,
    default: 45,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  isPreview: {
    type: Boolean,
    default: false, // Free demo lesson if true
  },
  studyMaterialUrl: {
    type: String,
    default: '',
  },
  studyMaterialName: {
    type: String,
    default: '',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

LessonSchema.index({ courseId: 1, sortOrder: 1 });

module.exports = mongoose.model('Lesson', LessonSchema);
