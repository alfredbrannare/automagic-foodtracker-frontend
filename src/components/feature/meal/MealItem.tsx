import type {MealResponse, UpdateMealRequest} from "@/types/meal";
import {useState} from "react";
import {Label, Progress, Separator} from "@/components/ui";

import { Menu } from 'lucide-react';
import {UpdateMealDialog} from "@/components/feature/meal/UpdateMealDialog.tsx";
import {DeleteMealDialog} from "@/components/feature/meal/DeleteMealDialog.tsx";
import {UpdateStorageDialog} from "@/components/feature/storage/UpdateStorageDialog.tsx";
import {DeleteStorageDialog} from "@/components/feature/storage/DeleteStorageDialog.tsx";

interface MealItemProps {
    item: MealResponse;
    onRemove: (id: string) => Promise<void>;
    onUpdate: (id: string, data: UpdateMealRequest) => Promise<MealResponse>;
}

export const MealItem = ({item, onRemove, onUpdate}: MealItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
                <div className="flex flex-col mb-1">
                    <Label className={`text-md truncate block w-15 custom-sm:w-30 ${isExpanded && "w-15"}`}>{item.name}</Label>
                    <span>{item.weight}g</span>
                </div>
                <div className={`grid grid-cols-2 custom-sm:grid-cols-4 gap-2 justify-self-center ${isExpanded && "hidden"}`}>  {/* Add justify-self-center here */}
                    {Object.entries(item.nutrition).map(([key, value]) => (
                        <div key={key} className="flex flex-col items-center gap-1">
                            <Label className="text-xs text-muted-foreground">{key}</Label>
                            <Label className="text-sm">{value}g</Label>
                        </div>
                    ))}
                </div>

                <div className={`flex items-center gap-2 transition-all duration-300 ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                    <UpdateMealDialog item={item} onUpdate={onUpdate}/>
                    <DeleteMealDialog item={item} onRemove={onRemove}/>
                </div>

                <button onClick={() => setIsExpanded(!isExpanded)}>
                    <Menu className="text-lines text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"/>
                </button>
            </div>
            <div className="my-4">
                <Separator/>
            </div>
        </div>
    )

}