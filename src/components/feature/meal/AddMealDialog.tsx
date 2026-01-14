import {
    Button,
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, ErrorInput, Input,
    Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui";
import { Utensils } from "lucide-react";
import {formatDateForInput, formatInputToInstant} from "@/utils/date-utils.ts";
import {useEffect, useState} from "react";
import type {CreateMealRequest} from "@/types/meal";
import {useStorageContext} from "@/hooks/useStorage.ts";
import {useMealContext} from "@/hooks/useMeal.ts";
import {useNutritionContext} from "@/hooks/useNutrition.ts";

const NONE = "__none__";

interface AddMealDialogProps {
    onSuccess?: () => void;
}

export const AddMealDialog = ({ onSuccess }: AddMealDialogProps) => {
    const {storageItems: storageItems, refetch: storageRefetch} = useStorageContext();
    const { createItem } = useMealContext();
    const { refetch: nutritionRefetch } = useNutritionContext();

    const defaultFormData: CreateMealRequest = {
        name: "",
        weight: 0,
        nutrition: {
            protein: 0,
            kcal: 0,
            fat: 0,
            carbs: 0,
        },
        consumedAt: new Date().toISOString(),
        storageId: null,
    }

    const [formData, setFormData] = useState<CreateMealRequest>(defaultFormData)

    const isFromStorage = formData.storageId !== null;

    useEffect(() => {
        if (!formData.storageId) {
            setFormData((prev) => ({
                ...prev,
                name: "",
                nutrition: {
                    protein: 0,
                    kcal: 0,
                    fat: 0,
                    carbs: 0,
                },
            }));
            return;
        }

        const storageItem = storageItems.find(si => si.id === formData.storageId);
        if (!storageItem) return;

        setFormData((prev) => ({
            ...prev,
            name: storageItem.name,
            nutrition: {
                protein: storageItem.nutritionPer100g.protein,
                kcal: storageItem.nutritionPer100g.kcal,
                carbs: storageItem.nutritionPer100g.carbs,
                fat: storageItem.nutritionPer100g.fat
            }
        }))
    }, [formData.storageId, storageItems, setFormData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createItem(formData);
        await storageRefetch();
        await nutritionRefetch();
        onSuccess?.();
    }

    const isNutritionPositive = formData.nutrition.protein >= 0 && formData.nutrition.fat >= 0 && formData.nutrition.carbs >= 0 && formData.nutrition.kcal >= 0;
    const isNameValid = formData.name.length > 0;
    const isWeightValid = formData.weight >= 0;
    const isFormValid = isNutritionPositive && isNameValid && isWeightValid;

    return (
        <Dialog onOpenChange={(open) => open && setFormData(defaultFormData)}>
            <DialogTrigger className="flex flex-col items-center">
                <Utensils className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110" size={42}/>
                <Label className="text-amft-white">Meal</Label>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>

                    <DialogHeader className="mb-4">
                        <DialogTitle>Create a meal</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">

                        <div className="grid gap-3">
                            <Label htmlFor="storage-1">Storage</Label>
                            <Select
                                value={formData.storageId ?? NONE}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        storageId: value === NONE ? null : value,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select from storage"/>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="__none__">
                                        None
                                    </SelectItem>
                                    {storageItems.map((storageItem, index) => (
                                        <SelectItem key={index} value={storageItem.id}>
                                            {storageItem.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" disabled={isFromStorage} name="name" value={formData.name}
                                   onChange={(e) => setFormData({...formData, name: e.target.value})} required={true}/>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="weight-1">Weight (g)</Label>
                                <Input id="weight-1" name="weight" type="number" value={Math.round(formData.weight)}
                                       onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                                       required={true}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="date-1">Date</Label>
                                <Input id="date-1" name="date" type="datetime-local"
                                       value={formatDateForInput(formData.consumedAt)} onChange={(e) => {
                                    const instant = formatInputToInstant(e.target.value);
                                    if (instant) {
                                        setFormData({...formData, consumedAt: instant});
                                    }
                                }} required={true}/>
                            </div>
                        </div>

                        {formData.nutrition && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="protein-1">Protein (per 100g)</Label>
                                        <Input id="protein-1" disabled={isFromStorage} name="protein" type="number"
                                               value={Math.round(formData.nutrition.protein)} onChange={(e) => setFormData({
                                            ...formData,
                                            nutrition: {
                                                ...formData.nutrition,
                                                protein: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="calories-1">Calories (per 100g)</Label>
                                        <Input id="calories-1" disabled={isFromStorage} name="calories" type="number"
                                               value={Math.round(formData.nutrition.kcal)} onChange={(e) => setFormData({
                                            ...formData,
                                            nutrition: {
                                                ...formData.nutrition,
                                                kcal: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="carbs-1">Carbs (per 100g)</Label>
                                        <Input id="carbs-1" disabled={isFromStorage} name="carbs" type="number"
                                               value={Math.round(formData.nutrition.carbs)} onChange={(e) => setFormData({
                                            ...formData,
                                            nutrition: {
                                                ...formData.nutrition,
                                                carbs: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="fat-1">Fat (per 100g)</Label>
                                        <Input id="fat-1" disabled={isFromStorage} name="fat" type="number" value={Math.round(formData.nutrition.fat)}
                                               onChange={(e) => setFormData({
                                                   ...formData,
                                                   nutrition: {
                                                       ...formData.nutrition,
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
                            <Button type="submit" disabled={!isFormValid}>Create Meal</Button>
                        </DialogClose>
                    </DialogFooter>
                    <div className="grid gap-3 justify-center mt-2 text-center">
                        {isNutritionPositive ? null : <ErrorInput description="Nutrition values must be positive"/>}
                        {isNameValid ? null : <ErrorInput description="You must enter a name for the meal"/>}
                        {isWeightValid ? null : <ErrorInput description="Weight must be equal or greater than 0g"/>}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}