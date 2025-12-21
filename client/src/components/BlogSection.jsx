import React from 'react';
import { motion } from 'framer-motion';

const BlogSection = () => {
    return (
        <section className="blog-section" style={{ padding: '5rem 0', background: '#fff', color: '#334155' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>
                            What is SastaPainter?
                        </h2>
                        <div style={{ width: '80px', height: '4px', background: '#f59e0b', margin: '0 auto', borderRadius: '2px' }}></div>
                    </header>

                    <article style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            SastaPainter is your go-to destination for hassle-free Home Painting Service. At SastaPainter, we understand the significance of turning houses into homes through the artistry of house painting. Our dedicated team of well-trained painters, brought to you by SastaPainter Solutions Pvt Ltd, is committed to transforming your living spaces into vibrant, personalised sanctuaries.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Say goodbye to the traditional complexities of booking painters! With SastaPainter, the process is as easy as a brushstroke. Our user-friendly platform allows you to book a painter online effortlessly, ensuring a seamless experience from selection to payment. We pride ourselves in seamless online painter services, providing you with an affordable and efficient solution for all your home painting needs.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Beyond the aesthetics, we recognize the importance of safeguarding your investment. That is why we don't stop at just house painting – we go the extra mile by providing essential services like waterproofing. Our comprehensive approach ensures the longevity and integrity of your home, making us your one-stop destination for home painting services.
                        </p>
                        <p style={{ marginBottom: '3rem' }}>
                            Experience the future of home painting with SastaPainter – where online painter service meets quality craftsmanship. Forget the stress of finding a painter with our efficient online booking system and let us transform your house into the home of your dreams. Choose SastaPainter, because your home deserves the best.
                        </p>

                        <h3 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: '700', marginTop: '3rem', marginBottom: '1rem' }}>Why Choose SastaPainter?</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Elevate your living and working spaces with SastaPainter, the forefront innovator in home painting services. As your reliable online painter service, SastaPainter redefines aesthetics and quality, delivering excellence and innovation to transform your spaces into captivating works of art. Discover the power of colours and creativity with our comprehensive range of services. Trust Sasta Painter for a seamless and exceptional painting experience.
                        </p>

                        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem', marginBottom: '2rem' }}>
                            <div className="blog-card" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px' }}>
                                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '700' }}>House Painting Expertise Beyond Compare</h4>
                                <p>Sasta Painter takes pride in its team of seasoned painters, proficient in diverse painting techniques. Whether it's enhancing residential interiors or revamping commercial exteriors, our skilled painters bring your vision to reality with meticulous attention to detail.</p>
                            </div>
                            <div className="blog-card" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px' }}>
                                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '700' }}>Colour Consultation and Customization</h4>
                                <p>Choosing the right colour palette can be a daunting task. Sasta Painter eases this process by offering expert colour consultation services. Our consultants work closely with you to understand your preferences and existing decor.</p>
                            </div>
                            <div className="blog-card" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px' }}>
                                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '700' }}>Interior and Exterior Services</h4>
                                <p>Whether you're looking to revitalize your living room, kitchen, or bedroom, or spruce up the exterior facade of your building, our team is equipped to handle projects of any scale using top-quality paints showing skillfull application.</p>
                            </div>
                            <div className="blog-card" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px' }}>
                                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '700' }}>Wall Texture & Wallpaper</h4>
                                <p>From smooth finishes to intricate textures, our experts can create the desired visual and tactile effects that elevate your space. Additionally, our collection of exquisite wallpapers opens up endless possibilities.</p>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: '700', marginTop: '3rem', marginBottom: '1rem' }}>Our Advantages</h3>
                        <ul className="blog-list" style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { title: "TECHNICAL & ACCURATE ANALYSIS", desc: "Comprehensive site analysis by trained experts." },
                                { title: "FREE ONLINE COLOUR CONSULTATION", desc: "Bespoke and trending digital visuals of your home." },
                                { title: "DEDICATED TEAM", desc: "Unwavering support and expert guidance at every step." },
                                { title: "BEST QUALITY", desc: "Every stroke reflects the highest standards of quality." },
                                { title: "1 YEAR WARRANTY", desc: "Peace of mind with a testament to durability." },
                                { title: "ON-TIME DELIVERY", desc: "We value your time and promise punctuality." },
                                { title: "24/7 ACCESS TO DASHBOARD", desc: "Stay in control with updates and transparency." }
                            ].map((item, index) => (
                                <li key={index} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#f59e0b', fontSize: '1.5rem', marginRight: '1rem', lineHeight: '1' }}>•</span>
                                    <div>
                                        <strong style={{ color: '#0f172a' }}>{item.title}:</strong> {item.desc}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <h3 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: '700', marginTop: '3rem', marginBottom: '1rem' }}>Room-Specific Recommendations</h3>
                        <p style={{ marginBottom: '1rem' }}><strong>Bedroom:</strong> Soft muted colours like blues, greens, or grays for relaxation.</p>
                        <p style={{ marginBottom: '1rem' }}><strong>Living Room:</strong> Warm earthy tones like beige or soft browns for a welcoming vibe.</p>
                        <p style={{ marginBottom: '1rem' }}><strong>Kitchen:</strong> Bright cheerful colours like whites or yellows to energize the space.</p>
                        <p style={{ marginBottom: '1rem' }}><strong>Hallways:</strong> Light neutral colours to make them feel open and airy.</p>
                        <p style={{ marginBottom: '1rem' }}><strong>Kid's Bedroom:</strong> Vibrant colours like cheerful yellows, blues, or pinks.</p>

                        <div
                            style={{
                                marginTop: "5rem",
                                padding: "3.5rem 2.5rem",
                                borderRadius: "28px",
                                textAlign: "center",
                                background: "linear-gradient(135deg, #f97316, #ea580c)",
                                color: "white",
                                boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Decorative paint stroke */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-40%",
                                    left: "-20%",
                                    width: "140%",
                                    height: "140%",
                                    background:
                                        "radial-gradient(circle at top left, rgba(255,255,255,0.25), transparent 60%)",
                                    pointerEvents: "none",
                                }}
                            />

                            <h3
                                style={{
                                    fontSize: "2.4rem",
                                    fontWeight: "800",
                                    marginBottom: "1rem",
                                    letterSpacing: "0.5px",
                                    color: "white",
                                }}
                            >
                                Ready to Transform Your Home?
                            </h3>

                            <p
                                style={{
                                    maxWidth: "520px",
                                    margin: "0 auto 2.5rem",
                                    fontSize: "1.05rem",
                                    lineHeight: "1.6",
                                    opacity: 0.95,
                                }}
                            >
                                Professional painters, premium finishes, and transparent pricing — get
                                your personalized cost estimate today.
                            </p>

                            <a
                                href="/book"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "1rem 2.4rem",
                                    background: "white",
                                    color: "#ea580c",
                                    borderRadius: "50px",
                                    fontWeight: "800",
                                    fontSize: "1rem",
                                    textDecoration: "none",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 14px 35px rgba(0,0,0,0.35)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 10px 30px rgba(0,0,0,0.25)";
                                }}
                            >
                                Book Consultation
                            </a>
                        </div>
                    </article>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogSection;
