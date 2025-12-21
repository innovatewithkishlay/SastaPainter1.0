const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/aapkapainter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const createAdmin = async () => {
    try {
        const adminEmail = 'kishlay@developer.sastapainter.com';
        const password = 'kishlay123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find by Email OR Username to avoid duplicate key errors
        let admin = await User.findOne({
            $or: [{ email: adminEmail }, { username: 'kishlay' }]
        });

        if (admin) {
            console.log(`User found (ID: ${admin._id}). Updating credentials...`);
            admin.email = adminEmail; // Ensure email is updated
            admin.username = 'kishlay'; // Ensure username is set
            admin.password = hashedPassword;
            admin.isAdmin = true;
            await admin.save();
            console.log('Admin updated successfully.');
        } else {
            console.log('Creating new admin user...');
            const newAdmin = new User({
                username: 'kishlay',
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true
            });
            await newAdmin.save();
            console.log('Admin created successfully.');
        }
        mongoose.disconnect();
    } catch (error) {
        console.error('Error creating admin:', error);
        mongoose.disconnect();
    }
};

createAdmin();
