const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const authService = require('../services/authService');
const sendResponse = require('../utils/responseHandler');
const config = require('../config');

// Initialize Google Client
// Using environment variable for security
const client = new OAuth2Client(config.googleClientId);

exports.googleLogin = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return sendResponse(res, 400, false, 'Token is required');
    }

    try {
        let email, name, picture, googleId;

        // Verify ID Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.googleClientId,
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

            return sendResponse(res, 200, true, 'Login successful', {
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

            return sendResponse(res, 200, true, 'Registration successful', {
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
        console.error('Environment Client ID:', config.googleClientId ? 'Set' : 'Not Set');
        console.error('Token received:', token ? 'Yes' : 'No');
        // For auth errors, we might want to return 401, but next(error) will default to 500.
        // Let's use sendResponse for specific auth failure here as it was before.
        return sendResponse(res, 401, false, 'Invalid token', { details: error.message });
    }
};
