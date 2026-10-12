const Razorpay = require('razorpay');
const crypto = require('crypto');
const env = require('./env');

let razorpayInstance = null;

try {
  razorpayInstance = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  });
} catch (error) {
  console.warn('[Razorpay] Failed to initialize live instance. Using fallback mock interface for development.');
}

const verifySignature = (orderId, paymentId, signature) => {
  if (!orderId || !paymentId || !signature) return false;
  const hmac = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET);
  hmac.update(`${orderId}|${paymentId}`);
  const expectedSignature = hmac.digest('hex');
  return expectedSignature === signature;
};

const verifyWebhookSignature = (rawBody, signature) => {
  if (!rawBody || !signature) return false;
  const hmac = crypto.createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET);
  hmac.update(rawBody);
  const expectedSignature = hmac.digest('hex');
  return expectedSignature === signature;
};

module.exports = {
  razorpayInstance,
  verifySignature,
  verifyWebhookSignature,
};
