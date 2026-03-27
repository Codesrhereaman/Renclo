const { getDB } = require('../config/firebase');
const COLLECTIONS = require('../config/collections');
const { asyncHandler } = require('../middleware/errorHandler');

// ─── GET /api/wishlist ────────────────────────────────────────────────────────

const getWishlist = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;

  const wishDoc = await db.collection(COLLECTIONS.WISHLISTS).doc(uid).get();
  if (!wishDoc.exists) {
    return res.status(200).json({ success: true, data: { items: [], productIds: [] } });
  }

  const productIds = wishDoc.data().productIds || [];

  // Enrich with current product data
  const items = await Promise.all(
    productIds.map(async (productId) => {
      const doc = await db.collection(COLLECTIONS.PRODUCTS).doc(productId).get();
      if (!doc.exists || !doc.data().isActive) return null;
      const p = doc.data();
      return {
        productId,
        id: doc.id,
        name: p.name,
        rentalPrice: p.rentalPrice,
        originalPrice: p.originalPrice,
        image: p.images?.[0]?.url || '',
        rating: p.rating,
        inStock: p.inStock,
        category: p.category,
        duration: p.duration,
      };
    })
  );

  const validItems = items.filter(Boolean);

  // Remove invalid product IDs
  if (validItems.length !== productIds.length) {
    const validIds = validItems.map(i => i.productId);
    await db.collection(COLLECTIONS.WISHLISTS).doc(uid).update({ productIds: validIds, updatedAt: new Date().toISOString() });
  }

  res.status(200).json({ success: true, data: { items: validItems, productIds: validItems.map(i => i.productId), count: validItems.length } });
});

// ─── POST /api/wishlist/toggle ────────────────────────────────────────────────

const toggleWishlist = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;
  const { productId } = req.body;

  if (!productId) return res.status(400).json({ success: false, message: 'productId is required' });

  const wishRef = db.collection(COLLECTIONS.WISHLISTS).doc(uid);
  const wishDoc = await wishRef.get();
  let productIds = wishDoc.exists ? (wishDoc.data().productIds || []) : [];

  let action;
  if (productIds.includes(productId)) {
    productIds = productIds.filter(id => id !== productId);
    action = 'removed';
  } else {
    // Validate product exists
    const prodDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(productId).get();
    if (!prodDoc.exists || !prodDoc.data().isActive) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    productIds.push(productId);
    action = 'added';
  }

  await wishRef.set({ uid, productIds, updatedAt: new Date().toISOString() }, { merge: true });

  res.status(200).json({
    success: true,
    message: `Product ${action} ${action === 'added' ? 'to' : 'from'} wishlist`,
    data: { action, inWishlist: action === 'added', count: productIds.length },
  });
});

// ─── POST /api/wishlist/add ───────────────────────────────────────────────────

const addToWishlist = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;
  const { productId } = req.body;

  if (!productId) return res.status(400).json({ success: false, message: 'productId is required' });

  const prodDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(productId).get();
  if (!prodDoc.exists || !prodDoc.data().isActive) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const wishRef = db.collection(COLLECTIONS.WISHLISTS).doc(uid);
  const wishDoc = await wishRef.get();
  let productIds = wishDoc.exists ? (wishDoc.data().productIds || []) : [];

  if (productIds.includes(productId)) {
    return res.status(409).json({ success: false, message: 'Already in wishlist' });
  }

  productIds.push(productId);
  await wishRef.set({ uid, productIds, updatedAt: new Date().toISOString() }, { merge: true });

  res.status(200).json({ success: true, message: 'Added to wishlist', data: { count: productIds.length } });
});

// ─── DELETE /api/wishlist/remove/:productId ───────────────────────────────────

const removeFromWishlist = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;
  const { productId } = req.params;

  const wishRef = db.collection(COLLECTIONS.WISHLISTS).doc(uid);
  const wishDoc = await wishRef.get();
  if (!wishDoc.exists) return res.status(404).json({ success: false, message: 'Wishlist not found' });

  const productIds = (wishDoc.data().productIds || []).filter(id => id !== productId);
  await wishRef.update({ productIds, updatedAt: new Date().toISOString() });

  res.status(200).json({ success: true, message: 'Removed from wishlist', data: { count: productIds.length } });
});

// ─── DELETE /api/wishlist/clear ───────────────────────────────────────────────

const clearWishlist = asyncHandler(async (req, res) => {
  const db = getDB();
  await db.collection(COLLECTIONS.WISHLISTS).doc(req.user.uid).update({ productIds: [], updatedAt: new Date().toISOString() });
  res.status(200).json({ success: true, message: 'Wishlist cleared' });
});

module.exports = { getWishlist, toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist };
