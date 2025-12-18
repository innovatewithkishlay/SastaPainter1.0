const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Server Error';
    let code = err.code || 'INTERNAL_SERVER_ERROR';

    // Mongoose duplicate key
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
        code = 'DUPLICATE_VALUE';
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
        code = 'VALIDATION_ERROR';
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message: message,
            code: code
        }
    });
};

module.exports = errorHandler;
