const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController');
const { requireAuth } = require('../../middleware/requireAuth');
const { userLimiter } = require('../../middleware/rateLimiter');

// Protected User Routes
router.use(requireAuth, userLimiter); // Apply JWT middleware and Rate Limiter to all routes in this file

router.get('/my-bookings', mainController.getMyBookings);
router.get('/my-bookings/edit/:id', mainController.getEditBooking);
router.post('/my-bookings/edit/:id', mainController.updateBooking);
router.post('/my-bookings/delete/:id', mainController.deleteBooking);
router.post('/reviews', mainController.submitReview);

module.exports = router;
