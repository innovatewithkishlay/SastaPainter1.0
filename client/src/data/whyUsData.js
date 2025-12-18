/**
 * Why Us Page Data
 * 
 * Edit text, images, and icons for the 'Why Us' page here.
 * Images should be in /public/images/.
 * Icons: Use React Icons (imported in component) or image paths.
 */

// HERO SECTION
export const heroData = {
    accent: "Why SastaPainter",
    title: "Professional Painters, Trusted Brands, Exceptional Results",
    subtitle: "We transform homes with precision, quality, and unmatched service excellence. From expert consultation to post-service support, our process ensures your project is smooth, worry-free, and beautifully executed.",
    image: "/images/whychooseus.webp" // Using existing best fit; replace if 'hero1.webp' added later
};

// CORE VALUES (4 Cards)
export const valuesData = [
    {
        id: 1,
        title: "On-Time Completion",
        text: "Our disciplined planning ensures timely delivery without compromising quality.",
        iconType: "clock" // Mapped to icon component in WhyUsPage.jsx
    },
    {
        id: 2,
        title: "Hygienic & Safe Painting",
        text: "From mask protocols to clean workspaces, our painters follow strict hygiene standards.",
        iconType: "hygiene"
    },
    {
        id: 3,
        title: "Premium & Long-Lasting Finish",
        text: "We use trusted branded paints and expert surface preparation for flawless results.",
        iconType: "premium"
    },
    {
        id: 4,
        title: "Trained & Background-Verified Painters",
        text: "Every professional we send is verified, skilled, and trained for top-quality workmanship.",
        iconType: "verified"
    }
];

// TIMELINE / PROCESS
export const timelineData = [
    { step: 1, title: "Free Site Inspection & Quotation" },
    { step: 2, title: "Customized Color Consultation" },
    { step: 3, title: "Expert Painting Execution" },
    { step: 4, title: "Quality Check & Final Handover" },
    { step: 5, title: "Post-Completion Support" }
];

export const timelineImages = {
    desktop: "/images/howitworksdesk.webp",
    mobile: "/images/homemob2.webp" // Fallback mobile image
};

// CTA SECTION
export const ctaData = {
    heading: "Ready To Transform Your Home?",
    subtext: "Book a site visit today and let our experts help you choose the perfect colors and finishes.",
    buttonText: "Book Site Visit",
    buttonLink: "/book"
};
