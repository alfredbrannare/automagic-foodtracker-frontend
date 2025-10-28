import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let accessToken = string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
}

export const getAccessToken = () => accessToken;

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setRefreshToken = (token: string) => {
    if (token) {
        localStorage.setItem('refreshToken', token);
    } else {
        localStorage.removeItem('refreshToken');
    }
}

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/api/auth/')
        ) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(`${BASE_URL}/api/auth/refresh`, {
                    refreshToken: refreshToken,
                });

                setAccessToken(response.data.accessToken);
                setRefreshToken(response.data.refreshToken);

                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                setAccessToken(null);
                setRefreshToken(null);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);