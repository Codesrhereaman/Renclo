const { getDB, getAuth } = require('../config/firebase');
const COLLECTIONS = require('../config/collections');
const { asyncHandler } = require('../middleware/errorHandler');

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
});

// ─── POST /api/auth/sync-profile ─────────────────────────────────────────────
// Called after Firebase signup to create/merge Firestore profile

const syncProfile = asyncHandler(async (req, res) => {
  try {
    const db = getDB();
    const { uid } = req.firebaseUser;
    const { fullName, phone, photoUrl } = req.body;

    const userRef = db.collection(COLLECTIONS.USERS).doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // First-time: create full profile
      const profile = {
        uid,
        email: req.firebaseUser.email || '',
        fullName: fullName || req.firebaseUser.name || req.firebaseUser.email?.split('@')[0] || 'User',
        phone: phone || req.firebaseUser.phone_number || '',
        photoUrl: photoUrl || req.firebaseUser.picture || '',
        gender: null,
        role: 'user',
        isActive: true,
        authProvider: (req.firebaseUser.firebase && req.firebaseUser.firebase.sign_in_provider) || 'password',
        addresses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Use transaction to ensure atomicity
      await db.runTransaction(async (transaction) => {
        transaction.set(userRef, profile);
        transaction.set(db.collection(COLLECTIONS.CARTS).doc(uid), { uid, items: [], updatedAt: new Date().toISOString() });
        transaction.set(db.collection(COLLECTIONS.WISHLISTS).doc(uid), { uid, productIds: [], updatedAt: new Date().toISOString() });
      });

      return res.status(201).json({ success: true, message: 'Profile created', data: { user: profile } });
    }

    // Update only provided fields
    const updates = { updatedAt: new Date().toISOString() };
    if (fullName) updates.fullName = fullName;
    if (phone !== undefined) updates.phone = phone;
    if (photoUrl) updates.photoUrl = photoUrl;

    await userRef.update(updates);
    const updated = { ...userDoc.data(), ...updates };

    res.status(200).json({ success: true, message: 'Profile synced', data: { user: updated } });
  } catch (error) {
    console.error('Sync profile error:', error);
    throw error;
  }
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
// Firebase token revocation (optional but good for security)

const logout = asyncHandler(async (req, res) => {
  try {
    await getAuth().revokeRefreshTokens(req.firebaseUser.uid);
  } catch {
    // Non-fatal — client-side sign-out is sufficient
  }
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// ─── DELETE /api/auth/delete-account ─────────────────────────────────────────

const deleteAccount = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.firebaseUser.uid;

  // Soft delete Firestore profile
  await db.collection(COLLECTIONS.USERS).doc(uid).update({
    isActive: false,
    deletedAt: new Date().toISOString(),
  });

  // Delete Firebase Auth user
  await getAuth().deleteUser(uid);

  res.status(200).json({ success: true, message: 'Account deleted successfully' });
});

module.exports = { getMe, syncProfile, logout, deleteAccount };
