import React, { useEffect } from 'react';
import './termsAndConditions.css';

const TermsAndConditions = () => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="terms-page">
            <div className="terms-container">
                <header className="terms-header">
                    <h1>Terms & Conditions</h1>
                    <p className="terms-last-updated">Last updated: 2025</p>
                </header>

                <div className="terms-content">

                    {/* SECTION 1 */}
                    <section className="terms-section">
                        <h2>1. Overview</h2>
                        <p>
                            This website is operated by SastaPainter. Throughout the site, the terms “we”, “us” and “our” refer to SastaPainter.
                            SastaPainter offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
                        </p>
                        <p>
                            By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”).
                            These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
                        </p>
                    </section>

                    {/* SECTION 2 */}
                    <section className="terms-section">
                        <h2>2. General Conditions</h2>
                        <p>
                            We reserve the right to refuse service to anyone for any reason at any time.
                            You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
                            Credit card information is always encrypted during transfer over networks.
                        </p>
                        <p>
                            You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                        </p>
                    </section>

                    {/* SECTION 3 */}
                    <section className="terms-section">
                        <h2>3. Modifications to Services and Prices</h2>
                        <p>
                            Prices for our services are subject to change without notice.
                            We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                        </p>
                        <p>
                            We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
                        </p>
                    </section>

                    {/* SECTION 4 */}
                    <section className="terms-section">
                        <h2>4. Third-Party Links</h2>
                        <p>
                            Certain content, products, and services available via our Service may include materials from third-parties.
                            Third-party links on this site may direct you to third-party websites that are not affiliated with us.
                            We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.
                        </p>
                    </section>

                    {/* SECTION 5 */}
                    <section className="terms-section">
                        <h2>5. Personal Information</h2>
                        <p>
                            Your submission of personal information through the store is governed by our Privacy Policy.
                            Please review our Privacy Policy to understand our practices.
                        </p>
                    </section>

                    {/* SECTION 6 */}
                    <section className="terms-section">
                        <h2>6. Errors and Omissions</h2>
                        <p>
                            Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies, or omissions that may relate to product descriptions, pricing, promotions, offers, and availability.
                            We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice.
                        </p>
                    </section>

                    {/* SECTION 7 */}
                    <section className="terms-section">
                        <h2>7. Prohibited Uses</h2>
                        <p>
                            In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
                        </p>
                        <ul>
                            <li>(a) for any unlawful purpose;</li>
                            <li>(b) to solicit others to perform or participate in any unlawful acts;</li>
                            <li>(c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
                            <li>(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
                            <li>(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
                            <li>(f) to submit false or misleading information;</li>
                            <li>(g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service.</li>
                        </ul>
                    </section>

                    {/* SECTION 8 */}
                    <section className="terms-section">
                        <h2>8. Severability</h2>
                        <p>
                            In the event that any provision of these Terms of Service is determined to be unlawful, void, or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
                        </p>
                    </section>

                    {/* SECTION 9 */}
                    <section className="terms-section">
                        <h2>9. Termination</h2>
                        <p>
                            The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
                            These Terms of Service are effective unless and until terminated by either you or us.
                            You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
                        </p>
                    </section>

                    {/* SECTION 10 */}
                    <section className="terms-section">
                        <h2>10. Entire Agreement</h2>
                        <p>
                            The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
                            These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and governs your use of the Service.
                        </p>
                    </section>

                    {/* SECTION 11 */}
                    <section className="terms-section">
                        <h2>11. Governing Law</h2>
                        <p>
                            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India, specifically within the jurisdiction of Delhi & NCR courts.
                        </p>
                    </section>

                    {/* SECTION 12 */}
                    <section className="terms-section">
                        <h2>12. Contact Information</h2>
                        <p>
                            Questions about the Terms of Service should be sent to us at hello@aapkapainter.clone.
                        </p>
                        <p>
                            <strong>AapkaPainter</strong><br />
                            Delhi & Noida, India<br />
                            +91 98765 43210
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
