const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController');
const authController = require('../../controllers/authController');
const googleAuthController = require('../../controllers/googleAuthController');

// Public Routes
router.get('/', mainController.getHome);
router.get('/services', mainController.getServices);
router.get('/reviews/public', mainController.getPublicReviews);
router.post('/site-visit', mainController.postSiteVisit);

// Auth Routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/auth/google', googleAuthController.googleLogin);
router.get('/logout', authController.logout);

// Admin Auth
router.post('/admin/login', authController.adminLogin);

module.exports = router;
