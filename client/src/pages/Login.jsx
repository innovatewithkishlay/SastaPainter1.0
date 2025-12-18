/**
 * Login.jsx
 * * Login Page - Redesigned
 * - Split layout with premium brand visual logic.
 * - Uses shared 'auth.css' styles.
 * - NOW INCLUDES: Functional Google Login
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google'; // 🟢 Import Google Library
import { jwtDecode } from "jwt-decode";            // 🟢 Import JWT Decoder
import useAuth from '../hooks/useAuth.jsx';
import './auth.css';

const Login = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Target route after login
    const DASHBOARD_ROUTE = '/';

    // 🟢 NEW: Handle Google Login Success
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;

            // 2. Send token to backend to save/verify user
            const res = await api.post('/auth/google', { token });

            if (res.data.success) {
                // 3. Store Token
                localStorage.setItem('token', res.data.token);

                // 4. Update App State
                setUser(res.data.user);

                // 4. Redirect
                navigate(from, { replace: true });
            }

        } catch (err) {
            console.error("Google Login Error:", err);
            setError("Google Login failed. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Attempt Regular Login
            let res = await api.post('/login', formData);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);

                // Route based on role
                if (res.data.user.isAdmin) {
                    navigate('/admin/dashboard');
                } else {
                    navigate(from, { replace: true });
                }
                return;
            }
        } catch (err) {
            // 2. Fallback: Try Admin Login logic
            try {
                const adminRes = await api.post('/admin/login', { username: formData.email, password: formData.password });
                if (adminRes.data.success) {
                    localStorage.setItem('token', adminRes.data.token);
                    setUser(adminRes.data.user);
                    navigate('/admin/dashboard');
                    return;
                }
            } catch (adminErr) {
                // Ignore fallback error
            }

            setError(err.response?.data?.error || 'Invalid Credentials');
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
                    <h1>Welcome Back to SastaPainter</h1>
                    <p>Trusted painters. Beautiful homes. Hassle-free experience.</p>
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
                    <h2 className="auth-title">Login</h2>
                    <p className="auth-subtitle">Welcome back! Please enter your details.</p>

                    {error && (
                        <motion.div
                            className="auth-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* 🟢 UPDATED: Google Login Section */}
                    <div style={{ marginBottom: '1.5rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        {/* The Actual Working Button */}
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Login Failed')}
                            theme="filled_blue"
                            shape="pill"
                            width="300" // Adjust width to match your design
                        />

                        <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', width: '100%' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                            <span style={{ padding: '0 0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>OR</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                        </div>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email or Username</label>
                            <input
                                type="text"
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
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
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
                            {loading ? 'Logging in...' : 'Sign In'}
                        </motion.button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/signup">Register here</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;