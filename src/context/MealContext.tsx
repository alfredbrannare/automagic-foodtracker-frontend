import {createContext, useCallback, useEffect, useState} from "react";
import type {
    CreateMealRequest,
    MealContextTypes,
    MealProviderProps,
    MealResponse,
    UpdateMealRequest
} from "@/types/meal";
import {createMealItem, deleteMealItem, getMealItems, updateMealItem} from "@/api/meals.ts";

export const MealContext = createContext<MealContextTypes | null>(null);

export const MealProvider: React.FC<MealProviderProps> = ({ children }) => {
    const [mealItems, setMealItems] = useState<MealResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createItem = async (data: CreateMealRequest): Promise<MealResponse> => {
        try {
            setLoading(true);
            setError(null);

            const response = await createMealItem(data);
            setMealItems(prev => [...prev, response]);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const fetchItems = useCallback(async (date?: Date) => {
        try {
            setLoading(true);
            setError(null);

            const dateString = date ? date.toISOString().split("T")[0] : undefined;

            const data = await getMealItems(dateString);

            setMealItems(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const removeItem = async (id: string) => {
        try {
            await deleteMealItem(id);

            setMealItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            setError("Failed to remove item");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const updateItem = async (id: string, data: UpdateMealRequest): Promise<MealResponse> => {
        try {
            const updatedItem = await updateMealItem(id, data);

            setMealItems(prev => prev.map(item => item.id === id ? updatedItem : item));

            return updatedItem;
        } catch (error) {
            setError("Failed to update item");
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const value: MealContextTypes = {
        mealItems,
        loading,
        error,
        createItem,
        refetch: fetchItems,
        removeItem,
        updateItem
    }

    return (
        <MealContext.Provider value={value}>
            {children}
        </MealContext.Provider>
    )

}