const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'STUDENT'],
    default: 'STUDENT',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  // Tracks consumed free demo resources to prevent bypassing limits
  demoUsage: {
    recordedClasses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    }],
    mockTests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MockTest',
    }],
  },
  avatar: {
    type: String,
    default: '',
  },
  targetExam: {
    type: String,
    default: '',
  },
  migratedFromRole: {
    type: String,
    default: null,
  },
  migratedAt: {
    type: Date,
    default: null,
  },
  refreshToken: {
    type: String,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {
  timestamps: true,
});

UserSchema.index({ role: 1 });

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

UserSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', UserSchema);
