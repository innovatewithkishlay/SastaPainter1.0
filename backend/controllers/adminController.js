const User = require('../models/User');
const Inquiry = require('../models/Inquiry');

exports.getDashboardStats = async (req, res) => {
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

        res.json({
            success: true,
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
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getUsers = async (req, res) => {
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

        const users = await User.find(query).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        console.error('Get Users Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getBookings = async (req, res) => {
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

        const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
        res.json({ success: true, inquiries });
    } catch (error) {
        console.error('Get Bookings Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        if (user.isAdmin) {
            return res.status(403).json({ success: false, error: 'Cannot delete admin users' });
        }

        await User.findByIdAndDelete(userId);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Contacted', 'Scheduled', 'In_Progress', 'Inspection_Done', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
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
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

        res.json({ success: true, booking });
    } catch (error) {
        console.error('Update Booking Status Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateSiteVisitStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Confirmed', 'Scheduled', 'Inspection_Done', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const siteVisit = await require('../models/SiteVisit').findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!siteVisit) {
            return res.status(404).json({ success: false, error: 'Site visit request not found' });
        }

        res.json({ success: true, siteVisit });
    } catch (error) {
        console.error('Update Site Visit Status Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getSiteVisits = async (req, res) => {
    try {
        const SiteVisit = require('../models/SiteVisit');
        const siteVisits = await SiteVisit.find().sort({ createdAt: -1 });
        res.json({ success: true, siteVisits });
    } catch (error) {
        console.error('Get Site Visits Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// --- Painter Management ---

exports.getPainters = async (req, res) => {
    try {
        const painters = await require('../models/Painter').find().sort({ createdAt: -1 });
        res.json({ success: true, painters });
    } catch (error) {
        console.error('Get Painters Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.addPainter = async (req, res) => {
    try {
        const { name, phone, specialization, experience, address, salary } = req.body;
        const Painter = require('../models/Painter');

        // Check for duplicates
        const existing = await Painter.findOne({ phone });
        if (existing) {
            return res.status(400).json({ success: false, error: 'Painter with this phone already exists' });
        }

        const newPainter = await Painter.create({
            name,
            phone,
            specialization,
            experience,
            address,
            salary
        });

        res.status(201).json({ success: true, painter: newPainter });
    } catch (error) {
        console.error('Add Painter Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deletePainter = async (req, res) => {
    try {
        const { id } = req.params;
        await require('../models/Painter').findByIdAndDelete(id);
        res.json({ success: true, message: 'Painter deleted successfully' });
    } catch (error) {
        console.error('Delete Painter Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.assignPainter = async (req, res) => {
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

        res.json({ success: true, booking });
    } catch (error) {
        console.error('Assign Painter Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
