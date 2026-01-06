import {Card, CardContent, CardHeader, CardTitle, ErrorContainer, LoadingContainer, Separator} from "@/components/ui";
import {StorageItem} from "@/components/feature/storage/StorageItem.tsx";
import {useMealContext} from "@/hooks/useMeal.ts";
import {MealItem} from "@/components/feature/meal/MealItem.tsx";
import {useStorageContext} from "@/hooks/useStorage.ts";

export const MealSection = () => {
    const { mealItems, loading, error, removeItem, updateItem } = useMealContext();

    return (
        <Card className="bg-elevated-bg max-w-5xl w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-amft-white text-2xl">Meals</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="my-2">
                    <Separator/>
                </div>
                {loading ? (
                    <LoadingContainer message="Loading storage items..."/>
                ) : error ? (
                    <ErrorContainer title="Unable to fetch storage items" description={error}/>
                ) : (
                    <>
                        {mealItems.map(item => (
                            <MealItem
                            item={item}
                            onRemove={removeItem}
                            onUpdate={updateItem}
                            />
                        ))}
                    </>
                )}
            </CardContent>
        </Card>
    );

}