const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aapkapainter';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://backendsp-mbzs.onrender.com', 'https://sastapainter.onrender.com'],
    credentials: true
}));

// Security Headers for Google Auth
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
});
app.use(express.json()); // Allow JSON body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const MongoStore = require('connect-mongo');

const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1); // Trust first proxy (Render/Heroku)
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aapkapainter',
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
app.get('/api/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});

app.get('/', (req, res) => {
    res.send('API is running. Use /api endpoints.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
