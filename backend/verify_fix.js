
const mongoose = require('mongoose');
const User = require('./models/User');
const Inquiry = require('./models/Inquiry');

mongoose.connect('mongodb://127.0.0.1:27017/aapkapainter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected');

        // 1. Get a random user to act as the "logged in" user
        const user = await User.findOne({});
        if (!user) {
            console.log('No users found to test with.');
            return mongoose.disconnect();
        }
        console.log(`Testing with User: ${user.email} (${user._id})`);

        // 2. Simulate Bad Session (Old State)
        const sessionBad = {
            user: {
                id: user._id, // Wrong property
                email: user.email
            }
        };

        // 3. Simulate Good Session (New State)
        const sessionGood = {
            user: {
                _id: user._id, // Correct property
                email: user.email
            }
        };

        // 4. Test Query with Bad Session
        // The bug was: Inquiry.find({ user: req.session.user._id })
        // If _id is undefined, does Mongoose ignore it?
        const queryBad = sessionBad.user._id;
        console.log(`\n--- Test Bad Session ---`);
        console.log(`Querying with user: ${queryBad}`);
        try {
            // Explicitly passing undefined to find
            const badResults = await Inquiry.find({ user: queryBad });
            console.log(`Bad Query Results Count: ${badResults.length}`);
            // We expect this to be > 0 and equal to total bookings if the bug is reproduced
        } catch (e) {
            console.log('Bad Query Error:', e.message);
        }

        // 5. Test Query with Good Session
        const queryGood = sessionGood.user._id;
        console.log(`\n--- Test Good Session ---`);
        console.log(`Querying with user: ${queryGood}`);
        try {
            const goodResults = await Inquiry.find({ user: queryGood });
            console.log(`Good Query Results Count: ${goodResults.length}`);
            // We expect this to be 0 or the actual number of bookings this user has
        } catch (e) {
            console.log('Good Query Error:', e.message);
        }

        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });
