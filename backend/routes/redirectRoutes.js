import express from 'express';
import { redirectUrl } from '../controllers/url.js';
const router = express.Router();

// GET /:code
router.get('/:code', redirectUrl);

export default router;