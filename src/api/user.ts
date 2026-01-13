import type {UpdateUserGoalsRequest, UserGoalsResponse} from "@/types/user";
import apiClient from "@/api/apiClient.ts";

export const getUserGoals = async (): Promise<UserGoalsResponse> => {
    const response = await apiClient.get('/me/goals');
    return response.data;
}

export const updateUserGoals = async (data: UpdateUserGoalsRequest): Promise<UserGoalsResponse> => {
    const response = await apiClient.put('/me/goals', data);
    return response.data;
}

export const deleteUser = async (): Promise<void> => {
    await apiClient.delete('/me');
}