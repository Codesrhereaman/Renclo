# Vercel Environment Variables Setup Guide

## ⚠️ Critical: Firebase Private Key Formatting

Your error indicates the `FIREBASE_PRIVATE_KEY` is not being recognized on Vercel. This is a **formatting issue**, not a missing credential.

---

## 🔑 How to Set FIREBASE_PRIVATE_KEY on Vercel

### **Step 1: Get Your Firebase Private Key**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **renclo**
3. **Settings** → **Service Accounts** → **Firebase Admin SDK**
4. Click **Generate New Private Key**
5. A JSON file downloads (keep it safe!)
6. Open the JSON file and find the `private_key` field

Example:
```
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG...\n-----END PRIVATE KEY-----\n"
```

### **Step 2: Extract the Private Key**

Copy everything inside the quotes, including the `\n` characters. It should look like:
```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG...\n-----END PRIVATE KEY-----\n
```

### **Step 3: Add to Vercel Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **renclo** project
3. **Settings** → **Environment Variables**
4. Click **Add New**

**Key:** `FIREBASE_PRIVATE_KEY`

**Value:** Paste the entire key (with `\n` for newlines, NOT actual line breaks)

```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaCD7RmLtivy5e\n19QyO73n4K622vjsuwNe+Hxe8vjjo/nALWhoku3ImtG/4XsX9CaDBWxu0BN0AjIi\nu4IxAWQHxzO33v6joUfEDDbW5PVxQ+HpO3ruVdxboNsplAlrKZSUGAOBrN1ViOUY\nW5E5uAsnIC+HZm/K4piotD5Ks3uWGZvfBToSZmIfcT0qp/PxArhfJR/5GFUS6WXA\nmKxFxMuL00rZZFBHiHZmNjwj5PfH7wB56CKCPzD63aA+mYjW66KzYSNJjIWzTCIC\nUqevfXMl6WyhBKVQoiOGi321tRBFOOVDLLAw2VIgS13yl8sJ1+ebYe2+g9SbrqEf\nzlw2DdE/AgMBAAECggEALf31R98rYH5GScJ3FTK6bxCrCmVSu1jR1lsqw60X/Ny6\n15OXX9YzUtlLdNhOSWY405lcea/+hv6a2r0TUC+inyHvQuE+NjyTcanV/A9sbBAB\nVgNRHvYbMG7U0dLmhw1o1FlhPqiPhBk2krHQqKPYDKwzFOJU0gcb3w/Go8Z4yeXP\n+uv8mpPUSo2tCFCJFFHaim7yDb3AvYgGNsojSeAZOksliGqu1CeCkvke13hDpJbi\nS0gefiMdSGk/05xLwle/fl/D/kAfom4XeYnDidzNS3eb8Seh8BbR4nsZJEEUDOJv\nO3MHJXUEW6n8DdjI/qq78BCcZOcHkeo1LIVLFzkKrQKBgQDNOTjseclY+v2BwnrX\n/Cphzkh+lTOcy1z6BDW2QqNkK7fxTlhRlHJiqeI0cQfY4yGgDmU5md3BYsvQ9iJt\nEXYEsVHh3YQZ/Sj+RRgV+1Kt/GxwQmH6fTzJTWjNhpi/WeOGMdTtLvGH/3rlOk+a\nn4C6X7exZJvIvBJrawht841Z/QKBgQDAJJXJ/pIgeDYsIwXFs1R9ksj80359JN0v\n/DJ6Jjmfzp7rlFhzb0HDJIabxNm3wwKs3SofnvLTmCrR4bjjQr+AWVdJxK07gK/Q\ndLRHY26bKh4P7JcF2w8JPXj1H3RvI8bse1n3AMc5RcluMof68TwzIRZ3OkmiP4Ti\nCsvB5B/u6wKBgGkJe6gVIUfolq2+Y29+ghazJQmcxeDfeUQBuZgCfWw8sBXSmoOO\nrgjvmHZsz65jegdYttiHdyeOsHDQOYiHYlc+hoFLBlzi5QNXS9+cVZH1W28NmuZB\nCUai1xwyYqW1lS1O/gMzfq2zxivi73FdZ958NSGXM+DG2cqe6p6UBGnlAoGBAKoc\n+f0PhQJ4S8YB7+9cWTagSZAGE5vqkmYUjAA3bZc+ENeTzEfPPdLuuLqaqwOWBP1V\nBiFe0bBira6KgO28P937u1tVZOYkhgQx/xahQuDfhiQlHISTsJlGspubELQBYfIn\nN7yHFNtxHOiSlm+nOtwttD00/tJGGHkkg8eTGG6nAoGAPiLKsde+Nyrh66mBif0O\nEpUfkwNHV9Oh2eTNTCDuu7d5NnascpuRpNvR8fw3O129JqNHcyVgH20GTfbqWtA2\nYDZI6F9QB5+FqAxUJxlmmEje/PpAp1m8G3thMeRcXnRsUpEbCs/uGG3VsrGLbRNy\njFo9wHf/65SWisZsDTS4Alo=\n-----END PRIVATE KEY-----\n
```

