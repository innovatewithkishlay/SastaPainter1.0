const mongoose = require('mongoose');
const config = require('./config');
const Service = require('./models/Service');

const services = [
    {
        name: 'Interior Painting',
        description: 'Transform your indoor spaces with our premium interior painting services. We offer a wide range of colors and finishes to match your style.',
        image: '/images/interior.webp',
        category: 'Interior'
    },
    {
        name: 'Exterior Painting',
        description: 'Protect and beautify your home\'s exterior with our durable and weather-resistant painting solutions.',
        image: '/images/exterior-painting-banner.webp',
        category: 'Exterior'
    },
    {
        name: 'Rental Painting',
        description: 'Quick and affordable painting services for rental properties. Get your property ready for the next tenant in no time.',
        image: '/images/rental-painting-banner.jpg',
        category: 'Rental'
    },
    {
        name: 'Waterproofing',
        description: 'Prevent water damage and leakage with our expert waterproofing services for roofs, walls, and basements.',
        image: '/images/waterproofing-banner.avif',
        category: 'Waterproofing'
    },
    {
        name: 'Wood Finishes',
        description: 'Enhance the natural beauty of your wood furniture and fixtures with our high-quality wood polishing and finishing services.',
        image: '/images/wood-finishes-banner.avif',
        category: 'Wood'
    },
    {
        name: 'Texture Painting',
        description: 'Add depth and character to your walls with our unique texture painting designs and techniques.',
        image: '/images/texture-painting-banner.avif',
        category: 'Texture'
    }
];

mongoose.connect(config.mongoURI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Service.deleteMany({}); // Clear existing
        console.log('Cleared existing services');

        await Service.insertMany(services);
        console.log('Seeded services successfully');

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
