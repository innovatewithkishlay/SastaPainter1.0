/**
 * HeroSection.jsx
 * 
 * CHANGES:
 * - Added `slides` array with desktop/mobile image mappings and text content.
 * - Implemented Autoplay Slider: Rotates every 4s, pauses on hover.
 * - Added Parallax Effect: Background and text move subtly with cursor/touch.
 * - Added Framer Motion Animations: Smooth fade/slide transitions for images and text.
 * - Added Dot Pagination: Interactive dots with animated active state.
 * - Added Responsive Logic: Switches between desktop and mobile assets based on window width.
 * - Added Swipe Support: Users can drag/swipe to change slides.
 * - Preserved existing 'hero' and 'hero-content' classes.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// --- DATA CONFIGURATION ---
const SLIDES = [
    {
        id: 1,
        desktop: '/images/home-desk1.webp',
        mobile: '/images/homemob1.webp',
        title: "Beautiful Interiors Start With Perfect Painting",
        subtitle: "Skilled interior painters delivering lasting colors & style",
        cta: "Estimate Painting Cost",
        link: '/estimate'
    },
    {
        id: 2,
        desktop: '/images/home-desk2.webp',
        mobile: '/images/homemob2.webp',
        title: "Transform Your Home With Professional Painters",
        subtitle: "Luxury finishes • Clean work • Fast delivery",
        cta: "See Our Services",
        link: '/services'
    },
    {
        id: 3,
        desktop: '/images/home-desk3.webp',
        mobile: '/images/homemob3.webp',
        title: "Color Consultations by Design Experts",
        subtitle: "Personalized palettes that elevate every room",
        cta: "Book Site Inspection",
        link: '#book'
    },
    {
        id: 4,
        desktop: '/images/home-desk4.webp',
        mobile: '/images/homemob4.webp',
        title: "Reliable Teams, Precise Execution",
        subtitle: "On-time, transparent pricing, and careful cleanup",
        cta: "Get A Quote",
        link: '#book'
    },
    {
        id: 5,
        desktop: '/images/home-desk5.webp',
        mobile: '/images/homemob1.webp', // Fallback to mob1 as there are only 4 mobile images
        title: "Premium Paints, Lasting Results",
        subtitle: "High-quality materials and expert application",
        cta: "Start Your Project",
        link: '#book'
    }
];

const AUTOPLAY_DELAY = 4000;
const INTERACTION_TIMEOUT = 5000;

const HeroSection = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Parallax Motion Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transforms for parallax (subtle movement)
    const moveX = useTransform(springX, [-0.5, 0.5], ['-20px', '20px']);
    const moveY = useTransform(springY, [-0.5, 0.5], ['-20px', '20px']);
    const textMoveX = useTransform(springX, [-0.5, 0.5], ['-10px', '10px']);
    const textMoveY = useTransform(springY, [-0.5, 0.5], ['-10px', '10px']);

    const timeoutRef = useRef(null);
    const containerRef = useRef(null);

    // --- RESPONSIVE CHECK ---
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // --- AUTOPLAY LOGIC ---
    const nextSlide = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    const resetAutoplay = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, INTERACTION_TIMEOUT);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, AUTOPLAY_DELAY);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    // --- EVENT HANDLERS ---
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        // Normalize coordinates to -0.5 to 0.5
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleDotClick = (i) => {
        setDirection(i > index ? 1 : -1);
        setIndex(i);
        setIsPaused(true);
        resetAutoplay();
    };

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = offset.x;
        const swipeThreshold = 50;

        if (swipe < -swipeThreshold) {
            nextSlide();
        } else if (swipe > swipeThreshold) {
            prevSlide();
        }
        setIsPaused(true);
        resetAutoplay();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            setIsPaused(true);
            resetAutoplay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            setIsPaused(true);
            resetAutoplay();
        }
    };

    const handleCtaClick = (e, link) => {
        if (link.startsWith('/')) {
            e.preventDefault();
            navigate(link);
        }
        // else: let default behavior happen for anchor links (e.g., #book)
    };

    // --- VARIANTS ---
    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.1 // Slight zoom on enter
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (dir) => ({
            zIndex: 0,
            x: dir < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.05
        })
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    const currentSlide = SLIDES[index];
    const bgImage = isMobile ? currentSlide.mobile : currentSlide.desktop;

    return (
        <section
            className="hero"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsPaused(false); }}
            onKeyDown={handleKeyDown}
            tabIndex="0"
            role="region"
            aria-roledescription="carousel"
            aria-label="Highlighted services"
            style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '0', // Full height handled by flex/minHeight
                minHeight: '600px', // Matches original
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--primary-color)', // Fallback
                outline: 'none'
            }}
        >
            {/* Background Image Slider */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                        scale: { duration: 6 } // Slow zoom effect while visible
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleDragEnd}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url('${bgImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        willChange: 'transform, opacity',
                        x: moveX, // Parallax x
                        y: moveY // Parallax y
                    }}
                />
            </AnimatePresence>

            {/* Content Container */}
            <div className="container hero-content" style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '900px',
                textAlign: 'center',
                pointerEvents: 'none' // Allow click-through for drag unless on actionable items
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ x: textMoveX, y: textMoveY }} // Inverse parallax for depth
                    >
                        <motion.h1
                            variants={itemVariants}
                            style={{
                                color: 'var(--white)',
                                marginBottom: '1.5rem',
                                textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            {currentSlide.title}
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            style={{
                                fontSize: '1.25rem',
                                marginBottom: '2.5rem',
                                opacity: 0.95,
                                textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                color: '#e2e8f0'
                            }}
                        >
                            {currentSlide.subtitle}
                        </motion.p>

                        <motion.div variants={itemVariants} style={{ pointerEvents: 'auto' }}>
                            <motion.a
                                href={currentSlide.link}
                                onClick={(e) => handleCtaClick(e, currentSlide.link)}
                                className="btn-primary"
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {currentSlide.cta}
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div style={{
                position: 'absolute',
                bottom: '3rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                display: 'flex',
                gap: '1rem',
                pointerEvents: 'auto'
            }}>
                {SLIDES.map((slide, i) => (
                    <motion.button
                        key={slide.id}
                        onClick={() => handleDotClick(i)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === index ? 'true' : 'false'}
                        style={{
                            width: i === index ? '30px' : '10px',
                            height: '10px',
                            borderRadius: '5px', // Pill shape for active
                            border: 'none',
                            backgroundColor: i === index ? 'var(--accent-color)' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'width 0.3s ease, background-color 0.3s ease',
                            boxShadow: i === index ? '0 0 10px var(--accent-color)' : 'none'
                        }}
                    />
                ))}
            </div>

            {/* Decorative Progress Bar for Autoplay (Optional visual cue) */}
            {!isPaused && (
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear', repeat: 0 }}
                    key={index} // Reset animation on slide change
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '4px',
                        backgroundColor: 'var(--accent-color)',
                        zIndex: 20
                    }}
                />
            )}
        </section>
    );
};

export default HeroSection;