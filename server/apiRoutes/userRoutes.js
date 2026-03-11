import express from 'express';
import { getUserByEmail, toggleAvailability, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/email/:email', getUserByEmail);
router.patch('/email/:email/availability', toggleAvailability);

export default router;
