const Service = require('../models/Service');
const Inquiry = require('../models/Inquiry');
const sendResponse = require('../utils/responseHandler');

exports.getHome = async (req, res, next) => {
    try {
        // Just return services logic, frontend handles redirection if admin
        const services = await Service.find({}).limit(6).lean();
        return sendResponse(res, 200, true, 'Home data fetched', { services });
    } catch (err) {
        next(err);
    }
};

exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find({}).lean();
        return sendResponse(res, 200, true, 'Services fetched', { services });
    } catch (err) {
        next(err);
    }
};

const SiteVisit = require('../models/SiteVisit'); // Import the new model

exports.postBooking = async (req, res, next) => {
    try {
        const { name, phone, email, city, service_type, message, address, pincode, preferred_date } = req.body;

        // Basic Validation
        if (!['Delhi', 'Noida'].includes(city)) {
            return sendResponse(res, 400, false, 'Service available only in Delhi and Noida.');
        }

        // Pincode validation (Basic)
        if (!/^\d{6}$/.test(pincode)) {
            return sendResponse(res, 400, false, 'Invalid Pincode. It must be 6 digits.');
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
            user: req.user ? req.user.id : null
        });

        await newInquiry.save();
        return sendResponse(res, 201, true, 'Booking submitted successfully');
    } catch (err) {
        next(err);
    }
};

exports.postSiteVisit = async (req, res, next) => {
    try {
        const { name, phone, city } = req.body;
        console.log('DEBUG: postSiteVisit called', { name, phone, city, user: req.user });

        if (!name || !phone || !city) {
            return sendResponse(res, 400, false, 'Please fill in all fields.');
        }

        const newSiteVisit = new SiteVisit({
            name,
            phone,
            city,
            user: req.user ? req.user.id : null
        });

        const savedVisit = await newSiteVisit.save();
        console.log('DEBUG: SiteVisit saved', savedVisit);
        return sendResponse(res, 201, true, 'Site Visit Booked Successfully!');
    } catch (err) {
        console.error('DEBUG: postSiteVisit Error', err);
        next(err);
    }
};

exports.getInquiries = async (req, res, next) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
        return sendResponse(res, 200, true, 'Inquiries fetched', { inquiries });
    } catch (err) {
        next(err);
    }
};

exports.updateInquiryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Inquiry.findByIdAndUpdate(id, { status });
        return sendResponse(res, 200, true, 'Inquiry status updated');
    } catch (err) {
        next(err);
    }
};

// User Dashboard Methods
exports.getMyBookings = async (req, res, next) => {
    try {
        console.log('DEBUG: getMyBookings called for user', req.user.id);
        const inquiries = await Inquiry.find({ user: req.user.id }).sort({ createdAt: -1 }).lean();
        const siteVisits = await SiteVisit.find({ user: req.user.id }).sort({ createdAt: -1 }).lean();
        console.log('DEBUG: Found bookings', { inquiriesCount: inquiries.length, siteVisitsCount: siteVisits.length });
        return sendResponse(res, 200, true, 'User bookings fetched', { inquiries, siteVisits });
    } catch (err) {
        console.error('DEBUG: getMyBookings Error', err);
        next(err);
    }
};

exports.getEditBooking = async (req, res, next) => {
    try {
        const inquiry = await Inquiry.findOne({ _id: req.params.id, user: req.user.id }).lean();
        if (!inquiry) {
            return sendResponse(res, 404, false, 'Booking not found');
        }
        if (inquiry.status === 'Completed' || inquiry.status === 'Contacted') {
            return sendResponse(res, 400, false, 'Cannot edit bookings that are Completed or Contacted.');
        }
        return sendResponse(res, 200, true, 'Booking details fetched', { inquiry });
    } catch (err) {
        next(err);
    }
};

exports.updateBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { city, service_type, message } = req.body;

        const inquiry = await Inquiry.findOne({ _id: id, user: req.user.id });
        if (!inquiry) return sendResponse(res, 404, false, 'Booking not found');
        if (inquiry.status === 'Completed' || inquiry.status === 'Contacted') return sendResponse(res, 400, false, 'Cannot edit processing booking');

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

        return sendResponse(res, 200, true, 'Booking updated');
    } catch (err) {
        next(err);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Inquiry.findOneAndDelete({ _id: id, user: req.user.id });
        return sendResponse(res, 200, true, 'Booking deleted');
    } catch (err) {
        next(err);
    }
};

exports.submitReview = async (req, res, next) => {
    try {
        const { inquiryId, rating, comment } = req.body;
        // Check if user is logged in (session based)
        const userId = req.user ? req.user.id : null;

        if (!userId) {
            return sendResponse(res, 401, false, 'Unauthorized');
        }

        // Verify booking ownership and status
        const Inquiry = require('../models/Inquiry');
        const booking = await Inquiry.findOne({ _id: inquiryId, user: userId });

        if (!booking) {
            return sendResponse(res, 404, false, 'Booking not found');
        }

        if (booking.status !== 'Completed') {
            return sendResponse(res, 400, false, 'Can only review completed bookings');
        }

        // Check if already reviewed
        const Review = require('../models/Review');
        const existingReview = await Review.findOne({ inquiry: inquiryId });
        if (existingReview) {
            return sendResponse(res, 400, false, 'You have already reviewed this service');
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

        return sendResponse(res, 201, true, 'Review submitted successfully', { review: newReview });

    } catch (error) {
        next(error);
    }
};

exports.getPublicReviews = async (req, res, next) => {
    try {
        const Review = require('../models/Review');
        // Fetch top 6 recent public reviews, populate user name
        const reviews = await Review.find({ isPublic: true })
            .sort({ createdAt: -1 })
            .limit(6)
            .populate('user', 'username')
            .lean();

        return sendResponse(res, 200, true, 'Public reviews fetched', { reviews });
    } catch (error) {
        next(error);
    }
};
