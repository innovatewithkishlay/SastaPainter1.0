import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWater, FaSearch, FaShieldAlt, FaTools } from 'react-icons/fa';
import ServiceInspiration from '../../components/services/ServiceInspiration';
import ServiceWhyChoose from '../../components/services/ServiceWhyChoose';
import ServiceProcess from '../../components/services/ServiceProcess';
import './interiorPainting.css';

const Waterproofing = () => {

    const whyChooseFeatures = [
        {
            id: 1,
            icon: <FaSearch />,
            title: "Advanced Leak Detection",
            text: "We use thermal imaging and moisture meters to find the root cause of dampness."
        },
        {
            id: 2,
            icon: <FaShieldAlt />,
            title: "Long-Term Warranty",
            text: "Peace of mind with warranties up to 10 years on our waterproofing services."
        },
        {
            id: 3,
            icon: <FaTools />,
            title: "Expert Technical Application",
            text: "Certified professionals trained in chemical waterproofing application."
        },
        {
            id: 4,
            icon: <FaWater />,
            title: "Protection Against Seepage",
            text: "Stop wall patches, peeling paint, and mold growth permanently."
        }
    ];

    const processSteps = [
        {
            id: 1,
            title: "Moisture Diagnosis",
            text: "Identifying the source and extent of water damage."
        },
        {
            id: 2,
            title: "Surface Stripping",
            text: "Removing affected plaster and paint to reach the masonry."
        },
        {
            id: 3,
            title: "Chemical Coating",
            text: "Applying specialized waterproofing chemicals and membranes."
        },
        {
            id: 4,
            title: "Re-Plastering",
            text: "Plastering the treated area with waterproof additives."
        },
        {
            id: 5,
            title: "Final Painting",
            text: "Repainting the surface to restore the aesthetic look."
        }
    ];

    return (
        <div className="interior-painting-page">
            <section
                className="interior-banner"
                style={{ backgroundImage: `url('/images/waterproofing-banner.avif')` }}
            >
                <div className="interior-banner-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="interior-banner-tag">Waterproofing Solutions</span>
                        <h1>
                            Say Goodbye To <br />
                            Damp Walls & Leaks
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Scientific waterproofing treatments that protect your home's structural integrity.
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
                title="Why Trust Our Waterproofing?"
            />

            <ServiceProcess
                steps={processSteps}
                title="Our 5-Step Waterproofing Process"
            />
        </div>
    );
};

export default Waterproofing;
