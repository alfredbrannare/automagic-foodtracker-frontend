import {useState} from "react";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label
} from "../../ui/index.ts"
import type {StorageResponse, UpdateStorageRequest} from "@/types/storage";
import {formatDateForInput, formatInputToInstant} from "@/utils/date-utils.ts";
import {ErrorInput} from "../../ui/index.ts";
import {SquarePen} from "lucide-react";

interface UpdateStorageDialogProps {
    item: StorageResponse;
    onUpdate: (id: string, data: UpdateStorageRequest) => Promise<StorageResponse>;
    onRefetch: () => Promise<void>;
}

export const UpdateStorageDialog = ({item, onUpdate, onRefetch}: UpdateStorageDialogProps) => {
    const [formData, setFormData] = useState<UpdateStorageRequest>(item);

    const isThresholdValid =
        formData.lowStockThreshold <= formData.totalWeight;
    const isMealWeightValid =
        formData.weightPerMeal <= formData.totalWeight;
    const isTotalWeightValid = formData.totalWeight >= 0;
    const isFormValid = isThresholdValid && isMealWeightValid && isTotalWeightValid;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onUpdate(item.id, formData);
        await onRefetch();
    };

    return (
        <Dialog onOpenChange={(open) => open && setFormData(item)}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <span className="hidden custom-sm:inline">Update</span>
                    <SquarePen className="text-amft-white custom-sm:hidden"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>

                    <DialogHeader className="mb-4">
                        <DialogTitle>Update {item.name}</DialogTitle>
                        <DialogDescription>
                            This change can&apos;t be undone.
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
                                <Label htmlFor="weight-per-meal-1">Weight per meal (g)</Label>
                                <Input id="weight-per-meal-1" name="weightPerMeal" type="number"
                                       value={Math.round(formData.weightPerMeal)} onChange={(e) => setFormData({
                                    ...formData,
                                    weightPerMeal: Number(e.target.value)
                                })} required={true}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="low-stock-threshold-1">Low stock threshold (g)</Label>
                                <Input id="low-stock-threshold-1" name="lowStockThreshold" type="number"
                                       value={Math.round(formData.lowStockThreshold)} onChange={(e) => setFormData({
                                    ...formData,
                                    lowStockThreshold: Number(e.target.value)
                                })} required={true}/>
                            </div>
                        </div>

                        {formData.nutritionPer100g && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="protein-1">Protein (g)</Label>
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
                                        <Label htmlFor="calories-1">Calories</Label>
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
                                        <Label htmlFor="carbs-1">Carbs (g)</Label>
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
                                        <Label htmlFor="fat-1">Fat (g)</Label>
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
                            <Button type="submit" disabled={!isFormValid}>Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                    <div className="grid gap-3 justify-center mt-2 text-center">
                        {isThresholdValid ? null :
                            <ErrorInput description="Low stock threshold must be lower than total weight."/>}
                        {isMealWeightValid ? null :
                            <ErrorInput description="Weight per meal must be lower than total weight."/>}
                        {isTotalWeightValid ? null : <ErrorInput description="Weight must be equal or greater than 0g."/>}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};