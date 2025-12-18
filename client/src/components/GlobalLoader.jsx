import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoader } from '../context/LoaderContext';

const GlobalLoader = () => {
    const { isLoading } = useLoader();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeout;
        if (isLoading) {
            setShouldRender(true);
        } else {
            // Min display time to prevent flicker
            timeout = setTimeout(() => {
                setShouldRender(false);
            }, 500); // 500ms smooth exit
        }
        return () => clearTimeout(timeout);
    }, [isLoading]);

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Neutral tint
                        zIndex: 99999, // Max z-index
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(12px)', // Real backdrop blur
                        pointerEvents: 'all' // Block interaction
                    }}
                >
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        {/* Orbiting Halo Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear"
                            }}
                            style={{
                                position: 'absolute',
                                width: '220px',
                                height: '220px',
                                borderRadius: '50%',
                                border: '1.5px solid transparent',
                                borderTopColor: '#334155', // Slate-700 (Muted premium)
                                borderRightColor: 'rgba(51, 65, 85, 0.1)', // Fade tail
                                boxSizing: 'border-box'
                            }}
                        />

                        {/* Text Centerpiece */}
                        <motion.h2
                            animate={{
                                opacity: [0.6, 1, 0.6],
                                scale: [0.98, 1, 0.98]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: '#1e293b', // Slate-800
                                margin: 0,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                position: 'relative',
                                zIndex: 10
                            }}
                        >
                            SastaPainter
                        </motion.h2>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoader;
