const mongoose = require('mongoose');

const LiveClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  subject: {
    type: String,
    default: 'General',
  },
  batchName: {
    type: String,
    default: 'Regular Batch',
  },
  facultyName: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // e.g. "18:30" (24hr format) or "06:30 PM"
    required: true,
  },
  durationMinutes: {
    type: Number,
    default: 60,
  },
  zoomMeetingUrl: {
    type: String,
    required: true,
    trim: true,
  },
  zoomMeetingId: {
    type: String,
    default: '',
    trim: true,
  },
  zoomPasscode: {
    type: String,
    default: '',
    trim: true,
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED'],
    default: 'SCHEDULED',
  },
  instructions: {
    type: String,
    default: 'Please ensure you have Zoom installed and join 10 minutes prior to the scheduled start time.',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

LiveClassSchema.index({ courseId: 1, scheduledDate: 1 });
LiveClassSchema.index({ status: 1 });

module.exports = mongoose.model('LiveClass', LiveClassSchema);
