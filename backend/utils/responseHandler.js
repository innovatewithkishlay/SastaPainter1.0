/**
 * Standard API Response Handler
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Success status
 * @param {string} message - Message to client
 * @param {Object} data - Data payload (optional)
 */
const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message
    };

    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

module.exports = sendResponse;
