import React from 'react';
import { motion } from 'framer-motion';
import './interiorPaintingProcess.css';

const InteriorPaintingProcess = () => {
    const steps = [
        {
            id: 1,
            title: "Site Inspection & Requirements",
            text: "We understand your needs and inspect the space before starting."
        },
        {
            id: 2,
            title: "Color & Finish Selection",
            text: "Choose from a wide range of colors with expert guidance."
        },
        {
            id: 3,
            title: "Surface Preparation",
            text: "Crack filling, sanding, and priming for a flawless base."
        },
        {
            id: 4,
            title: "Professional Painting",
            text: "Skilled painters execute with precision and care."
        },
        {
            id: 5,
            title: "Final Inspection & Cleanup",
            text: "We ensure perfect finish and leave your home clean."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25
            }
        }
    };

    const stepVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="process-section">
            <div className="process-container">
                <motion.div
                    className="process-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Our Simple Interior Painting Process</h2>
                </motion.div>

                <div className="process-timeline-wrapper">
                    {/* Background Line */}
                    <motion.div
                        className="process-line"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="process-timeline"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {steps.map((step) => (
                            <motion.div
                                key={step.id}
                                className="process-step"
                                variants={stepVariants}
                            >
                                <div className="step-number">{step.id}</div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InteriorPaintingProcess;
