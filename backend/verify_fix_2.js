
const mongoose = require('mongoose');
const Inquiry = require('./models/Inquiry');

mongoose.connect('mongodb://127.0.0.1:27017/aapkapainter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected');

        // 1. Count ALL bookings
        const allBookings = await Inquiry.find({});
        console.log(`Total Bookings in DB: ${allBookings.length}`);

        // 2. Test "Undefined" Query (Simulates the bug)
        console.log('--- Testing query { user: undefined } ---');
        const bugResults = await Inquiry.find({ user: undefined });
        console.log(`Results for { user: undefined }: ${bugResults.length}`);

        // 3. Test "Null" Query (Just in case)
        console.log('--- Testing query { user: null } ---');
        const nullResults = await Inquiry.find({ user: null });
        console.log(`Results for { user: null }: ${nullResults.length}`);

        // 4. Test "Empty Object" Query
        console.log('--- Testing query {} ---');
        const emptyResults = await Inquiry.find({});
        console.log(`Results for {}: ${emptyResults.length}`);

        // 5. Sanity Check: Create a dummy booking with no user if none exist, to verify leak
        if (allBookings.length === 0) {
            console.log('Creating dummy booking to verify leak...');
            await Inquiry.create({
                name: 'Ghost', phone: '000', city: 'Delhi', service_type: 'Test Leak',
                user: null
            });
            const bugResultsAfter = await Inquiry.find({ user: undefined });
            console.log(`Results for { user: undefined } AFTER create: ${bugResultsAfter.length}`);
        }

        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });
