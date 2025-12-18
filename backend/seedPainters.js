const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Painter = require('./models/Painter');

dotenv.config();

const painters = [
    {
        name: 'Rajesh Kumar',
        phone: '9876543210',
        specialization: 'Interior & Texture',
        experience: 8,
        address: 'Sector 15, Noida, UP',
        salary: 25000,
        rating: 4.8,
        reviews_count: 12
    },
    {
        name: 'Suresh Patil',
        phone: '9898989898',
        specialization: 'Exterior Waterproofing',
        experience: 12,
        address: 'Indiranagar, Bangalore, KA',
        salary: 28000,
        rating: 4.9,
        reviews_count: 25
    },
    {
        name: 'Amit Verma',
        phone: '9123456780',
        specialization: 'Wood Polishing',
        experience: 5,
        address: 'Lajpat Nagar, Delhi',
        salary: 22000,
        rating: 4.5,
        reviews_count: 8
    },
    {
        name: 'Vikram Singh',
        phone: '9988776655',
        specialization: 'Wall Stencils & Art',
        experience: 6,
        address: 'Koramangala, Bangalore',
        salary: 24000,
        rating: 4.7,
        reviews_count: 15
    },
    {
        name: 'Manoj Tiwari',
        phone: '8877665544',
        specialization: 'General Painting',
        experience: 15,
        address: 'Andheri West, Mumbai',
        salary: 30000,
        rating: 4.6,
        reviews_count: 40
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aapkapainter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('MongoDB Connected');
        await Painter.deleteMany({}); // Clear existing
        await Painter.insertMany(painters);
        console.log('Painters Seeded Successfully');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
