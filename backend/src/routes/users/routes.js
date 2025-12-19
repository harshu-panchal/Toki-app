import express from 'express';
import * as userController from '../../controllers/user/userController.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();

router.use(protect); // Protect all routes

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);
router.post('/resubmit-verification', userController.resubmitVerification);

export default router;
