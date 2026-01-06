import {useContext} from "react";
import {MealContext} from "@/context/MealContext.tsx";

export const useMealContext = () => {
    const context = useContext(MealContext);

    if (context === null) {
        throw new Error("useMealContext must be used within a MealProvider");
    }

    return context;
};