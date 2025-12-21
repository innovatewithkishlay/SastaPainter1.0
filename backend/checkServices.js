const mongoose = require('mongoose');
const config = require('./config');
const Service = require('./models/Service');

mongoose.connect(config.mongoURI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const count = await Service.countDocuments();
        console.log(`Total Services: ${count}`);
        if (count > 0) {
            const services = await Service.find({}).limit(3);
            console.log('Sample Services:', JSON.stringify(services, null, 2));
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
