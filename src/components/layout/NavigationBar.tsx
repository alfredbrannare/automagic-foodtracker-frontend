import {Button} from "@/components/ui/button";
import {PlusCircle, Target, User} from "phosphor-react";

export const NavigationBar = () => {
    return (
        <nav className="fixed bottom-4 inset-x-4 md:inset-x-0 mx-auto max-w-3xl flex rounded-lg shadow
                bg-elevated-bg justify-evenly p-2">

            <Target
                size={52}
                className="text-amft-white"
                weight="duotone"
            />

            <PlusCircle
                weight="bold"
                size={52}
                className="text-green"
            />

            <User
                weight="duotone"
                size={52}
                className="text-amft-white"
            />
        </nav>
    )
}