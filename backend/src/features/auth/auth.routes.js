import express from 'express';
import { changePassword, getAllUsers, loginUser, logout, myProfile, signupUser, updateUserRole, verifyOtp } from './auth.controller.js';
import { loginRequired } from '../../utils/loginRequired.js';
import { allowedRoles } from '../../utils/allowedRoles.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/verify-otp', verifyOtp);
router.post('/logout', loginRequired, logout);
router.get('/my-profile', loginRequired, myProfile);
router.put('/change-password', loginRequired, changePassword)

router.get('/all-users', loginRequired, allowedRoles(['admin']), getAllUsers);
router.put('/update-user-role/:id', loginRequired, allowedRoles(['admin']), updateUserRole);
export default router;