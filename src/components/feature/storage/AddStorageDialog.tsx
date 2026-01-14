import {
    Button,
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, ErrorInput, Input,
    Label
} from "@/components/ui";
import {Warehouse} from "lucide-react";
import {useStorageContext} from "@/hooks/useStorage.ts";
import {useState} from "react";
import {formatDateForInput, formatInputToInstant} from "@/utils/date-utils.ts";
import type {CreateStorageRequest} from "@/types/storage";

interface AddStorageDialogProps {
    onSuccess?: () => void;
}

export const AddStorageDialog = ({ onSuccess }: AddStorageDialogProps) => {
    const {createItem} = useStorageContext();

    const defaultFormData: CreateStorageRequest = {
        name: "",
        nutritionPer100g: {
            protein: 0,
            kcal: 0,
            fat: 0,
            carbs: 0,
        },
        totalWeight: 0,
        weightPerMeal: 0,
        lowStockThreshold: 0,
        createdAt: new Date().toISOString(),
    }

    const [formData, setFormData] = useState<CreateStorageRequest>(defaultFormData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createItem(formData);
        onSuccess?.();
    }

    const isNutritionPositive = formData.nutritionPer100g.protein >= 0 && formData.nutritionPer100g.fat >= 0 && formData.nutritionPer100g.carbs >= 0 && formData.nutritionPer100g.kcal >= 0;
    const isNameValid = formData.name.length > 0;
    const isThresholdLessThanTotalWeight = formData.lowStockThreshold <= formData.totalWeight;
    const isThresholdPositive = formData.lowStockThreshold >= 0;
    const isWeightPerMealLessThanTotalWeight = formData.weightPerMeal <= formData.totalWeight;
    const isWeightPerMealPositive = formData.weightPerMeal >= 0;
    const isTotalWeightValid = formData.totalWeight >= 0;
    const isFormValid = isNutritionPositive && isNameValid && isThresholdLessThanTotalWeight && isThresholdPositive && isWeightPerMealLessThanTotalWeight && isWeightPerMealPositive && isTotalWeightValid;

    return (
        <Dialog onOpenChange={(open) => open && setFormData(defaultFormData)}>
            <DialogTrigger className="flex flex-col items-center">
                <Warehouse className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110" size={42}/>
                <Label className="text-amft-white">Storage</Label>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>

                    <DialogHeader className="mb-4">
                        <DialogTitle>Create a Storage</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" value={formData.name}
                                   onChange={(e) => setFormData({...formData, name: e.target.value})} required={true}/>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="weight-1">Total Weight (g)</Label>
                                <Input id="weight-1" name="weight" type="number" value={Math.round(formData.totalWeight)}
                                       onChange={(e) => setFormData({...formData, totalWeight: Number(e.target.value)})}
                                       required={true}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="date-1">Date</Label>
                                <Input id="date-1" name="date" type="datetime-local"
                                       value={formatDateForInput(formData.createdAt)} onChange={(e) => {
                                    const instant = formatInputToInstant(e.target.value);
                                    if (instant) {
                                        setFormData({...formData, createdAt: instant});
                                    }
                                }} required={true}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="weight-2">Weight per meal (g)</Label>
                                <Input id="weight-2" name="weightPerMeal" type="number" value={Math.round(formData.weightPerMeal)}
                                onChange={(e) => setFormData({...formData, weightPerMeal: Number(e.target.value)})}></Input>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="weight-2">Low stock threshold (g)</Label>
                                <Input id="weight-2" name="lowStockThreshold" type="number" value={Math.round(formData.lowStockThreshold)}
                                       onChange={(e) => setFormData({...formData, lowStockThreshold: Number(e.target.value)})}></Input>
                            </div>
                        </div>

                        {formData.nutritionPer100g && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="protein-1">Protein (per 100g)</Label>
                                        <Input id="protein-1" name="protein" type="number"
                                               value={Math.round(formData.nutritionPer100g.protein)} onChange={(e) => setFormData({
                                            ...formData,
                                            nutritionPer100g: {
                                                ...formData.nutritionPer100g,
                                                protein: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="calories-1">Calories (per 100g)</Label>
                                        <Input id="calories-1" name="calories" type="number"
                                               value={Math.round(formData.nutritionPer100g.kcal)} onChange={(e) => setFormData({
                                            ...formData,
                                            nutritionPer100g: {
                                                ...formData.nutritionPer100g,
                                                kcal: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="carbs-1">Carbs (per 100g)</Label>
                                        <Input id="carbs-1" name="carbs" type="number"
                                               value={Math.round(formData.nutritionPer100g.carbs)} onChange={(e) => setFormData({
                                            ...formData,
                                            nutritionPer100g: {
                                                ...formData.nutritionPer100g,
                                                carbs: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="fat-1">Fat (per 100g)</Label>
                                        <Input id="fat-1" name="fat" type="number" value={Math.round(formData.nutritionPer100g.fat)}
                                               onChange={(e) => setFormData({
                                                   ...formData,
                                                   nutritionPer100g: {
                                                       ...formData.nutritionPer100g,
                                                       fat: Number(e.target.value)
                                                   }
                                               })} required={true}/>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" disabled={!isFormValid}>Create Storage</Button>
                        </DialogClose>
                    </DialogFooter>
                    <div className="grid gap-3 justify-center mt-2 text-center">
                        {isNutritionPositive ? null : <ErrorInput description="Nutrition values must be positive"/>}
                        {isNameValid ? null : <ErrorInput description="You must enter a name for the storage"/>}
                        {isThresholdLessThanTotalWeight ? null : <ErrorInput description="Low stock threshold must be lower than total weight."/>}
                        {isThresholdPositive ? null : <ErrorInput description="Low stock threshold must be positive."/>}
                        {isWeightPerMealLessThanTotalWeight ? null : <ErrorInput description="Weight per meal must be lower than total weight."/>}
                        {isWeightPerMealPositive ? null : <ErrorInput description="Weight per meal must be positive."/>}
                        {isTotalWeightValid ? null : <ErrorInput description="Total weight must be equal or greater than 0g"/>}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}