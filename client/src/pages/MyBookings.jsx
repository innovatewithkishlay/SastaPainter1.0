import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaClock, FaCheckCircle, FaPhone, FaTools, FaBan, FaMapMarkerAlt, FaCalendarAlt, FaUserTie, FaClipboardList, FaHardHat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [siteVisits, setSiteVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'visits'
    const [error, setError] = useState('');

    // Review State
    const [reviewModal, setReviewModal] = useState({ show: false, bookingId: null });
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/my-bookings', { triggerLoader: true });
            if (res.data.success) {
                setBookings(res.data.inquiries || []);
                setSiteVisits(res.data.siteVisits || []);
            }
        } catch (err) {
            console.error("Fetch Data Error:", err);
            setError('Failed to fetch your dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type = 'booking') => {
        if (!window.confirm('Are you sure you want to cancel this?')) return;
        try {
            // Assuming delete endpoint handles both or we need a new one for site visits
            // For now, only booking delete is implemented in backend
            if (type === 'booking') {
                await api.post(`/my-bookings/delete/${id}`);
                setBookings(bookings.filter(b => b._id !== id));
            } else {
                alert("Cancellation for Site Visits is not yet automated. Please contact support.");
            }
        } catch (err) {
            alert('Failed to cancel');
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

    if (loading) return null;

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem 0 5rem' }}>
            <div className="container">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>My Dashboard</h1>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Manage your painting projects and site visits</p>
                </motion.div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <button
                        onClick={() => setActiveTab('projects')}
                        style={{
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            border: 'none',
                            background: activeTab === 'projects' ? 'var(--primary)' : 'white',
                            color: activeTab === 'projects' ? 'white' : '#64748b',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: activeTab === 'projects' ? '0 10px 25px -5px rgba(37, 99, 235, 0.4)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FaHardHat /> Project Bookings
                        <span style={{ background: activeTab === 'projects' ? 'rgba(255,255,255,0.2)' : '#f1f5f9', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
                            {bookings.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('visits')}
                        style={{
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            border: 'none',
                            background: activeTab === 'visits' ? 'var(--primary)' : 'white',
                            color: activeTab === 'visits' ? 'white' : '#64748b',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: activeTab === 'visits' ? '0 10px 25px -5px rgba(37, 99, 235, 0.4)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FaClipboardList /> Site Visits
                        <span style={{ background: activeTab === 'visits' ? 'rgba(255,255,255,0.2)' : '#f1f5f9', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
                            {siteVisits.length}
                        </span>
                    </button>
                </div>

                {/* Content Area */}
                <AnimatePresence mode='wait'>
                    {activeTab === 'projects' ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid"
                            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}
                        >
                            {bookings.length === 0 ? (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '1rem' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png" alt="No bookings" style={{ width: '150px', opacity: 0.5, marginBottom: '1rem' }} />
                                    <h3 style={{ color: '#94a3b8' }}>No active projects found</h3>
                                    <Link to="/book" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Start a Project</Link>
                                </div>
                            ) : (
                                bookings.map((booking) => {
                                    const statusStyle = getStatusColor(booking.status);
                                    return (
                                        <div key={booking._id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9' }}>
                                            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>{booking.service_type}</h3>
                                                <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    {statusStyle.icon} {booking.status}
                                                </span>
                                            </div>
                                            <div style={{ padding: '1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569' }}>
                                                    <FaMapMarkerAlt style={{ color: '#94a3b8' }} />
                                                    <span>{booking.city} - {booking.pincode}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569' }}>
                                                    <FaCalendarAlt style={{ color: '#94a3b8' }} />
                                                    <span>Requested: {new Date(booking.createdAt).toLocaleDateString()}</span>
                                                </div>

                                                {booking.assignedPainter && (
                                                    <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                                                                <FaUserTie />
                                                            </div>
                                                            <div>
                                                                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Assigned Professional</p>
                                                                <p style={{ fontWeight: '600', color: '#0f172a', margin: 0 }}>{booking.assignedPainter.name}</p>
                                                            </div>
                                                        </div>
                                                        <a href={`tel:${booking.assignedPainter.phone}`} style={{ display: 'block', textAlign: 'center', background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '0.5rem', color: '#2563eb', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', marginTop: '0.5rem' }}>
                                                            Call {booking.assignedPainter.phone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                {booking.status === 'Completed' ? (
                                                    <button onClick={() => setReviewModal({ show: true, bookingId: booking._id })} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>Rate Service</button>
                                                ) : (
                                                    <button onClick={() => handleDelete(booking._id)} style={{ background: 'white', color: '#ef4444', border: '1px solid #fecaca', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Cancel Request</button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="visits"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid"
                            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}
                        >
                            {siteVisits.length === 0 ? (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '1rem' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1067/1067357.png" alt="No visits" style={{ width: '150px', opacity: 0.5, marginBottom: '1rem' }} />
                                    <h3 style={{ color: '#94a3b8' }}>No site visits scheduled</h3>
                                    <Link to="/book-site-visit" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Book Inspection</Link>
                                </div>
                            ) : (
                                siteVisits.map((visit) => {
                                    const statusStyle = getStatusColor(visit.status);
                                    return (
                                        <div key={visit._id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9' }}>
                                            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>Site Inspection</h3>
                                                <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    {statusStyle.icon} {visit.status}
                                                </span>
                                            </div>
                                            <div style={{ padding: '1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569' }}>
                                                    <FaUserTie style={{ color: '#94a3b8' }} />
                                                    <span>{visit.name}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569' }}>
                                                    <FaPhone style={{ color: '#94a3b8' }} />
                                                    <span>{visit.phone}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569' }}>
                                                    <FaMapMarkerAlt style={{ color: '#94a3b8' }} />
                                                    <span>{visit.city}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569' }}>
                                                    <FaCalendarAlt style={{ color: '#94a3b8' }} />
                                                    <span>Booked: {new Date(visit.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Review Modal */}
                {reviewModal.show && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1e293b' }}>Rate your experience</h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>Rating</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            style={{
                                                fontSize: '2rem',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: star <= rating ? '#f59e0b' : '#cbd5e1',
                                                transition: 'color 0.2s'
                                            }}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Share your feedback..."
                                style={{ width: '100%', minHeight: '120px', padding: '1rem', marginBottom: '1.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button onClick={() => setReviewModal({ show: false, bookingId: null })} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                                <button onClick={handleReviewSubmit} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>Submit Review</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
