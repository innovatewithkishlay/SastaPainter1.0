const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/mainController');
const { isAuthenticated } = require('../../middleware/auth');

// Protected User Routes
router.use(isAuthenticated); // Apply middleware to all routes in this file

router.post('/book', mainController.postBooking);
router.get('/my-bookings', mainController.getMyBookings);
router.get('/my-bookings/edit/:id', mainController.getEditBooking);
router.post('/my-bookings/edit/:id', mainController.updateBooking);
router.post('/my-bookings/delete/:id', mainController.deleteBooking);
router.post('/reviews', mainController.submitReview);

module.exports = router;
