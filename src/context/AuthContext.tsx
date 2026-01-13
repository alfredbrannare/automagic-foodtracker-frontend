import {createContext, useState, useEffect} from "react";
import apiClient from "../api/apiClient";
import type {AuthContextType, AuthProviderProps, LoginRequest, RegisterRequest} from "@/types/auth";
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
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred")
            }
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }

    };

    const register = async (data: RegisterRequest) => {
        try {
            setIsLoading(true);
            setError(null);

            await apiClient.post("/auth/register", data);
            setIsAuthenticated(true);
        } catch (err: any) {
            const responseData = err.response?.data;

            if (responseData?.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
                setError(responseData.errors[0].message);
            } else if (responseData?.error) {
                setError(responseData.error);
            } else {
                setError(err instanceof Error ? err.message : "An unexpected error occurred")
            }
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }

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
        register: register,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );

}