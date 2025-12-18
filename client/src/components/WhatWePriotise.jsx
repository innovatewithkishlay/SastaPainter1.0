/**
 * WhyChooseUs.jsx
 * 
 * Layout Update: Image Top / Content Bottom
 * - Moved image wrapper above the content wrapper in the DOM.
 * - Adjusted animations to flow naturally: Image -> Heading -> Features.
 * - Using 'object-fit: contain' via CSS to ensure full image visibility.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { whyChooseUsData } from '../data/whatwepriotise';
import './whyChooseUs.css';

// Simple Icons (Circle/Check/Star replacement via SVG)
const Icons = {
    clock: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    ),
    shield: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    ),
    star: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    )
};

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            className="wcu-card"
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
        >
            <motion.div
                className="wcu-icon-wrapper"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {Icons[feature.icon]}
            </motion.div>
            <h3 className="wcu-card-title">{feature.title}</h3>
            <p className="wcu-card-desc">{feature.description}</p>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Parallax logic for image (SUBTLE)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((clientX - centerX) / 50); // Divide strictly to keep it subtle
        mouseY.set((clientY - centerY) / 50);
    };

    const springConfig = { damping: 25, stiffness: 120 };
    const imageX = useSpring(mouseX, springConfig);
    const imageY = useSpring(mouseY, springConfig);

    return (
        <section
            className="wcu-section"
            ref={ref}
            onMouseMove={handleMouseMove}
            aria-labelledby="why-choose-us-heading"
        >
            <div className="wcu-container">


                {/* 2. Content Wrapper (Now Below) */}
                <div className="wcu-content">
                    <motion.span
                        className="wcu-label"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {whyChooseUsData.label}
                    </motion.span>

                    <motion.h2
                        id="why-choose-us-heading"
                        className="wcu-headline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {whyChooseUsData.headline}
                    </motion.h2>

                    <motion.p
                        className="wcu-intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {whyChooseUsData.intro}
                    </motion.p>
                    {/* 1. Image Wrapper (Now on Top) */}
                    <figure className="wcu-image-wrapper">
                        <motion.img
                            src="/images/whychooseus.webp"
                            alt="Why Choose Us — SastaPainter Advantage"
                            className="wcu-img"
                            loading="lazy"
                            decoding="async"
                            style={{
                                x: imageX,
                                y: imageY,
                                scale: 1.02 // Slight zoom
                            }}
                            initial={{ opacity: 0, scale: 1.05, y: 20 }}
                            animate={isInView ? { opacity: 1, scale: 1.02, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </figure>
                    <motion.div
                        className="wcu-features-grid"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.6
                                }
                            }
                        }}
                    >
                        {whyChooseUsData.features.map((feature, i) => (
                            <FeatureCard key={feature.id} feature={feature} index={i} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
