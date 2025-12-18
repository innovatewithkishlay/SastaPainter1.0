const User = require('../models/User');
const Inquiry = require('../models/Inquiry');
const sendResponse = require('../utils/responseHandler');

exports.getDashboardStats = async (req, res, next) => {
    try {
        // 1. Total Users
        const totalUsers = await User.countDocuments();

        // 2. Total Bookings (Inquiries)
        const totalBookings = await Inquiry.countDocuments();

        // 3. Today's Bookings
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const todaysBookings = await Inquiry.countDocuments({
            createdAt: { $gte: startOfToday }
        });

        // 4. Pending Bookings
        const pendingBookings = await Inquiry.countDocuments({ status: 'Pending' });

        // 5. Ongoing Projects (Contacted or In Progress)
        // 'In Progress' wasn't in the enum seen in Inquiry.js but requested by user.
        // We include it in case it's manually added or legacy.
        const ongoingProjects = await Inquiry.countDocuments({
            status: { $in: ['Contacted', 'In Progress'] }
        });

        // 6. Completed Projects
        const completedProjects = await Inquiry.countDocuments({ status: 'Completed' });

        // 7. Cancelled Bookings
        const cancelledBookings = await Inquiry.countDocuments({ status: 'Cancelled' });

        return sendResponse(res, 200, true, 'Dashboard stats fetched', {
            stats: {
                totalUsers,
                totalBookings,
                todaysBookings,
                pendingBookings,
                ongoingProjects,
                completedProjects,
                cancelledBookings
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const { search, role } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (role) {
            if (role === 'admin') {
                query.isAdmin = true;
            } else if (role === 'user') {
                query.isAdmin = false;
            }
        }

        const users = await User.find(query).select('-password').sort({ createdAt: -1 }).lean();
        return sendResponse(res, 200, true, 'Users fetched', { users });
    } catch (error) {
        next(error);
    }
};

exports.getBookings = async (req, res, next) => {
    try {
        const { status, search } = req.query;
        let query = {};

        if (status) {
            if (status === 'Ongoing') {
                query.status = { $in: ['Contacted', 'In Progress'] };
            } else {
                query.status = status;
            }
        }

        if (search) {
            query.email = { $regex: search, $options: 'i' };
        }

        const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).lean();
        return sendResponse(res, 200, true, 'Bookings fetched', { inquiries });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return sendResponse(res, 404, false, 'User not found');
        }

        if (user.isAdmin) {
            return sendResponse(res, 403, false, 'Cannot delete admin users');
        }

        await User.findByIdAndDelete(userId);
        return sendResponse(res, 200, true, 'User deleted successfully');
    } catch (error) {
        next(error);
    }
};

exports.updateBookingStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Contacted', 'Scheduled', 'In_Progress', 'Inspection_Done', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return sendResponse(res, 400, false, 'Invalid status');
        }

        const booking = await Inquiry.findByIdAndUpdate(
            id,
            {
                status,
                $push: {
                    editHistory: {
                        timestamp: new Date(),
                        changes: { status }
                    }
                }
            },
            { new: true }
        );

        if (!booking) {
            return sendResponse(res, 404, false, 'Booking not found');
        }

        return sendResponse(res, 200, true, 'Booking status updated', { booking });
    } catch (error) {
        next(error);
    }
};

exports.updateSiteVisitStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Confirmed', 'Scheduled', 'Inspection_Done', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return sendResponse(res, 400, false, 'Invalid status');
        }

        const siteVisit = await require('../models/SiteVisit').findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!siteVisit) {
            return sendResponse(res, 404, false, 'Site visit request not found');
        }

        return sendResponse(res, 200, true, 'Site visit status updated', { siteVisit });
    } catch (error) {
        next(error);
    }
};

exports.getSiteVisits = async (req, res, next) => {
    try {
        const SiteVisit = require('../models/SiteVisit');
        const siteVisits = await SiteVisit.find().sort({ createdAt: -1 }).lean();
        return sendResponse(res, 200, true, 'Site visits fetched', { siteVisits });
    } catch (error) {
        next(error);
    }
};

// --- Painter Management ---

exports.getPainters = async (req, res, next) => {
    try {
        const painters = await require('../models/Painter').find().sort({ createdAt: -1 }).lean();
        return sendResponse(res, 200, true, 'Painters fetched', { painters });
    } catch (error) {
        next(error);
    }
};

exports.addPainter = async (req, res, next) => {
    try {
        const { name, phone, specialization, experience, address, salary } = req.body;
        const Painter = require('../models/Painter');

        // Check for duplicates
        const existing = await Painter.findOne({ phone });
        if (existing) {
            return sendResponse(res, 400, false, 'Painter with this phone already exists');
        }

        const newPainter = await Painter.create({
            name,
            phone,
            specialization,
            experience,
            address,
            salary
        });

        return sendResponse(res, 201, true, 'Painter added successfully', { painter: newPainter });
    } catch (error) {
        next(error);
    }
};

exports.deletePainter = async (req, res, next) => {
    try {
        const { id } = req.params;
        await require('../models/Painter').findByIdAndDelete(id);
        return sendResponse(res, 200, true, 'Painter deleted successfully');
    } catch (error) {
        next(error);
    }
};

exports.assignPainter = async (req, res, next) => {
    try {
        const { id } = req.params; // Inquiry ID
        const { painterId } = req.body;

        const booking = await Inquiry.findByIdAndUpdate(
            id,
            { assignedPainter: painterId },
            { new: true }
        ).populate('assignedPainter');

        // Optional: Update Painter's current_bookings
        // await require('../models/Painter').findByIdAndUpdate(painterId, { $push: { current_bookings: id } });

        return sendResponse(res, 200, true, 'Painter assigned successfully', { booking });
    } catch (error) {
        next(error);
    }
};
