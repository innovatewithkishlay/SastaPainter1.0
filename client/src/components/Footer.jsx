import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
    FaWhatsapp,
    FaPaperPlane,
    FaApple,
    FaGooglePlay,
    FaShieldAlt,
    FaLeaf,
    FaAward,
    FaStar,
    FaArrowRight
} from 'react-icons/fa';
import './footer.css';

const Footer = () => {

    const companyLinks = [
        { name: 'About Us', path: '/why-us' },
        { name: 'Our Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog & Articles', path: '/blog' },
        { name: 'Customer Reviews', path: '/reviews' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Become a Partner', path: '/partner' }
    ];

    const resourceLinks = [
        { name: 'FAQs', path: '/faq' },
        { name: 'Paint Calculator', path: '/calculator' },
        { name: 'Color Visualizer', path: '/visualizer' },
        { name: 'Color Consultation', path: '/book' },
        { name: 'Site Map', path: '/sitemap' },
        { name: 'Cancellation Policy', path: '/refund-policy' }
    ];

    const interiorServices = [
        { name: 'Interior House Painting', path: '/services/Interior-Painting' },
        { name: 'Luxury Rental Painting', path: '/services/Rental-Painting' },
        { name: 'Texture Wall Designs', path: '/services/Texture-Painting' },
        { name: 'Kids Room Decor', path: '/services/Interior-Painting' },
        { name: 'Stencil Painting Art', path: '/services/Texture-Painting' },
        { name: 'Ceiling Painting', path: '/services/Interior-Painting' },
        { name: 'Wall Paper Installation', path: '/services/Texture-Painting' }
    ];

    const exteriorServices = [
        { name: 'Exterior House Painting', path: '/services/Exterior-Painting' },
        { name: 'Roof Waterproofing', path: '/services/Waterproofing' },
        { name: 'Wood Polishing & Varnish', path: '/services/Wood-Finishes' },
        { name: 'Metal Gate Painting', path: '/services/Exterior-Painting' },
        { name: 'Terrace Leakage Solutions', path: '/services/Waterproofing' },
        { name: 'Damp Proofing', path: '/services/Waterproofing' },
        { name: 'Crack Filling Services', path: '/services/Exterior-Painting' }
    ];

    const locations = [
        "Painters in Delhi", "Painters in Noida", "Painters in Gurgaon (Coming Soon)", "Painters in Ghaziabad (Coming Soon)",
        "Painters in Faridabad (Coming Soon)", "Painters in Greater Noida (Coming Soon)", "Waterproofing in Delhi",
        "Whitewash in Noida", "Rental Painting in Gurgaon (Coming Soon)", "House Painting in South Delhi"
    ];

    return (
        <footer className="footer" id="contact">

            {/* 1. Brands / Partners Strip (New Layer) */}
            <div className="partners-strip">
                <div className="footer-container">
                    <span>Trusted Brands We Use:</span>
                    <div className="brand-list">
                        <span>Asian Paints</span>
                        <span>Dulux</span>
                        <span>Berger</span>
                        <span>Nerolac</span>
                        <span>Dr. Fixit</span>
                        <span>Jotun</span>
                    </div>
                </div>
            </div>

            {/* 2. Newsletter Section (Expanded) */}
            <div className="newsletter-section">
                <div className="footer-container">
                    <div className="newsletter-wrapper">
                        <div className="newsletter-text">
                            <span className="newsletter-badge">Stay Updated</span>
                            <h3>Join our Design Community</h3>
                            <p>Get exclusive home decor tips, color trends, and special offers delivered to your inbox every week.</p>
                        </div>
                        <div className="newsletter-form-container">
                            <div className="newsletter-form">
                                <input type="email" placeholder="Enter your email address" />
                                <button type="button">Subscribe Now <FaArrowRight /></button>
                            </div>
                            <p className="privacy-note"><FaShieldAlt /> No spam, we promise. Unsubscribe anytime.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Footer Content (Taller, More Spacing) */}
            <div className="footer-container main-footer-content">
                <div className="footer-grid">

                    {/* Column 1: Brand & App (Wider) */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-logo">
                            Sasta<span>Painter</span>
                        </Link>
                        <p className="brand-desc">
                            Transforming spaces with color and care. SastaPainter is India's leading technology-first painting service platform.
                            We combine expert craftsmanship with premium materials to deliver
                            stunning, durable, and affordable results for your home and office.
                        </p>

                        <div className="app-badges">
                            <h5 style={{ color: 'white', marginBottom: '15px', fontSize: '0.95rem', letterSpacing: '0.5px' }}>Experience the App</h5>
                            <div className="app-buttons">
                                <Link to="/ios-app" className="app-btn" style={{ textDecoration: 'none' }}>
                                    <FaApple size={28} />
                                    <div className="app-btn-text">
                                        <span>Download on the</span>
                                        <strong>App Store</strong>
                                    </div>
                                </Link>
                                <Link to="/android-app" className="app-btn" style={{ textDecoration: 'none' }}>
                                    <FaGooglePlay size={24} />
                                    <div className="app-btn-text">
                                        <span>GET IT ON</span>
                                        <strong>Google Play</strong>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="review-snapshot">
                            <div className="stars">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <p><strong>4.8/5</strong> based on 5000+ reviews</p>
                        </div>
                    </div>

                    {/* Column 2: Interior Services */}
                    <div className="footer-col">
                        <h4>Interior Solutions</h4>
                        <ul className="footer-links">
                            {interiorServices.map((link, idx) => (
                                <li key={idx}><Link to={link.path}>{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Exterior & More */}
                    <div className="footer-col">
                        <h4>Exterior & Specialized</h4>
                        <ul className="footer-links">
                            {exteriorServices.map((link, idx) => (
                                <li key={idx}><Link to={link.path}>{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Quick Links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {companyLinks.map((link, idx) => (
                                <li key={idx}><Link to={link.path}>{link.name}</Link></li>
                            ))}
                            <li className="link-divider"></li>
                            <li className="link-header">RESOURCES</li>
                            {resourceLinks.map((link, idx) => (
                                <li key={`res-${idx}`}><Link to={link.path}>{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Contact Info */}
                    <div className="footer-col contact-col">
                        <h4>Get In Touch</h4>
                        <div className="contact-card">
                            <div className="contact-row">
                                <FaMapMarkerAlt className="c-icon" />
                                <div>
                                    <strong>Head Office:</strong>
                                    <p>123, Color Street, Sector 62,<br />Noida, Uttar Pradesh 201301</p>
                                </div>
                            </div>
                            <div className="contact-row">
                                <FaPhone className="c-icon" />
                                <div>
                                    <strong>Call Us:</strong>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="contact-row">
                                <FaEnvelope className="c-icon" />
                                <div>
                                    <strong>Email Us:</strong>
                                    <p>support@sastapainter.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-section">
                            <h5>Follow Us</h5>
                            <div className="social-links">
                                <a href="#" className="social-icon"><FaFacebookF /></a>
                                <a href="#" className="social-icon"><FaInstagram /></a>
                                <a href="#" className="social-icon"><FaYoutube /></a>
                                <a href="#" className="social-icon"><FaLinkedinIn /></a>
                                <a href="#" className="social-icon"><FaWhatsapp /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. SEO Keyword Grid (New Layer - "More Complex") */}
                <div className="seo-keywords-section">
                    <h4>Popular Searches</h4>
                    <div className="keywords-grid">
                        {locations.map((loc, idx) => (
                            <span key={idx} className="keyword-tag">{loc}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Bottom Legal Bar */}
            <div className="footer-bottom">
                <div className="footer-container bottom-container">
                    <div className="copyright-info">
                        <p>&copy; {new Date().getFullYear()} SastaPainter Technologies Pvt. Ltd. All rights reserved.</p>
                        <p className="cin-text">CIN: U74999DL2023PTC123456 | ISO 9001:2015 Certified Company</p>
                    </div>
                    <div className="legal-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-and-conditions">Terms of Use</Link>
                        <Link to="/refund-policy">Refund Policy</Link>
                        <Link to="/sitemap">Sitemap</Link>
                        <Link to="/security">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
