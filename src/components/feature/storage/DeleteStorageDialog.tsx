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
import type {StorageResponse} from "@/types/storage";

interface DeleteStorageDialogProps {
    item: StorageResponse;
    onRemove: (id: string) => Promise<void>;
}

export const DeleteStorageDialog = ({item, onRemove}: DeleteStorageDialogProps) => {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onRemove(item.id);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Delete</Button>
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