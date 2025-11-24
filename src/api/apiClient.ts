import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then(() => {
                    return apiClient(originalRequest);
                }).catch((error) => {
                    return Promise.reject(error);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await apiClient.post('auth/refresh');

                processQueue(null);
                isRefreshing = false;

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;

                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        if (status === 403) {
            console.log('Forbidden');
        }

        return Promise.reject(error);
    }
)

export default apiClient;