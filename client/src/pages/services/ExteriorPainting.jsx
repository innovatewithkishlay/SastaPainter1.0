import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaSun, FaWater, FaClock } from 'react-icons/fa';
import ServiceInspiration from '../../components/services/ServiceInspiration';
import ServiceWhyChoose from '../../components/services/ServiceWhyChoose';
import ServiceProcess from '../../components/services/ServiceProcess';
import './interiorPainting.css'; // Reusing base styles

const ExteriorPainting = () => {

    const whyChooseFeatures = [
        {
            id: 1,
            icon: <FaShieldAlt />,
            title: "Ultimate Weather Protection",
            text: "High-performance paints that shield against rain, sun, ultraviolet rays, and dust."
        },
        {
            id: 2,
            icon: <FaSun />,
            title: "Fade-Resistant Colors",
            text: "Premium exterior paints that maintain vibrancy and resist fading over years."
        },
        {
            id: 3,
            icon: <FaWater />,
            title: "Waterproofing & Anti-Fungal",
            text: "Advanced coatings to prevent algae, fungus, and water seepage issues."
        },
        {
            id: 4,
            icon: <FaClock />,
            title: "Long-Lasting Durability",
            text: "Expert application ensures your exterior walls stay pristine for the long haul."
        }
    ];

    const processSteps = [
        {
            id: 1,
            title: "Exterior Inspection",
            text: "We assess wall conditions, cracks, and dampness levels."
        },
        {
            id: 2,
            title: "Cleaning & Washing",
            text: "Pressure washing to remove dust, algae, and loose paint particles."
        },
        {
            id: 3,
            title: "Crack Filling & Waterproofing",
            text: "Repairing structural cracks and applying waterproofing primers."
        },
        {
            id: 4,
            title: "Primer & Top Coats",
            text: "Applying superior exterior primer followed by weather-proof top coats."
        },
        {
            id: 5,
            title: "Site Cleanup",
            text: "Thorough cleaning of the premises after project completion."
        }
    ];

    return (
        <div className="interior-painting-page">
            <section
                className="interior-banner"
                style={{ backgroundImage: `url('/images/exterior-painting-banner.webp')` }}
            >
                <div className="interior-banner-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="interior-banner-tag">Exterior Painting Services</span>
                        <h1>
                            Protect & Beautify Your <br />
                            Home's Exterior
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Durable, weather-proof finishes that enhance curb appeal and protection.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                    >
                        <Link to="/book" className="banner-cta-btn">
                            Book Site Inspection
                        </Link>
                    </motion.div>
                </div>
            </section>

            <ServiceInspiration />

            <ServiceWhyChoose
                features={whyChooseFeatures}
                title="Why Choose Our Exterior Experts?"
            />

            <ServiceProcess
                steps={processSteps}
                title="Our Exterior Painting Process"
            />
        </div>
    );
};

export default ExteriorPainting;
