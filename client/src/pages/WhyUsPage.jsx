/**
 * WhyUsPage.jsx
 * 
 * Main "Why Us" landing page.
 * ANIMATIONS: Uses Framer Motion for stagger events and scroll detection.
 * DATA: Source text/images from '../data/whyUsData.js'.
 * ICONS: Uses react-icons/fa6 and /bi.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaUserShield, FaCrown, FaPumpSoap } from 'react-icons/fa6';
import { BiCheckShield } from 'react-icons/bi';

import BrandsGrid from '../components/BrandsGrid';
import {
    heroData,
    valuesData,
    timelineImages,
    ctaData
} from '../data/whyUsData';
import TestimonialsSection from '../components/TestimonialsSection';

import './whyUsPage.css';

// --- ICONS MAP ---
const iconMap = {
    clock: <FaClock />,
    hygiene: <FaPumpSoap />,
    premium: <FaCrown />,
    verified: <FaUserShield />,
    shield: <BiCheckShield />
};

// --- ANIMATION VARIANTS ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const WhyUsPage = () => {
    return (
        <main className="why-us-page">

            {/* 1. HERO SECTION */}
            <section className="why-hero">
                <div className="hero-container">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.span className="hero-accent" variants={fadeInUp}>
                            {heroData.accent}
                        </motion.span>
                        <motion.h1 className="hero-title" variants={fadeInUp}>
                            {heroData.title}
                        </motion.h1>
                        <motion.p className="hero-subtitle" variants={fadeInUp}>
                            {heroData.subtitle}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="hero-image-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={heroData.image}
                            alt="Why Choose Us Hero"
                            className="hero-img"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </section>

            {/* 2. CORE VALUES */}
            <section className="why-values">
                <div className="section-container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="section-heading">Our Core Values</h2>
                        <p className="hero-subtitle" style={{ margin: '0 auto' }}>
                            Built on trust, quality, and transparency.
                        </p>
                    </motion.div>

                    <motion.div
                        className="values-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {valuesData.map((val) => (
                            <motion.div key={val.id} className="value-card" variants={fadeInUp}>
                                <div className="value-icon">
                                    {iconMap[val.iconType] || <BiCheckShield />}
                                </div>
                                <h3 className="value-title">{val.title}</h3>
                                <p className="value-text">{val.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3. HOW WE WORK (TIMELINE) */}
            <section className="why-timeline">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-heading">How We Work</h2>
                        <p className="hero-subtitle" style={{ margin: '0 auto' }}>
                            A seamless process from consultation to handover.
                        </p>
                    </div>

                    <motion.div
                        className="timeline-content-wrapper"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <picture>
                            <source media="(max-width: 767px)" srcSet={timelineImages.mobile} />
                            <img
                                src={timelineImages.desktop}
                                alt="Our Working Process Timeline"
                                className="timeline-img-desk"
                                loading="lazy"
                            />
                        </picture>
                    </motion.div>
                </div>
            </section>

            {/* 4. BRANDS WE TRUST */}
            {/* Reusing the BrandsGrid component as requested, it fits perfectly here */}
            <BrandsGrid />

            {/* 5. TESTIMONIALS */}
            <TestimonialsSection />

            {/* 6. CTA SECTION */}
            <section className="why-cta">
                <div className="cta-container">
                    <motion.h2
                        className="cta-heading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {ctaData.heading}
                    </motion.h2>
                    <motion.p
                        className="cta-subtext"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {ctaData.subtext}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Link to={ctaData.buttonLink} className="cta-btn">
                            {ctaData.buttonText}
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main>
    );
};

export default WhyUsPage;
