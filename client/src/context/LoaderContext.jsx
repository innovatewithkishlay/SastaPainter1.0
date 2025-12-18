import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Counter to handle multiple concurrent requests
    // (e.g. if 2 API calls start, we only stop loading when BOTH finish)
    const [loadingCount, setLoadingCount] = useState(0);

    const showLoader = useCallback(() => {
        setLoadingCount(prev => prev + 1);
    }, []);

    const hideLoader = useCallback(() => {
        setLoadingCount(prev => Math.max(0, prev - 1));
    }, []);

    useEffect(() => {
        setIsLoading(loadingCount > 0);
    }, [loadingCount]);

    return (
        <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};
