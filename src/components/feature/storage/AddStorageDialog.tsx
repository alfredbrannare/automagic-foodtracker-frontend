import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Label
} from "@/components/ui";
import { Warehouse } from "lucide-react";

export const AddStorageDialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="flex flex-col items-center">
                <Warehouse className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110" size={42}/>
                <Label className="text-amft-white">Storage</Label>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Storage</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <h1>Meal</h1>
                </div>
            </DialogContent>
        </Dialog>
    )
}