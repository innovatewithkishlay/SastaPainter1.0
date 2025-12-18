const authService = require('../services/authService');

exports.requireAuth = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    const decoded = authService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    req.user = decoded;
    next();
};

exports.requireAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ success: false, error: 'Admin access required' });
    }
};

exports.checkAuth = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next();
    }

    const decoded = authService.verifyToken(token);

    if (decoded) {
        req.user = decoded;
    }

    next();
};
