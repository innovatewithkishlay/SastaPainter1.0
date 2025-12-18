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
        const adminEmail = 'admin@aapkapainter.com';
        const password = 'adminpassword123';
        const hashedPassword = await bcrypt.hash(password, 10);

        let admin = await User.findOne({ email: adminEmail });

        if (admin) {
            console.log('Admin user found. Updating password and privileges...');
            admin.password = hashedPassword;
            admin.isAdmin = true;
            await admin.save();
            console.log('Admin updated successfully.');
        } else {
            console.log('Creating new admin user...');
            const newAdmin = new User({
                username: 'Admin',
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
