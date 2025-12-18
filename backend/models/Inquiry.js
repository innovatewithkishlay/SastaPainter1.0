const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    city: {
        type: String,
        enum: ['Delhi', 'Noida'],
        required: true
    },
    service_type: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    address: {
        type: String,
        required: true // Address is crucial for a site visit
    },
    pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, 'Please enter a valid 6-digit Pincode']
    },
    preferred_date: {
        type: Date
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Contacted', 'Scheduled', 'In_Progress', 'Inspection_Done', 'Completed', 'Cancelled']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedPainter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Painter'
    },
    editHistory: [{
        timestamp: { type: Date, default: Date.now },
        changes: { type: Object }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for performance
inquirySchema.index({ user: 1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
