import {createContext, useState, useEffect} from "react";
import apiClient from "../api/apiClient";
import type {AuthContextType, AuthProviderProps} from "@/types/auth";
import {deleteUser, } from "@/api/auth.ts";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const logout = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await apiClient.post("/auth/logout");
            setIsAuthenticated(false);
            window.location.href = "/";
        } catch (error) {
            setError("Failed to logout");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const removeUser = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await deleteUser();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error("Failed to delete user:", error);
            throw error;
        } finally {
            setIsAuthenticated(false)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await apiClient.get("/auth/check");
                setIsAuthenticated(true);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    setIsAuthenticated(false);
                }
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
        logout,
        removeUser: removeUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );

}