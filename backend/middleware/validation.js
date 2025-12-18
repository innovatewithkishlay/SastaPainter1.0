const { body, validationResult } = require('express-validator');

// Middleware to check validation results
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0].msg // Return the first error message
        });
    }
    next();
};

// Validation Rules

exports.validateRegister = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .trim()
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.validateLogin = [
    body('email') // Can be username or email, but usually we validate presence
        .trim()
        .notEmpty().withMessage('Email or Username is required'),
    body('password')
        .notEmpty().withMessage('Password is required')
];

exports.validateBooking = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone('en-IN').withMessage('Please provide a valid Indian phone number'),
    body('city')
        .trim()
        .notEmpty().withMessage('City is required')
        .isIn(['Delhi', 'Noida']).withMessage('Service available only in Delhi and Noida'),
    body('service_type').trim().notEmpty().withMessage('Service type is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('pincode')
        .trim()
        .notEmpty().withMessage('Pincode is required')
        .isLength({ min: 6, max: 6 }).withMessage('Pincode must be 6 digits')
        .isNumeric().withMessage('Pincode must be numeric')
];

exports.validateSiteVisit = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone('en-IN').withMessage('Please provide a valid Indian phone number'),
    body('city').trim().notEmpty().withMessage('City is required')
];
