import { createContext, useState, useEffect } from "react";
import type {
    StorageContextTypes,
    StorageProviderProps,
    UpdateStorageRequest,
    CreateStorageRequest, StorageResponse
} from "@/types/storage";
import {getStorageItems, updateStorageItem, deleteStorageItem, createStorageItem} from "../api/storage";

export const StorageContext = createContext<StorageContextTypes | null>(null);

export const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {
    const [storageItems, setStorageItems] = useState<StorageResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const createItem = async (data: CreateStorageRequest): Promise<StorageResponse> => {
        try {
            setLoading(true);
            setError(null);

            const response = await createStorageItem(data);
            setStorageItems(prev => [...prev, response]);
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

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getStorageItems();

            if (Array.isArray(data)) {
                const sorted = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                setStorageItems(sorted);
            } else {
                setStorageItems([]);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (id: string) => {
        try {
            await deleteStorageItem(id);

            setStorageItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            setError("Failed to remove item");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const updateItem = async (id: string, data: UpdateStorageRequest) => {
        try {
            const updatedItem = await updateStorageItem(id, data);

            setStorageItems(prev => prev.map(item => item.id === id ? updatedItem : item));

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

    const value: StorageContextTypes = {
        storageItems,
        loading,
        error,
        createItem,
        refetch: fetchItems,
        removeItem,
        updateItem
    }

    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    )

}