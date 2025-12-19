import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ServicesBanner from '../components/ServicesBanner';

const Services = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                if (res.data.success) {
                    setServices(res.data.data.services);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading...</div>;

    return (
        <div>
            <ServicesBanner />
            <div className="container" style={{ padding: '4rem 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="section-title">
                        <span>Our Expertise</span>
                        <h2>Explore All Services</h2>
                    </div>
                </motion.div>

                <div className="grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={service._id}
                            className="service-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
                            style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow)',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                if (service.name === 'Interior Painting' || service.name === 'Interior Painting Services') {
                                    navigate('/services/Interior-Painting');
                                } else if (service.name === 'Exterior Painting' || service.name === 'Exterior Painting Services') {
                                    navigate('/services/Exterior-Painting');
                                } else if (service.name === 'Rental Painting' || service.name === 'Rental Painting Services') {
                                    navigate('/services/Rental-Painting');
                                } else if (service.name === 'Waterproofing' || service.name === 'Waterproofing Services') {
                                    navigate('/services/Waterproofing');
                                } else if (service.name === 'Wood Finishes' || service.name === 'Wood Polishing') {
                                    navigate('/services/Wood-Finishes');
                                } else if (service.name === 'Texture Painting' || service.name === 'Texture Designs') {
                                    navigate('/services/Texture-Painting');
                                } else {
                                    navigate('/book');
                                }
                            }}
                        >
                            <img src={service.image} alt={service.name} className="service-img" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                            <div className="service-content" style={{ padding: '1.5rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>{service.name}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{service.description}</p>
                                <span className="btn-primary" style={{ fontSize: '0.9rem', display: 'inline-block' }}>
                                    Book Now
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
