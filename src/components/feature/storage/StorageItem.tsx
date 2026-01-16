import {Label, Progress, Separator} from "../../ui";
import {Menu} from 'lucide-react';
import {useState} from "react";
import type {StorageResponse} from "@/types/storage";
import {UpdateStorageDialog} from "./UpdateStorageDialog";
import type {UpdateStorageRequest} from "@/types/storage";
import {DeleteStorageDialog} from "@/components/feature/storage/DeleteStorageDialog.tsx";


interface StorageItemProps {
    item: StorageResponse;
    onRemove: (id: string) => Promise<void>;
    onUpdate: (id: string, data: UpdateStorageRequest) => Promise<StorageResponse>;
    onRefetch: () => Promise<void>;
}

export const StorageItem = ({item, onRemove, onUpdate, onRefetch}: StorageItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const remainingWeight: number = item.totalWeight - item.consumedWeight;

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
                <Label className="text-md truncate block">{item.name}</Label>
                <Label>{item.mealsLeftPercentage}%</Label>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{item.consumedWeight}g of {item.totalWeight}g</span>
                <span>{Math.round(item.mealsLeft)} meals left</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                <Progress
                    value={item.mealsLeftPercentage}
                    className="h-6 rounded-sm bg-prog-bg"
                    indicatorClassName={getProgressColor()}
                />
                <div
                    className={`flex items-center gap-2 transition-all duration-300 ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                    <UpdateStorageDialog item={item} onUpdate={onUpdate} onRefetch={onRefetch}/>
                    <DeleteStorageDialog item={item} onRemove={onRemove} onRefetch={onRefetch}/>
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    <Menu
                        className="text-lines text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"/>
                </button>
            </div>
            <div className="my-4">
                <Separator/>
            </div>
        </div>
    );
};