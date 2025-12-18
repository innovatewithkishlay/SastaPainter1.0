import React, { useState } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import { FaCheckCircle, FaPaintRoller, FaUserTie, FaClock, FaShieldAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/BookingForm.css';

const BookingForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        pincode: '',
        service_type: '',
        preferred_date: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                // Use OpenStreetMap Nominatim API
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();

                const address = data.address;
                const city = address.city || address.state_district || address.town || '';
                const postcode = address.postcode || '';
                const fullAddress = data.display_name;

                // Normalize checks
                const cityLower = city.toLowerCase();
                const isDelhi = cityLower.includes('delhi');
                const isNoida = cityLower.includes('noida') || cityLower.includes('gautam buddha nagar');
                // Testing cities
                const isJalandhar = cityLower.includes('jalandhar');
                const isKapurthala = cityLower.includes('kapurthala');
                const isKhajurla = cityLower.includes('khajurla');
                const isPhagwara = cityLower.includes('phagwara') || cityLower.includes('phagwada');

                // if (isDelhi || isNoida || isJalandhar || isKapurthala || isPhagwara) {
                    let detectedCity = '';
                    if (isDelhi) detectedCity = 'Delhi';
                    else if (isNoida) detectedCity = 'Noida';
                    else if (isJalandhar) detectedCity = 'Jalandhar';
                    else if (isKapurthala) detectedCity = 'Kapurthala';
                    else if (isKhajurla) detectedCity = 'Khajurla';
                    else if (isPhagwara) detectedCity = 'Phagwara';

                    setFormData(prev => ({
                        ...prev,
                        address: fullAddress,
                        city: detectedCity,
                        pincode: postcode
                    }));
                    setStatus({ type: 'success', message: 'Location detected successfully!' });
                // } else {
                //     setStatus({ type: 'error', message: 'Sorry, our services are currently available only in Delhi, Noida & Punjab regions.' });
                // }

            } catch (error) {
                console.error("Location Error:", error);
                setStatus({ type: 'error', message: 'Failed to fetch address details.' });
            } finally {
                setLoading(false);
            }
        }, (error) => {
            console.error("Geolocation Error:", error);
            setStatus({ type: 'error', message: 'Unable to retrieve your location.' });
            setLoading(false);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            // Optional: You could allow guest booking or show a modal
            alert("Please login or register to book a site visit.");
            navigate('/login');
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await api.post('/book', formData);
            if (res.data.success) {
                // Determine if we show success directly
                setIsSubmitted(true);
                setStatus({ type: 'success', message: 'Booking Confirmed!' });
                setFormData({
                    name: '', phone: '', email: '',
                    address: '', city: '', pincode: '',
                    service_type: '', preferred_date: '', message: ''
                });
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const successVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
    };

    return (
        <section id="book" className="booking-section-wrapper" style={{ padding: '2rem 0', background: '#f1f5f9' }}>
            <div className="container">
                <motion.div
                    className="booking-container"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Left Side: Value Proposition */}
                    <div className="booking-left">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2>Transform Your Space</h2>
                            <p>Expert consultation, premium finishes, and a hassle-free experience. Book your free site visit today.</p>

                            <ul className="benefit-list">
                                <li className="benefit-item">
                                    <FaUserTie className="benefit-icon" />
                                    <span>Professional Color Consultation</span>
                                </li>
                                <li className="benefit-item">
                                    <FaPaintRoller className="benefit-icon" />
                                    <span>Top-Quality Materials & Execution</span>
                                </li>
                                <li className="benefit-item">
                                    <FaClock className="benefit-icon" />
                                    <span>On-Time Completion Guarantee</span>
                                </li>
                                <li className="benefit-item">
                                    <FaShieldAlt className="benefit-icon" />
                                    <span>1-Year Service Warranty</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right Side: Form or Success State */}
                    <div className="booking-right">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="form-header">
                                        <h3>Request Detailed Estimate</h3>
                                        <p>Fill in the details below for a comprehensive project quote.</p>
                                    </div>

                                    {status.type === 'error' && (
                                        <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.5rem', background: '#fee2e2', borderRadius: '4px' }}>
                                            {status.message}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="modern-form">
                                        {/* Full Name */}
                                        <div className="form-group">
                                            <label htmlFor="name" className="modern-label">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="modern-input"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>

                                        {/* Phone & Email */}
                                        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ position: 'relative' }}>
                                                <label htmlFor="phone" className="modern-label">Phone</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    className="modern-input"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765 43210"
                                                    required
                                                />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <label htmlFor="email" className="modern-label">Email (Optional)</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="modern-input"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="form-group">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <label htmlFor="address" className="modern-label" style={{ marginBottom: 0 }}>Site Address</label>
                                                <button
                                                    type="button"
                                                    onClick={handleGetLocation}
                                                    style={{
                                                        background: 'transparent',
                                                        border: '1px solid #3b82f6',
                                                        color: '#3b82f6',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.8rem',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <FaMapMarkerAlt /> Use Current Location
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="modern-input"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Flat No, Building, Street Area"
                                                required
                                            />
                                        </div>

                                        {/* City & Pincode */}
                                        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ position: 'relative' }}>
                                                <label htmlFor="city" className="modern-label">City</label>
                                                <select
                                                    id="city"
                                                    name="city"
                                                    className="modern-input"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select City</option>
                                                    <option value="Delhi">Delhi</option>
                                                    <option value="Noida">Noida</option>
                                                    <option value="Jalandhar">Jalandhar</option>
                                                    <option value="Kapurthala">Kapurthala</option>
                                                    <option value="Phagwara">Phagwara</option>
                                                </select>
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <label htmlFor="pincode" className="modern-label">Pincode</label>
                                                <input
                                                    type="text"
                                                    id="pincode"
                                                    name="pincode"
                                                    className="modern-input"
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    placeholder="110001"
                                                    maxLength="6"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Service & Date */}
                                        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ position: 'relative' }}>
                                                <label htmlFor="service_type" className="modern-label">Service Required</label>
                                                <select
                                                    id="service_type"
                                                    name="service_type"
                                                    className="modern-input"
                                                    value={formData.service_type}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Service</option>
                                                    <option value="Interior Painting">Interior Painting</option>
                                                    <option value="Exterior Painting">Exterior Painting</option>
                                                    <option value="Rental Painting">Rental Painting</option>
                                                    <option value="Waterproofing">Waterproofing</option>
                                                    <option value="Wood Finishes">Wood Finishes</option>
                                                </select>
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <label htmlFor="preferred_date" className="modern-label">Preferred Date</label>
                                                <input
                                                    type="date"
                                                    id="preferred_date"
                                                    name="preferred_date"
                                                    className="modern-input"
                                                    value={formData.preferred_date}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="form-group">
                                            <label htmlFor="message" className="modern-label">Any specific requirements?</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                className="modern-input"
                                                rows="2"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="e.g., damp walls, urgency..."
                                            ></textarea>
                                        </div>

                                        <button type="submit" className="btn-premium" disabled={loading}>
                                            {loading ? 'Processing...' : 'Book Free Site Visit'}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    className="success-container"
                                    variants={successVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div className="checkmark-circle">
                                        <FaCheckCircle color="white" size={40} />
                                    </div>
                                    <h3 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem' }}>Thank You!</h3>
                                    <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                        Your site visit request has been received. Our expert will contact you shortly to confirm the appointment.
                                    </p>
                                    <button
                                        className="btn-premium"
                                        onClick={() => { setIsSubmitted(false); navigate('/my-bookings'); }}
                                        style={{ maxWidth: '200px' }}
                                    >
                                        View My Bookings
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BookingForm;
