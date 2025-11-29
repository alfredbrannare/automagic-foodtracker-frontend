import {Progress, Separator} from "../../ui";
import {GiHamburgerMenu} from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";


interface StorageItemProps {
    id: number;
    name: string;
    totalWeight: number;
    consumedWeight: number;
    mealsLeft: number;
    mealsLeftPercentage: number;
    lowstock: boolean;
    onRemove: () => void;
    onEdit: () => void;
}

export const StorageItem = (props: StorageItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span>{props.name}</span>
                <span>{props.mealsLeftPercentage}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{props.consumedWeight}g of {props.totalWeight}g</span>
                <span>{Math.round(props.mealsLeft)} meals left</span>
            </div>
            <div className="flex justify-between items-center">
                <Progress
                    value={props.mealsLeftPercentage}
                    className="bg-red py-3 mr-3 rounded-xs"
                />
                <div className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
                    <FaEdit className="w-10 h-10 text-yellow cursor-pointer" onClick={props.onEdit}/>
                    <FaTrash className="w-7.5 h-7.5 text-red cursor-pointer mr-3" onClick={props.onRemove}/>
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