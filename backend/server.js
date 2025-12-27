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


app.use(
    helmet({
        crossOriginOpenerPolicy: false,
        crossOriginEmbedderPolicy: false,
        referrerPolicy: { policy: "origin-when-cross-origin" }, 
    })
);

// Additional Security Headers for Google Auth (if needed, but Helmet covers most)
app.use((req, res, next) => {
    
    next();
});
app.use(express.json({ limit: '1mb' })); 
app.use(express.urlencoded({ extended: true, limit: '1mb' })); 
app.use(express.static(path.join(__dirname, 'public')));
const MongoStore = require('connect-mongo');
const { requireAuth } = require('./middleware/requireAuth');

const isProduction = config.env === 'production';

app.set('trust proxy', 1); 
app.use(session({
    secret: config.jwtSecret, 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.mongoURI,
        ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
        secure: isProduction, 
        sameSite: isProduction ? 'none' : 'lax', 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));


// Routes
const publicRoutes = require('./routes/v1/public');
const userRoutes = require('./routes/v1/user');
const adminRoutes = require('./routes/v1/admin');


app.use('/api/v1', publicRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);


app.use('/api', publicRoutes);
app.use('/api', userRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/admin', adminRoutes);

// Auth Check Endpoint
app.get('/api/check-auth', requireAuth, (req, res) => {
    res.json({ isAuthenticated: true, user: req.user });
});

app.get('/', (req, res) => {
    res.send('API is running. Use /api endpoints.');
});


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
