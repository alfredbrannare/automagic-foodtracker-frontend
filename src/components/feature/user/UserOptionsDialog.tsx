import {DeleteUserDialog} from "@/components/feature/user/DeleteUserDialog.tsx";
import {useState} from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui";
import {UserRoundPen} from "lucide-react";
import {useAuthContext} from "@/hooks/useAuth.ts";

export const UserOptionsDialog = () => {
    const {logout} = useAuthContext();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        logout();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <UserRoundPen
                    size={42}
                    className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
            </DialogTrigger>
            <DialogContent className="w-80">
                <DialogTitle className="text-center">What would you like to do?</DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="flex flex-col justify-evenly gap-5">
                    <DeleteUserDialog onSuccess={() => setOpen(false)} />
                    <Button onClick={() => handleLogout()}>Logout</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}