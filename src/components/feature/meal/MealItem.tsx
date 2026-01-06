import type {MealResponse, UpdateMealRequest} from "@/types/meal";
import {useState} from "react";
import {Label, Progress, Separator} from "@/components/ui";

import {GiHamburgerMenu} from "react-icons/gi";

interface MealItemProps {
    item: MealResponse;
    onRemove: (id: string) => Promise<void>;
    onUpdate: (id: string, data: UpdateMealRequest) => Promise<MealResponse>;
}

export const MealItem = ({item, onRemove, onUpdate}: MealItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <div className="flex flex-row justify-between">
                <div>
                    <Label className="text-md">{item.name}</Label>
                    <span className="text-sm">{item.weight}g</span>
                    <div className="flex justify-start items-center mt-2">
                        {Object.entries(item.nutrition).map(([key, value]) => (
                            <div key={key} className="flex gap-1 mr-3 text-center items-center">
                                <Progress
                                    value={100}
                                    className="h-3 w-3 mr-1 rounded-sm bg-prog-bg z-0"
                                    indicatorClassName="bg-green-500"
                                />
                                <span className="text-sm">{key}</span>
                                <span>{value}g</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'w-80 opacity-100' : 'w-0 opacity-0'}`}>
                    <h1>Hello</h1>
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    <GiHamburgerMenu
                        className="text-lines text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                </button>
            </div>
            <div className="my-4">
                <Separator/>
            </div>
        </div>
    )

}