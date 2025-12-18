import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServiceCards from '../components/ServiceCards';
import HowItWorks from '../components/HowItWorks';
import WhyChooseConsultation from '../components/WhyChooseConsultation';
import ServicesSection from '../components/ServicesSection';
import BookingForm from '../components/BookingForm';
import FAQ from '../components/FAQ';
import api from '../api';
import BrandsGrid from '../components/BrandsGrid';
import BlogSection from '../components/BlogSection';
import TestimonialsSection from '../components/TestimonialsSection';

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/');
                if (res.data.success) {
                    setServices(res.data.services);
                }
            } catch (err) {
                console.error('Failed to fetch services', err);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="home-page">
            <HeroSection />
            <ServiceCards />
            <HowItWorks />
            <WhyChooseConsultation />
            <ServicesSection services={services} />
            <BrandsGrid />
            <BookingForm />
            <TestimonialsSection />
            <FAQ />
            <BlogSection />
        </div>
    );
};

export default Home;
