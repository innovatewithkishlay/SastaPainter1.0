const Service = require('../models/Service');
const Inquiry = require('../models/Inquiry');

exports.getHome = async (req, res) => {
    try {
        // Just return services logic, frontend handles redirection if admin
        const services = await Service.find({}).limit(6);
        res.json({ success: true, services });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.json({ success: true, services });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error fetching services' });
    }
};

const SiteVisit = require('../models/SiteVisit'); // Import the new model

exports.postBooking = async (req, res) => {
    try {
        const { name, phone, email, city, service_type, message, address, pincode, preferred_date } = req.body;

        // Basic Validation
        if (!['Delhi', 'Noida'].includes(city)) {
            return res.status(400).json({ success: false, error: 'Service available only in Delhi and Noida.' });
        }

        // Pincode validation (Basic)
        if (!/^\d{6}$/.test(pincode)) {
            return res.status(400).json({ success: false, error: 'Invalid Pincode. It must be 6 digits.' });
        }

        const newInquiry = new Inquiry({
            name,
            phone,
            email,
            city,
            service_type,
            message,
            address,
            pincode,
            preferred_date,
            user: req.session.user ? req.session.user._id : null
        });

        await newInquiry.save();
        res.json({ success: true, message: 'Booking submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.postSiteVisit = async (req, res) => {
    try {
        const { name, phone, city } = req.body;

        if (!name || !phone || !city) {
            return res.status(400).json({ success: false, error: 'Please fill in all fields.' });
        }

        const newSiteVisit = new SiteVisit({
            name,
            phone,
            city,
            user: req.session.user ? req.session.user._id : null
        });

        await newSiteVisit.save();
        res.json({ success: true, message: 'Site Visit Booked Successfully!' });
    } catch (err) {
        console.error('Site Visit Error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        res.json({ success: true, inquiries });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Inquiry.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: 'Inquiry status updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// User Dashboard Methods
exports.getMyBookings = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ user: req.session.user._id }).sort({ createdAt: -1 });
        const siteVisits = await SiteVisit.find({ user: req.session.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, inquiries, siteVisits });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getEditBooking = async (req, res) => {
    try {
        const inquiry = await Inquiry.findOne({ _id: req.params.id, user: req.session.user._id });
        if (!inquiry) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        if (inquiry.status === 'Completed' || inquiry.status === 'Contacted') {
            return res.status(400).json({ success: false, error: 'Cannot edit bookings that are Completed or Contacted.' });
        }
        res.json({ success: true, inquiry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { city, service_type, message } = req.body;

        const inquiry = await Inquiry.findOne({ _id: id, user: req.session.user._id });
        if (!inquiry) return res.status(404).json({ success: false, error: 'Booking not found' });
        if (inquiry.status === 'Completed' || inquiry.status === 'Contacted') return res.status(400).json({ success: false, error: 'Cannot edit processing booking' });

        const changes = {};
        if (inquiry.city !== city) changes.city = inquiry.city;
        if (inquiry.service_type !== service_type) changes.service_type = inquiry.service_type;
        if (inquiry.message !== message) changes.message = inquiry.message;

        if (Object.keys(changes).length > 0) {
            inquiry.editHistory.push({
                timestamp: new Date(),
                changes: changes
            });
        }

        inquiry.city = city;
        inquiry.service_type = service_type;
        inquiry.message = message;
        await inquiry.save();

        res.json({ success: true, message: 'Booking updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Inquiry.findOneAndDelete({ _id: id, user: req.session.user._id });
        res.json({ success: true, message: 'Booking deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.submitReview = async (req, res) => {
    try {
        const { inquiryId, rating, comment } = req.body;
        // Check if user is logged in (session based)
        const userId = req.session.user ? req.session.user._id : null;

        if (!userId) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        // Verify booking ownership and status
        const Inquiry = require('../models/Inquiry');
        const booking = await Inquiry.findOne({ _id: inquiryId, user: userId });

        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

        if (booking.status !== 'Completed') {
            return res.status(400).json({ success: false, error: 'Can only review completed bookings' });
        }

        // Check if already reviewed
        const Review = require('../models/Review');
        const existingReview = await Review.findOne({ inquiry: inquiryId });
        if (existingReview) {
            return res.status(400).json({ success: false, error: 'You have already reviewed this service' });
        }

        const newReview = await Review.create({
            user: userId,
            inquiry: inquiryId,
            rating: Number(rating),
            comment
        });

        // Optional: Update Painter rating if assigned
        if (booking.assignedPainter) {
            const Painter = require('../models/Painter');
            const painter = await Painter.findById(booking.assignedPainter);
            if (painter) {
                // Handle case where fields might be undefined/string
                const currentRating = Number(painter.rating) || 0;
                const currentCount = Number(painter.reviews_count) || 0;

                const totalRating = (currentRating * currentCount) + Number(rating);
                const newCount = currentCount + 1;
                painter.rating = totalRating / newCount;
                painter.reviews_count = newCount;
                await painter.save();
            }
        }

        res.status(201).json({ success: true, message: 'Review submitted successfully', review: newReview });

    } catch (error) {
        console.error('Submit Review Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getPublicReviews = async (req, res) => {
    try {
        const Review = require('../models/Review');
        // Fetch top 6 recent public reviews, populate user name
        const reviews = await Review.find({ isPublic: true })
            .sort({ createdAt: -1 })
            .limit(6)
            .populate('user', 'username');

        res.json({ success: true, reviews });
    } catch (error) {
        console.error('Get Reviews Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
