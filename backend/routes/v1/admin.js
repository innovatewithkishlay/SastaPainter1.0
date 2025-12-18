const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const mainController = require('../../controllers/mainController');
const { requireAuth, requireAdmin } = require('../../middleware/requireAuth');

// Protected Admin Routes
router.use(requireAuth, requireAdmin); // Apply JWT middleware to all routes

router.get('/stats', adminController.getDashboardStats);
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

router.get('/bookings', adminController.getBookings);
router.put('/bookings/:id/status', adminController.updateBookingStatus);
router.put('/bookings/:id/assign', adminController.assignPainter);

router.get('/site-visits', adminController.getSiteVisits);
router.put('/site-visits/:id/status', adminController.updateSiteVisitStatus);

router.get('/painters', adminController.getPainters);
router.post('/painters', adminController.addPainter);
router.delete('/painters/:id', adminController.deletePainter);

// Legacy/Duplicate routes (keeping for consistency with original index.js if needed, but cleaning up paths)
router.get('/inquiries', mainController.getInquiries);
router.post('/inquiries/:id/update', mainController.updateInquiryStatus);

module.exports = router;
