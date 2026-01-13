import apiClient from "@/api/apiClient.ts";
import type {LoginRequest} from "@/types/auth";

export const loginUser = async (data: LoginRequest) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
};