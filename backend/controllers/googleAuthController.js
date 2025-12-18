const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const authService = require('../services/authService');

// Initialize Google Client
// Using environment variable for security
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, error: 'Token is required' });
    }

    try {
        let email, name, picture, googleId;

        // Verify ID Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        email = payload.email;
        name = payload.name;
        picture = payload.picture;
        googleId = payload.sub;

        // 2. Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists
            if (!user.profilePicture) {
                user.profilePicture = picture;
                await user.save();
            }

            const jwtToken = authService.generateToken(user);

            return res.json({
                success: true,
                message: 'Login successful',
                token: jwtToken,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    profilePicture: user.profilePicture
                }
            });

        } else {
            // 3. User does not exist -> Register new user
            user = new User({
                username: name, // Google name as username
                email: email,
                authProvider: 'google',
                profilePicture: picture,
                // No password needed
            });

            await user.save();

            const jwtToken = authService.generateToken(user);

            return res.json({
                success: true,
                message: 'Registration successful',
                token: jwtToken,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    profilePicture: user.profilePicture
                }
            });
        }

    } catch (error) {
        console.error('Google Auth Error:', error);
        console.error('Environment Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set');
        console.error('Token received:', token ? 'Yes' : 'No');
        return res.status(401).json({ success: false, error: 'Invalid token', details: error.message });
    }
};
