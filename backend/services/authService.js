const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-prod';
const JWT_EXPIRES_IN = '7d';

exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
