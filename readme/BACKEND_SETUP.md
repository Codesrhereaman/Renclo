# 🚀 Backend Installation Quick Start

## Prerequisites
- Node.js 16+ installed
- Cloudinary account (free at https://cloudinary.com)
- Firebase project already set up

## ⚡ 3-Step Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
Edit `backend/.env`:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 3: Start Server
```bash
npm run dev
```

## ✅ What Was Added

### New Files (7 files):
```
backend/
├── middleware/fileUpload.js          (Multer configuration)
├── services/cloudinaryService.js     (Image upload/delete)
├── controllers/virtualClosetController.js  (Business logic)
├── routes/virtualClosetRoutes.js     (API endpoints)
└── (updated config/collections.js, .env.example, package.json, server.js)

src/
└── services/virtualClosetApi.js      (Frontend API calls)
```

### New Dependencies:
- `cloudinary` - Cloud image storage
- `multer` - File upload handling

### New API Endpoints:
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/virtual-closet/upload` | Upload new look |
| GET | `/api/virtual-closet` | Get all looks |
| GET | `/api/virtual-closet/:id` | Get single look |
| PUT | `/api/virtual-closet/:id` | Update look |
| DELETE | `/api/virtual-closet/:id` | Delete look |

## 🔧 Cloudinary Setup (2 min)

1. Go to https://cloudinary.com/users/register/free
2. Sign up (free tier available)
3. Go to Account Settings → API Keys
4. Copy values to `.env`

## ✨ Features

✅ Persistent image storage (Cloudinary)
✅ Database persistence (Firestore)  
✅ Real-time upload with progress
✅ Auto-delete from Cloudinary when removed
✅ User-isolated data (each user has own collection)
✅ Full error handling

## 🧪 Quick Test

```javascript
// In browser console (once logged in):
const token = await firebase.auth().currentUser.getIdToken();
fetch('http://localhost:5000/api/virtual-closet', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(console.log);
```

## 📊 Database Structure

Firestore: `users/{uid}/virtual_closet/{lookId}`
```json
{
  "occasion": "Summer Getaway",
  "tags": ["Beach", "Relaxed"],
  "image": {
    "secure_url": "https://res.cloudinary.com/.../image.jpg",
    "public_id": "renclo/virtual-closet/...",
    "width": 1000,
    "height": 1500
  },
  "isAIMatched": true,
  "createdAt": "2026-04-03T12:00:00Z"
}
```

## 🎯 Ready to Use!

Frontend component automatically calls backend APIs:
- Upload button sends to `/api/virtual-closet/upload`
- Delete button calls `/api/virtual-closet/:id`
- Page load fetches from `/api/virtual-closet`

No additional config needed on frontend! 🎉

---

For detailed API docs, see: `VIRTUAL_CLOSET_BACKEND.md`
