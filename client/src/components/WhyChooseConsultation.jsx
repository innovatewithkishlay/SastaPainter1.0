/**
 * WhyChooseConsultation.jsx
 * 
 * FIXES APPLIED:
 * - Removed overlay text from visual area (only testimonials remain).
 * - Set 'object-fit: contain' to ensure full visibility.
 * - Removed initial zoom: Scaling is now 0.98 -> 1 for entrance.
 * - Removed card-like styling artifacts.
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { whyChooseConsultationData } from '../data/whyChooseConsultation';
import './whyChooseConsultation.css';

// Helper to get initials from name
const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
};

// Card Position Config (Desktop)
const CARD_POSITIONS = [
    { top: '10%', left: '5%', rotate: -3 },
    { top: '25%', right: '-2%', rotate: 4 },
    { bottom: '15%', left: '8%', rotate: 2 },
    { bottom: '8%', right: '10%', rotate: -2 }
];

const WhyChooseConsultation = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive Logic
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Parallax Logic (Desktop Only)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (prefersReducedMotion || isMobile) return;
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((clientX - centerX) / 60);
        mouseY.set((clientY - centerY) / 60);
    };

    const springConfig = { damping: 30, stiffness: 100 };
    const pX = useSpring(mouseX, springConfig);
    const pY = useSpring(mouseY, springConfig);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const visualEntry = {
        hidden: { opacity: 0, scale: 0.98 }, // Start slightly smaller (never > 1)
        visible: {
            opacity: 1,
            scale: 1, // End at natural size
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const cardEntrance = (index) => ({
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, delay: 0.5 + (index * 0.15) }
        }
    });

    const handleCtaClick = (e) => {
        e.preventDefault();
        navigate('/book');
    };

    return (
        <section
            className="wcc-section"
            ref={ref}
            onMouseMove={handleMouseMove}
            aria-labelledby="wcc-section-title"
        >
            <div className="wcc-container">
                {/* 1. Visual Area (Left) */}
                <div className="wcc-visual-area">
                    {/* Decorative Blob */}
                    <motion.div
                        className="wcc-blob"
                        animate={isInView ? { scale: [0.9, 1.05, 0.9], rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Main Image - No text overlay inside */}
                    <motion.div
                        className="wcc-image-wrapper"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={visualEntry}
                        style={{
                            x: (prefersReducedMotion || isMobile) ? 0 : pX,
                            y: (prefersReducedMotion || isMobile) ? 0 : pY
                        }}
                    >
                        <img
                            src={isMobile ? whyChooseConsultationData.imageMobile : whyChooseConsultationData.imageDesktop}
                            alt="Consultation — SastaPainter"
                            className="wcc-main-img"
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>
                </div>

                {/* 2. Content Area (Right) */}
                <motion.div
                    className="wcc-content-area"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.span className="wcc-accent-label" variants={fadeInUp}>
                        {whyChooseConsultationData.accent}
                    </motion.span>

                    <motion.h2
                        id="wcc-section-title"
                        className="wcc-heading"
                        variants={fadeInUp}
                    >
                        {whyChooseConsultationData.headline}
                    </motion.h2>

                    <motion.p className="wcc-paragraph" variants={fadeInUp}>
                        {whyChooseConsultationData.intro}
                    </motion.p>

                    <motion.a
                        href="/book"
                        className="wcc-primary-cta"
                        onClick={handleCtaClick}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {whyChooseConsultationData.ctaText}
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseConsultation;
