const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUpload');
const { protect } = require('../middleware/auth');
const {
  uploadLook,
  getVirtualCloset,
  getLook,
  updateLook,
  deleteLook,
  deleteAllLooks,
} = require('../controllers/virtualClosetController');

// All routes require authentication
router.use(protect);

// ─── Upload new look ──────────────────────────────────────────────────────────
// POST /api/virtual-closet/upload
router.post('/upload', upload.single('image'), uploadLook);

// ─── Get all looks ────────────────────────────────────────────────────────────
// GET /api/virtual-closet
router.get('/', getVirtualCloset);

// ─── Get single look ──────────────────────────────────────────────────────────
// GET /api/virtual-closet/:lookId
router.get('/:lookId', getLook);

// ─── Update look ──────────────────────────────────────────────────────────────
// PUT /api/virtual-closet/:lookId
router.put('/:lookId', updateLook);

// ─── Delete single look ───────────────────────────────────────────────────────
// DELETE /api/virtual-closet/:lookId
router.delete('/:lookId', deleteLook);

// ─── Delete all looks ─────────────────────────────────────────────────────────
// DELETE /api/virtual-closet?action=deleteAll
router.delete('/', deleteAllLooks);

module.exports = router;
