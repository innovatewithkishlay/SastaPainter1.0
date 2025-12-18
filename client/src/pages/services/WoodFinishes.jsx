import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaGem, FaSprayCan, FaMagic } from 'react-icons/fa';
import ServiceInspiration from '../../components/services/ServiceInspiration';
import ServiceWhyChoose from '../../components/services/ServiceWhyChoose';
import ServiceProcess from '../../components/services/ServiceProcess';
import './interiorPainting.css';

const WoodFinishes = () => {

    const whyChooseFeatures = [
        {
            id: 1,
            icon: <FaGem />,
            title: "Premium PU & Polish",
            text: "High-gloss, matte, and satin finishes using top-tier PU and Melamine."
        },
        {
            id: 2,
            icon: <FaTree />,
            title: "Enhance Wood Grain",
            text: "We highlight the natural beauty of teak, mahogany, and other woods."
        },
        {
            id: 3,
            icon: <FaSprayCan />,
            title: "Dust-Free Spray Application",
            text: "Advanced spray equipment for a bubble-free, glass-like finish."
        },
        {
            id: 4,
            icon: <FaMagic />,
            title: "Restoration Experts",
            text: "Revive old furniture and doors to look brand new again."
        }
    ];

    const processSteps = [
        {
            id: 1,
            title: "Surface Evaluation",
            text: "Checking wood condition and previous polish layers."
        },
        {
            id: 2,
            title: "Sanding & Scraping",
            text: "Thorough sanding to expose the raw wood grain."
        },
        {
            id: 3,
            title: "Staining & Sealing",
            text: "Applying stains for color and sealers for protection."
        },
        {
            id: 4,
            title: "Isolator & PU Coats",
            text: "Multi-layer coating application with sanding between coats."
        },
        {
            id: 5,
            title: "Buffing & Polishing",
            text: "Final buffing to achieve the desired high-gloss or matte sheen."
        }
    ];

    return (
        <div className="interior-painting-page">
            <section
                className="interior-banner"
                style={{ backgroundImage: `url('/images/wood-finishes-banner.webp')` }}
            >
                <div className="interior-banner-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="interior-banner-tag">Wood Polishing Services</span>
                        <h1>
                            Elegant Finishes For <br />
                            Your Wooden Furniture
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Protect and beautify your doors, windows, and furniture with expert polishing.
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
                title="Why Choose Our Wood Experts?"
            />

            <ServiceProcess
                steps={processSteps}
                title="Our Wood Polishing Process"
            />
        </div>
    );
};

export default WoodFinishes;
