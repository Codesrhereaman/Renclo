const { getDB } = require('../config/firebase');
const COLLECTIONS = require('../config/collections');
const { asyncHandler } = require('../middleware/errorHandler');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const calcTotals = (items) => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.rentalPrice || 0;
    const days = item.rentalDays || 3;
    const duration = item.duration || 3;
    return sum + price * item.quantity * (days / duration);
  }, 0);

  const tax = subtotal * 0.18;
  const deliveryFee = items.length > 0 ? 99 : 0;
  const total = subtotal + tax + deliveryFee;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    deliveryFee,
    total: Math.round(total * 100) / 100,
  };
};

// ─── GET /api/cart ────────────────────────────────────────────────────────────

const getCart = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;

  let cartDoc = await db.collection(COLLECTIONS.CARTS).doc(uid).get();

  if (!cartDoc.exists) {
    await db.collection(COLLECTIONS.CARTS).doc(uid).set({ uid, items: [], updatedAt: new Date().toISOString() });
    return res.status(200).json({ success: true, data: { items: [], totals: calcTotals([]) } });
  }

  const cartData = cartDoc.data();
  const items = cartData.items || [];

  // Enrich items with fresh product data from Firestore
  const enriched = await Promise.all(
    items.map(async (item) => {
      try {
        const prodDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(item.productId).get();
        if (!prodDoc.exists || !prodDoc.data().isActive) return null;
        const p = prodDoc.data();
        return {
          ...item,
          name: p.name,
          rentalPrice: p.rentalPrice,
          originalPrice: p.originalPrice,
          image: p.images?.[0]?.url || '',
          inStock: p.inStock,
          duration: p.duration,
          category: p.category,
        };
      } catch {
        return null;
      }
    })
  );

  const validItems = enriched.filter(Boolean);

  // Update cart if some items were invalid
  if (validItems.length !== items.length) {
    const cleaned = validItems.map(({ name, rentalPrice, originalPrice, image, inStock, duration, category, ...kept }) => kept);
    await db.collection(COLLECTIONS.CARTS).doc(uid).update({ items: cleaned, updatedAt: new Date().toISOString() });
  }

  res.status(200).json({ success: true, data: { items: validItems, totals: calcTotals(validItems) } });
});

// ─── POST /api/cart/add ───────────────────────────────────────────────────────

const addToCart = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;
  const { productId, quantity = 1, rentalDays = 3, size = '' } = req.body;

  if (!productId) return res.status(400).json({ success: false, message: 'productId is required' });

  // Validate product
  const prodDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(productId).get();
  if (!prodDoc.exists || !prodDoc.data().isActive) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  if (!prodDoc.data().inStock) {
    return res.status(400).json({ success: false, message: 'Product is out of stock' });
  }

  const cartRef = db.collection(COLLECTIONS.CARTS).doc(uid);
  const cartDoc = await cartRef.get();
  let items = cartDoc.exists ? (cartDoc.data().items || []) : [];

  const existingIdx = items.findIndex(i => i.productId === productId);

  if (existingIdx > -1) {
    items[existingIdx].quantity += parseInt(quantity);
    items[existingIdx].rentalDays = parseInt(rentalDays);
    if (size) items[existingIdx].size = size;
  } else {
    items.push({ productId, quantity: parseInt(quantity), rentalDays: parseInt(rentalDays), size, addedAt: new Date().toISOString() });
  }

  await cartRef.set({ uid, items, updatedAt: new Date().toISOString() }, { merge: true });

  res.status(200).json({ success: true, message: 'Added to cart', data: { itemCount: items.reduce((s, i) => s + i.quantity, 0) } });
});

// ─── PUT /api/cart/update/:productId ─────────────────────────────────────────

const updateCartItem = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;
  const { productId } = req.params;
  const { quantity, rentalDays, size } = req.body;

  const cartRef = db.collection(COLLECTIONS.CARTS).doc(uid);
  const cartDoc = await cartRef.get();
  if (!cartDoc.exists) return res.status(404).json({ success: false, message: 'Cart not found' });

  let items = cartDoc.data().items || [];
  const idx = items.findIndex(i => i.productId === productId);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Item not in cart' });

  if (quantity !== undefined && parseInt(quantity) < 1) {
    items.splice(idx, 1); // Remove item
  } else {
    if (quantity !== undefined) items[idx].quantity = parseInt(quantity);
    if (rentalDays !== undefined) items[idx].rentalDays = parseInt(rentalDays);
    if (size !== undefined) items[idx].size = size;
  }

  await cartRef.update({ items, updatedAt: new Date().toISOString() });
  res.status(200).json({ success: true, message: 'Cart updated', data: { itemCount: items.reduce((s, i) => s + i.quantity, 0) } });
});

// ─── DELETE /api/cart/remove/:productId ──────────────────────────────────────

const removeFromCart = asyncHandler(async (req, res) => {
  const db = getDB();
  const uid = req.user.uid;
  const { productId } = req.params;

  const cartRef = db.collection(COLLECTIONS.CARTS).doc(uid);
  const cartDoc = await cartRef.get();
  if (!cartDoc.exists) return res.status(404).json({ success: false, message: 'Cart not found' });

  const items = (cartDoc.data().items || []).filter(i => i.productId !== productId);
  await cartRef.update({ items, updatedAt: new Date().toISOString() });

  res.status(200).json({ success: true, message: 'Item removed', data: { itemCount: items.reduce((s, i) => s + i.quantity, 0) } });
});

// ─── DELETE /api/cart/clear ───────────────────────────────────────────────────

const clearCart = asyncHandler(async (req, res) => {
  const db = getDB();
  await db.collection(COLLECTIONS.CARTS).doc(req.user.uid).update({ items: [], updatedAt: new Date().toISOString() });
  res.status(200).json({ success: true, message: 'Cart cleared' });
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
