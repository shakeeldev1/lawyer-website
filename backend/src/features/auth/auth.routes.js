import express from 'express';
import { loginUser, signupUser, verifyOtp } from './auth.controller.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/verify-otp', verifyOtp);

export default router;