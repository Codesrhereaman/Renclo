const express = require('express');
const router = express.Router();
const {
  getProducts, getFeaturedProducts, getCategories,
  getProductById, createProduct, updateProduct,
  deleteProduct, addReview, getMyProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// ─── Public routes ────────────────────────────────────────────────────────────
router.get('/',          getProducts);
router.get('/featured',  getFeaturedProducts);
router.get('/categories', getCategories);

// ─── Protected owner routes — MUST be before /:id to avoid param collision ───
router.get('/owner/my-products', protect, authorize('owner', 'admin'), getMyProducts);
router.post('/',                 protect, authorize('owner', 'admin'), createProduct);

// ─── Public param route — after all specific string routes ────────────────────
router.get('/:id', getProductById);

// ─── Protected param routes ───────────────────────────────────────────────────
router.put('/:id',          protect, authorize('owner', 'admin'), updateProduct);
router.delete('/:id',       protect, authorize('owner', 'admin'), deleteProduct);
router.post('/:id/review',  protect, addReview);

module.exports = router;

