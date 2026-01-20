import type {UpdateUserGoalsRequest} from "@/types/user";
import {useEffect, useState} from "react";
import {useUserContext} from "@/hooks/useUser.ts";
import {
    Button,
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, ErrorInput, Input, Label
} from "@/components/ui";
import {Goal} from 'lucide-react';

export const UpdateUserGoalsDialog = () => {
    const {userGoals, updateGoals, loading} = useUserContext();

    const [formData, setFormData] = useState<UpdateUserGoalsRequest>({
        targetProtein: 0,
        targetCarbs: 0,
        targetFat: 0,
        targetCalories: 0
    });

    const isFormValid = formData.targetProtein >= 0 &&
        formData.targetCarbs >= 0 &&
        formData.targetCalories >= 0 &&
        formData.targetFat >= 0;

    useEffect(() => {
        if (userGoals) {
            setFormData({
                targetProtein: userGoals.targetProtein,
                targetCarbs: userGoals.targetCarbs,
                targetFat: userGoals.targetFat,
                targetCalories: userGoals.targetCalories
            })
        }
    }, [userGoals]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateGoals(formData);
    }

    return (
        <Dialog onOpenChange={(open) => open && setFormData({
            targetProtein: userGoals.targetProtein,
            targetCarbs: userGoals.targetCarbs,
            targetFat: userGoals.targetFat,
            targetCalories: userGoals.targetCalories
        })}>
            <DialogTrigger asChild>
                <button>
                    <Goal
                        size={42}
                        className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-4">
                        <DialogTitle>Update Goals</DialogTitle>
                        <DialogDescription>
                            This change can&apos;t be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="protein-1">Protein (g)</Label>
                                        <Input id="protein-1" name="protein" type="number"
                                               value={Math.round(formData.targetProtein)} onChange={(e) => setFormData({
                                            ...formData,
                                            targetProtein: Number(e.target.value)
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="calories-1">Calories (g)</Label>
                                        <Input id="calories-1" name="calories" type="number"
                                               value={Math.round(formData.targetCalories)} onChange={(e) => setFormData({
                                            ...formData,
                                            targetCalories: Number(e.target.value)
                                        })} required={true}/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="carbs-1">Carbs (g)</Label>
                                        <Input id="carbs-1" name="carbs" type="number"
                                               value={Math.round(formData.targetCarbs)} onChange={(e) => setFormData({
                                            ...formData,
                                            targetCarbs: Number(e.target.value)
                                        })} required={true}/>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="fat-1">Fat (g)</Label>
                                        <Input id="fat-1" name="fat" type="number" value={Math.round(formData.targetFat)}
                                               onChange={(e) => setFormData({
                                                   ...formData,
                                                   targetFat: Number(e.target.value)
                                               })} required={true}/>
                                    </div>
                                </div>
                            </>
                        )
                        }

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
                        {isFormValid ? null : <ErrorInput description="All fields must be positive numbers."/>}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}