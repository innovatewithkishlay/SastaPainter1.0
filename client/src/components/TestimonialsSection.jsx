import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const TestimonialsSection = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get('/reviews/public');
                if (res.data.success) {
                    setReviews(res.data.data.reviews);
                }
            } catch (err) {
                console.error('Failed to fetch reviews', err);
            }
        };
        fetchReviews();
    }, []);

    if (reviews.length === 0) return null;

    return (
        <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>
                        What Our Customers Say
                    </h2>
                    <div style={{ width: '80px', height: '4px', background: '#f59e0b', margin: '0 auto', borderRadius: '2px' }}></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '16px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: '#f59e0b' }}>
                                {[...Array(5)].map((_, index) => (
                                    <FaStar key={index} color={index < review.rating ? '#f59e0b' : '#e2e8f0'} />
                                ))}
                            </div>
                            <p style={{ color: '#334155', lineHeight: '1.6', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                "{review.comment}"
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: '#0f172a', fontWeight: '600' }}>{review.user?.username || 'SastaPainter Customer'}</h4>
                                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                        {review.bookings || 'Verified Customer'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '3rem', color: '#e2e8f0', lineHeight: 0, fontFamily: 'serif' }}>
                                    "
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
