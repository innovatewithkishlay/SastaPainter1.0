import React from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../api';

const GoogleOneTap = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useGoogleOneTapLogin({
        onSuccess: async (credentialResponse) => {
            try {
                // Send token to backend
                const res = await api.post('/auth/google', {
                    token: credentialResponse.credential
                });

                if (res.data.success) {
                    // Store Token
                    localStorage.setItem('token', res.data.data.token);

                    // Update App State
                    setUser(res.data.data.user);

                    // Optional: Show a success toast or just let the UI update
                    console.log('Google One Tap Login Successful');
                }
            } catch (err) {
                console.error("Google One Tap Login Error:", err);
            }
        },
        onError: () => {
            console.log('Google One Tap Login Failed');
        },
        // Disable if user is already logged in
        disabled: !!user || location.pathname === '/login' || location.pathname === '/signup',
        use_fedcm_for_prompt: true, // 🟢 Fix for FedCM warning
    });

    return null; // This component renders nothing, it just triggers the popup
};

export default GoogleOneTap;
