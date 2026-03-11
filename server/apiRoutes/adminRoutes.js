import express from 'express';
import {
    getUnverifiedDonors,
    verifyDonor,
    rejectDonor,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controllers/adminController.js';

const router = express.Router();

// Donor Management
router.get('/unverified-donors', getUnverifiedDonors);
router.patch('/verify-donor/:id', verifyDonor);
router.delete('/reject-donor/:id', rejectDonor);

// Event Management
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
