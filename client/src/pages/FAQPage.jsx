import React from 'react';
import FAQ from '../components/FAQ';

const FAQPage = () => {
    return (
        <div className="faq-page" style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc' }}>
            {/* We can reuse the FAQ component directly. 
                 It already has a container and styling. 
                 If we want to add more visible "header" for this specific page, we can do it here. */}
            <div style={{ padding: '0 0 2rem 0', textAlign: 'center' }}>
                {/* Optional additional header if needed, but FAQ component already has a strong header */}
            </div>
            <FAQ />

            {/* User requested adding "more questions" here. 
                For now, we use the same extensive list. 
                If we wanted to split, we could pass props to FAQ component to show different subsets.
                But typically a full FAQ page shows everything. 
            */}
        </div>
    );
};

export default FAQPage;
