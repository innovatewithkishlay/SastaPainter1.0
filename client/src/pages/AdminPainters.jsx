import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaUserTie, FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';

const AdminPainters = () => {
    const [painters, setPainters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        specialization: '',
        experience: '',
        address: '',
        salary: ''
    });

    useEffect(() => {
        fetchPainters();
    }, []);

    const fetchPainters = async () => {
        try {
            const res = await api.get('/admin/painters', { triggerLoader: true });
            if (res.data.success) {
                setPainters(res.data.painters);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/painters', formData);
            alert('Painter Added Successfully!');
            setShowModal(false);
            setFormData({ name: '', phone: '', specialization: '', experience: '', address: '', salary: '' });
            fetchPainters();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to add painter');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this painter?')) return;
        try {
            await api.delete(`/admin/painters/${id}`);
            setPainters(painters.filter(p => p._id !== id));
        } catch (err) {
            alert('Failed to delete painter');
        }
    };

    return (
        <AdminLayout title="Manage Staff">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '600',
                        boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <FaPlus /> Add New Painter
                </button>
            </div>

            {loading ? null : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {painters.map((painter, index) => (
                        <motion.div
                            key={painter._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                padding: '1.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #e2e8f0',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '60px', height: '60px', borderRadius: '16px',
                                        background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899'][index % 3]}, ${['#1d4ed8', '#7c3aed', '#db2777'][index % 3]})`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontSize: '1.5rem', fontWeight: 'bold',
                                        boxShadow: '0 10px 20px -5px rgba(0,0,0,0.2)'
                                    }}>
                                        {painter.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem', fontWeight: 700 }}>{painter.name}</h3>
                                        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{painter.specialization}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fffbeb', color: '#b45309', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '700' }}>
                                    <FaStar size={14} /> {painter.rating.toFixed(1)}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '0.95rem' }}>
                                    <FaUserTie style={{ color: '#94a3b8' }} /> {painter.experience} Years Experience
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '0.95rem' }}>
                                    <FaMapMarkerAlt style={{ color: '#94a3b8' }} /> {painter.address}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '0.95rem' }}>
                                    <FaRupeeSign style={{ color: '#94a3b8' }} /> ₹{painter.salary ? painter.salary.toLocaleString() : 'N/A'} / Month
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '0.95rem' }}>
                                    <span style={{ fontWeight: '600', color: '#0f172a' }}>📞 {painter.phone}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => handleDelete(painter._id)}
                                    style={{
                                        background: '#fee2e2', color: '#ef4444',
                                        border: 'none', padding: '0.75rem 1.25rem', borderRadius: '12px',
                                        fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <FaTrash size={14} /> Remove Painter
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem',
                    backdropFilter: 'blur(5px)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            backgroundColor: 'white', padding: '2rem', borderRadius: '24px',
                            width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <h2 style={{ margin: '0 0 1.5rem 0', color: '#1e293b', fontSize: '1.75rem' }}>Add New Painter</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
                            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required style={inputStyle} />
                            <input type="text" name="specialization" placeholder="Specialization (e.g. Texture)" value={formData.specialization} onChange={handleInputChange} required style={inputStyle} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input type="number" name="experience" placeholder="Exp (Years)" value={formData.experience} onChange={handleInputChange} required style={inputStyle} />
                                <input type="number" name="salary" placeholder="Salary (₹)" value={formData.salary} onChange={handleInputChange} style={inputStyle} />
                            </div>
                            <input type="text" name="address" placeholder="Address / Location" value={formData.address} onChange={handleInputChange} required style={inputStyle} />

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ ...btnStyle, background: '#f1f5f9', color: '#64748b' }}>Cancel</button>
                                <button type="submit" style={{ ...btnStyle, background: '#2563eb', color: 'white' }}>Save Painter</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AdminLayout>
    );
};

const inputStyle = {
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
    backgroundColor: '#f8fafc'
};

const btnStyle = {
    flex: 1,
    padding: '1rem',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer'
};

export default AdminPainters;
