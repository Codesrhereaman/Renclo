# 🚀 Virtual Closet Backend - Quick Reference

## Installation (3 commands)
```bash
cd backend
npm install
npm run dev
```

## Configuration
```bash
# Copy template
cp .env.example .env

# Add these (get from Cloudinary):
CLOUDINARY_CLOUD_NAME=your-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

---

## 📡 API Quick Calls

### Upload
```bash
curl -X POST http://localhost:5000/api/virtual-closet/upload \
  -H "Authorization: Bearer TOKEN" \
  -F "image=@image.jpg"
```

### Get All
```bash
curl http://localhost:5000/api/virtual-closet \
  -H "Authorization: Bearer TOKEN"
```

### Delete
```bash
curl -X DELETE http://localhost:5000/api/virtual-closet/id \
  -H "Authorization: Bearer TOKEN"
```

---

## 📂 Files Created

```
backend/
├── middleware/fileUpload.js
├── services/cloudinaryService.js
├── controllers/virtualClosetController.js
└── routes/virtualClosetRoutes.js

src/
└── services/virtualClosetApi.js
```

---

## 🔑 Key Environment Variables

| Variable | Example | From |
|----------|---------|------|
| `CLOUDINARY_CLOUD_NAME` | `my-cloud` | Cloudinary Account |
| `CLOUDINARY_API_KEY` | `123456789` | Cloudinary Account |
| `CLOUDINARY_API_SECRET` | `secret123` | Cloudinary Account |
| `FIREBASE_PROJECT_ID` | `my-project` | Firebase Console |

---

## 🗄️ Firestore Path

```
users/{uid}/virtual_closet/{lookId}
```

Each user's looks isolated in subcollection.

---

## 🔄 Data Flow

```
Upload Button
    ↓
File Input → Multer Buffer
    ↓
Cloudinary Upload → Secure URL
    ↓
Save to Firestore (/users/{uid}/virtual_closet/)
    ↓
Return to Frontend
```

---

## 📊 Response Example

```json
{
  "success": true,
  "data": {
    "id": "doc123",
    "occasion": "Summer",
    "image": {
      "secure_url": "https://res.cloudinary.com/...",
      "public_id": "wardrowave/..."
    },
    "tags": ["Beach"],
    "isAIMatched": true,
    "createdAt": "2026-04-03T12:00:00Z"
  }
}
```

---

## ✅ Endpoints

| Method | Path | What it does |
|--------|------|-------------|
| POST | `/upload` | Upload image |
| GET | `/` | Get all looks |
| GET | `/:id` | Get one look |
| PUT | `/:id` | Update metadata |
| DELETE | `/:id` | Delete look |

---

## 🐛 Debugging

```javascript
// Check token
const token = await user.getIdToken();
console.log(token);

// Check API response
const response = await fetch('http://localhost:5000/api/virtual-closet', {
  headers: { 'Authorization': `Bearer ${token}` }
});
console.log(await response.json());

// Check browser network tab for status codes
```

---

## 🚨 Common Errors

| Error | Fix |
|-------|-----|
| CLOUDINARY_CLOUD_NAME undefined | Add to `.env` |
| 401 Unauthorized | Check Firebase token |
| File too large (413) | Max 5MB, compress image |
| 404 Not Found | Check look ID |

---

## 📱 Frontend Integration

Already set up! Just use:

```javascript
import virtualClosetApi from '../../services/virtualClosetApi';

// Upload
await virtualClosetApi.uploadLook(file, { occasion: 'Summer' });

// Fetch
const looks = await virtualClosetApi.getVirtualCloset();

// Delete
await virtualClosetApi.deleteLook(lookId);
```

---

## 🔐 Auth Notes

- Frontend sends: `Authorization: Bearer <firebase-token>`
- Backend verifies token
- Backend uses `uid` from token
- Each user sees only their own looks
- Public ID used to delete from Cloudinary

---

## 📦 Dependencies Added

```json
{
  "cloudinary": "^1.40.0",
  "multer": "^1.4.5-lts.1"
}
```

---

## ✨ Done!

Backend fully functional. Deploy and watch closets grow! 👗✨
