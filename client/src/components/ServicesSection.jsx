import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

const ServicesSection = ({ services }) => {
    if (!services || services.length === 0) return null;

    return (
        <section className="services-preview" style={{ padding: '5rem 0', backgroundColor: '#f1f5f9' }}>
            <div className="container">
                <div className="section-title">
                    <span>Our Expertise</span>
                    <h2>Popular Services</h2>
                </div>
                <div className="grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={service._id || index}
                            className="service-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
                            style={{ background: 'var(--white)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}
                        >
                            <img src={service.image} alt={service.name} className="service-img" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                            <div className="service-content" style={{ padding: '1.5rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>{service.name}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{service.description}</p>
                                <Link to="/services" style={{ color: 'var(--accent-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Learn More <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/services" className="btn-primary">View All Services</Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
