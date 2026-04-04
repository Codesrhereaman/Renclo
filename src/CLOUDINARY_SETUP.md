# Cloudinary Image Upload Integration Guide

This guide shows how to use the image upload features in your Renclo application.

## 1. Setup Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Create a free account
3. In Settings → Upload:
   - Get your **Cloud Name**
   - Create an **Upload Preset** with:
     - Mode: Unsigned ✓
     - Allowed formats: jpg, png, gif, webp, etc.

## 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
VITE_FIRESTORE_IMAGES_COLLECTION=images
```

Replace:
- `your_cloud_name_here` → Your Cloudinary Cloud Name (e.g., "dj5xyz1a9")
- `your_upload_preset_here` → Your unsigned upload preset name (e.g., "renclo_upload")

## 3. Usage Examples

### Option 1: Using ImageUpload Component (Recommended)

```jsx
import ImageUpload from "./components/common/ImageUpload";
import { useAuth } from "./context api/AuthContext";

function MyPage() {
  const { user } = useAuth();

  const handleUploadSuccess = (uploadedData) => {
    console.log("Uploaded:", uploadedData.url);
  };

  return (
    <ImageUpload
      userId={user.uid}
      onSuccess={handleUploadSuccess}
      maxSizeMB={2}
      actionText="Upload Profile Photo"
      metadata={{ uploadType: "profile" }}
    />
  );
}
```

### Option 2: Using useImageUpload Hook

```jsx
import { useImageUpload } from "./hooks/useImageUpload";
import { useAuth } from "./context api/AuthContext";

function MyComponent() {
  const { user } = useAuth();
  const { 
    file, 
    preview, 
    loading, 
    upload, 
    validateAndSetFile, 
    reset 
  } = useImageUpload(user.uid);

  const handleChange = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const result = await upload(null, { category: "product" });
      console.log("Uploaded successfully:", result.url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*" />
      {preview && <img src={preview} alt="preview" className="max-w-xs" />}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
```

### Option 3: Direct Service Usage

```jsx
import { uploadToCloudinary } from "./services/cloudinary";
import { saveImageData } from "./services/firestore";

const handleUpload = async (file, userId) => {
  try {
    // Upload to Cloudinary
    const cloudinaryData = await uploadToCloudinary(file);
    
    // Save metadata to Firestore
    const docId = await saveImageData(
      cloudinaryData.secure_url,
      userId,
      { customField: "value" }
    );
    
    console.log("Image URL:", cloudinaryData.secure_url);
    console.log("Document ID:", docId);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

## 4. Displaying Images with Gallery

```jsx
import ImageGallery from "./components/common/ImageGallery";
import { useAuth } from "./context api/AuthContext";

function GalleryPage() {
  const { user } = useAuth();

  const handleImageSelect = (image) => {
    console.log("Selected image:", image.imageUrl);
  };

  return (
    <div>
      <h2>My Uploads</h2>
      <ImageGallery 
        userId={user.uid}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
}
```

## 5. Services API Reference

### Cloudinary Service (`services/cloudinary.js`)

```js
// Validate image file
validateImageFile(file, maxSizeMB = 2)
// Returns: { valid: boolean, error: string|null }

// Upload to Cloudinary
uploadToCloudinary(file)
// Returns: Promise<{ secure_url, public_id, height, width, format, bytes }>
```

### Firestore Service (`services/firestore.js`)

```js
// Save image metadata
saveImageData(imageUrl, userId, metadata = {})
// Returns: Promise<docId>

// Get user's images
getUserImages(userId)
// Returns: Promise<Array<{ id, imageUrl, createdAt, ... }>>

// Get all images (admin)
getAllImages()
// Returns: Promise<Array<Image>>

// Delete image
deleteImageData(docId)
// Returns: Promise<void>

// Update image metadata
updateImageData(docId, updates)
// Returns: Promise<void>
```

## 6. File Validation Rules

- **Allowed formats**: jpg, png, gif, webp, etc.
- **Max size**: 2MB (configurable)
- **Dimensions**: No restrictions (but images are optimized by Cloudinary)

## 7. Security Notes

✅ **What's secure:**
- Unsigned upload preset prevents tampering
- Firestore rules should restrict access
- Cloudinary URLs are read-only public URLs

⚠️ **Best practices:**
- Set Firestore rules to only allow users to upload their own images
- Verify userId matches authenticated user in backend
- Consider image moderation for public content

Example Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /images/{document=**} {
      allow create: if request.auth.uid == request.resource.data.userId;
      allow read: if request.auth.uid == resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 8. Troubleshooting

**"Cloudinary configuration missing"**
- Check `.env` file has correct VITE_ prefix
- Restart dev server after changing .env

**"Only image files allowed"**
- File is not a valid image format
- Check file extension

**File too large**
- Image exceeds 2MB limit
- Compress image or increase maxSizeMB parameter

**Upload works but image not in gallery**
- Check Firestore rules allow write access
- Verify userId matches authenticated user

## 9. Next Steps

1. Set up Cloudinary account and upload preset
2. Add environment variables to `.env`
3. Import and use components in your pages
4. Test with profile photos, product images, etc.
5. Configure Firestore security rules

---

**Questions or issues?** Check the inline comments in service files.
