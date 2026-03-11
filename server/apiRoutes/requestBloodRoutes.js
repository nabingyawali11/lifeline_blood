//  12
import express from 'express';
import { findDonors, registerDonor } from '../controllers/bloodRequestController.js';

const router = express.Router();

router.post('/find-donors', findDonors);
router.post('/register', registerDonor);

export default router;