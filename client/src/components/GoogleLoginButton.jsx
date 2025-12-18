import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth';

const GoogleLoginButton = ({ text = "Continue with Google" }) => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const accessToken = tokenResponse.access_token;
                const res = await api.post('/auth/google', { token: accessToken, type: 'access_token' });

                if (res.data.success) {
                    setUser(res.data.user);
                    navigate('/');
                }
            } catch (err) {
                console.error('Google Login Error:', err);
                // Handle error (toast or alert)
            }
        },
        onError: () => console.log('Google Login Failed'),
    });

    return (
        <motion.button
            onClick={() => handleGoogleLogin()}
            className="btn-google"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                color: '#334155',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                marginBottom: '1rem',
                gap: '0.75rem' // Space between logo and text
            }}
        >
            <FcGoogle size={24} />
            {text}
        </motion.button>
    );
};

export default GoogleLoginButton;
