import type { Nutrition } from "../nutrition";

export interface CreateStorageRequest {
    name: string;
    nutritionPer100g: Nutrition;
    totalWeight: number;
    weightPerMeal: number;
    lowStockThreshold: number;
    createdAt?: string;
}

export interface UpdateStorageRequest {
    name: string;
    totalWeight: number;
    nutritionPer100g: Nutrition;
    weightPerMeal: number;
    lowStockThreshold: number;
    createdAt?: string;
}

export interface MealResponse {
    id: string;
    name: string;
    totalWeight: number;
    consumedWeight: number;
    weightPerMeal: number;
    nutritionPer100g: Nutrition;
    lowStockThreshold: number;
    createdAt: string;
    updatedAt: string;

    mealsLeft: number;
    mealsLeftPercentage: number;
    lowStock: boolean;
}

export interface StorageContextTypes {
    storageItems: MealResponse[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateItem: (id: string, data: UpdateStorageRequest) => Promise<MealResponse>;
}

export interface StorageProviderProps {
    children: React.ReactNode;
}