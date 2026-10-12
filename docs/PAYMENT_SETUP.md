# Razorpay Payment Gateway Integration & Setup Guide

This guide outlines how to configure, test, and go live with **Razorpay** in **Ranvi Institutions**.

---

## 1. Razorpay Account Setup

1. **Sign Up**: Register on [razorpay.com](https://razorpay.com) with your registered educational institution business details (GST, PAN, Bank Account).
2. **Dashboard**: Navigate to [Razorpay Dashboard](https://dashboard.razorpay.com/).
3. **API Keys**:
   - Go to **Settings** -> **API Keys**.
   - Click **Generate Key**.
   - Copy both the **Key ID** (`rzp_test_...` or `rzp_live_...`) and **Key Secret**.

---

## 2. Environment Configuration

### Backend (`server/.env`)
```env
# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_test_YourTestKeyIdHere
RAZORPAY_KEY_SECRET=YourRazorpaySecretHere
RAZORPAY_WEBHOOK_SECRET=YourWebhookSecretHere
```

### Frontend (`client/.env`)
```env
VITE_RAZORPAY_KEY_ID=rzp_test_YourTestKeyIdHere
```

---

## 3. Webhook Configuration (for Automated Asynchronous Fulfillment)

When students pay via UPI, NetBanking, or Credit/Debit Card, Razorpay can send asynchronous webhooks to ensure entitlements are granted even if the user closes their browser prematurely.

1. In Razorpay Dashboard, go to **Settings** -> **Webhooks** -> **Add New Webhook**.
2. **Webhook URL**: `https://api.yourdomain.com/api/v1/payments/webhook`
3. **Secret**: Enter your secret string (e.g. `ranvi_webhook_sec_2026`) and set this in `RAZORPAY_WEBHOOK_SECRET`.
4. **Active Events**:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
5. Save the webhook.

---

## 4. Test Mode Testing Instructions

In Test Mode (`rzp_test_...`):
- **Card**: Use Razorpay test cards (`4111 1111 1111 1111`, any future expiry date, CVV `123`).
- **UPI**: Enter `success@razorpay` to simulate a successful UPI approval, or `failure@razorpay` to simulate a failure.
- **NetBanking**: Select any test bank (e.g. HDFC, SBI) and click **Success** on the mock authorization screen.

---

## 5. Offline / Manual Payment Grant (Admin Capability)

For offline cash/DD/bank transfer enrolments:
1. Administrator navigates to **Admin Portal** -> **Students**.
2. Search for the student by email or mobile.
3. Click **Grant Entitlement**.
4. Select the target Course or Mock Test package and confirm.
5. An entitlement is instantly granted and recorded in the audit logs.
