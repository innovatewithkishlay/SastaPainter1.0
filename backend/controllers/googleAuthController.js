const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const authService = require('../services/authService');
const sendResponse = require('../utils/responseHandler');
const config = require('../config');

// Initialize Google Client
// Using environment variable for security
const client = new OAuth2Client(config.googleClientId);

exports.googleLogin = async (req, res, next) => {
    const { token, type } = req.body;

    if (!token) {
        return sendResponse(res, 400, false, 'Token is required');
    }

    try {
        let email, name, picture, googleId;

        if (type === 'access_token') {
            // Verify Access Token (from useGoogleLogin)
            const axios = require('axios');
            const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const payload = userInfoResponse.data;
            email = payload.email;
            name = payload.name;
            picture = payload.picture;
            googleId = payload.sub;

        } else {
            // Verify ID Token (from Google One Tap / <GoogleLogin />)
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.googleClientId,
            });
            const payload = ticket.getPayload();

            email = payload.email;
            name = payload.name;
            picture = payload.picture;
            googleId = payload.sub;
        }

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
            let username = name;
            let userExists = await User.findOne({ username });
            if (userExists) {
                // Append random 4-digit number to make username unique
                username = `${name.replace(/\s+/g, '')}${Math.floor(1000 + Math.random() * 9000)}`;
            }

            user = new User({
                username: username, // Unique username
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
        return sendResponse(res, 401, false, 'Google Authentication Failed', {
            error: error.message,
            clientIdConfigured: !!config.googleClientId
        });
    }
};
