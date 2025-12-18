import React, { useEffect } from 'react';
import './privacyPolicy.css';

const PrivacyPolicy = () => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <div className="privacy-container">
                <header className="privacy-header">
                    <h1>Privacy Policy</h1>
                    <p className="privacy-date">Effective date: 01 January 2016</p>
                </header>

                <div className="privacy-content">

                    {/* SECTION 1 */}
                    <section className="privacy-section">
                        <h2>1. Overview</h2>
                        <p>
                            SastaPainter ("us", "we", or "our") operates the website and provides painting and waterproofing services.
                            This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                        </p>
                        <p>
                            We value your trust and recognise the importance of secure transactions and information privacy.
                            By using the Service, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </section>

                    {/* SECTION 2 */}
                    <section className="privacy-section">
                        <h2>2. Information We Collect</h2>
                        <p>
                            We collect several different types of information for various purposes to provide and improve our Service to you:
                        </p>
                        <ul>
                            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Name, Email address, Phone number, Address, City.</li>
                            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and other diagnostic data.</li>
                        </ul>
                    </section>

                    {/* SECTION 3 */}
                    <section className="privacy-section">
                        <h2>3. How We Use Your Information</h2>
                        <p>
                            SastaPainter uses the collected data for various purposes:
                        </p>
                        <ul>
                            <li>To provide and maintain the Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                            <li>To provide customer care and support</li>
                            <li>To provide analysis or valuable information so that we can improve the Service</li>
                            <li>To monitor the usage of the Service</li>
                            <li>To detect, prevent and address technical issues</li>
                        </ul>
                    </section>

                    {/* SECTION 4 */}
                    <section className="privacy-section">
                        <h2>4. Data Security</h2>
                        <p>
                            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                            While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    {/* SECTION 5 */}
                    <section className="privacy-section">
                        <h2>5. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                            Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
                        </p>
                        <p>
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                        </p>
                    </section>

                    {/* SECTION 6 */}
                    <section className="privacy-section">
                        <h2>6. Links to Other Websites</h2>
                        <p>
                            Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site.
                            We strongly advise you to review the Privacy Policy of every site you visit.
                        </p>
                        <p>
                            We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
                        </p>
                    </section>

                    {/* SECTION 7 */}
                    <section className="privacy-section">
                        <h2>7. Sharing of Personal Information</h2>
                        <p>
                            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice.
                            This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                        </p>
                    </section>

                    {/* SECTION 8 */}
                    <section className="privacy-section">
                        <h2>8. Updating Your Information</h2>
                        <p>
                            If you would like to review, correct, update, or delete any personal information we have about you, you may do so by logging into your account or by contacting us directly.
                        </p>
                    </section>

                    {/* SECTION 9 */}
                    <section className="privacy-section">
                        <h2>9. Contact Information</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <p>
                            <strong>AapkaPainter</strong><br />
                            Email: hello@aapkapainter.clone<br />
                            Phone: +91 98765 43210
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
