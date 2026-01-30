import {Card, CardContent, CardHeader, CardTitle, Separator, LoadingContainer, ErrorContainer } from "../../ui";
import {useNutritionContext} from "@/hooks/useNutrition.ts";
import { NutritionItem } from "./NutritionItem";
import {useUserContext} from "@/hooks/useUser.ts";
import { SkipBack, SkipForward } from 'lucide-react';

const NUTRIENT_KEYS = ['protein', 'carbs', 'fat', 'kcal'] as const;

export const NutritionSection = () => {
    const { nutritionItems, loading: nutritionLoading, error: nutritionError, selectedDate, changeDate } = useNutritionContext();
    const { userGoals, loading: goalsLoading, error: goalsError } = useUserContext();

    const isLoading = nutritionLoading || goalsLoading;
    const hasError = nutritionError || goalsError;

    const isSameDay = (date1: Date, date2: Date) =>
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();

    const isToday = isSameDay(selectedDate, new Date());

    return (
        <Card className="bg-elevated-bg max-w-5xl w-full">
            <CardHeader className="flex flex-row justify-between items-center">
                <button onClick={() => changeDate(-1)} className="hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                    <SkipBack className="text-amft-white"/>
                </button>
                <CardTitle className="text-amft-white text-2xl">{selectedDate.toLocaleDateString()}</CardTitle>
                <button onClick={() => changeDate(1)} className={`${isToday ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer transition-transform duration-300 hover:scale-110'}`} disabled={isToday}>
                    <SkipForward className={`text-amft-white ${isToday ? 'opacity-20' : ''}`} />
                </button>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div>
                    <Separator/>
                </div>
                {isLoading ? (
                    <LoadingContainer message="Loading storage items..."/>
                ) : hasError ? (
                    <ErrorContainer
                        title="Unable to fetch data"
                        description={nutritionError || goalsError || "Unknown error"}
                    />
                ) : nutritionItems && userGoals ? (
                    <div className="flex flex-col justify-between my-2">
                        {NUTRIENT_KEYS.map((key) => (
                            <NutritionItem
                            key={key}
                            label={key}
                            value={nutritionItems[key] ?? 0}
                            goal={userGoals}
                            />
                        ))}
                    </div>
                )
                    : (
                        <p>No nutrition data available</p>
                    )}
            </CardContent>
        </Card>
    )
}