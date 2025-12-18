const mongoose = require('mongoose');

const siteVisitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        enum: ['Bangalore', 'Delhi', 'Noida', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai'], // Expanded list or kept strictly to service areas? User screenshot showed "Bangalore". I'll add major cities or keep it dynamic.
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Scheduled', 'Inspection_Done', 'Completed', 'Cancelled']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SiteVisit', siteVisitSchema);
