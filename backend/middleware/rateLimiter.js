const rateLimit = require('express-rate-limit');

// Helper to create a standard response for rate limiting
const createRateLimitResponse = (message) => {
    return {
        success: false,
        error: {
            message: message,
            code: 'RATE_LIMIT_EXCEEDED'
        }
    };
};

// 1. Public API Limiter (IP based)
// 50 requests / 15 minutes
exports.publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: createRateLimitResponse('Too many requests from this IP, please try again after 15 minutes.')
});

// 2. Authenticated User API Limiter (Token/User ID based)
// 200 requests / 15 minutes
exports.userLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    // keyGenerator removed to fix ERR_ERL_KEY_GEN_IPV6. Defaults to IP based limiting.
    message: createRateLimitResponse('Too many requests from this account, please try again later.')
});

// 3. Admin API Limiter (Token/User ID based)
// 100 requests / 15 minutes
exports.adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    // keyGenerator removed to fix ERR_ERL_KEY_GEN_IPV6. Defaults to IP based limiting.
    message: createRateLimitResponse('Too many admin requests, please slow down.')
});

// 4. Auth Route Limiter (Stricter)
// 10 requests / 15 minutes (to prevent brute force)
exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: createRateLimitResponse('Too many login attempts, please try again after 15 minutes.')
});
