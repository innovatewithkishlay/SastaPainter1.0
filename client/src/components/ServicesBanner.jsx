/**
 * ServicesBanner.jsx
 * 
 * Top banner for the Services page.
 * ANIMATIONS: Uses Framer Motion for entrance animations.
 * DATA: Source text/images from '../data/servicesBanner.js'.
 * 
 * VIDEO: Plays videoPoster IN-PLACE (replaces image) when clicked.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { servicesBannerData } from '../data/servicesBanner';
import './servicesBanner.css';

// --- CONFIG ---
const REDUCE_MOTION = false;

// --- VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const imageScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const ServicesBanner = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);

    const {
        accent,
        headlineLines,
        subhead,
        primaryCta,
        secondaryCta,
        image,
        videoPoster
    } = servicesBannerData;

    const handlePrimaryClick = () => {
        if (primaryCta.link.startsWith('http')) {
            window.location.href = primaryCta.link;
        } else {
            navigate(primaryCta.link);
        }
    };

    const handleSecondaryClick = () => navigate(secondaryCta.link);

    return (
        <header className="sb-section" aria-labelledby="services-banner-heading">
            <AnimatePresence mode="wait">
                <motion.div
                    className="sb-container"
                    variants={containerVariants}
                    initial={REDUCE_MOTION ? "visible" : "hidden"}
                    animate="visible"
                    key="content"
                >

                    {/* LEFT CONTENT */}
                    <div className="sb-content">
                        <motion.span className="sb-accent" variants={itemFadeUp}>
                            {accent}
                        </motion.span>

                        <h2 id="services-banner-heading" className="sb-headline">
                            {headlineLines.map((line, index) => (
                                <motion.div key={index} className="sb-headline-line" variants={itemFadeUp}>
                                    {line}
                                    {index < headlineLines.length - 1 && <br />}
                                </motion.div>
                            ))}
                        </h2>

                        <motion.p className="sb-subhead" variants={itemFadeUp}>
                            {subhead}
                        </motion.p>

                        <motion.div className="sb-actions" variants={itemFadeUp}>
                            <button
                                onClick={handlePrimaryClick}
                                className="sb-btn sb-btn-primary"
                                aria-label={primaryCta.text}
                            >
                                {primaryCta.text}
                            </button>

                            <button
                                onClick={handleSecondaryClick}
                                className="sb-btn sb-btn-secondary"
                                aria-label={secondaryCta.text}
                            >
                                {secondaryCta.text}
                            </button>
                        </motion.div>
                    </div>

                    {/* RIGHT VISUAL (Image or In-Place Video) */}
                    <motion.div
                        className="sb-visual"
                        variants={imageScale}
                        role={isPlaying ? undefined : "button"}
                        tabIndex={isPlaying ? -1 : 0}
                        aria-label={isPlaying ? undefined : "Play video"}
                        onClick={() => !isPlaying && setIsPlaying(true)}
                        onKeyDown={(e) => {
                            if (!isPlaying && e.key === 'Enter') setIsPlaying(true)
                        }}
                    >
                        {isPlaying ? (
                            <video
                                src={videoPoster}
                                controls
                                autoPlay
                                className="sb-video-inline"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <>
                                <img
                                    src={image}
                                    alt="Services Hero"
                                    className="sb-img"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div className="sb-play-overlay">
                                    <motion.div
                                        className="sb-play-icon"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    />
                                </div>
                            </>
                        )}
                    </motion.div>

                </motion.div>
            </AnimatePresence>
        </header>
    );
};

export default ServicesBanner;
