import apiClient from "@/api/apiClient.ts";
import type {LoginRequest, RegisterRequest} from "@/types/auth";

export const loginUser = async (data: LoginRequest) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
};

export const registerUser = async (data: RegisterRequest) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
}

export const logoutUser = async () => {
    await apiClient.post('/auth/logout');
}