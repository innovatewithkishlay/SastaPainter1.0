import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaClipboardList, FaPaintRoller, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';

const AdminLayout = ({ children, title }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // State for responsive sidebar
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) {
                setIsSidebarOpen(false); // Reset on desktop
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const NavItem = ({ to, icon, label }) => {
        const isActive = location.pathname.startsWith(to);
        return (
            <NavLink
                to={to}
                onClick={() => isMobile && setIsSidebarOpen(false)} // Close on click mobile
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    color: isActive ? '#fff' : '#94a3b8',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    textDecoration: 'none',
                    fontWeight: 500,
                    marginBottom: '8px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {isActive && (
                    <motion.div
                        layoutId="activeTab"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            backgroundColor: '#60a5fa',
                            borderTopRightRadius: '4px',
                            borderBottomRightRadius: '4px'
                        }}
                    />
                )}
                <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                <span>{label}</span>
            </NavLink>
        );
    };

    // Responsive Styles
    const sidebarWidth = '260px';
    const mainMarginLeft = isMobile ? '0' : sidebarWidth;
    const padding = isMobile ? '1.5rem' : '2rem 3rem';

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'Outfit', sans-serif" }}>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 40,
                            backdropFilter: 'blur(2px)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: isMobile ? (isSidebarOpen ? 0 : '-100%') : 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                    width: sidebarWidth,
                    backgroundColor: '#0f172a',
                    color: 'white',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    height: '100%',
                    zIndex: 50,
                    boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
                    top: 0,
                    left: 0
                }}
            >
                <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            SP
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.5px' }}>Sasta Painter</span>
                    </div>
                    {isMobile && (
                        <button onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>
                            <FaTimes />
                        </button>
                    )}
                </div>

                <nav style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '1px', marginBottom: '1rem', paddingLeft: '8px' }}>Menu</p>
                    <NavItem to="/admin/dashboard" icon={<FaHome />} label="Overview" />
                    <NavItem to="/admin/bookings" icon={<FaClipboardList />} label="Bookings & Visits" />
                    <NavItem to="/admin/painters" icon={<FaPaintRoller />} label="Manage Painters" />
                    <NavItem to="/admin/users" icon={<FaUsers />} label="Users" />
                </nav>

                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', backgroundColor: '#1e293b', marginBottom: '1rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                            {user?.username?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{user?.username || 'Administrator'}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>admin@sastapainter.com</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div style={{
                flex: 1,
                marginLeft: mainMarginLeft,
                padding: padding,
                transition: 'margin-left 0.3s ease, padding 0.3s ease',
                width: isMobile ? '100%' : `calc(100% - ${sidebarWidth})`
            }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {isMobile && (
                            <button
                                onClick={toggleSidebar}
                                style={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    color: '#334155',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
                                }}
                            >
                                <FaBars />
                            </button>
                        )}
                        <div>
                            <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', lineHeight: 1.2 }}>{title}</h1>
                            <p style={{ color: '#64748b', fontSize: isMobile ? '0.9rem' : '1rem' }}>Here is what's happening with your business today.</p>
                        </div>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLayout;
