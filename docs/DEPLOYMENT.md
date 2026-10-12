# RANVI INSTITUTIONS — DEPLOYMENT & PRODUCTION GUIDE

This guide provides step-by-step instructions for deploying the Ranvi Institutions full-stack MERN platform on modern cloud infrastructure (Vercel/Netlify for Frontend, Render/Railway/AWS for Backend, and MongoDB Atlas).

---

## 1. Prerequisites & Cloud Accounts

- **Frontend Host**: Vercel, Netlify, or Cloudflare Pages.
- **Backend Host**: Render, Railway, AWS EC2, or DigitalOcean App Platform.
- **Database**: MongoDB Atlas (M0 Free or Production Dedicated Cluster).
- **Payment Gateway**: Razorpay Merchant Account (Test & Live API Keys).
- **Media Hosting**: Cloudinary Account.

---

## 2. MongoDB Atlas Configuration

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster (e.g. `ranvi-production-db`).
3. Under **Database Access**, create a user with `readWriteAnyDatabase` privileges.
4. Under **Network Access**, whitelist your server IPs or allow `0.0.0.0/0` for dynamic cloud hosts.
5. Copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/ranvi_institutions?retryWrites=true&w=majority
   ```

---

## 3. Backend Deployment (e.g., Render / Railway)

1. Create a **New Web Service** pointing to your repository `server` directory.
2. Set Environment: **Node.js**.
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. Configure Environment Variables in the Render Dashboard:

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Web port | `5000` |
| `MONGODB_URI` | Atlas MongoDB URI | `mongodb+srv://...` |
| `CLIENT_ORIGIN` | Deployed Frontend URL | `https://ranviinstitutions.com` |
| `JWT_ACCESS_SECRET` | 256-bit secret string | `<random_64_char_secret>` |
| `JWT_REFRESH_SECRET`| 256-bit secret string | `<random_64_char_secret>` |
| `COOKIE_DOMAIN` | Production domain | `.ranviinstitutions.com` |
| `RAZORPAY_KEY_ID` | Razorpay Key ID | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret | `...` |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook Secret | `...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Name | `ranvi-cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary Key | `...` |
| `CLOUDINARY_API_SECRET` | Cloudinary Secret | `...` |
| `INITIAL_ADMIN_EMAIL` | Super Admin Email | `admin@ranviinstitutions.com` |
| `INITIAL_ADMIN_PASSWORD` | Super Admin Password | `<StrongSecurePassword>` |

---

## 4. Frontend Deployment (e.g., Vercel)

1. Import Git repository on Vercel.
2. Set Root Directory to `client`.
3. Framework Preset: **Vite**.
4. Set Environment Variable:
   ```
   VITE_API_BASE_URL=https://api.ranviinstitutions.com/api/v1
   ```
5. Deploy.

---

## 5. Seed Initial Production Data

To populate the course catalog and model test papers on a fresh production database:
```bash
cd server
npm run seed
```
