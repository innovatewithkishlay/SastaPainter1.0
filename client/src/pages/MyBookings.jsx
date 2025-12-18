import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaClock, FaCheckCircle, FaPhone } from 'react-icons/fa';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Review State
    const [reviewModal, setReviewModal] = useState({ show: false, bookingId: null });
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await api.get('/my-bookings', { triggerLoader: true });
            if (res.data.success) {
                setBookings(res.data.inquiries);
            }
        } catch (err) {
            console.error("Fetch Bookings Error:", err.response || err);
            setError('Failed to fetch bookings. Please try logging in again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        try {
            await api.post(`/my-bookings/delete/${id}`);
            setBookings(bookings.filter(b => b._id !== id));
        } catch (err) {
            alert('Failed to delete booking');
        }
    };

    if (loading) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return { bg: '#dcfce7', text: '#166534', icon: <FaCheckCircle /> };
            case 'Contacted': return { bg: '#dbeafe', text: '#2563eb', icon: <FaPhone /> };
            case 'Scheduled': return { bg: '#e0e7ff', text: '#4338ca', icon: <FaClock /> };
            case 'In_Progress': return { bg: '#fae8ff', text: '#86198f', icon: <FaTools /> };
            case 'Inspection_Done': return { bg: '#ffedd5', text: '#c2410c', icon: <FaCheckCircle /> };
            case 'Cancelled': return { bg: '#f1f5f9', text: '#475569', icon: <FaBan /> };
            default: return { bg: '#fef3c7', text: '#d97706', icon: <FaClock /> };
        }
    };

    const handleReviewSubmit = async () => {
        try {
            await api.post('/reviews', {
                inquiryId: reviewModal.bookingId,
                rating,
                comment
            });
            alert('Review submitted successfully!');
            setReviewModal({ show: false, bookingId: null });
            setComment('');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to submit review');
        }
    };

    return (
        <div className="container" style={{ padding: '5rem 0' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="section-title">
                    <span>Dashboard</span>
                    <h2>My Bookings</h2>
                </div>
            </motion.div>

            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

            {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p>No bookings found.</p>
                </div>
            ) : (
                <div className="grid">
                    {bookings.map((booking, index) => {
                        const statusStyle = getStatusColor(booking.status);
                        return (
                            <motion.div
                                key={booking._id}
                                className="feature-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ padding: '2rem', background: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', textAlign: 'left' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1.25rem' }}>{booking.service_type}</h3>
                                    <span style={{
                                        backgroundColor: statusStyle.bg,
                                        color: statusStyle.text,
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {statusStyle.icon} {booking.status}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><strong>City:</strong> {booking.city} - {booking.pincode}</p>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><strong>Address:</strong> {booking.address}</p>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><strong>Date Requested:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                                {booking.preferred_date && <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><strong>Preferred Date:</strong> {new Date(booking.preferred_date).toLocaleDateString()}</p>}
                                {booking.message && <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}><strong>Note:</strong> {booking.message}</p>}
                                {booking.assignedPainter && (
                                    <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#0369a1', fontSize: '1rem' }}>Your Assigned Painter</h4>
                                        <p style={{ margin: 0, fontWeight: '600' }}>{booking.assignedPainter.name}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#0284c7' }}>📞 {booking.assignedPainter.phone}</p>
                                    </div>
                                )}

                                {booking.status === 'Completed' && (
                                    <button
                                        onClick={() => setReviewModal({ show: true, bookingId: booking._id })}
                                        style={{ marginTop: '1rem', background: '#f59e0b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        ⭐ Rate Service
                                    </button>
                                )}

                                {(booking.status !== 'Completed' && booking.status !== 'Contacted') && (
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            style={{
                                                background: '#fee2e2',
                                                color: '#991b1b',
                                                border: 'none',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.25rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <FaTrash /> Cancel
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Simple Review Modal Overlay */}
            {reviewModal.show && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
                        <h3>Rate your experience</h3>
                        <div style={{ margin: '1rem 0' }}>
                            <label>Rating: </label>
                            <select value={rating} onChange={e => setRating(e.target.value)} style={{ padding: '0.5rem' }}>
                                <option value="5">5 - Excellent</option>
                                <option value="4">4 - Good</option>
                                <option value="3">3 - Average</option>
                                <option value="2">2 - Poor</option>
                                <option value="1">1 - Terrible</option>
                            </select>
                        </div>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Write your review..."
                            style={{ width: '100%', minHeight: '100px', padding: '0.5rem', marginBottom: '1rem' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button onClick={() => setReviewModal({ show: false, bookingId: null })} style={{ background: 'gray', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>Cancel</button>
                            <button onClick={handleReviewSubmit} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
