const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController');
const authController = require('../../controllers/authController');
const googleAuthController = require('../../controllers/googleAuthController');

const { checkAuth } = require('../../middleware/requireAuth');
const { publicLimiter, authLimiter } = require('../../middleware/rateLimiter');

// Public Routes
router.get('/', publicLimiter, mainController.getHome);
router.get('/services', publicLimiter, mainController.getServices);
router.get('/reviews/public', publicLimiter, mainController.getPublicReviews);
router.post('/site-visit', publicLimiter, checkAuth, mainController.postSiteVisit);
router.post('/book', publicLimiter, checkAuth, mainController.postBooking);

// Auth Routes
router.post('/login', authLimiter, authController.login);
router.post('/register', authLimiter, authController.register);
router.post('/auth/google', authLimiter, googleAuthController.googleLogin);
router.get('/logout', authController.logout);

// Admin Auth
router.post('/admin/login', authLimiter, authController.adminLogin);

module.exports = router;
