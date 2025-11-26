import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Separator, Progress} from "../../ui";
import { StorageItem } from "./StorageItem";

export const StorageSection = () => {
    return (
        <Card className="bg-elevated-bg m-2">
            <CardHeader className="text-center">
                <CardTitle className="text-amft-white text-2xl">Storage</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="my-4">
                    <Separator/>
                </div>
                <StorageItem/>
                <StorageItem/>
            </CardContent>
        </Card>
    )
}