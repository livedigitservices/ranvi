const mongoose = require('mongoose');

const DeviceSessionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  sessionToken: {
    type: String,
    required: true,
    unique: true,
  },
  deviceInfo: {
    type: String,
    default: 'Web Browser',
  },
  userAgent: {
    type: String,
    default: '',
  },
  ipAddress: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  revokedAt: {
    type: Date,
  },
  revokedReason: {
    type: String,
  },
  revokedBy: {
    type: String, // 'USER_LOGOUT', 'NEW_DEVICE_LOGIN', 'ADMIN_RESET'
  },
  auditLog: [{
    action: String,
    timestamp: { type: Date, default: Date.now },
    details: String,
    ipAddress: String,
  }],
}, {
  timestamps: true,
});

DeviceSessionSchema.index({ studentId: 1, isActive: 1 });

module.exports = mongoose.model('DeviceSession', DeviceSessionSchema);
