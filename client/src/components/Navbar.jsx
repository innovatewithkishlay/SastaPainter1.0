/**
 * Navbar.jsx
 * 
 * Main Navigation Component
 * - Consumes AuthContext for user state updates without property drilling.
 * - 'Book Site Visit' button now navigates via useNavigate (no #hash).
 * - Animated active route underline.
 * - Responsive mobile menu.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth.jsx';
import './navbar.css';

// Navigation Items Configuration
const NAV_ITEMS = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Why Us', path: '/why-us' },
    { label: 'FAQs', path: '/faq' },
    { label: 'Blog', path: '/blog' },
    // { label: 'Estimate', path: '/estimate' },
    // { label: 'Mobile App', path: '/android-app' },
    { label: 'Contact', path: '/#contact' },
    { label: 'Interior Painting', path: '/services/Interior-Painting' },
    { label: 'Exterior Painting', path: '/services/Exterior-Painting' },
    { label: 'Rental Painting', path: '/services/Rental-Painting' },
    { label: 'Waterproofing', path: '/services/Waterproofing' },
    { label: 'Wood Finishes', path: '/services/Wood-Finishes' },
    { label: 'Texture Painting', path: '/services/Texture-Painting' },


];

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // State
    // State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const profileRef = useRef(null);

    // Reset image error state when user changes
    useEffect(() => {
        setImageError(false);
    }, [user]);

    // Close profile dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    // Handle Scroll to Anchor when URL contains #contact
    useEffect(() => {
        if (location.hash === '#contact') {
            // Introduce a small delay to ensure DOM is ready (especially if navigating from another page)
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    // Helpers
    const getInitials = (name) => {
        // Handle cases where name might be undefined or empty
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 1).toUpperCase();
    };

    const handleBookClick = () => {
        setIsMobileMenuOpen(false);
        navigate('/book-site-visit');
    };

    const handleLogout = async () => {
        await logout();
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
        // Navigate home after logout if desired, although AuthProvider logout handles state
        navigate('/');
    };

    const handleProfileLinkClick = (path) => {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
        navigate(path);
    };

    return (
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="nav-logo" aria-label="SastaPainter Home" onClick={() => window.scrollTo(0, 0)}>
                    <img src="/images/sasta-painter-icon.jpeg" alt="SastaPainter Logo" style={{ height: '80px', width: '130px', maxHeight: '100%' }} />
                </Link>

                {/* Desktop Nav Links */}
                <div className="nav-links">
                    {NAV_ITEMS.map((item) => {
                        // Custom Active Logic
                        // For Contact: active if hash is #contact
                        // For others: active if pathname matches AND hash is empty (to unhighlight Home when clicking Contact on Home)
                        const isContact = item.path === '/#contact';
                        const isActive = isContact
                            ? location.hash === '#contact'
                            : location.pathname === item.path && location.hash !== '#contact';

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={(e) => {
                                    if (isContact) {
                                        // If we are already on the page and just need to scroll
                                        // The useEffect will handle it if the hash changes, 
                                        // but if the hash is ALREADY #contact, we need to force scroll manually
                                        if (location.hash === '#contact') {
                                            const contactSection = document.getElementById('contact');
                                            if (contactSection) {
                                                contactSection.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }
                                    } else {
                                        window.scrollTo(0, 0);
                                    }
                                }}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        className="active-underline"
                                        layoutId="navUnderline"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions: Auth & Book Button */}
                <div className="nav-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

                    {/* Auth State Handling */}
                    {loading ? (
                        <div className="skeleton-avatar" role="status" aria-label="Loading user info"></div>
                    ) : user ? (
                        <div className="profile-section" ref={profileRef}>
                            <button
                                className="profile-trigger"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                aria-haspopup="true"
                                aria-expanded={isProfileOpen}
                                aria-label="Open profile menu"
                            >
                                <div className="profile-avatar">
                                    {user.profilePicture && !imageError ? (
                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            onError={() => setImageError(true)}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        getInitials(user.username)
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        className="dropdown-menu"
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <div className="dropdown-header">
                                            <span className="user-name">{user.username}</span>
                                            <span className="user-email">{user.email}</span>
                                        </div>
                                        {user.isAdmin ? (
                                            <button className="dropdown-link" onClick={() => handleProfileLinkClick('/admin/dashboard')}>
                                                Admin Dashboard
                                            </button>
                                        ) : (
                                            <button className="dropdown-link" onClick={() => handleProfileLinkClick('/my-bookings')}>
                                                My Bookings
                                            </button>
                                        )}
                                        <button
                                            className="dropdown-link logout-btn"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="auth-links desktop-only-flex" style={{ display: window.innerWidth < 1024 ? 'none' : 'flex' }}>
                            <Link to="/login" className="link-login">Login</Link>
                            <Link to="/signup" className="link-signup">Signup</Link>
                        </div>
                    )}

                    {/* Book Button (Desktop) - Client Side Navigation */}
                    <button
                        type="button"
                        className="btn-book desktop-only-flex"
                        onClick={handleBookClick}
                        aria-label="Book Site Visit"
                        style={{ display: window.innerWidth < 1024 ? 'none' : 'inline-flex' }}
                    >
                        Book Site Visit
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {NAV_ITEMS.map((item) => {
                            const isContact = item.path === '/#contact';
                            const isActive = isContact
                                ? location.hash === '#contact'
                                : location.pathname === item.path && location.hash !== '#contact';

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                                    onClick={(e) => {
                                        setIsMobileMenuOpen(false);
                                        if (isContact) {
                                            if (location.hash === '#contact') {
                                                const contactSection = document.getElementById('contact');
                                                if (contactSection) {
                                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }
                                        } else {
                                            window.scrollTo(0, 0);
                                        }
                                    }}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        {/* Mobile Auth Actions */}
                        <div className="mobile-auth">
                            {user ? (
                                <>
                                    <div className="mobile-user-info" style={{ padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                        <div style={{ fontWeight: 700 }}>{user.username}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{user.email}</div>
                                    </div>
                                    {user.isAdmin ? (
                                        <button className="mobile-btn mobile-btn-secondary" onClick={() => handleProfileLinkClick('/admin/dashboard')}>
                                            Admin Dashboard
                                        </button>
                                    ) : (
                                        <button className="mobile-btn mobile-btn-secondary" onClick={() => handleProfileLinkClick('/my-bookings')}>
                                            My Bookings
                                        </button>
                                    )}
                                    <button className="mobile-btn" style={{ color: '#ef4444', border: '1px solid #ef4444', backgroundColor: 'transparent' }} onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="mobile-btn mobile-btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                                        Login
                                    </Link>
                                    <Link to="/register" className="mobile-btn mobile-btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                                        Signup
                                    </Link>
                                </>
                            )}

                            <button
                                type="button"
                                className="mobile-btn mobile-btn-primary"
                                style={{ marginTop: '1rem' }}
                                onClick={handleBookClick}
                            >
                                Book Site Visit
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
