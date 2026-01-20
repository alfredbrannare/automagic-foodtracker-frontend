import apiClient from "@/api/apiClient.ts";
import type {LoginRequest, RegisterRequest} from "@/types/auth";

export const logoutUser = async () => {
    await apiClient.post('/auth/logout');
}

export const deleteUser = async (): Promise<void> => {
    await apiClient.delete('/me');
}