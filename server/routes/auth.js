import express from 'express';
const router = express.Router();
import { login } from '../controllers/auth.js';

// Routes beginning with /api/auth
router.post('/login', login);

export default router;
