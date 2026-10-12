# RANVI INSTITUTIONS — REST API SPECIFICATION (v1)

Base URL: `/api/v1`

---

## 1. Authentication & Session Security (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Registers a student, binds device, returns JWT |
| `POST` | `/auth/login` | Public | Logs in student/admin, invalidates older device session |
| `POST` | `/auth/logout` | Authenticated | Revokes active device session & clears cookie |
| `GET` | `/auth/me` | Authenticated | Returns current profile, roles, demo limits |
| `PUT` | `/auth/profile` | Authenticated | Updates student name, phone, target exam |
| `PUT` | `/auth/change-password` | Authenticated | Updates student password |

---

## 2. Courses & Categories (`/api/v1/courses`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/courses` | Public | List courses with division & category filters |
| `GET` | `/courses/categories` | Public | List categories by division |
| `GET` | `/courses/:slug` | Public / Optional Auth | Full course details with user entitlement state |
| `POST` | `/courses` | Super Admin / Admin | Create new course program |
| `PUT` | `/courses/:id` | Super Admin / Admin | Update course metadata |
| `DELETE` | `/courses/:id` | Super Admin / Admin | Unpublish course |

---

## 3. Recorded Lessons (`/api/v1/lessons`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/lessons/course/:courseId` | Public / Optional Auth | List lessons with locked/unlocked indicators |
| `GET` | `/lessons/playback/:lessonId` | Single-Device Guarded | Stream lesson video (free demo or verified enrolment) |
| `POST` | `/lessons` | Admin / Faculty | Add recorded lesson asset |
| `PUT` | `/lessons/:id` | Admin / Faculty | Update lesson metadata |
| `DELETE` | `/lessons/:id` | Admin | Delete lesson |

---

## 4. Live Classes (Zoom) (`/api/v1/live-classes`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/live-classes/student` | Single-Device Guarded | Authorized Zoom classes for enrolled courses |
| `GET` | `/live-classes` | Admin / Faculty | List all upcoming and historical live batches |
| `POST` | `/live-classes` | Admin / Faculty | Schedule Zoom live class (validates Zoom URL) |
| `PUT` | `/live-classes/:id` | Admin / Faculty | Edit live class details |
| `PUT` | `/live-classes/:id/cancel` | Admin / Faculty | Cancel class and notify enrolled students |

---

## 5. Mock Tests & Examinations (`/api/v1/mock-tests` & `/api/v1/exam-attempts`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/mock-tests` | Public | List 10–20 model papers with filters |
| `GET` | `/mock-tests/:slug` | Public | Get model paper specifications |
| `POST` | `/mock-tests` | Admin | Create model test paper |
| `POST` | `/mock-tests/:id/questions` | Admin | Add MCQ with answer key & explanation |
| `POST` | `/exam-attempts/start/:mockTestId` | Single-Device Guarded | Start exam / resume session (strips answer keys) |
| `POST` | `/exam-attempts/save-response/:attemptId` | Single-Device Guarded | Autosave question answer idempotently |
| `POST` | `/exam-attempts/submit/:attemptId` | Single-Device Guarded | Submit exam & trigger backend scoring |
| `GET` | `/exam-attempts/result/:attemptId` | Single-Device Guarded | Get detailed scorecard & full explanations |
| `GET` | `/exam-attempts/my-history` | Single-Device Guarded | Get student's previous test history |

---

## 6. Payments & Razorpay (`/api/v1/payments`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/payments/checkout` | Student | Create Razorpay order for course/package |
| `POST` | `/payments/verify` | Student | Authoritative cryptographic signature verification |
| `POST` | `/payments/webhook` | Gateway Webhook | Raw webhook signature verification & idempotency |
| `GET` | `/payments/my-history` | Student | Get transaction history and receipts |
| `GET` | `/payments/admin/all` | Admin | View transaction ledger and revenue |
| `POST` | `/payments/admin/grant-manual` | Admin | Manually grant course access with audit reason |

---

## 7. Enquiries & Leads (`/api/v1/enquiries`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/enquiries` | Public (Rate Limited) | Submit demo registration or general enquiry |
| `GET` | `/enquiries/admin` | Admin | Manage incoming leads with search & filters |
| `PUT` | `/enquiries/admin/:id` | Admin | Update status (New, Contacted, Converted, Closed) |

---

## 8. Admin Operations (`/api/v1/admin`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/admin/dashboard-stats` | Admin | Aggregated platform metrics and recent activity |
| `GET` | `/admin/students` | Admin | Student directory with active device metadata |
| `POST` | `/admin/students/:id/reset-device` | Admin | Reset registered device with audit log |
| `PUT` | `/admin/students/:id/toggle-status` | Admin | Suspend or reactivate student account |
| `GET` | `/admin/audit-logs` | Admin | Immutable security audit trail |
