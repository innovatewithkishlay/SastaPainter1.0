import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { FaClipboardCheck, FaHardHat, FaSearch, FaFilter } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const AdminBookings = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const statusFilter = searchParams.get('status') || '';
    const [searchTerm, setSearchTerm] = useState('');
    const [painters, setPainters] = useState([]);

    useEffect(() => {
        fetchData();
        fetchPainters();
    }, [activeTab, statusFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'bookings' ? '/admin/bookings' : '/admin/site-visits';
            const res = await api.get(endpoint, {
                triggerLoader: true,
                params: {
                    status: statusFilter,
                    search: searchTerm
                }
            });
            if (res.data.success) {
                setData(activeTab === 'bookings' ? res.data.inquiries : res.data.siteVisits);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPainters = async () => {
        try {
            const res = await api.get('/admin/painters');
            if (res.data.success) {
                setPainters(res.data.data.painters);
            }
        } catch (err) {
            console.error('Failed to fetch painters', err);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const endpoint = activeTab === 'bookings'
                ? `/admin/bookings/${id}/status`
                : `/admin/site-visits/${id}/status`;

            await api.put(endpoint, { status: newStatus });
            setData(data.map(i => i._id === id ? { ...i, status: newStatus } : i));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleAssignPainter = async (bookingId, painterId) => {
        try {
            await api.put(`/admin/bookings/${bookingId}/assign`, { painterId });
            setData(data.map(i => i._id === bookingId ? { ...i, assignedPainter: painters.find(p => p._id === painterId) } : i));
            alert('Painter assigned successfully');
        } catch (err) {
            alert('Failed to assign painter');
        }
    };

    // Styling constants for the premium feel
    const tabStyle = (isActive) => ({
        padding: '1rem 2rem',
        borderRadius: '16px',
        border: 'none',
        background: isActive ? '#2563eb' : 'white',
        color: isActive ? 'white' : '#64748b',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '1rem',
        boxShadow: isActive ? '0 10px 20px -5px rgba(37, 99, 235, 0.4)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
        transition: 'all 0.3s'
    });

    const statusColor = (status) => {
        switch (status) {
            case 'Completed': return { bg: '#dcfce7', text: '#166534' };
            case 'Contacted': return { bg: '#dbeafe', text: '#1e40af' };
            case 'Scheduled': return { bg: '#e0e7ff', text: '#3730a3' };
            case 'In_Progress': return { bg: '#faf5ff', text: '#6b21a8' };
            case 'Cancelled': return { bg: '#f1f5f9', text: '#64748b' };
            default: return { bg: '#fef3c7', text: '#92400e' }; // Pending
        }
    };

    return (
        <AdminLayout title="Bookings & Requests">
            {/* Controls Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <button onClick={() => setActiveTab('bookings')} style={tabStyle(activeTab === 'bookings')}>
                        <FaClipboardCheck size={20} /> Project Bookings
                    </button>
                    <button onClick={() => setActiveTab('site-visits')} style={tabStyle(activeTab === 'site-visits')}>
                        <FaHardHat size={20} /> Site Visits
                    </button>
                </div>

                <div style={{ position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search by name, city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '1rem 1.5rem 1rem 3rem',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.95rem',
                            width: '320px',
                            outline: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                        }}
                    />
                </div>
            </div>

            {/* Table Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                    overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                    <FaFilter color="#64748b" />
                    <span style={{ fontWeight: 600, color: '#64748b' }}>
                        Showing {data.length} {activeTab === 'bookings' ? 'Bookings' : 'Requests'}
                        {statusFilter && ` (${statusFilter})`}
                    </span>
                </div>

                {loading ? null : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Details</th>
                                    {activeTab === 'bookings' && <th style={{ textAlign: 'left', padding: '1rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service Type</th>}
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</th>
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>

                                    {activeTab === 'bookings' && <th style={{ textAlign: 'left', padding: '1rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assigned Painter</th>}

                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No records found matching your criteria.</td></tr>
                                ) : (
                                    data.map(item => (
                                        <tr key={item._id} style={{ background: '#f8fafc', borderRadius: '12px', transition: 'transform 0.2s' }}>
                                            <td style={{ padding: '1.25rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                                                <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{item.phone}</div>
                                                {item.email && <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.email}</div>}
                                            </td>

                                            {activeTab === 'bookings' && (
                                                <td style={{ padding: '1.25rem' }}>
                                                    <span style={{ background: 'white', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>
                                                        {item.service_type}
                                                    </span>
                                                </td>
                                            )}

                                            <td style={{ padding: '1.25rem', color: '#475569', fontWeight: 500 }}>{item.city}</td>

                                            <td style={{ padding: '1.25rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>

                                            {activeTab === 'bookings' && (
                                                <td style={{ padding: '1.25rem' }}>
                                                    <select
                                                        value={item.assignedPainter?._id || item.assignedPainter || ''}
                                                        onChange={(e) => handleAssignPainter(item._id, e.target.value)}
                                                        style={{
                                                            padding: '0.6rem',
                                                            borderRadius: '8px',
                                                            border: '1px solid #cbd5e1',
                                                            backgroundColor: 'white',
                                                            width: '100%',
                                                            fontSize: '0.9rem',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="">Unassigned</option>
                                                        {painters.map(p => (
                                                            <option key={p._id} value={p._id}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            )}

                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{
                                                    display: 'inline-block',
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    ...statusColor(item.status)
                                                }}>
                                                    {item.status || 'Pending'}
                                                </div>
                                            </td>

                                            <td style={{ padding: '1.25rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                                                <select
                                                    value={item.status || 'Pending'}
                                                    onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                                                    style={{
                                                        padding: '0.6rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid #cbd5e1',
                                                        backgroundColor: 'white',
                                                        fontSize: '0.9rem',
                                                        cursor: 'pointer',
                                                        color: '#475569'
                                                    }}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Scheduled">Scheduled</option>
                                                    <option value="Inspection_Done">Inspection Done</option>
                                                    {activeTab === 'bookings' && <option value="In_Progress">In Progress</option>}
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </AdminLayout>
    );
};

export default AdminBookings;
