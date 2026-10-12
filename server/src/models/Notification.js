const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['LIVE_CLASS', 'EXAM', 'PAYMENT', 'ANNOUNCEMENT', 'SYSTEM'],
    default: 'ANNOUNCEMENT',
  },
  link: {
    type: String,
    default: '',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

NotificationSchema.index({ recipientId: 1, isRead: 1 });

module.exports = mongoose.model('Notification', NotificationSchema);
