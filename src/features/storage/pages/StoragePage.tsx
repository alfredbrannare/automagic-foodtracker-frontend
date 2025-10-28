import React from "react";

interface StorageItem {
    id: string;
    name: string;
    totalWeight: number;
    consumedWeight: number;
    weightPerMeal: number;
    lowStock: boolean;
}

export const StoragePage: React.FC = () => {
    return (
        <div>Storage Page</div>
    );
};
