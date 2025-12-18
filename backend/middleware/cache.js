const NodeCache = require('node-cache');

// Standard TTL: 5 minutes (300 seconds)
const cache = new NodeCache({ stdTTL: 300 });

exports.cacheMiddleware = (duration) => (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        return res.json(cachedResponse);
    } else {
        // Override res.json to store the response in cache before sending
        const originalJson = res.json;
        res.json = (body) => {
            cache.set(key, body, duration);
            originalJson.call(res, body);
        };
        next();
    }
};

// Helper to manually clear cache (e.g., after admin updates)
exports.clearCache = (key) => {
    if (key) {
        cache.del(key);
    } else {
        cache.flushAll();
    }
};
