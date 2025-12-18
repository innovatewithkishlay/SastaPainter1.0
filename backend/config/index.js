require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aapkapainter',
    jwtSecret: process.env.JWT_SECRET || 'secretKey', // Fallback for dev only
    env: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    allowedOrigins: [
        'http://localhost:5173',
        'https://backendsp-mbzs.onrender.com',
        'https://sastapainter.onrender.com',
        process.env.CLIENT_URL
    ].filter(Boolean)
};

module.exports = config;
