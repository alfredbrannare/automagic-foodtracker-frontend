import {Progress, Separator} from "../../ui";
import {GiHamburgerMenu} from "react-icons/gi";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import type {StorageResponse} from "@/types/storage";
import { UpdateStorageDialog } from "./UpdateStorageDialog";
import type { UpdateStorageRequest } from "@/types/storage";


interface StorageItemProps {
    item: StorageResponse;
    onRemove: () => void;
    onUpdate: (id: string, data: UpdateStorageRequest) => Promise<StorageResponse>;
}

export const StorageItem = ({ item, onRemove, onUpdate }: StorageItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const remainingWeight:number = item.totalWeight - item.consumedWeight;

    const getProgressColor = () => {
        if (remainingWeight <= item.lowStockThreshold) {
            return "bg-red-500";
        }
        if (remainingWeight <= item.lowStockThreshold * 2) {
            return "bg-yellow-500";
        }
        return "bg-green-500";
    };

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span>{item.name}</span>
                <span>{item.mealsLeftPercentage}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{item.consumedWeight}g of {item.totalWeight}g</span>
                <span>{Math.round(item.mealsLeft)} meals left</span>
            </div>
            <div className="flex justify-between items-center">
                <Progress
                    value={item.mealsLeftPercentage}
                    className="h-6 mr-3 rounded-sm bg-zinc-900"
                    indicatorClassName={getProgressColor()}
                />
                <div className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
                    <UpdateStorageDialog item={item} onUpdate={onUpdate} />
                    <FaTrash className="w-7.5 h-7.5 text-red cursor-pointer mr-3" onClick={onRemove}/>
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                <GiHamburgerMenu
                    className="text-lines text-3xl cursor-pointer"
                />
                </button>
            </div>
            <div className="my-4">
                <Separator/>
            </div>
        </div>
    );
};