const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController');
const authController = require('../../controllers/authController');
const googleAuthController = require('../../controllers/googleAuthController');

const { checkAuth } = require('../../middleware/requireAuth');
const { publicLimiter, authLimiter } = require('../../middleware/rateLimiter');
const { validate, validateRegister, validateLogin, validateSiteVisit, validateBooking } = require('../../middleware/validation');
const { cacheMiddleware } = require('../../middleware/cache');

// Public Routes
router.get('/', publicLimiter, mainController.getHome);
router.get('/services', publicLimiter, cacheMiddleware(300), mainController.getServices); // Cache for 5 mins
router.get('/reviews/public', publicLimiter, cacheMiddleware(300), mainController.getPublicReviews); // Cache for 5 mins
router.post('/site-visit', publicLimiter, checkAuth, validateSiteVisit, validate, mainController.postSiteVisit);
router.post('/book', publicLimiter, checkAuth, validateBooking, validate, mainController.postBooking);

// Auth Routes
router.post('/login', authLimiter, validateLogin, validate, authController.login);
router.post('/register', authLimiter, validateRegister, validate, authController.register);
router.post('/auth/google', authLimiter, googleAuthController.googleLogin);
router.get('/logout', authController.logout);

// Admin Auth
router.post('/admin/login', authLimiter, validateLogin, validate, authController.adminLogin);

module.exports = router;
