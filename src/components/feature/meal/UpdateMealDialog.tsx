import {useEffect, useState} from "react";
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
    Label,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../../ui/index.ts"
import {formatDateForInput, formatInputToInstant} from "@/utils/date-utils.ts";
import type {MealResponse, UpdateMealRequest} from "@/types/meal";
import {useStorageContext} from "@/hooks/useStorage.ts";

const NONE = "__none__";

interface UpdateMealDialogProps {
    item: MealResponse;
    onUpdate: (id: string, data: UpdateMealRequest) => Promise<MealResponse>;
}

export const UpdateMealDialog = ({item, onUpdate}: UpdateMealDialogProps) => {
    const {storageItems, loading: storageLoading} = useStorageContext();

    const [formData, setFormData] = useState<UpdateMealRequest>({
        name: item.name,
        weight: item.weight,
        nutrition: {
            protein: item.nutrition.protein,
            kcal: item.nutrition.kcal,
            carbs: item.nutrition.carbs,
            fat: item.nutrition.fat
        },
        consumedAt: item.consumedAt,
        storageId: item.storageId
    });

    const isFromStorage = formData.storageId !== null;

    useEffect(() => {
        if (!formData.storageId) {
            setFormData((prev) => ({
                ...prev,
                name: item.name,
                nutrition: {...item.nutrition},
            }));
            return;
        }

        const storageItem = storageItems.find((si) => si.id === formData.storageId);
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
    }, [formData.storageId, storageItems, item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onUpdate(item.id, formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
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
                                <SelectTrigger>
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
                                <Label htmlFor="weight-1">Total Weight (g)</Label>
                                <Input id="weight-1" name="weight" type="number" value={formData.weight}
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
                                        <Label htmlFor="protein-1">Protein (g)</Label>
                                        <Input id="protein-1" disabled={isFromStorage} name="protein" type="number"
                                               value={formData.nutrition.protein} onChange={(e) => setFormData({
                                            ...formData,
                                            nutrition: {
                                                ...formData.nutrition,
                                                protein: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="calories-1">Calories</Label>
                                        <Input id="calories-1" disabled={isFromStorage} name="calories" type="number"
                                               value={formData.nutrition.kcal} onChange={(e) => setFormData({
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
                                        <Label htmlFor="carbs-1">Carbs (g)</Label>
                                        <Input id="carbs-1" disabled={isFromStorage} name="carbs" type="number"
                                               value={formData.nutrition.carbs} onChange={(e) => setFormData({
                                            ...formData,
                                            nutrition: {
                                                ...formData.nutrition,
                                                carbs: Number(e.target.value)
                                            }
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="fat-1">Fat (g)</Label>
                                        <Input id="fat-1" disabled={isFromStorage} name="fat" type="number" value={formData.nutrition.fat}
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
                            <Button type="submit">Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};