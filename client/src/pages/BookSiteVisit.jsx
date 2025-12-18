import React, { useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import FAQ from '../components/FAQ';
import '../styles/BookingForm.css'; // Reuse basic button styles

const BookSiteVisit = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: 'Bangalore' // Default from screenshot
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await api.post('/site-visit', formData);
            if (res.data.success) {
                setStatus({ type: 'success', message: 'Inspection Booked Successfully!' });
                setFormData({ name: '', phone: '', city: 'Bangalore' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Something went wrong.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="site-visit-page" style={{ paddingTop: '80px' }}>
            {/* Hero / Form Section */}
            <div style={{
                position: 'relative',
                minHeight: '90vh',
                backgroundImage: `url('/images/booksitevisit.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                {/* Overlay for text readability if needed, but screenshot shows clear image. 
                    Adding a subtle gradient at the top/bottom might help.
                */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.3)' // Darken slightly to pop the white card 
                }}></div>

                <div className="site-visit-content" style={{ position: 'relative', width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                    {/* Header Text */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', color: '#fff' }}
                    >
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Unlock the Best Deals by Booking<br />a Inspection Today
                        </h1>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '3rem',
                            width: '100%',
                            maxWidth: '500px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h2 style={{ textAlign: 'center', color: '#1e293b', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            Book Site Visit
                        </h2>
                        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            Get a thorough Site Inspection and Colour Consultation from Our Experts
                        </p>

                        {status.message && (
                            <div style={{
                                padding: '10px',
                                marginBottom: '20px',
                                borderRadius: '8px',
                                background: status.type === 'error' ? '#fee2e2' : '#dcfce7',
                                color: status.type === 'error' ? '#991b1b' : '#166534',
                                textAlign: 'center'
                            }}>
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.5rem', display: 'flex', gap: '10px' }}>
                                <div style={{
                                    padding: '1rem',
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    color: '#64748b'
                                }}>+91</div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        backgroundColor: '#fff',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Noida">Noida</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Chennai">Chennai</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)', // Red-Orange Gradient
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                {loading ? 'Booking...' : 'Book Site Inspection'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* FAQ Section */}
            <FAQ />
        </div>
    );
};

export default BookSiteVisit;
