import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import AiChatWidget from './AiChatWidget';

const Layout = ({ children, user }) => {
    return (
        <>
            <Navbar user={user} />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.main>
            <Footer />
            <AiChatWidget />
        </>
    );
};

export default Layout;
