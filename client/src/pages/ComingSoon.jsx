import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ComingSoon = ({ type }) => {
    // Config based on type
    const config = {
        estimate: {
            title: "Smart Estimates Coming Soon!",
            description: "We are building an AI-powered estimation tool to give you instant, accurate pricing for your painting needs.",
            icon: "📊",
            color: "from-blue-500 to-purple-600"
        },
        ios: {
            title: "SastaPainter on iOS",
            description: "The SastaPainter experience is coming to your iPhone soon. Browsing services and booking painters has never been easier.",
            icon: "🍎",
            color: "from-gray-700 to-gray-900"
        },
        android: {
            title: "SastaPainter on Android",
            description: "We are crafting the perfect Android app for you. Get ready to book home painting services with a single tap.",
            icon: "🤖",
            color: "from-green-500 to-teal-600"
        },
        calculator: {
            title: "Paint Calculator",
            description: "Calculate the exact amount of paint and budget needed for your project. Our AI-powered calculator is coming soon.",
            icon: "🧮",
            color: "from-orange-400 to-red-500"
        },
        visualizer: {
            title: "Color Visualizer",
            description: "Visualize how different colors look on your walls before you paint. Our augmented reality tool is under development.",
            icon: "🎨",
            color: "from-pink-500 to-rose-500"
        }
    };

    const content = config[type] || config.estimate;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            padding: '2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Background Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '40%',
                height: '40%',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '40%',
                height: '40%',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                zIndex: 0
            }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    background: 'white',
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    maxWidth: '600px',
                    width: '100%',
                    zIndex: 1,
                    position: 'relative'
                }}
            >
                {/* Icon */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2
                    }}
                    style={{
                        fontSize: '5rem',
                        marginBottom: '1.5rem',
                        display: 'inline-block'
                    }}
                >
                    {content.icon}
                </motion.div>

                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: '#1e293b',
                    marginBottom: '1rem',
                    lineHeight: 1.2
                }}>
                    {content.title}
                </h1>

                <p style={{
                    fontSize: '1.1rem',
                    color: '#64748b',
                    marginBottom: '2.5rem',
                    lineHeight: 1.6
                }}>
                    {content.description}
                </p>

                {/* Email Capture Placeholder */}
                <form
                    onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll notify you when it's ready."); }}
                    style={{ marginBottom: '2rem' }}
                >
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        background: '#f1f5f9',
                        padding: '0.5rem',
                        borderRadius: '50px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <input
                            type="email"
                            placeholder="Enter your email to get notified"
                            required
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                padding: '0.8rem 1.5rem',
                                outline: 'none',
                                fontSize: '1rem',
                                color: '#334155'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '50px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Notify Me
                        </button>
                    </div>
                </form>

                <Link
                    to="/"
                    style={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    ← Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default ComingSoon;
