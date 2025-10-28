import { createContext, useState, ReactNode } from "react";
import {api, setAccessToken, setRefreshToken } from "@/lib/api";
import type { AuthResponse, LoginRequest } from "../types";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (username: string, password: string) => {
        const response = await api.post<AuthResponse>('api/auth/login', {
            username,
            password
        });

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}