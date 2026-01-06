import apiClient from "@/api/apiClient.ts";
import type {MealResponse, UpdateMealRequest} from "@/types/meal";

export const getMealItems = async (): Promise<MealResponse> => {
    const response = await apiClient.get('/meals');

    return response.data;
}

export const deleteMealItem = async (id: string): Promise<void> => {
    await apiClient.delete(`/meals/${id}`);
}

export const updateMealItem = async (id: string, data: UpdateMealRequest): Promise<MealResponse> => {
    const response = await apiClient.put(`/meals/${id}`, data);

    return response.data;
}