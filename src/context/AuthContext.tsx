import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClient from "../api/apiClient";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = () => {};
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
                setIsAuthenticated(true);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const contextValue: AuthContextType = {
        isAuthenticated,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );

}