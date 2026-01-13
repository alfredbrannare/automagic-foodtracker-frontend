export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface MessageResponse {
    message: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    removeUser: () => Promise<void>;
    error: string | null;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}