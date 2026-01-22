import type {MealResponse, UpdateMealRequest} from "@/types/meal";
import {useState} from "react";
import {Label, Separator} from "@/components/ui";

import { Menu } from 'lucide-react';
import {UpdateMealDialog} from "@/components/feature/meal/UpdateMealDialog.tsx";
import {DeleteMealDialog} from "@/components/feature/meal/DeleteMealDialog.tsx";
import { formatDateForInput} from "@/utils/date-utils.ts";
import {handleInputRound} from "@/utils/input-utils.ts";

interface MealItemProps {
    item: MealResponse;
    onRemove: (id: string) => Promise<void>;
    onUpdate: (id: string, data: UpdateMealRequest) => Promise<MealResponse>;
    onRefetch: () => Promise<void>;
}

export const MealItem = ({item, onRemove, onUpdate, onRefetch}: MealItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center">
                <div className="flex flex-col mb-1 min-w-0">
                    <span className="text-xs text-muted-foreground">{formatDateForInput(item.consumedAt).split("T")[1]}</span>
                    <Label className="text-md truncate block w-full">{item.name}</Label>
                    <span className="text-sm">{item.weight}g</span>
                </div>

                <div className="flex items-center justify-self-center">
                    {!isExpanded ? (
                        <div className="grid grid-cols-2 custom-md:grid-cols-4 gap-2">
                            {Object.entries(item.nutrition).map(([key, value]) => (
                                <div key={key} className="flex flex-col items-center gap-1">
                                    <Label className="text-xs text-muted-foreground">{key}</Label>
                                    <Label className="text-sm">{handleInputRound(value)}g</Label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <UpdateMealDialog item={item} onUpdate={onUpdate} onRefetch={onRefetch}/>
                            <DeleteMealDialog item={item} onRemove={onRemove} onRefetch={onRefetch}/>
                        </div>
                    )}
                </div>

                <button onClick={() => setIsExpanded(!isExpanded)}>
                    <Menu className={`text-lines text-3xl cursor-pointer transition-transform duration-300 hover:scale-110`}/>
                </button>
            </div>
            <div className="my-4">
                <Separator/>
            </div>
        </div>
    )
}