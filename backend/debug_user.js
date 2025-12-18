
const mongoose = require('mongoose');
const User = require('./models/User');
const Inquiry = require('./models/Inquiry');

mongoose.connect('mongodb://127.0.0.1:27017/aapkapainter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected');

        const email = 'devendrasinghchohan851@gmail.com';
        const targetUser = await User.findOne({ email });

        if (targetUser) {
            console.log(`Target User Found: ${targetUser.email} ID: ${targetUser._id}`);
            // Find bookings with this user ID
            const userBookings = await Inquiry.find({ user: targetUser._id });
            console.log(`Bookings by User ID (${userBookings.length}):`);
            console.log(JSON.stringify(userBookings, null, 2));
        } else {
            console.log('Target User NOT Found');
        }

        // Check for any bookings with this email directly (orphaned or by string)
        const emailBookings = await Inquiry.find({ email: email });
        console.log(`Bookings by Email String (${emailBookings.length}):`);
        console.log(JSON.stringify(emailBookings, null, 2));

        // Check ALL bookings to see if any match the description "Interior Painting" and status "Completed"
        const suspectedBookings = await Inquiry.find({
            service_type: 'Interior Painting',
            status: 'Completed'
        });
        console.log(`Suspected "Interior Painting" Completed Bookings (${suspectedBookings.length}):`);
        if (suspectedBookings.length > 0) {
            console.log('Sample suspected booking:', JSON.stringify(suspectedBookings[0], null, 2));
            console.log('User ID of sample:', suspectedBookings[0].user);
        }

        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });
