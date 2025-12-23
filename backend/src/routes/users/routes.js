import express from 'express';
import * as userController from '../../controllers/user/userController.js';
import * as statsController from '../../controllers/user/statsController.js';
import * as femaleDashboardController from '../../controllers/user/femaleDashboardController.js';
import { protect, restrictTo } from '../../middleware/auth.js';

const router = express.Router();

router.use(protect);

// Me
router.get('/me', userController.getProfile);

// Me Stats
router.get('/me/stats', statsController.getMeStats);

// Female Dashboard
router.get('/female/dashboard', restrictTo('female'), femaleDashboardController.getDashboardData);

// Discovery and User Profiles
router.patch('/me', userController.updateProfile);
router.post('/resubmit-verification', userController.resubmitVerification);

// Discover approved females (for male users)
router.get('/discover', userController.discoverFemales);

// Get a specific user's profile
router.get('/:userId', userController.getUserById);

export default router;
