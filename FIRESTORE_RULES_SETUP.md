# Firestore Security Rules Setup

The metadata is not being stored in Firestore because **Firestore Security Rules** are preventing write access to the `virtual_closet` subcollection.

## 🔐 Problem
By default, Firestore has restrictive security rules that deny all read/write access. You must explicitly allow authenticated users to write to their own `users/{uid}/virtual_closet` subcollection.

## ✅ Solution: Deploy Security Rules

### Step 1: Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### Step 2: Authenticate with Firebase
```bash
firebase login
```
This opens a browser and authenticates you with your Firebase account.

### Step 3: Initialize Firebase in your project (if not done)
```bash
cd c:\Users\patha\OneDrive\Desktop\clothrental\WardroWave2.0
firebase init
```
When prompted:
- Select: **Firestore** 
- Choose your existing **wardrowave** project
- Use default file names (firestore.rules and firestore.indexes.json)

### Step 4: Deploy the Rules
```bash
firebase deploy --only firestore:rules
```

This deploys the rules from `firestore.rules` file to your Firebase project.

**Expected output:**
```
✔  Firestore: rules updated successfully
```

---

## 📋 What the Rules Allow

The security rules in `firestore.rules` allow:

✅ **Authenticated users can:**
- Read their own profile (`users/{uid}`)
- Create/Read/Update/Delete their own Virtual Closet looks (`users/{uid}/virtual_closet/{lookId}`)
- Manage their own addresses, carts, wishlists, and orders

❌ **No access to:**
- Other users' data
- Unauthenticated (non-logged-in) users

---

## 🧪 Test After Deployment

1. **Restart the backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```

3. **Test the upload:**
   - Log in with your Firebase account
   - Go to Profile > Virtual Closet
   - Click "New AI Try-On"
   - Upload an image

4. **Check backend logs:**
   - You should see:
   ```
   📤 Starting upload for user {uid}
   ✅ Cloudinary upload complete: wardrowave/virtual-closet/...
   📝 Preparing Firestore write for collection: users/{uid}/virtual_closet
   ✅ Firestore document created with ID: {docId}
   ```

5. **Verify in Firestore Console:**
   - Go to [Firebase Console](https://console.firebase.google.com) → wardrowave project
   - Firestore → Database → Collection: `users` → Your UID → Collection: `virtual_closet`
   - You should see the document with metadata

---

## 🛠️ Troubleshooting

If you still don't see metadata after deployment:

### Check 1: Verify Rules Were Deployed
```bash
firebase firestore:indexes --list
```

### Check 2: Check Console for Errors
In your browser, open **Firebase Console → Firestore → Rules**, verify the rules are showing correctly.

### Check 3: Check Backend Logs
Look for errors in the terminal running `npm run dev`:
- `permission-denied` = Rules issue (deploy rules as above)
- `not-found` = User profile doesn't exist (ensure user logs in first)
- Other errors = Check error message for details

### Check 4: Reset Firestore (Development Only)
If you want to start fresh:
1. Go to Firebase Console → Firestore
2. Click **...** → Delete database
3. Recreate it
4. Redeploy rules: `firebase deploy --only firestore:rules`

---

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `firestore.rules` | Security rules that allow authenticated users to manage their data |
| `backend/controllers/virtualClosetController.js` | Handles upload and stores metadata |
| `backend/middleware/auth.js` | Verifies Firebase token before allowing uploads |

---

## ✨ Summary

**TL;DR:**
1. Run: `firebase deploy --only firestore:rules`
2. Restart backend: `npm run dev`
3. Test upload again
4. Metadata should now appear in Firestore under `users/{uid}/virtual_closet`
