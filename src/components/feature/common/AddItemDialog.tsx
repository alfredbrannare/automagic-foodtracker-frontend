import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
    DialogTrigger,
} from "@/components/ui";
import {AddMealDialog} from "@/components/feature/meal/AddMealDialog.tsx";
import {AddStorageDialog} from "@/components/feature/storage/AddStorageDialog.tsx";
import {useState} from "react";

export const AddItemDialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <img
                    src="/AutomagicFoodTrackerLogo.png"
                    width={109}
                    height={80}
                    alt="Register Meal Button"
                    className="h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
            </DialogTrigger>
            <DialogContent className="w-80">
                <DialogHeader>
                    <DialogTitle className="text-center">What would you like to add?</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex flex-row justify-evenly gap-5">
                    <AddMealDialog onSuccess={() => setOpen(false)} />
                    <AddStorageDialog onSuccess={() => setOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
    )
}