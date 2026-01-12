import {useState} from "react";
import {useUserContext} from "@/hooks/useUser.ts";
import {
    Button, Checkbox,
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, Label
} from "@/components/ui";
import {UserRoundPen} from 'lucide-react';

export const DeleteUserDialog = () => {
    const {removeUser, loading, error} = useUserContext();
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await removeUser();
    }

    return (
        <Dialog onOpenChange={(open) => open && setIsChecked(false)}>
            <DialogTrigger asChild>
                <button>
                    <UserRoundPen
                        size={42}
                        className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-4">
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>
                            This change can&apos;t be undone. All data will be deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <div className="flex flex-row items-center gap-4">
                                <Checkbox id="terms" checked={isChecked} onCheckedChange={(checked) => setIsChecked(checked === true)} required={true}/>
                                <Label htmlFor="terms">Are you sure that you want to delete your account?</Label>
                            </div>
                        )
                        }
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" disabled={!isChecked}>Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}