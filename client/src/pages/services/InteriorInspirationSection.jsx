import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './interiorInspirationSection.css';

const InteriorInspirationSection = () => {
    const navigate = useNavigate();

    // Data for the first 5 static cards
    // Using exact filenames requested: wall-stencils.webp, etc.
    const inspirationItems = [
        { id: 1, title: 'Wall Stencil Designs', image: '/images/wall-stencils.webp' },
        { id: 2, title: 'Wall Painting Ideas', image: '/images/wall-painting.webp' },
        { id: 3, title: 'Bedroom Painting Ideas', image: '/images/bedroom-painting.webp' },
        { id: 4, title: 'Wall Texture Designs', image: '/images/wall-texture.webp' },
        { id: 5, title: 'Living Room Painting', image: '/images/livingroom-painting.webp' },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="inspiration-section">
            <motion.div
                className="inspiration-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2>Looking for Ideas That Inspire?</h2>
            </motion.div>

            <motion.div
                className="inspiration-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Render first 5 static cards */}
                {inspirationItems.map((item) => (
                    <motion.div
                        key={item.id}
                        className="inspiration-card static-card"
                        variants={cardVariants}
                    >
                        <img src={item.image} alt={item.title} />
                        <div className="card-overlay">
                            <span>{item.title}</span>
                        </div>
                    </motion.div>
                ))}

                {/* Render 6th CTA card */}
                <motion.div
                    className="inspiration-card cta-card"
                    variants={cardVariants}
                    onClick={() => navigate('/book')}
                >
                    <img src="/images/last-image.webp" alt="Inspiration CTA" />
                    <div className="cta-overlay">
                        <span className="cta-text">Get your picture-perfect walls with us</span>
                        <span className="cta-number">42365+</span>
                        <button className="cta-btn">Let's Connect</button>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default InteriorInspirationSection;
