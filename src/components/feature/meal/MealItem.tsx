import type {MealResponse, UpdateMealRequest} from "@/types/meal";
import {useState} from "react";
import {Label, Progress} from "@/components/ui";

interface MealItemProps {
    item: MealResponse;
    onRemove: (id: string) => Promise<void>;
    onUpdate: (id: string, data: UpdateMealRequest) => Promise<MealResponse>;
}

export const MealItem = ({item, onRemove, onUpdate}: MealItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <Label className="text-md">{item.name}</Label>
            <span className="text-sm">{item.weight}g</span>
            <div className="flex justify-start items-center mt-2">
                {Object.entries(item.nutrition).map(([key, value]) => (
                    <div key={key} className="flex gap-1 mr-3 text-center items-center">
                        <Progress
                            value={100}
                            className="h-3 w-3 mr-3 rounded-sm bg-prog-bg"
                            indicatorClassName="bg-green-500"
                        />
                        <Label>{key}</Label>
                        <Label>{value}g</Label>
                    </div>
                ))}
            </div>
        </div>
    )

}