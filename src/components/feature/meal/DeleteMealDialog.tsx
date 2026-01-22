import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../ui/index.ts"
import type {MealResponse} from "@/types/meal";
import {Trash} from "lucide-react";
import {useNutritionContext} from "@/hooks/useNutrition.ts";
import {useStorageContext} from "@/hooks/useStorage.ts";

interface DeleteMealDialogProps {
    item: MealResponse;
    onRemove: (id: string) => Promise<void>;
    onRefetch: () => Promise<void>;
}

export const DeleteMealDialog = ({item, onRemove, onRefetch}: DeleteMealDialogProps) => {
    const { refetch: NutritionRefetch } = useNutritionContext();
    const { refetch: StorageRefetch } = useStorageContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onRemove(item.id);
        await onRefetch();
        await NutritionRefetch();
        if (item.storageId) await StorageRefetch();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <span className="hidden custom-sm:inline">Delete</span>
                    <Trash className="text-amft-white custom-sm:hidden"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>

                    <DialogHeader className="mb-4">
                        <DialogTitle>Delete {item.name}</DialogTitle>
                        <DialogDescription>
                            This change can&apos;t be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">

                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" disabled={false}>Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};