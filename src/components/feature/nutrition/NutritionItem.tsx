import { Label, Progress} from "@/components/ui";
import type {Goals} from "@/types/user";

interface NutritionItemProps {
    label: string;
    value: number;
    goal: Goals;
}

export const NutritionItem = ({ label, value, goal }: NutritionItemProps) => {
    const goalKeyMap: Record<string, keyof Goals> = {
        protein: 'targetProtein',
        carbs: 'targetCarbs',
        fat: 'targetFat',
        kcal: 'targetCalories'
    }

    const goalKey = goalKeyMap[label];
    const goalValue = goal[goalKey];
    const percentage = goalValue > 0 ? (value / goalValue) * 100 : 0;

    const getProgressColor = () => {
        if (percentage < 50) {
            return "bg-red-500";
        }
        if (percentage < 100) {
            return "bg-yellow-500";
        }
        return "bg-green-500";
    };

    return (
        <div className="flex flex-col gap-2 min-w-[20px] my-2">
            <div className="flex justify-between">
                <Label htmlFor={label}>{label.charAt(0).toUpperCase() + label.slice(1)} {Math.round(percentage)}%</Label>
                <Label>{value}g of {goalValue}g</Label>
            </div>
        <Progress
            id={label}
            value={percentage}
            className="h-3 mr-3 rounded-xs bg-prog-bg"
            indicatorClassName={getProgressColor()}
        />
        </div>
    )
}