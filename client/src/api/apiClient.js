import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add JWT token to requests and mark start time
apiClient.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Use platform performance API to mark start
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            config.metadata = {
                startTime: performance.now(),
                timeOrigin: performance.timeOrigin ?? 0,
            };
        }
    } catch (err) {
        // Don't throw here — log and continue so app load isn't blocked
        // eslint-disable-next-line no-console
        console.error('apiClient request interceptor error:', err);
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to compute duration
apiClient.interceptors.response.use((response) => {
    try {
        if (response && response.config && response.config.metadata && typeof performance !== 'undefined' && typeof performance.now === 'function') {
            const duration = performance.now() - response.config.metadata.startTime;
            // simple console timing output — remove or replace with logger as needed
            // eslint-disable-next-line no-console
            console.info(`[api] ${response.config.method?.toUpperCase()} ${response.config.url} - ${Math.round(duration)} ms`);
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('apiClient response interceptor error:', err);
    }

    return response;
}, (error) => {
    try {
        if (error && error.config && error.config.metadata && typeof performance !== 'undefined' && typeof performance.now === 'function') {
            const duration = performance.now() - error.config.metadata.startTime;
            // eslint-disable-next-line no-console
            console.info(`[api] ${error.config.method?.toUpperCase()} ${error.config.url} - ${Math.round(duration)} ms (error)`);
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('apiClient response error handler failed:', err);
    }
    return Promise.reject(error);
});

// Simple convenience functions expected by some pages
const getTrainings = () => apiClient.get('/trainings');
const getUsers = () => apiClient.get('/users');

export { apiClient, getTrainings, getUsers };
export default apiClient;