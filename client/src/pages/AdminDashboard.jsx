import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { FaUsers, FaClipboardList, FaCalendarDay, FaClock, FaTools, FaCheckCircle, FaBan, FaPaintRoller, FaArrowRight, FaChartLine } from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStats();
    }, []);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats', { triggerLoader: true });
            if (res.data.success) {
                setStats(res.data.data.stats);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, count, icon, color, gradient, onClick }) => (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            style={{
                background: gradient || 'white',
                padding: '1.5rem',
                borderRadius: '20px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                color: gradient ? 'white' : '#1e293b',
                position: 'relative',
                overflow: 'hidden',
                cursor: onClick ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '160px',
                border: gradient ? 'none' : '1px solid #e2e8f0'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1 }}>{count}</h3>
                </div>
                <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '10px',
                    backdropFilter: 'blur(5px)',
                    color: gradient ? 'white' : color
                }}>
                    {icon}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, opacity: 0.9, zIndex: 2 }}>
                <span>View Details</span> <FaArrowRight size={12} />
            </div>

            {/* Decorative Background Icon */}
            <div style={{
                position: 'absolute',
                right: -20,
                bottom: -20,
                opacity: 0.1,
                transform: 'rotate(-15deg) scale(4)',
                zIndex: 1
            }}>
                {icon}
            </div>
        </motion.div>
    );

    if (loading) return null;

    return (
        <AdminLayout title="Dashboard Overview">
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {/* Primary Stats with Gradients */}
                    <StatCard
                        title="Total Users"
                        count={stats.totalUsers}
                        icon={<FaUsers size={24} />}
                        gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                        onClick={() => navigate('/admin/users')}
                    />
                    <StatCard
                        title="Total Bookings"
                        count={stats.totalBookings}
                        icon={<FaClipboardList size={24} />}
                        gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
                        onClick={() => navigate('/admin/bookings')}
                    />
                    <StatCard
                        title="Active Painters"
                        count="Staff" // Should be dynamic ideally, but static label for now is fine per previous code
                        icon={<FaPaintRoller size={24} />}
                        gradient="linear-gradient(135deg, #ec4899, #db2777)"
                        onClick={() => navigate('/admin/painters')}
                    />

                    {/* Secondary Status Cards */}
                    <StatCard
                        title="Pending Requests"
                        count={stats.pendingBookings}
                        icon={<FaClock size={24} />}
                        color="#f59e0b"
                        onClick={() => navigate('/admin/bookings?status=Pending')}
                    />
                    <StatCard
                        title="Ongoing Projects"
                        count={stats.ongoingProjects}
                        icon={<FaTools size={24} />}
                        color="#0ea5e9"
                        onClick={() => navigate('/admin/bookings?status=Ongoing')}
                    />
                    <StatCard
                        title="Completed"
                        count={stats.completedProjects}
                        icon={<FaCheckCircle size={24} />}
                        color="#22c55e"
                        onClick={() => navigate('/admin/bookings?status=Completed')}
                    />
                </div>
            )}

            {/* Add a Chart Section Placeholder for "Unique" feel */}
            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Revenue Analytics</h3>
                        <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Last 30 Days</div>
                    </div>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0', color: '#94a3b8' }}>
                        <FaChartLine size={32} style={{ marginRight: '10px' }} /> Chart Visualization Placeholder
                    </div>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)', border: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1e293b' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { text: "Rajesh Kumar assigned to Interior Project", time: "10 mins ago", icon: "🎨", bg: "#eff6ff", color: "#3b82f6" },
                            { text: "New Booking from Anita Singh", time: "2 hours ago", icon: "📅", bg: "#f0fdf4", color: "#22c55e" },
                            { text: "Vikram verified site visit at Andheri", time: "5 hours ago", icon: "✓", bg: "#fdf2f8", color: "#ec4899" },
                            { text: "Amit Patel updated his profile", time: "1 day ago", icon: "👤", bg: "#f8fafc", color: "#64748b" }
                        ].map((activity, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: activity.bg,
                                    color: activity.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    flexShrink: 0
                                }}>
                                    {activity.icon}
                                </div>
                                <div>
                                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>{activity.text}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
