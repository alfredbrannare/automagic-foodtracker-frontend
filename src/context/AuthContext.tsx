import {createContext, useState, useEffect} from "react";
import apiClient from "../api/apiClient";
import type {AuthContextType, AuthProviderProps, LoginRequest} from "@/types/auth";
import {loginUser} from "@/api/auth.ts";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginRequest) => {
        try {
            setIsLoading(true);
            setError(null);

            await loginUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to login";
            setError(message);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }

    };
    const logout = () => {
        setIsAuthenticated(false);
        window.location.href = "/";
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await apiClient.get("/storage");
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const contextValue: AuthContextType = {
        isAuthenticated,
        isLoading,
        error,
        login: login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );

}