import React, { useEffect } from 'react';
import './refundPolicy.css';

const RefundPolicy = () => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="refund-page">
            <div className="refund-container">
                <header className="refund-header">
                    <h1>Refund & Cancellation Policy</h1>
                    <p className="refund-subtext">Please read this policy carefully before booking any service.</p>
                </header>

                <div className="refund-content">

                    {/* SECTION 1 */}
                    <section className="refund-section">
                        <h2>1. Overview</h2>
                        <p>
                            At SastaPainter, we strive to ensure that every painting project is completed to your satisfaction.
                            However, we understand that circumstances may change. This Refund & Cancellation Policy outlines the conditions under which you may cancel your booking and the eligibility criteria for refunds.
                        </p>
                        <p>
                            By booking a service with us, you agree to the terms outlined below. Using the site or booking our services constitutes your acceptance of this policy.
                        </p>
                    </section>

                    {/* SECTION 2 */}
                    <section className="refund-section">
                        <h2>2. Cancellation Before Work Commencement</h2>
                        <p>
                            You may cancel your painting service booking at any time prior to the commencement of work. The following cancellation charges may apply:
                        </p>
                        <ul>
                            <li>
                                <strong>More than 48 hours before scheduled start:</strong> No cancellation fee. Full refund of any booking advance paid.
                            </li>
                            <li>
                                <strong>Within 24-48 hours of scheduled start:</strong> A cancellation fee of 10% of the advance payment may be deducted to cover administrative costs.
                            </li>
                            <li>
                                <strong>Less than 24 hours before scheduled start:</strong> A cancellation fee of up to 20% of the advance payment may be applicable as materials and workforce allocation would have already been processed.
                            </li>
                        </ul>
                    </section>

                    {/* SECTION 3 */}
                    <section className="refund-section">
                        <h2>3. Changes in Scope of Service</h2>
                        <p>
                            If you wish to modify the scope of work after the project has started (e.g., reducing the number of rooms to be painted), the final billing will be adjusted accordingly.
                        </p>
                        <p>
                            However, if materials have already been purchased specifically for the cancelled portion of the work, the cost of those materials will be non-refundable and will be charged to the final invoice.
                        </p>
                    </section>

                    {/* SECTION 4 */}
                    <section className="refund-section">
                        <h2>4. Refund Processing Timeline</h2>
                        <p>
                            Once a cancellation request is approved, the refund will be processed within:
                        </p>
                        <ul>
                            <li><strong>7-10 business days</strong> for credit/debit card payments.</li>
                            <li><strong>3-5 business days</strong> for UPI or bank transfers.</li>
                        </ul>
                        <p>
                            The refund will be credited to the original method of payment. If you do not receive the refund within the specified timeline, please contact your bank first, and then reach out to our support team.
                        </p>
                    </section>

                    {/* SECTION 5 */}
                    <section className="refund-section">
                        <h2>5. Contact Information</h2>
                        <p>
                            If you have any questions or confusion regarding our Refund & Cancellation Policy, please reach out to us before making a payment.
                        </p>
                        <p>
                            <strong>SastaPainter Support</strong><br />
                            Email: hello@aapkapainter.clone<br />
                            Phone: +91 98765 43210
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
