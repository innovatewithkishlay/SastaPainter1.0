const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

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
            // If user registered with email/password previously, we can link or merge.
            // For now, we just update the authProvider if it was local, or just log them in.
            // Optionally update profile picture if not set
            if (!user.profilePicture) {
                user.profilePicture = picture;
                await user.save();
            }

            // (Optional) If you want to enforce that 'local' users can't login via Google without linking, 
            // you'd check authProvider. But typically, email match is sufficient for convenience.

            // Create session/token (Using existing session logic if applicable, or just returning user)
            // Assuming express-session is used based on package.json, or simple response for client-side state
            req.session.user = {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                profilePicture: user.profilePicture
            };

            return res.json({
                success: true,
                message: 'Login successful',
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

            req.session.user = {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                profilePicture: user.profilePicture
            };

            return res.json({
                success: true,
                message: 'Registration successful',
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
