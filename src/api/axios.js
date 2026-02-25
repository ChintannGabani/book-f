import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

// Add a request interceptor to include the JWT token in all requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle token expiration
API.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default API;
