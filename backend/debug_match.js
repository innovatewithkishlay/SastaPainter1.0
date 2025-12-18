
const mongoose = require('mongoose');
const User = require('./models/User');
const Inquiry = require('./models/Inquiry');

mongoose.connect('mongodb://127.0.0.1:27017/aapkapainter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        const email = 'devendrasinghchohan851@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log(`User ID: ${user._id}`);
            // Find bookings for this user
            const bookings = await Inquiry.find({ user: user._id });
            console.log(`Bookings Count: ${bookings.length}`);
            bookings.forEach(b => console.log(`Booking: ${b.service_type} (${b.status}) - ID: ${b._id}`));
        } else {
            console.log('User not found');
        }

        // Find "Ghost" booking
        const ghost = await Inquiry.findOne({ service_type: 'Interior Painting', status: 'Completed', city: 'Delhi' });
        if (ghost) {
            console.log('Ghost Booking Found!');
            console.log(`Ghost ID: ${ghost._id}`);
            console.log(`Ghost User Reference: ${ghost.user}`);

            if (user && ghost.user && ghost.user.toString() === user._id.toString()) {
                console.log('MATCH! The user is linked to this booking.');
            } else {
                console.log('MISMATCH! The booking belongs to someone else (or no one).');
            }
        } else {
            console.log('No matching ghost booking found in DB.');
        }

        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });
