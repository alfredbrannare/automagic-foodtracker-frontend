import {NavigationBar} from "../components/layout/NavigationBar"
import {StorageSection} from "../components/feature/index";
import {StorageProvider} from "../context/StorageContext";
import {NutritionProvider} from "@/context/NutritionContext.tsx";
import {NutritionSection} from "@/components/feature/nutrition/NutritionSection.tsx";
import {UserProvider} from "@/context/UserContext.tsx";
import {MealProvider} from "@/context/MealContext.tsx";
import {MealSection} from "@/components/feature/meal/MealSection.tsx";

export const Dashboard = () => {
    return (
        <UserProvider>
            <StorageProvider>
                <MealProvider>
                    <NutritionProvider>
                        <main className="min-h-screen m-2">
                            <NavigationBar/>
                            <div className="flex flex-col items-center gap-4">
                                <StorageSection/>
                                <NutritionSection/>
                                <MealSection/>
                            </div>
                        </main>
                    </NutritionProvider>
                </MealProvider>
            </StorageProvider>
        </UserProvider>
    );
}