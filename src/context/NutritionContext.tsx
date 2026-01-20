import {createContext, useEffect, useState} from "react";
import type {Nutrition, NutritionContextTypes, NutritionProviderProps} from "@/types/nutrition";
import {getDailyNutritionSummary} from "@/api/nutrition.ts";

export const NutritionContext = createContext<NutritionContextTypes | null>(null);

export const NutritionProvider: React.FC<NutritionProviderProps> = ({ children }) => {
    const [nutritionItems, setNutritionItems] = useState<Nutrition | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const fetchItems = async (date?: Date) => {
        try {
            setLoading(true);
            setError(null);

            const dateString: string | undefined = date ? date.toISOString().split("T")[0] : undefined;
            const data = await getDailyNutritionSummary(dateString);

            if (data === null) {
                setNutritionItems({
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    kcal: 0,
                })
            }

            setNutritionItems(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems(selectedDate);
    }, [selectedDate]);

    const changeDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    }

    const value: NutritionContextTypes = {
        nutritionItems,
        loading,
        error,
        selectedDate,
        changeDate,
        refetch: fetchItems
    }

    return (
        <NutritionContext.Provider value={value}>
            {children}
        </NutritionContext.Provider>
    )
}