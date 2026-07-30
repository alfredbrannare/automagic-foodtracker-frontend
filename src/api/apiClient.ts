import axios from 'axios';
import {isDemoMode} from '@/demo/demoMode';
import {demoAdapter} from '@/demo/demoAdapter';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    ...(isDemoMode() ? {adapter: demoAdapter} : {})
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default apiClient;