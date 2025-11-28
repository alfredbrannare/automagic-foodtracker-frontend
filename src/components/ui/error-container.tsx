import type {ErrorProps} from "../../types/componenets/error"
import { Alert, AlertDescription, AlertTitle } from "./index"
import { LuCircleAlert } from "react-icons/lu";

export function ErrorContainer({ title, description }: ErrorProps) {
    return (
        <Alert variant="destructive" className="error-container flex flex-col justify-center items-center gap-2 bg-elevated-bg border-0">
            <div className="flex items-center gap-2">
                <LuCircleAlert />
                <AlertTitle>{title}</AlertTitle>
            </div>
            <AlertDescription className="text-center">{description}</AlertDescription>
        </Alert>
    );
}