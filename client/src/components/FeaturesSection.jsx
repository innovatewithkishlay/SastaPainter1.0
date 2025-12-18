import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaUserShield, FaMedal } from 'react-icons/fa6';

const FeaturesSection = () => {
    const features = [
        { icon: <FaClock />, title: 'On-Time Completion', text: 'We respect your time. Our dedicated team ensures timely delivery of all projects.' },
        { icon: <FaUserShield />, title: 'Safe & Hygiene', text: 'Our painters follow strict safety protocols and maintain hygiene throughout the process.' },
        { icon: <FaMedal />, title: 'Premium Finish', text: 'We use top-quality paints and tools to ensure a flawless and durable finish.' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="features" style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
            <div className="container">
                <div className="section-title">
                    <span>Why Choose Us</span>
                    <h2>The SastaPainter Advantage</h2>
                </div>
                <motion.div
                    className="grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: 'var(--radius)', textAlign: 'center' }}
                        >
                            <div className="feature-icon" style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
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

export default FeaturesSection;
