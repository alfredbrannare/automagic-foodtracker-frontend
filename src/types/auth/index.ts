export interface LoginRequest {
    username: string;
    password: string;
}

export interface MessageResponse {
    message: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
    error: string | null;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}