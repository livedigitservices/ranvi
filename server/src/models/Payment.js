const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
    unique: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpaySignature: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED', 'PENDING', 'REFUNDED'],
    default: 'SUCCESS',
  },
  paymentMethod: {
    type: String,
    default: 'UPI/CARD/NETBANKING',
  },
  transactionRef: {
    type: String,
  },
  rawWebhookData: {
    type: Object,
  },
}, {
  timestamps: true,
});

PaymentSchema.index({ studentId: 1, createdAt: -1 });

module.exports = mongoose.model('Payment', PaymentSchema);
