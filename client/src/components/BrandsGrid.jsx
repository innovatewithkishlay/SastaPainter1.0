/**
 * BrandsGrid Component
 * 
 * ADDITION:
 * This component renders a responsive grid of brand logos with premium Framer Motion animations.
 * 
 * USAGE:
 * Import and place under the Popular Services section in your Home or Services page.
 * import BrandsGrid from './BrandsGrid';
 * ...
 * <PopularServices />
 * <BrandsGrid />
 * 
 * CONFIGURATION:
 * - Columns/Gap: Tweak 'brandsGrid.css' variables
 * - Animation: Adjust staggering/duration constants below
 * - Data: Edit 'src/data/brands.js'
 * 
 * REQ: npm install framer-motion
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { brands } from '../data/brands';
import './brandsGrid.css';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            damping: 20,
            duration: 0.45
        }
    }
};

const BrandsGrid = () => {
    const navigate = useNavigate();

    const handleBrandClick = (slug) => {
        // console.log(`Clicked brand: ${slug}`);
        // No redirect as per user request
    };

    const handleKeyDown = (e, slug) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrandClick(slug);
        }
    };

    return (
        <section
            className="brands-section"
            aria-labelledby="brands-heading"
        >
            <div className="brands-container">
                <header className="brands-header">
                    <h2 id="brands-heading" className="brands-title">
                        We Only Use Brands You Love
                    </h2>
                    <p className="brands-subtitle">
                        Premium paint systems we trust and recommend
                    </p>
                </header>

                <motion.div
                    className="brands-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {brands.map((brand) => (
                        <motion.div
                            key={brand.id}
                            className="brand-card"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "var(--hover-shadow)",
                                y: -5
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBrandClick(brand.slug)}
                            onKeyDown={(e) => handleKeyDown(e, brand.slug)}
                            role="button"
                            tabIndex="0"
                            aria-label={`Filter services by ${brand.name}`}
                        >
                            <div className="brand-image-wrapper">
                                <motion.img
                                    src={brand.image}
                                    alt={`${brand.name} logo`}
                                    className="brand-logo"
                                    loading="lazy"
                                    decoding="async"
                                    whileHover={{ scale: 1.06 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandsGrid;
