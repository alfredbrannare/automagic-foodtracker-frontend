export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    return response.json() as Promise<AuthResponse>;
}

export async function register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    return response.json() as Promise<AuthResponse>;
}

export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    return response.json() as Promise<AuthResponse>;
}