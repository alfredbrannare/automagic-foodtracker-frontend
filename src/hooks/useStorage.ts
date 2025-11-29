import { useContext } from "react";
import { StorageContext } from "../context/StorageContext";

export const useStorageContext = () => {
    const context = useContext(StorageContext);

    if (context === null) {
        throw new Error("useStorageContext must be used within a StorageProvider");
    }

    return context;
};
