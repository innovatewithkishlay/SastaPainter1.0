const mongoose = require('mongoose');
const Service = require('./models/Service');

mongoose.connect('mongodb://127.0.0.1:27017/aapkapainter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.log(err));

const services = [
    {
        name: 'Interior Painting',
        description: 'Refresh your home interiors with our premium safe painting services.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80',
        category: 'Interior'
    },
    {
        name: 'Exterior Painting',
        description: 'Protect and beautify your home exteriors with weather-proof paints.',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80',
        category: 'Exterior'
    },
    {
        name: 'Rental Painting',
        description: 'Quick and affordable painting solutions for rental properties.',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80',
        category: 'Interior'
    },
    {
        name: 'Waterproofing',
        description: 'Expert waterproofing solutions for roof, bathroom, and kitchen.',
        image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80',
        category: 'Waterproofing'
    },
    {
        name: 'Wood Finishes',
        description: 'Premium wood polishing and coating services.',
        image: 'https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?auto=format&fit=crop&q=80',
        category: 'Wood'
    },
    {
        name: 'Texture Painting',
        description: 'Add depth and character to your walls with unique textures.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80',
        category: 'Texture'
    }
];

const seedDB = async () => {
    try {
        await Service.deleteMany({});
        await Service.insertMany(services);
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDB();
