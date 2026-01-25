import type {Nutrition} from "@/types/nutrition";

export interface CookingHistoryResponse {
    id: string;
    name: string;
    totalWeight: number;
    weightPerMeal: number;
    nutritionPer100g: Nutrition;
    lowStockThreshold: number;
    createdAt: string;
}

export interface CookingHistoryContextTypes {
    cookingHistoryItems: CookingHistoryResponse[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    removeItem: (id: string) => Promise<void>;
}

export interface CookingHistoryProviderProps {
    children: React.ReactNode;
}