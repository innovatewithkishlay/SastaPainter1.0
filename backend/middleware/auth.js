exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized', message: 'Please login to continue' });
};

exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        return next();
    }
    res.status(403).json({ error: 'Forbidden', message: 'Admin access required' });
};
