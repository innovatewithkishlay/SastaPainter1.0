import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPalette, FaPaintRoller, FaClock, FaSprayCan } from 'react-icons/fa';
import ServiceInspiration from '../../components/services/ServiceInspiration';
import ServiceWhyChoose from '../../components/services/ServiceWhyChoose';
import ServiceProcess from '../../components/services/ServiceProcess';
import './interiorPainting.css';

const InteriorPainting = () => {

    // Data for Why Choose Section
    const whyChooseFeatures = [
        {
            id: 1,
            icon: <FaPalette />,
            title: "Expert Color Consultation",
            text: "Our specialists help you select the perfect shades based on lighting, space, and style."
        },
        {
            id: 2,
            icon: <FaSprayCan />,
            title: "Dust-Free & Clean Process",
            text: "We follow a clean, organized painting process with minimal dust and disruption."
        },
        {
            id: 3,
            icon: <FaPaintRoller />,
            title: "Premium Paints & Finishes",
            text: "Only high-quality branded paints for smooth, durable, and elegant finishes."
        },
        {
            id: 4,
            icon: <FaClock />,
            title: "On-Time Delivery",
            text: "We commit to timelines and ensure projects are completed as promised."
        }
    ];

    // Data for Process Section
    const processSteps = [
        {
            id: 1,
            title: "Site Inspection & Requirements",
            text: "We understand your needs and inspect the space before starting."
        },
        {
            id: 2,
            title: "Color & Finish Selection",
            text: "Choose from a wide range of colors with expert guidance."
        },
        {
            id: 3,
            title: "Surface Preparation",
            text: "Crack filling, sanding, and priming for a flawless base."
        },
        {
            id: 4,
            title: "Professional Painting",
            text: "Skilled painters execute with precision and care."
        },
        {
            id: 5,
            title: "Final Inspection & Cleanup",
            text: "We ensure perfect finish and leave your home clean."
        }
    ];

    return (
        <div className="interior-painting-page">
            {/* Banner Section */}
            <section
                className="interior-banner"
                style={{ backgroundImage: `url('/images/interiror-page-banner.webp')` }}
            >
                <div className="interior-banner-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="interior-banner-tag">Interior Painting Services</span>
                        <h1>
                            Transform Your Home With <br />
                            Professional Interior Painting
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Premium finishes, expert craftsmanship, and colors that bring your space to life.
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

            {/* Inspiration Ideas Section */}
            <ServiceInspiration />

            {/* Why Choose Section */}
            <ServiceWhyChoose
                features={whyChooseFeatures}
                title="Why Homeowners Trust Our Interior Painting Experts"
            />

            {/* Process Section */}
            <ServiceProcess
                steps={processSteps}
                title="Our Simple Interior Painting Process"
            />
        </div>
    );
};

export default InteriorPainting;
