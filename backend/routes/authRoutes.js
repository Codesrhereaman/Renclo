const express = require('express');
const router = express.Router();
const { getMe, syncProfile, logout, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.use(protect); // All auth routes require a valid Firebase token

router.get('/me', getMe);
router.post('/sync-profile', syncProfile);
router.post('/logout', logout);
router.delete('/delete-account', deleteAccount);

module.exports = router;
