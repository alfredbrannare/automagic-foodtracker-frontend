import type {CookingHistoryResponse} from "@/types/cooking_history";
import apiClient from "@/api/apiClient.ts";

export const getCookingHistoryItems = async (): Promise<CookingHistoryResponse[]> => {
    const response = await apiClient.get('/cooking_history');
    return response.data;
}

export const deleteCookingHistoryItem = async (id: string): Promise<void> => {
    await apiClient.delete(`/cooking_history/${id}`);
}