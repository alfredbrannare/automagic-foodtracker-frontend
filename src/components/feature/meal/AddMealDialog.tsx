import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Label
} from "@/components/ui";
import { Utensils } from "lucide-react";

export const AddMealDialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="flex flex-col items-center">
                <Utensils className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110" size={42}/>
                <Label className="text-amft-white">Meal</Label>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Meal</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <h1>Meal</h1>
                </div>
            </DialogContent>
        </Dialog>
    )
}