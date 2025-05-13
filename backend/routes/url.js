import express from 'express';
import { shortenUrl, redirectUrl, getAllUrls, getUserUrls } from '../controllers/url.js';
import { auth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Shorten a URL (accessible to both authenticated and unauthenticated users)
router.post('/shorten', optionalAuth, shortenUrl);

// Get all URLs (admin/dev use)
router.get('/urls/all', getAllUrls);

// Get user's URLs (protected route - requires authentication)
router.get('/urls/me', auth, getUserUrls);

export default router;
