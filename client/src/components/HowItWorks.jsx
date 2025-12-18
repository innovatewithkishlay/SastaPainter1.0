/**
 * HowItWorks.jsx
 * 
 * "How It Works" Section
 * Displays the 6-step renovation process using a featured illustration.
 * 
 * Update: Removed card-like styling (borders, shadows) for seamless integration.
 * The image now behaves as a natural part of the page layout.
 */

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { howItWorksData } from '../data/howItWorks';
import './howItWorks.css';

const HowItWorks = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation Config
    const STAGGER_DELAY = 0.15;
    const PARALLAX_ENABLED = !prefersReducedMotion;

    // Parallax logic (Only active if motion enabled)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!PARALLAX_ENABLED) return;
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        // Subtle divisor
        mouseX.set((clientX - centerX) / 80);
        mouseY.set((clientY - centerY) / 80);
    };

    const springConfig = { damping: 25, stiffness: 120 };
    const tiltX = useSpring(mouseX, springConfig);
    const tiltY = useSpring(mouseY, springConfig);

    // Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: STAGGER_DELAY,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section
            className="hiw-section"
            ref={ref}
            onMouseMove={handleMouseMove}
            aria-labelledby="how-it-works-heading"
        >
            <motion.div
                className="hiw-container"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {/* Header Section */}
                <div className="hiw-header">
                    <motion.span
                        className="hiw-label"
                        variants={itemVariants}
                    >
                        {howItWorksData.label}
                    </motion.span>

                    <motion.h2
                        id="how-it-works-heading"
                        className="hiw-headline"
                        variants={itemVariants}
                    >
                        {howItWorksData.headline}
                    </motion.h2>

                    <motion.p
                        className="hiw-subheading"
                        variants={itemVariants}
                    >
                        {howItWorksData.subheading}
                    </motion.p>
                </div>

                {/* Illustrated Process Image - No Card Styling */}
                <motion.div
                    className="hiw-image-wrapper"
                    variants={imageVariants}
                    style={{
                        x: PARALLAX_ENABLED ? tiltX : 0,
                        y: PARALLAX_ENABLED ? tiltY : 0,
                        // rotateX: PARALLAX_ENABLED ? useTransform(tiltY, [-10, 10], [1, -1]) : 0, 
                        // rotateY: PARALLAX_ENABLED ? useTransform(tiltX, [-10, 10], [-1, 1]) : 0
                    }}
                >
                    <img
                        src="/images/howitworksdesk.webp"
                        alt="How It Works Renovation Process in 6 Steps"
                        className="hiw-img"
                        loading="lazy"
                        decoding="async"
                    />
                </motion.div>

                {/* Optional CTA */}
                <motion.div
                    className="hiw-cta-wrapper"
                    variants={itemVariants}
                >
                    <a href="#book" className="btn-secondary">
                        Book Site Inspection
                    </a>
                </motion.div>

                {/* Hidden accessible text */}
                <div className="visually-hidden" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                    <ol>
                        {howItWorksData.steps.map(step => (
                            <li key={step.id}>{step.title}: {step.description}</li>
                        ))}
                    </ol>
                </div>

            </motion.div>
        </section>
    );
};

export default HowItWorks;
