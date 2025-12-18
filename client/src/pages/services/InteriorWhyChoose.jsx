import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaPaintRoller, FaClock, FaSprayCan } from 'react-icons/fa';
import './interiorWhyChoose.css';

const InteriorWhyChoose = () => {
    const features = [
        {
            id: 1,
            icon: <FaPalette />,
            title: "Expert Color Consultation",
            text: "Our specialists help you select the perfect shades based on lighting, space, and style."
        },
        {
            id: 2,
            icon: <FaSprayCan />, // Using SprayCan as proxy for clean/dust-free or could use FaBroom if available
            title: "Dust-Free & Clean Process",
            text: "We follow a clean, organized painting process with minimal dust and disruption."
        },
        {
            id: 3,
            icon: <FaPaintRoller />,
            title: "Premium Paints & Finishes",
            text: "Only high-quality branded paints for smooth, durable, and elegant finishes."
        },
        {
            id: 4,
            icon: <FaClock />,
            title: "On-Time Delivery",
            text: "We commit to timelines and ensure projects are completed as promised."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
        <section className="why-choose-section">
            <div className="why-choose-container">
                <motion.div
                    className="why-choose-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Why Homeowners Trust Our Interior Painting Experts</h2>
                </motion.div>

                <motion.div
                    className="why-choose-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            className="feature-card"
                            variants={cardVariants}
                        >
                            <div className="icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InteriorWhyChoose;
