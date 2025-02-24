import express from 'express';
import { pendingRequests, changeRequestStatus } from '../controllers/bookingManagementController.js';
import { isAdmin, protect } from '../middleware/auth.middleware.js';
import { getAllTravelRequests, getDashboardData, getExpenseReport } from '../controllers/dashboardController.js';
import { toggleAdminRights } from '../controllers/manageUsersController.js';
import { getAllUsers } from '../controllers/manageUsersController.js';

const router = express.Router();

router.post('/accept-reject-req', protect, isAdmin, changeRequestStatus);

router.get('/pending-req', protect, isAdmin, pendingRequests); 

router.get('/dashboard', protect, isAdmin, getDashboardData);

router.get('/all-users', protect, isAdmin, getAllUsers)

router.get('/all-requests', protect, isAdmin, getAllTravelRequests);

router.post('/expense-reports', protect, isAdmin, getExpenseReport);

router.get('/admin-rights/:userId', protect, isAdmin, toggleAdminRights);

export default router;