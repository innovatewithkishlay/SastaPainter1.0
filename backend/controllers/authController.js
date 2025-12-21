const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');
const sendResponse = require('../utils/responseHandler');

// Register User
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return sendResponse(res, 400, false, 'Username or Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        const token = authService.generateToken(newUser);

        return sendResponse(res, 200, true, 'Registration successful', {
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                profilePicture: newUser.profilePicture
            }
        });
    } catch (err) {
        next(err);
    }
};

// Login User
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check for user by email OR username (since frontend sends both in 'email' field)
        const user = await User.findOne({
            $or: [{ email: email }, { username: email }]
        });
        if (!user) {
            return sendResponse(res, 400, false, 'Invalid Credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, 400, false, 'Invalid Credentials');
        }

        const token = authService.generateToken(user);

        return sendResponse(res, 200, true, 'Login successful', {
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        next(err);
    }
};

// Admin Login
exports.adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (username === 'raj_maurya_7878' && password === '208001@@Raj') {
            let admin = await User.findOne({ username: 'raj_maurya_7878' });
            if (!admin) {
                const hashedPassword = await bcrypt.hash(password, 10);
                admin = new User({
                    username: 'raj_maurya_7878',
                    email: 'admin@aapkapainter.clone',
                    password: hashedPassword,
                    isAdmin: true
                });
                await admin.save();
            } else if (!admin.isAdmin) {
                admin.isAdmin = true;
                await admin.save();
            }

            const token = authService.generateToken(admin);
            return sendResponse(res, 200, true, 'Admin Login successful', {
                token,
                user: {
                    _id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    isAdmin: admin.isAdmin,
                    profilePicture: admin.profilePicture
                }
            });
        } else {
            // Check for user by username OR email
            const user = await User.findOne({
                $or: [{ username: username }, { email: username }]
            });
            if (user && user.isAdmin) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = authService.generateToken(user);
                    return sendResponse(res, 200, true, 'Admin Login successful', {
                        token,
                        user: {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            profilePicture: user.profilePicture
                        }
                    });
                }
            }
            return sendResponse(res, 400, false, 'Invalid Admin Credentials');
        }
    } catch (err) {
        next(err);
    }
};

// Logout
exports.checkAuth = async (req, res, next) => {
    try {
        if (req.user) {
            const user = await User.findById(req.user.id).select('-password');
            return sendResponse(res, 200, true, 'Authenticated', { isAuthenticated: true, user });
        } else {
            return sendResponse(res, 200, true, 'Not Authenticated', { isAuthenticated: false, user: null });
        }
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    // With JWT, logout is client-side (delete token). 
    // Server just returns success.
    return sendResponse(res, 200, true, 'Logged out successfully');
};
