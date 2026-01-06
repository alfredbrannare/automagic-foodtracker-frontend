import type {MealResponse, UpdateMealRequest} from "@/types/meal";
import {useState} from "react";
import {Label, Progress, Separator} from "@/components/ui";

import {GiHamburgerMenu} from "react-icons/gi";
import {UpdateMealDialog} from "@/components/feature/meal/UpdateMealDialog.tsx";

interface MealItemProps {
    item: MealResponse;
    onRemove: (id: string) => Promise<void>;
    onUpdate: (id: string, data: UpdateMealRequest) => Promise<MealResponse>;
}

export const MealItem = ({item, onRemove, onUpdate}: MealItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div className="w-15 flex-shrink-0 sm:w-20 md:w-25 lg:w-40">
                    <Label className="text-md truncate block">{item.name}</Label>
                    <span className="text-sm">{item.weight}g</span>
                </div>
                {!isExpanded &&
                    <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 items-center mt-2 ml-8">
                        {Object.entries(item.nutrition).map(([key, value]) => (
                            <div key={key} className="flex gap-1 mr-3 text-center items-center">
                                <Progress
                                    value={100}
                                    className="h-3 w-3 mr-1 rounded-sm bg-prog-bg z-0 max-[364px]:hidden"
                                    indicatorClassName="bg-green-500"
                                />
                                <span className="text-[0.7rem] md:text-sm">{key}</span>
                                <span className="text-[0.7rem] md:text-sm">{value}g</span>
                            </div>
                        ))}
                    </div>
                }
                <div
                    className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'opacity-100' : 'w-0 opacity-0'}`}>
                    <UpdateMealDialog
                        item={item}
                        onUpdate={onUpdate}
                    />
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)} className="justify-end">
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