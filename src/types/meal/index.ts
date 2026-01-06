import type {Nutrition} from "@/types/nutrition";

export interface CreateMealRequest {
    name: string;
    weight: number;
    nutrition: Nutrition;
    consumedAt?: string;
    storageId?: string;
}

export interface UpdateMealRequest {
    name: string;
    weight: number;
    nutrition: Nutrition;
    consumedAt: string;
    storageId?: string | null;
}

export interface MealResponse {
    id: string;
    name: string;
    weight: number;
    consumedAt: string;
    nutrition: Nutrition;
    storageId: string | null;
}

export interface MealContextTypes {
    mealItems: MealResponse[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateItem: (id: string, data: UpdateMealRequest) => Promise<MealResponse>;
}

export interface MealProviderProps {
    children: React.ReactNode;
}