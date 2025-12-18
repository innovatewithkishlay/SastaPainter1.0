/**
 * ServiceCards.jsx
 * 
 * "Book Our Service" section with polished visuals.
 * Changes:
 * - Removed solid black overlay, replaced with gradient.
 * - Improved grid layout (4 cols on large screens).
 * - Enhanced animations (scale up, subtle depth).
 * - Accessibility improvements.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { services } from '../data/services';
import './serviceCards.css';

const ServiceCard = ({ service, index }) => {
    const navigate = useNavigate();

    // Parallax values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Springs for smoother movement
    const springConfig = { stiffness: 400, damping: 30 };
    const imgX = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
    const imgY = useSpring(useTransform(y, [-0.5, 0.5], [-8, 8]), springConfig);

    const handleClick = () => {
        const url = `/book?service=${service.slug}`;
        if (navigate) navigate(url);
        else window.location.href = url;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <motion.div
            className="service-card-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex="0"
            aria-label={`Book service for ${service.title}`}
        >
            <motion.div
                className="service-card-image-wrapper"
            >
                <motion.img
                    src={service.image}
                    alt={service.title}
                    className="service-card-img"
                    loading="lazy"
                    style={{
                        x: imgX,
                        y: imgY,
                        scale: 1.1 // Slight zoom to allow parallax movement
                    }}
                />
                <div className="service-card-overlay" />
            </motion.div>

            <motion.div
                className="service-card-content"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-subtitle">{service.subtitle}</p>
            </motion.div>
        </motion.div>
    );
};

const ServiceCards = () => {
    return (
        <section className="service-cards-section">
            <div className="service-cards-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                >
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                        Book Our Service
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Select a category to view specialized plans</p>
                </motion.div>

                <div className="service-cards-grid">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCards;