✅ **Environments:** Production, Preview, Development (select all)

✅ **Click Save**

---

## 📋 Complete Environment Variables Checklist

Set **ALL** of these in Vercel Dashboard:

| Variable | Value | Example |
|----------|-------|---------|
| `FIREBASE_PROJECT_ID` | From Firebase | `renclo` |
| `FIREBASE_CLIENT_EMAIL` | From private key JSON | `firebase-adminsdk-fbsvc@renclo.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | From private key JSON (with `\n`) | `-----BEGIN PRIVATE KEY-----\n...` |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary | `dmitw2oim` |
| `CLOUDINARY_API_KEY` | From Cloudinary Settings | `385173919675395` |
| `CLOUDINARY_API_SECRET` | From Cloudinary Settings | `cteEl4Awwqd6sMTkIwby3V4t05s` |
| `FRONTEND_URL` | Your deployed URL | `https://your-app.vercel.app` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX` | Max requests per window | `200` |

---

## 🔍 Verify Variables Are Set

```bash
# After setting variables, redeploy:
# 1. Go to Vercel Dashboard
# 2. Select your project
# 3. Deployments → Click latest deployment
# 4. Redeploy (or push a new commit)
```

Check deployment logs:
- **Dashboard** → **Deployments** → Click deployment → **View Logs**

You should see:
```
✅ Firebase Admin SDK initialized
✅ Cloudinary: Configuration valid
🚀 Server running
```

---

## ❌ Common Issues & Fixes

### **Issue: "Invalid authentication credentials" (Error 16)**

**Cause:** `FIREBASE_PRIVATE_KEY` is missing or incorrectly formatted

**Fix:**
1. Verify key is in Vercel Dashboard
2. Check it includes `\n` for newlines (NOT actual line breaks)
3. Key should start with `-----BEGIN PRIVATE KEY-----`
4. Key should end with `-----END PRIVATE KEY-----\n`
5. Redeploy after fixing

### **Issue: "Cannot GET /api/products"**

**Cause:** Backend not receiving Firebase authentication

**Fix:**
- Check all 3 Firebase variables are set
- Verify `FIREBASE_PROJECT_ID` matches your Firebase project name
- Verify `FIREBASE_CLIENT_EMAIL` matches the service account

### **Issue: "Cloudinary configuration missing"**

**Cause:** Cloudinary variables not set in Vercel

**Fix:**
1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Find **API Keys** in Settings
3. Copy `Cloud Name`, `API Key`, `API Secret`
4. Add to Vercel Environment Variables
5. Redeploy

---

## 🚀 Deployment Workflow

After setting environment variables:

```bash
# 1. Optional: Push a dummy commit to trigger redeployment
git add .
git commit -m "chore: trigger Vercel redeployment"
git push origin main

# OR
# 2. Manually redeploy in Vercel Dashboard
#    Deployments → Click latest → Redeploy button
```

Wait 2-3 minutes for deployment to complete.

---

## 🧪 Test Your Deployment

```bash
# Test if API is responding
curl https://your-app.vercel.app/api/products

# Should return JSON (not 500 error)
# If you see Firebase auth error, check environment variables
```

---

## 📞 Still Getting Error 16?

The error `UNAUTHENTICATED: Request had invalid authentication credentials` means Firebase can't authenticate the request.

**Debug steps:**
1. ✅ All 3 Firebase variables set in Vercel
2. ✅ FIREBASE_PRIVATE_KEY has `\n` (literal backslash-n), not actual newlines
3. ✅ No quotes around the key value
4. ✅ Key starts with `-----BEGIN PRIVATE KEY-----`
5. ✅ Key ends with `-----END PRIVATE KEY-----\n`
6. ✅ Redeploy after changes
7. ✅ Check **Deployments → View Logs** for detailed error

If still failing, the private key may be corrupted. Generate a new one from Firebase Console.

---

## 🔐 Security Reminder

- **Never commit `.env` files to git**
- **Never paste secrets in code comments**
- **Use Vercel's encrypted environment variables only**
- **Rotate keys if accidentally exposed**

Your `.env` file is already in `.gitignore` ✅
