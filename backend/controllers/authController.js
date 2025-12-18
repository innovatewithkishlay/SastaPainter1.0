const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');

// Register User
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Username or Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        const token = authService.generateToken(newUser);

        res.json({
            success: true,
            message: 'Registration successful',
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
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid Credentials' });
        }

        const token = authService.generateToken(user);

        res.json({
            success: true,
            message: 'Login successful',
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
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Admin Login
exports.adminLogin = async (req, res) => {
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
            res.json({
                success: true,
                message: 'Admin Login successful',
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
            const user = await User.findOne({ username });
            if (user && user.isAdmin) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = authService.generateToken(user);
                    return res.json({
                        success: true,
                        message: 'Admin Login successful',
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
            res.status(400).json({ success: false, error: 'Invalid Admin Credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Logout
exports.logout = (req, res) => {
    // With JWT, logout is client-side (delete token). 
    // Server just returns success.
    res.json({ success: true, message: 'Logged out successfully' });
};
