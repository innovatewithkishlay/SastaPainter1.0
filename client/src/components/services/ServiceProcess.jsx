import React from 'react';
import { motion } from 'framer-motion';
import '../../pages/services/interiorPaintingProcess.css'; // Reusing CSS

const ServiceProcess = ({ steps, title }) => {
    const sectionTitle = title || "Our Simple Service Process";

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
                    <h2>{sectionTitle}</h2>
                </motion.div>

                <div className="process-timeline-wrapper">

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

export default ServiceProcess;
