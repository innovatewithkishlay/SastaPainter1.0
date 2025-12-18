const mongoose = require('mongoose');

const painterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    specialization: {
        type: String, // e.g., 'Interior', 'Exterior', 'Texture', 'Waterproofing'
        required: true
    },
    experience: {
        type: Number, // Years of experience
        required: true
    },
    address: {
        type: String,
        required: true // Added for professional record keeping
    },
    salary: {
        type: Number, // Daily or Monthly rate logic can be handled in UI, storing pure number here
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
    // Store current active booking IDs to prevent overbooking
    current_bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inquiry'
    }],
    rating: {
        type: Number,
        default: 5
    },
    reviews_count: {
        type: Number,
        default: 0
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Painter', painterSchema);
