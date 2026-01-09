import { Card } from "../ui";
import { UserRoundPen, Goal } from 'lucide-react';
import {UpdateUserGoalsDialog} from "@/components/feature/user/UpdateUserGoalsDialog.tsx";
import {AddItemDialog} from "@/components/feature/common/AddItemDialog.tsx";

export const NavigationBar = () => {

    return (
        <nav>
            <Card className="flex flex-row fixed bottom-4 inset-x-2 md:inset-x-0 mx-auto max-w-3xl flex rounded-lg shadow
                bg-elevated-bg justify-evenly p-2 items-center z-50">
                    <UpdateUserGoalsDialog />

                <AddItemDialog />

                <UserRoundPen
                    size={42}
                    className="text-amft-white h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
            </Card>
        </nav>
    )
}