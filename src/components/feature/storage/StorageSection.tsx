import {Card, CardContent, CardHeader, CardTitle, Separator, LoadingContainer, ErrorContainer, Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui";
import {StorageItem} from "./StorageItem";
import { useStorageContext } from "../../../hooks/useStorage.ts";
import {useState} from "react";
import { ChevronDown } from "lucide-react";

export const StorageSection = () => {
    const { storageItems, loading, error, removeItem, updateItem } = useStorageContext();
    const [isOpen, setIsOpen] = useState(false);
    const hasMore = storageItems.length > 3;

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
                    ) : storageItems.length === 0 ? (
                    <span className="text-center">
                        You've not registered any storage items
                    </span>
                    ) : (
                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                        {storageItems.slice(0, 3).map(item => (
                            <StorageItem
                                key={item.id}
                                item={item}
                                onRemove={removeItem}
                                onUpdate={updateItem}
                            />
                        ))}
                        {hasMore && (
                            <CollapsibleContent>
                                {storageItems.slice(3).map(item => (
                                    <StorageItem
                                        key={item.id}
                                        item={item}
                                        onRemove={removeItem}
                                        onUpdate={updateItem}
                                    />
                                ))}
                            </CollapsibleContent>
                        )}
                        {hasMore && (
                            <CollapsibleTrigger className="w-full flex justify-center text-center items-center">
                                <ChevronDown className="text-amft-white cursor-pointer transition-transform duration-300 hover:scale-110" size={24}/>
                            </CollapsibleTrigger>
                        )}
                    </Collapsible>
                )}
            </CardContent>
        </Card>
    )
}