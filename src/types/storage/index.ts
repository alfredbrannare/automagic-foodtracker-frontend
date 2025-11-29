export interface Nutrition {
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
}

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

export interface StorageResponse {
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
    storageItems: StorageResponse[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateItem: (id: string, data: UpdateStorageRequest) => Promise<StorageResponse>;
}

export interface StorageProviderProps {
    children: React.ReactNode;
}