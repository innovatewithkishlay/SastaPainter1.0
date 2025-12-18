import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { useLoader } from '../context/LoaderContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showLoader, hideLoader } = useLoader();

    // Fetch user session on mount
    const refreshUser = async () => {
        showLoader();
        try {
            const res = await api.get('/check-auth', { triggerLoader: true });
            if (res.data.isAuthenticated && res.data.user) {
                setUser(res.data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            setUser(null);
        } finally {
            setLoading(false);
            hideLoader();
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    // Logout function
    const logout = async () => {
        try {
            await api.get('/logout');
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, refreshUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to consume Auth Context
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
