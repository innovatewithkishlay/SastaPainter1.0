import React from 'react';
import { motion } from 'framer-motion';
import '../../pages/services/interiorWhyChoose.css'; // Reusing CSS

const ServiceWhyChoose = ({ features, title }) => {
    // Default title if not provided
    const sectionTitle = title || "Why Homeowners Trust Our Experts";

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
                    <h2>{sectionTitle}</h2>
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

export default ServiceWhyChoose;
