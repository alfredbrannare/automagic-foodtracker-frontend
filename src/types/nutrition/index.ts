
export interface NutritionContextTypes {
    nutritionItems: Nutrition | null;
    loading: boolean;
    error: string | null;
    selectedDate: Date;
    changeDate: (days: number) => void;
    refetch: () => Promise<void>;
}

export interface NutritionProviderProps {
    children: React.ReactNode;
}

export interface Nutrition {
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
}