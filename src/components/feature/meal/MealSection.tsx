import {Card, CardContent, CardHeader, CardTitle, ErrorContainer, LoadingContainer, Separator} from "@/components/ui";
import {useMealContext} from "@/hooks/useMeal.ts";
import {MealItem} from "@/components/feature/meal/MealItem.tsx";
import {useNutritionContext} from "@/hooks/useNutrition.ts";
import {useEffect} from "react";
import {SkipBack, SkipForward} from 'lucide-react';

export const MealSection = () => {
    const {mealItems, loading, error, removeItem, updateItem, refetch} = useMealContext();
    const {selectedDate, changeDate} = useNutritionContext();

    useEffect(() => {
        void refetch(selectedDate);
    }, [selectedDate, refetch]);

    const isSameDay = (date1: Date, date2: Date) =>
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();

    const isToday = isSameDay(selectedDate, new Date());

    return (
        <Card className="bg-elevated-bg max-w-5xl w-full">
            <CardHeader className="flex flex-row justify-between items-center">
                <button onClick={() => changeDate(-1)}
                        className="hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                    <SkipBack className="text-amft-white"/>
                </button>
                <CardTitle className="text-amft-white text-2xl">Meals</CardTitle>
                <button onClick={() => changeDate(1)}
                        className={`${isToday ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer transition-transform duration-300 hover:scale-110'}`}
                        disabled={isToday}>
                    <SkipForward className={`text-amft-white ${isToday ? 'opacity-20' : ''}`}/>
                </button>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="my-2">
                    <Separator/>
                </div>
                {loading ? (
                    <LoadingContainer message="Loading storage items..."/>
                ) : error ? (
                    <ErrorContainer title="Unable to fetch storage items" description={error}/>
                ) : mealItems.length === 0 ? (
                    <span className="text-center">
                        You've not registered any meals {selectedDate.toISOString().split('T')[0]}
                    </span>
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
                )
                }
            </CardContent>
        </Card>
    );

}