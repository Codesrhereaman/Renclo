# Vercel Configuration for Multiple Services (Frontend + Backend)

## 📋 Overview

Your Renclo project has **2 services**:
1. **Frontend:** React + Vite (builds to `dist/`)
2. **Backend API:** Express.js (runs as serverless function via `api/index.js`)

The enhanced `vercel.json` ensures both services work seamlessly together.

---

## 🔧 Enhanced vercel.json Configuration

### **1. Build Configuration**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install && cd backend && npm install && cd .."
}
```

- **buildCommand:** Runs Vite to build React frontend
- **outputDirectory:** Frontend output directory (dist/)
- **installCommand:** Installs dependencies for BOTH root and backend

### **2. Builds Array (Multi-service)**

```json
"builds": [
  {
    "src": "package.json",
    "use": "@vercel/static-build",
    "config": { "distDir": "dist" }
  },
  {
    "src": "api/index.js",
    "use": "@vercel/node",
    "config": { "includeFiles": "backend/**" }
  }
]
```

- **Static build:** Handles React frontend from `dist/`
- **Node function:** Runs Express backend in `api/index.js`
- **includeFiles:** Ensures backend folder is included in deployment

### **3. Routes Configuration**

Routes are matched in order and send requests to the correct service:

```json
"routes": [
  {
    "src": "/api/auth/.*",
    "dest": "/api/index.js",
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH"]
  },
  {
    "src": "/(.*\\..*)",
    "dest": "/dist/$1"
  },
  {
    "src": "/(.*)",
    "dest": "/dist/index.html"
  }
]
```

**Flow:**
1. `/api/*` → Express backend
2. `/file.js`, `/style.css` → Static files from frontend
3. `/anything-else` → React Router (SPA)

### **4. Function Configuration**

```json
"functions": {
  "api/index.js": {
    "memory": 1024,
    "maxDuration": 30,
    "runtime": "nodejs20.x"
  }
}
```

- **memory:** 1GB allocated
- **maxDuration:** 30 seconds per request
- **runtime:** Node.js 20.x (latest stable)

### **5. Headers (CORS & Caching)**

```json
"headers": [
  {
    "source": "/api/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "no-cache, no-store, must-revalidate"
      }
    ]
  }
]
```

- **API routes:** No caching (always fresh data)
- **Static files:** 1 hour cache
- **CORS headers:** Allow cross-origin requests

### **6. Environment Variables**

```json
"envPrefix": [
  "FIREBASE_",
  "CLOUDINARY_",
  "RATE_LIMIT_",
  "PORT",
  "FRONTEND_URL"
]
```

Variables prefixed with these names are automatically available in functions.

---

## 📦 Deployment Structure

```
Root (Vercel Project)
├── dist/                    ← Frontend (built by Vite)
│   ├── index.html
│   ├── assets/
│   └── ...
├── backend/                 ← Backend code
│   ├── server.js
│   ├── controllers/
│   ├── routes/
│   └── package.json
├── api/
│   └── index.js            ← Serverless function entry point
├── package.json            ← Root dependencies
└── vercel.json             ← Configuration
```

---

## 🚀 Deployment Steps

### **Step 1: Push Code to GitHub**

```bash
git add .
git commit -m "feat: enhance vercel.json for multiple services"
git push origin main
```

### **Step 2: Connect to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects the configuration

### **Step 3: Add Environment Variables**

In Vercel Dashboard → Settings → Environment Variables, add:

```
FIREBASE_PROJECT_ID=renclo
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@renclo.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvg...\n-----END PRIVATE KEY-----\n
CLOUDINARY_CLOUD_NAME=doiyd6zkx
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=200
PORT=5000
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

### **Step 4: Deploy**

Vercel automatically deploys when you push to main.

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend loads at `https://your-app.vercel.app`
- [ ] API responds at `https://your-app.vercel.app/api/health`
- [ ] Login works (`/api/auth/login`)
- [ ] Products load (`/api/products`)
- [ ] Image upload works (Cloudinary integration)
- [ ] Virtual Closet functions (`/api/virtual-closet`)

---

## 🔍 Debugging Common Issues

### **Issue: "Cannot GET /api/something"**
- Routes in `vercel.json` didn't match
- Check exact route paths in backend
- Verify `/api/.*` is in routes array

### **Issue: "Frontend shows blank page"**
- Vite build failed
- Check build logs in Vercel dashboard
- Verify `vite.config.mjs` configuration

### **Issue: "Image upload fails"**
- Environment variables missing
- Check if `CLOUDINARY_*` vars are set in Vercel
- Verify values match your Cloudinary account

### **Issue: "CORS error"**
- API not sending correct headers
- Check `headers` section in `vercel.json`
- Verify backend CORS middleware is active

---

## 📊 Performance Optimization

### Recommended Updates:

```json
{
  "functions": {
    "api/index.js": {
      "memory": 1024,
      "maxDuration": 30,
      "runtime": "nodejs20.x",
      "concurrency": 100
    }
  }
}
```

- **concurrency:** Handle up to 100 concurrent requests

---

## 🔐 Security Best Practices

1. **Environment Variables:**
   - Never hardcode secrets in code
   - Use Vercel's secure vault
   - Rotate keys every 3 months

2. **CORS Settings:**
   - Restrict to your frontend domain
   - Update `FRONTEND_URL` for each environment

3. **Rate Limiting:**
   - Currently set to 200 requests per 15 minutes
   - Adjust based on traffic patterns

4. **Headers:**
   - Don't cache API responses
   - Enable security headers for frontend

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Runtime](https://vercel.com/docs/concepts/functions/serverless-functions/node-js)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

## 🆘 Need Help?

If deployment fails:

1. **Check Vercel Logs:**
   - Dashboard → Project → Deployments
   - Click failed deployment → View Logs

2. **Verify Environment Variables:**
   - Dashboard → Settings → Environment Variables
   - Ensure all required variables are present

3. **Test Locally:**
   ```bash
   npm run build
   npm run preview
   ```

4. **Contact Support:**
   - Include error logs from Vercel dashboard
   - Mention which service is failing (frontend/backend)
