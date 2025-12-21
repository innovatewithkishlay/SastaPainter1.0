import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPalette, FaStar, FaUserAstronaut, FaBrush } from 'react-icons/fa';
import ServiceInspiration from '../../components/services/ServiceInspiration';
import ServiceWhyChoose from '../../components/services/ServiceWhyChoose';
import ServiceProcess from '../../components/services/ServiceProcess';
import './interiorPainting.css';

const TexturePainting = () => {

    // Using some creative icons
    const whyChooseFeatures = [
        {
            id: 1,
            icon: <FaPalette />,
            title: "Exclusive Designs",
            text: "Wide range of metallic, stucco, and fabric finish textures to choose from."
        },
        {
            id: 2,
            icon: <FaUserAstronaut />, // Proxy for 'Artist' or expert
            title: "Experienced Artists",
            text: "Texture painting requires skilled hands. Our artists deliver masterpiece walls."
        },
        {
            id: 3,
            icon: <FaStar />,
            title: "Accent Wall Specialists",
            text: "Create a stunning focal point in your living room or bedroom."
        },
        {
            id: 4,
            icon: <FaBrush />,
            title: "Custom Patterns",
            text: "We can create customized patterns that match your interior theme."
        }
    ];

    const processSteps = [
        {
            id: 1,
            title: "Design Selection",
            text: "Browse our catalog and select the perfect texture and color combo."
        },
        {
            id: 2,
            title: "Base Coat Application",
            text: "Applying a premium base coat to support the texture layer."
        },
        {
            id: 3,
            title: "Texture Application",
            text: "Using specialized tools (trowels, rollers) to create the 3D effect."
        },
        {
            id: 4,
            title: "Pattern Detailing",
            text: "Fine-tuning the pattern for consistency and depth."
        },
        {
            id: 5,
            title: "Protective Glaze",
            text: "Optional top glazes to protect the texture and add sheen."
        }
    ];

    return (
        <div className="interior-painting-page">
            <section
                className="interior-banner"
                style={{ backgroundImage: `url('/images/texture-painting-banner.avif')` }}
            >
                <div className="interior-banner-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="interior-banner-tag">Texture Painting Designs</span>
                        <h1>
                            Add Depth & Character <br />
                            To Your Walls
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Stunning textured finishes that turn ordinary walls into works of art.
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
                title="Why Choose Textured Walls?"
            />

            <ServiceProcess
                steps={processSteps}
                title="Texture Application Process"
            />
        </div>
    );
};

export default TexturePainting;
