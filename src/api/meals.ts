import apiClient from "@/api/apiClient.ts";
import type {MealResponse, UpdateMealRequest} from "@/types/meal";

export const getMealItems = async (date?: string): Promise<MealResponse[]> => {
    const params = date ? { date } : {};
    const response = await apiClient.get('/meals', { params });

    return response.data;
}

export const deleteMealItem = async (id: string): Promise<void> => {
    await apiClient.delete(`/meals/${id}`);
}

export const updateMealItem = async (id: string, data: UpdateMealRequest): Promise<MealResponse> => {
    const response = await apiClient.put(`/meals/${id}`, data);

    return response.data;
}