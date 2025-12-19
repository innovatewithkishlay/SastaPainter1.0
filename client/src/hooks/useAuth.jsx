import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { useLoader } from '../context/LoaderContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showLoader, hideLoader } = useLoader();

    // Initialize auth from token
    const refreshUser = async () => {
        showLoader();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Ideally verify with backend, but for speed we trust token presence + interceptor handling 401s
                // We can decode it if we need user details immediately, but the backend returns user object on login.
                // If page refreshes, we might need to fetch user details again or decode token.
                // Let's try to fetch user details from a new /me endpoint or just decode if we had the library.
                // Since we don't have a /me endpoint yet, let's decode it.
                // We imported jwtDecode in Login.jsx, let's import it here too or just fetch from backend check-auth (which needs update).

                // Actually, let's update check-auth to work with token!
                const res = await api.get('/check-auth');
                if (res.data.data.isAuthenticated && res.data.data.user) {
                    setUser(res.data.data.user);
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            localStorage.removeItem('token');
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
            localStorage.removeItem('token');
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
            localStorage.removeItem('token'); // Force logout on error
            setUser(null);
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
