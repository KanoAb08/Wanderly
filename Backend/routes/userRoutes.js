import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.middleware.js';
import { createTravelRequest, getHistory } from '../controllers/travelRequestController.js';
import { getUserTrips } from '../controllers/userTripsController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout',logoutUser);

router.post('/create-req', protect, createTravelRequest); 

router.get('/history', protect, getHistory);

router.get('/user-trips/:userId', protect, getUserTrips);

export default router;
