import {Progress, Separator} from "../../ui";
import {GiHamburgerMenu} from "react-icons/gi";

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
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span>{props.name}</span>
                <span>{props.mealsLeftPercentage}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{props.consumedWeight} of {props.totalWeight}</span>
                <span>{props.mealsLeft} meals left</span>
            </div>
            <div className="flex justify-between items-center">
                <Progress
                    value={props.mealsLeftPercentage}
                    className="bg-red py-3 mr-3 rounded-xs"
                />
                <GiHamburgerMenu
                    className="text-lines text-3xl cursor-pointer"
                />
            </div>
            <div className="my-4">
                <Separator/>
            </div>
        </div>
    );
};