const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const config = require('./config');

const app = express();
const PORT = config.port;

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Middleware
app.use(cors({
    origin: config.allowedOrigins,
    credentials: true
}));

const helmet = require('helmet');

// Security Headers
// Custom COOP for Google Login (Helmet sets it to same-origin by default, we need same-origin-allow-popups)
// We also need to disable COEP (Cross-Origin-Embedder-Policy) or set it to unsafe-none for Google scripts to work
app.use(
    helmet({
        crossOriginOpenerPolicy: false,
        crossOriginEmbedderPolicy: false,
        referrerPolicy: { policy: "origin-when-cross-origin" }, // Better for Google Auth
    })
);

// Additional Security Headers for Google Auth (if needed, but Helmet covers most)
app.use((req, res, next) => {
    // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); // Handled by Helmet config above
    next();
});
app.use(express.json({ limit: '1mb' })); // Allow JSON body parsing with 1MB limit
app.use(express.urlencoded({ extended: true, limit: '1mb' })); // Allow URL-encoded body parsing with 1MB limit
app.use(express.static(path.join(__dirname, 'public')));
const MongoStore = require('connect-mongo');
const { requireAuth } = require('./middleware/requireAuth');

const isProduction = config.env === 'production';

app.set('trust proxy', 1); // Trust first proxy (Render/Heroku)
app.use(session({
    secret: config.jwtSecret, // Using jwtSecret as session secret for simplicity, or add sessionSecret to config
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.mongoURI,
        ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
        secure: isProduction, // True in Prod (HTTPS), False in Local (HTTP)
        sameSite: isProduction ? 'none' : 'lax', // None for Cross-Site, Lax for Local
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Routes
// Routes
const publicRoutes = require('./routes/v1/public');
const userRoutes = require('./routes/v1/user');
const adminRoutes = require('./routes/v1/admin');

// Mount v1 Routes
app.use('/api/v1', publicRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// Backward Compatibility (Alias /api to /api/v1/public for auth/services, but this is tricky with nested routes)
// Better to just update frontend to use /api/v1.
// For now, I will also mount them at /api for immediate compatibility while I update frontend in Phase 3.
app.use('/api', publicRoutes);
app.use('/api', userRoutes); // This might conflict if paths overlap, but they don't really.
app.use('/api/admin', adminRoutes);

// Auth Check Endpoint
app.get('/api/check-auth', requireAuth, (req, res) => {
    res.json({ isAuthenticated: true, user: req.user });
});

app.get('/', (req, res) => {
    res.send('API is running. Use /api endpoints.');
});

// Health Check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date(),
        uptime: process.uptime(),
        env: config.env
    });
});

// Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
