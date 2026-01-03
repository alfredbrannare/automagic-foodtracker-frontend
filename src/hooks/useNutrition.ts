import {useContext} from "react";
import {NutritionContext} from "@/context/NutritionContext.tsx";

export const useNutritionContext = () => {
    const context = useContext(NutritionContext);

    if (context === null) {
        throw new Error("useNutritionContext must be used within a NutritionProvider");
    }
    return context;
};