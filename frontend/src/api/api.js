import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000', 
    timeout: 1000
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

