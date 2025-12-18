import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaClock, FaCheckCircle, FaHandshake } from 'react-icons/fa';
import ServiceInspiration from '../../components/services/ServiceInspiration';
import ServiceWhyChoose from '../../components/services/ServiceWhyChoose';
import ServiceProcess from '../../components/services/ServiceProcess';
import './interiorPainting.css';

const RentalPainting = () => {

    const whyChooseFeatures = [
        {
            id: 1,
            icon: <FaMoneyBillWave />,
            title: "Budget-Friendly Packages",
            text: "Cost-effective painting solutions tailored for rental properties and quick turnarounds."
        },
        {
            id: 2,
            icon: <FaClock />,
            title: "Super Fast Completion",
            text: "We finish 2BHK/3BHK apartments in record time so you can rent out sooner."
        },
        {
            id: 3,
            icon: <FaCheckCircle />,
            title: "Standard Quality Checks",
            text: "Clean, consistent finishes that make your property look fresh and inviting."
        },
        {
            id: 4,
            icon: <FaHandshake />,
            title: "Hassle-Free Service",
            text: "End-to-end management so landlords don't have to monitor daily."
        }
    ];

    const processSteps = [
        {
            id: 1,
            title: "Quick Assessment",
            text: "We visit and provide an instant quote for the rental refresh."
        },
        {
            id: 2,
            title: "Material Selection",
            text: "Choosing durable, cost-effective paints suitable for high turnover."
        },
        {
            id: 3,
            title: "Basic Surface Prep",
            text: "Minor patching and sanding to ensure smooth walls."
        },
        {
            id: 4,
            title: "Rapid Painting",
            text: "Efficient team deployment to complete the job swiftly."
        },
        {
            id: 5,
            title: "Handover",
            text: "Site clearance and immediate handover for your new tenants."
        }
    ];

    return (
        <div className="interior-painting-page">
            <section
                className="interior-banner"
                style={{ backgroundImage: `url('/images/rental-painting-banner.webp')` }}
            >
                <div className="interior-banner-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="interior-banner-tag">Rental Property Painting</span>
                        <h1>
                            Fresh Looks For Your <br />
                            Rental Properties
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Quick, affordable, and quality painting to get your tenants moving in confident.
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
                title="Why Choose Us for Rentals?"
            />

            <ServiceProcess
                steps={processSteps}
                title="Our Fast-Track Process"
            />
        </div>
    );
};

export default RentalPainting;
