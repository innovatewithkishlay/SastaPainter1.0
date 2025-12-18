const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., 'Interior', 'Exterior', 'Wood', 'Waterproofing'
        required: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);
