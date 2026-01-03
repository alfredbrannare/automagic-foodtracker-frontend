import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Separator, LoadingContainer, ErrorContainer } from "../../ui";
import {useNutritionContext} from "@/hooks/useNutrition.ts";

export const NutritionSection = () => {
    const { nutritionItems, loading, error } = useNutritionContext();

    return (
        <Card className="bg-elevated-bg max-w-5xl w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-amft-white text-2xl">Nutrition</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="my-4">
                    <Separator/>
                </div>
                {loading ? (
                    <LoadingContainer message="Loading storage items..."/>
                ) : error ? (
                    <ErrorContainer title="Unable to fetch storage items" description={error}/>
                ) : (
                    <>
                        <h1>Hello</h1>
                    </>
                )}
            </CardContent>
        </Card>
    )
}