const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Faculty name is required'],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    default: 'Senior Banking Faculty',
  },
  qualifications: {
    type: String,
    default: 'M.Com, CAIIB, Ex-Banker',
  },
  experience: {
    type: String,
    default: '15+ Years in Banking & Training',
  },
  experienceYears: {
    type: Number,
    default: 15,
  },
  bio: {
    type: String,
    default: 'Veteran banking professional and educator dedicated to mentoring candidates for promotional examinations and recruitment.',
  },
  specialization: {
    type: String,
    default: 'JAIIB / CAIIB, Banking Law & Financial Operations',
  },
  subjects: [{
    type: String,
  }],
  photo: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.9,
    min: 1,
    max: 5,
  },
  studentsTrained: {
    type: String,
    default: '10,000+',
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' },
    telegram: { type: String, default: '' },
  },
}, {
  timestamps: true,
});

FacultySchema.index({ isFeatured: 1, displayOrder: 1 });

module.exports = mongoose.model('Faculty', FacultySchema);
