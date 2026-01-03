import type {Nutrition} from "@/types/nutrition";
import apiClient from "@/api/apiClient.ts";

export const getDailyNutritionSummary = async (date?: string): Promise<Nutrition> => {
    const params = date ? { date } : {};
    const response = await apiClient.get('/meals/summary', { params });

    return response.data;
};