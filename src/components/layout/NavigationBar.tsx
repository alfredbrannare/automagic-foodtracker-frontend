import {GoGoal} from "react-icons/go";
import {HiOutlineUserCircle, HiPlusCircle} from "react-icons/hi";
import { Card } from "../ui";

export const NavigationBar = () => {
    return (
        <nav>
            <Card className="flex flex-row fixed bottom-4 inset-x-2 md:inset-x-0 mx-auto max-w-3xl flex rounded-lg shadow
                bg-elevated-bg justify-evenly p-2 items-center">
                <GoGoal
                    size={32}
                    className="text-amft-white"
                />

                <HiPlusCircle
                    size={52}
                    className="text-green"
                />

                <HiOutlineUserCircle
                    size={32}
                    className="text-amft-white"
                />
            </Card>
        </nav>
    )
}