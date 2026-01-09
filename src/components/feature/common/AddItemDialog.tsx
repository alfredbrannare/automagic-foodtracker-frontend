import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
    DialogTrigger,
} from "@/components/ui";
import {AddMealDialog} from "@/components/feature/meal/AddMealDialog.tsx";
import {AddStorageDialog} from "@/components/feature/storage/AddStorageDialog.tsx";

export const AddItemDialog = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <img
                    src="/AutomagicFoodTrackerLogo.png"
                    alt="Register Meal Button"
                    className="h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
            </DialogTrigger>
            <DialogContent className="w-80">
                <DialogHeader>
                    <DialogTitle>What would you like to add?</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex flex-row justify-evenly gap-5">
                    <AddMealDialog />
                    <AddStorageDialog />
                </div>
            </DialogContent>
        </Dialog>
    )
}