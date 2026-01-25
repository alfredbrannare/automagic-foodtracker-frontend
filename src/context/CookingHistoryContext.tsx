import {createContext, useEffect, useState} from "react";
import type {
    CookingHistoryContextTypes,
    CookingHistoryProviderProps,
    CookingHistoryResponse
} from "@/types/cooking_history";
import {deleteCookingHistoryItem, getCookingHistoryItems} from "@/api/cooking_history.ts";

export const CookingHistoryContext = createContext<CookingHistoryContextTypes | null>(null);

export const CookingHistoryProvider: React.FC<CookingHistoryProviderProps> = ({children}) => {
    const [cookingHistoryItems, setCookingHistoryItems] = useState<CookingHistoryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCookingHistoryItems();

            if (Array.isArray(data)) {
                const sorted = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                setCookingHistoryItems(sorted);
            } else {
                setCookingHistoryItems([]);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const removeItem = async (id: string) => {
        try {
            await deleteCookingHistoryItem(id);

            setCookingHistoryItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            setError("Failed to remove item");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const value: CookingHistoryContextTypes = {
        cookingHistoryItems,
        loading,
        error,
        refetch: fetchItems,
        removeItem
    }

    return (
        <CookingHistoryContext.Provider value={value}>
            {children}
        </CookingHistoryContext.Provider>
    )

}