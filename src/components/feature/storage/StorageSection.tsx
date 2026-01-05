import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Separator, LoadingContainer, ErrorContainer } from "../../ui";
import {StorageItem} from "./StorageItem";
import { useStorageContext } from "../../../hooks/useStorage.ts";

export const StorageSection = () => {
    const { storageItems, loading, error, removeItem, updateItem } = useStorageContext();

    return (
        <Card className="bg-elevated-bg max-w-5xl w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-amft-white text-2xl">Storage</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="my-2">
                    <Separator/>
                </div>
                {loading ? (
                    <LoadingContainer message="Loading storage items..."/>
                ) : error ? (
                    <ErrorContainer title="Unable to fetch storage items" description={error}/>
                    ) : (
                    <>
                        {storageItems.map(item => (
                            <StorageItem
                                key={item.id}
                                item={item}
                                onRemove={removeItem}
                                onUpdate={updateItem}
                            />
                        ))}
                    </>
                )}
            </CardContent>
        </Card>
    )
}