const { getDB } = require('../config/firebase');
const COLLECTIONS = require('../config/collections');
const { asyncHandler } = require('../middleware/errorHandler');

// ─── GET /api/users/profile ───────────────────────────────────────────────────

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
});

// ─── PUT /api/users/profile ───────────────────────────────────────────────────

const updateProfile = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;
  const { fullName, phone } = req.body;

  if (!fullName && phone === undefined) {
    return res.status(400).json({ success: false, message: 'No fields to update' });
  }

  const updates = { updatedAt: new Date().toISOString() };
  if (fullName?.trim()) updates.fullName = fullName.trim();
  if (phone !== undefined) updates.phone = phone.trim();

  await db.collection(COLLECTIONS.USERS).doc(uid).update(updates);

  const updated = { ...req.user, ...updates };
  res.status(200).json({ success: true, message: 'Profile updated', data: { user: updated } });
});

// ─── GET /api/users/addresses ─────────────────────────────────────────────────

const getAddresses = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: { addresses: req.user.addresses || [] },
  });
});

// ─── POST /api/users/addresses ────────────────────────────────────────────────

const addAddress = asyncHandler(async (req, res) => {
  const db = getDB();
  const { v4: uuidv4 } = require('uuid');
  const { fullName, phone, addressLine1, addressLine2, city, state, pincode, country, label, isDefault } = req.body;

  if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
    return res.status(400).json({ success: false, message: 'Missing required address fields' });
  }

  const newAddress = {
    id: uuidv4(),
    label: label || 'Home',
    fullName: fullName.trim(),
    phone: phone.trim(),
    addressLine1: addressLine1.trim(),
    addressLine2: addressLine2?.trim() || '',
    city: city.trim(),
    state: state.trim(),
    pincode: pincode.trim(),
    country: country || 'India',
    isDefault: !!isDefault,
  };

  const userRef = db.collection(COLLECTIONS.USERS).doc(req.user.uid);
  let addresses = req.user.addresses || [];

  // If setting as default, clear all others
  if (isDefault) addresses = addresses.map(a => ({ ...a, isDefault: false }));
  addresses.push(newAddress);

  await userRef.update({ addresses, updatedAt: new Date().toISOString() });

  res.status(201).json({ success: true, message: 'Address added', data: { addresses } });
});

// ─── PUT /api/users/addresses/:addressId ─────────────────────────────────────

const updateAddress = asyncHandler(async (req, res) => {
  const db = getDB();
  const { addressId } = req.params;
  let addresses = req.user.addresses || [];
  const idx = addresses.findIndex(a => a.id === addressId);

  if (idx === -1) return res.status(404).json({ success: false, message: 'Address not found' });

  if (req.body.isDefault) addresses = addresses.map(a => ({ ...a, isDefault: false }));
  addresses[idx] = { ...addresses[idx], ...req.body, id: addressId };

  await db.collection(COLLECTIONS.USERS).doc(req.user.uid).update({ addresses, updatedAt: new Date().toISOString() });
  res.status(200).json({ success: true, message: 'Address updated', data: { addresses } });
});

// ─── DELETE /api/users/addresses/:addressId ───────────────────────────────────

const deleteAddress = asyncHandler(async (req, res) => {
  const db = getDB();
  const { addressId } = req.params;
  const addresses = (req.user.addresses || []).filter(a => a.id !== req.params.addressId);

  await db.collection(COLLECTIONS.USERS).doc(req.user.uid).update({ addresses, updatedAt: new Date().toISOString() });
  res.status(200).json({ success: true, message: 'Address deleted', data: { addresses } });
});

module.exports = { getProfile, updateProfile, getAddresses, addAddress, updateAddress, deleteAddress };
