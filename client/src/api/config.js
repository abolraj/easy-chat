import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy to Laravel API
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Add CSRF token for non-GET requests
api.interceptors.request.use(config => {
    if (config.method !== 'get') {
        config.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;
    }
    return config;
});

export default api;