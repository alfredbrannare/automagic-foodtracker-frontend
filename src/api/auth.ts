import apiClient from "@/api/apiClient.ts";

export const logoutUser = async () => {
    await apiClient.post('/auth/logout');
}

export const deleteUser = async (): Promise<void> => {
    await apiClient.delete('/me');
}