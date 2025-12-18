import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: '#f8fafc'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
            >
                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    style={{
                        fontSize: '8rem',
                        fontWeight: '900',
                        color: '#FF914D', // Brand Orange
                        lineHeight: '1',
                        marginBottom: '1rem',
                        textShadow: '2px 2px 4px rgba(255, 145, 77, 0.2)'
                    }}
                >
                    404
                </motion.h1>

                <h2 style={{
                    fontSize: '2rem',
                    color: '#1e293b',
                    marginBottom: '1rem',
                    fontWeight: '700'
                }}>
                    Page Not Found
                </h2>

                <p style={{
                    color: '#64748b',
                    marginBottom: '2rem',
                    fontSize: '1.1rem',
                    maxWidth: '400px',
                    margin: '0 auto 2rem'
                }}>
                    Oops! The page you are looking for might have been removed or is temporarily unavailable.
                </p>

                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        padding: '0.75rem 2rem',
                        backgroundColor: '#FF914D',
                        color: 'white',
                        borderRadius: '50px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        boxShadow: '0 4px 6px -1px rgba(255, 145, 77, 0.3)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
