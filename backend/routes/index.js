const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const googleAuthController = require('../controllers/googleAuthController');
const adminController = require('../controllers/adminController');

const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public Routes
router.get('/', mainController.getHome);
router.get('/services', mainController.getServices);

// Admin Routes
// Admin Routes
router.get('/admin/stats', isAuthenticated, isAdmin, adminController.getDashboardStats);
router.get('/admin/users', isAuthenticated, isAdmin, adminController.getUsers);
router.get('/admin/bookings', isAuthenticated, isAdmin, adminController.getBookings);
router.delete('/admin/users/:id', isAuthenticated, isAdmin, adminController.deleteUser);
router.put('/admin/bookings/:id/status', isAuthenticated, isAdmin, adminController.updateBookingStatus);
router.get('/admin/site-visits', isAuthenticated, isAdmin, adminController.getSiteVisits); // New Route
router.put('/admin/site-visits/:id/status', isAuthenticated, isAdmin, adminController.updateSiteVisitStatus);
router.get('/admin/painters', isAuthenticated, isAdmin, adminController.getPainters);
router.post('/admin/painters', isAuthenticated, isAdmin, adminController.addPainter);
router.delete('/admin/painters/:id', isAuthenticated, isAdmin, adminController.deletePainter);
router.put('/admin/bookings/:id/assign', isAuthenticated, isAdmin, adminController.assignPainter);

// Public Reviews
router.get('/reviews/public', mainController.getPublicReviews);
// User Reviews
router.post('/reviews', isAuthenticated, mainController.submitReview);

// Auth Routes (JSON only)
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/auth/google', googleAuthController.googleLogin);
router.get('/logout', authController.logout);

// Admin Auth
router.post('/admin/login', authController.adminLogin);

// Protected Routes
router.post('/site-visit', mainController.postSiteVisit); // Public or Protected? User didn't specify, but "Book Site Inspection" usually implies public lead gen. I'll make it public for now or protected if user insisted. The screenshot form is simple, implies public access. Let's make it public.
router.post('/book', isAuthenticated, mainController.postBooking);
router.get('/my-bookings', isAuthenticated, mainController.getMyBookings);
router.get('/my-bookings/edit/:id', isAuthenticated, mainController.getEditBooking);
router.post('/my-bookings/edit/:id', isAuthenticated, mainController.updateBooking);
router.post('/my-bookings/delete/:id', isAuthenticated, mainController.deleteBooking);

// Admin Routes
router.get('/admin/inquiries', isAdmin, mainController.getInquiries);
router.post('/admin/inquiries/:id/update', isAdmin, mainController.updateInquiryStatus);

module.exports = router;
