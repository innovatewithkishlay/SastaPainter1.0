import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { faqData } from '../data/faqs';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section" style={{ padding: '4rem 0', background: '#f8fafc' }}>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>

                {/* Left Side: Sticky Title */}
                <div className="faq-header" style={{ flex: '1 1 300px', maxWidth: '400px' }}>
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <span style={{
                            color: '#2563eb',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            Support
                        </span>
                        <h2 style={{
                            fontSize: '3rem',
                            color: '#0f172a',
                            fontWeight: '800',
                            lineHeight: '1.1',
                            marginBottom: '1.5rem'
                        }}>
                            Frequently<br />Asked<br />Questions
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Everything you need to know about Sasta Painter's services, pricing, and process.
                            Can't find what you're looking for? <br />
                            <a href="#book" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Book a consultation</a>.
                        </p>
                        <div style={{ marginTop: '2rem' }}>
                            <FaQuestionCircle size={120} color="#e2e8f0" style={{ opacity: 0.5 }} />
                        </div>
                    </div>
                </div>

                {/* Right Side: Accordion List */}
                <div className="faq-list" style={{ flex: '2 1 500px' }}>
                    {faqData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="faq-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            style={{
                                marginBottom: '1rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                background: 'white',
                                overflow: 'hidden',
                                boxShadow: activeIndex === index ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                                transition: 'box-shadow 0.3s ease'
                            }}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1.5rem',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <span style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: activeIndex === index ? '#2563eb' : '#1e293b',
                                    transition: 'color 0.3s'
                                }}>
                                    {item.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown color={activeIndex === index ? '#2563eb' : '#94a3b8'} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#64748b', lineHeight: '1.6' }}>
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
