const mongoose = require('mongoose');

const EntitlementSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemType: {
    type: String,
    enum: ['COURSE', 'MOCK_TEST_PACKAGE'],
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'itemModel',
  },
  itemModel: {
    type: String,
    enum: ['Course', 'MockTest'],
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  validFrom: {
    type: Date,
    default: Date.now,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  grantedBy: {
    type: String,
    enum: ['PAYMENT', 'ADMIN_MANUAL', 'PROMOTION'],
    default: 'PAYMENT',
  },
  grantReason: {
    type: String,
    default: 'Online payment purchase',
  },
}, {
  timestamps: true,
});

EntitlementSchema.index({ studentId: 1, itemId: 1, isActive: 1 });
EntitlementSchema.index({ validUntil: 1 });

module.exports = mongoose.model('Entitlement', EntitlementSchema);
