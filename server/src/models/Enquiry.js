const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  division: {
    type: String,
    enum: ['BANKERS_PATH', 'COMPETITIVE_EXAMS', 'GENERAL'],
    default: 'GENERAL',
  },
  courseInterest: {
    type: String,
    default: 'General Coaching Enquiry',
  },
  type: {
    type: String,
    enum: ['GENERAL', 'DEMO_CLASS', 'OFFLINE_ADMISSION', 'COUNSELING'],
    default: 'GENERAL',
  },
  preferredMode: {
    type: String,
    enum: ['ONLINE', 'OFFLINE', 'BOTH'],
    default: 'BOTH',
  },
  preferredSchedule: {
    type: String,
    default: 'Flexible',
  },
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'CLOSED'],
    default: 'NEW',
  },
  adminNotes: [{
    note: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now },
  }],
}, {
  timestamps: true,
});

EnquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Enquiry', EnquirySchema);
