import { useState, useEffect } from 'react';
import { getStorageItems } from '../api/storage';
import type { StorageResponse } from '../types/storage/index';

export const useStorage = () => {
    const [storageItems, setStorageItems] = useState<StorageResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStorageItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getStorageItems();
            setStorageItems(data);
        } catch (error) {
            setError("Failed to fetch storage items");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStorageItems();
    }, []);

    return {
        storageItems,
        loading,
        error,
        refetch: fetchStorageItems
    };
};

