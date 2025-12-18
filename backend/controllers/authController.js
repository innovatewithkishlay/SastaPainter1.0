const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        req.session.user = newUser;
        res.json({ success: true, message: 'Registration successful', user: newUser });
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

        req.session.user = user;
        const returnTo = req.session.returnTo || '/';
        delete req.session.returnTo;
        // Don't need returnTo logic for API really, client handles redirection
        res.json({ success: true, message: 'Login successful', user: user });
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

            req.session.user = admin;
            res.json({ success: true, message: 'Admin Login successful', user: admin });
        } else {
            const user = await User.findOne({ username });
            if (user && user.isAdmin) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    req.session.user = user;
                    return res.json({ success: true, message: 'Admin Login successful', user: user });
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
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ success: true, message: 'Logged out successfully' });
    });
};
