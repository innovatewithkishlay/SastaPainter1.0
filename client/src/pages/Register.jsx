/**
 * Register.jsx
 * 
 * Register Page - Redesigned
 * - Split layout with premium brand visual logic.
 * - Uses shared 'auth.css' styles.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth.jsx';
import GoogleLoginButton from '../components/GoogleLoginButton';
import './auth.css';

const Register = () => {
    // Access context if we want to auto-login (though passed prop 'setUser' was used before, context is cleaner)
    // The previous implementation used a prop, but standard useAuth is better if available.
    // However, looking at App.jsx, I don't see Register receiving props in the route definition.
    // I'll stick to useAuth() context to be safe and consistent with Login.
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Need to verify standard prop usage. Assuming simple POST API.
            const res = await api.post('/register', formData);
            if (res.data.success) {
                // Auto-login on success
                // If the API returns the user object immediately, we can set it.
                if (res.data.user) {
                    setUser(res.data.user);
                }
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* Left Section: Visual */}
            <motion.div
                className="auth-visual"
                style={{ backgroundImage: "url('/images/interiror-page-banner.webp')" }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="auth-overlay"></div>
                <div className="auth-brand-content">
                    <h1>Create Your SastaPainter Account</h1>
                    <p>Book professional painting services with confidence. Transform your home today.</p>
                </div>
            </motion.div>

            {/* Right Section: Form */}
            <div className="auth-form-container">
                <motion.div
                    className="auth-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="auth-title">Sign Up</h2>
                    <p className="auth-subtitle">Join us for a hassle-free painting experience.</p>

                    {error && (
                        <motion.div
                            className="auth-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Google Login */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <GoogleLoginButton text="Continue with Google" />
                        <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                            <span style={{ padding: '0 0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>OR</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                        </div>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Full Name</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                placeholder="Enter your name"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={6}
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn-auth"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Get Started'}
                        </motion.button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
