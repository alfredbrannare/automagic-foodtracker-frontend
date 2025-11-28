import type {LoadingProps} from "../../types/componenets/loading"
import { Spinner } from "./index"

export function LoadingContainer({message}: LoadingProps) {
    return (
        <div className="loading-container flex justify-center items-center gap-2">
            <Spinner />
            {message}
        </div>
    );
}