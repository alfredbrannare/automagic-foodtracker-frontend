import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Separator, LoadingContainer, ErrorContainer } from "../../ui";
import {useNutritionContext} from "@/hooks/useNutrition.ts";
import { NutritionItem } from "./NutritionItem";
import {useUserContext} from "@/hooks/useUser.ts";

export const NutritionSection = () => {
    const { nutritionItems, loading: nutritionLoading, error: nutritionError, selectedDate } = useNutritionContext();
    const { userGoals, loading: goalsLoading, error: goalsError } = useUserContext();

    const isLoading = nutritionLoading || goalsLoading;
    const hasError = nutritionError || goalsError;


    return (
        <Card className="bg-elevated-bg max-w-5xl w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-amft-white text-2xl">{selectedDate.toLocaleDateString()}</CardTitle>
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
                        {Object.entries(nutritionItems).map(([key, value]) => (
                            <NutritionItem
                            key={key}
                            label={key}
                            value={value}
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