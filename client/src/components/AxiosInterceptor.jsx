import { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import api from '../api';

const AxiosInterceptor = () => {
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        // Request Interceptor
        const reqInterceptor = api.interceptors.request.use(
            (config) => {
                // Only show loader for non-GET requests (POST, PUT, DELETE) 
                // OR if explicitly requested via triggerLoader: true
                if (config.method !== 'get' || config.triggerLoader) {
                    showLoader();
                }
                return config;
            },
            (error) => {
                hideLoader();
                return Promise.reject(error);
            }
        );

        // Response Interceptor
        const resInterceptor = api.interceptors.response.use(
            (response) => {
                if (response.config.method !== 'get' || response.config.triggerLoader) {
                    hideLoader();
                }
                return response;
            },
            (error) => {
                if (error.config && (error.config.method !== 'get' || error.config.triggerLoader)) {
                    hideLoader();
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            api.interceptors.request.eject(reqInterceptor);
            api.interceptors.response.eject(resInterceptor);
        };
    }, [showLoader, hideLoader]);

    return null;
};

export default AxiosInterceptor;
