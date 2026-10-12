# RANVI INSTITUTIONS — Premium MERN Stack Coaching Website & LMS

> **"Your Next Career Milestones — Learn • Excel • Achieve"**

A production-ready, enterprise-grade coaching institute web platform and student learning management system built with the **MERN Stack** (MongoDB, Express, React, Node.js) with Tailwind CSS v4, secure single-device concurrency control, live Zoom class integration, Razorpay online payments, and an exam simulation engine.

---

## 🏛️ Coaching Divisions

1. **Banker's Path**:
   - Specialized professional career advancement programs: **JAIIB**, **CAIIB**, **DBF**, **DTM**, **AMFI / Mutual Funds**, **NISM (SEBI)**, **IRDAI**, and **DRA**.
2. **Competitive Exams Coaching**:
   - Comprehensive multi-tier prep: **Banking** (IBPS, SBI, RBI), **Government** (SSC CGL, CHSL, MTS, State PSC), **Railways** (RRB NTPC, Group D), **Insurance** (LIC, NIACL), **Police & Defence**, and **Teaching**.

---

## ✨ Key Highlights & Features

- 🎨 **Visual Brand**: White & cool-blue theme (`#12356B` Navy, `#1769D2` Royal Blue, `#EAF3FF` Light Blue, `#F7F9FC` Base, `#F4B942` Gold).
- 🔒 **Single Active Device Policy**: Backend token-based concurrency control invalidates old sessions upon new device login with real-time UI notification and admin session reset.
- 🎯 **Exam Engine**: Full CBT-style interface (palette, timer, auto-submit, negative marking, instant result analytics with percentile and review).
- 📹 **Manual Zoom Integration**: Fast, reliable Zoom meeting distribution with domain validation (`*.zoom.us`) and student-only gatekeeping.
- 💳 **Razorpay Checkout**: End-to-end checkout with signature verification and webhook redundancy.
- 📊 **Executive Admin Panel**: Metrics dashboards, course builder, lesson manager, mock test manager, live class scheduler, student session control, and audit logs.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0+ or v20.0+
- **MongoDB**: Local MongoDB instance or MongoDB Atlas (note: an automated embedded memory server is built-in for zero-config offline testing).

### 1. Clone & Setup Backend
```bash
cd server
npm install
npm run seed     # Seeds database with demo courses, questions, faculty, and student accounts
npm start        # Runs backend on http://localhost:5000
```
*To run the automated test suite:*
```bash
npm test         # Runs 21 comprehensive test cases with 100% pass rate
```

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev      # Runs client on http://localhost:5173
```
*To build for production:*
```bash
npm run build    # Produces optimized static assets in client/dist
```

---

## 🔑 Default Seed Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@ranviinstitutions.com` | `RanviAdmin@2026!` |
| **Faculty Member** | `faculty.rajesh@ranviinstitutions.com` | `RanviFaculty@2026!` |
| **Enrolled Student** | `student@ranviinstitutions.com` | `RanviStudent@2026!` |

---

## 📂 Project Architecture

```
ranvi-institutions/
├── server/
│   ├── src/
│   │   ├── config/          # DB, Razorpay, Cloudinary, Env loaders
│   │   ├── controllers/     # Auth, Course, Exam, Zoom, Payment, Student, Admin
│   │   ├── middleware/      # Auth, RBAC, DeviceSession, RateLimit, ErrorHandler
│   │   ├── models/          # 14 Mongoose Data Models
│   │   ├── routes/          # Express REST API Endpoints (/api/v1/...)
│   │   └── app.js           # Express App entry point
│   ├── scripts/
│   │   ├── seed.js          # Master database seeder
│   │   └── testRunner.js    # 21-suite test runner
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, PageBanner, CourseCard, ZoomJoin, etc.
│   │   ├── context/         # AuthContext (with device watchdog), ToastContext
│   │   ├── layouts/         # PublicLayout, StudentLayout, AdminLayout
│   │   ├── pages/
│   │   │   ├── public/      # Home, BankersPath, CompetitiveExams, CourseDetails, etc.
│   │   │   ├── student/     # Dashboard, Player, LiveClasses, ExamTake, Result, etc.
│   │   │   └── admin/       # Analytics, Courses, Exams, Students, Payments, Logs, etc.
│   │   ├── services/        # Axios API client & modular service layer
│   │   └── App.jsx          # Master React Router v6 setup
│   └── package.json
│
└── docs/
    ├── API.md               # Complete REST API specification
    ├── DEPLOYMENT.md        # Production deployment guide (Render, Vercel, VPS)
    ├── ADMIN_GUIDE.md       # Operational handbook for Ranvi administrators
    ├── PAYMENT_SETUP.md     # Razorpay account & webhook configuration guide
    └── EXAM_IMPORT_TEMPLATE.csv # Sample question format for bulk exam uploads
```

---

## 🛡️ License & Copyright

© 2026 **RANVI INSTITUTIONS**. All rights reserved. Built with precision for banking and competitive examinations aspirants.
