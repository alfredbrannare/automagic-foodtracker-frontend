import {useState} from "react";
import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Separator, LoadingContainer, ErrorContainer} from "../../ui";
import {StorageItem} from "./StorageItem";
import {useStorage} from "@/hooks/useStorage.ts";

export const StorageSection = () => {
    const {storageItems, loading, error} = useStorage();

    return (
        <Card className="bg-elevated-bg m-2">
            <CardHeader className="text-center">
                <CardTitle className="text-amft-white text-2xl">Storage</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
                <div className="my-4">
                    <Separator/>
                </div>
                {loading ? (
                    <LoadingContainer message="Loading storage items..."/>
                ) : error ? (
                    <ErrorContainer title="Unable to fetch storage items" description="This is boilerplate crazy code, you couldn't fetch the info because of some reason"/>
                    ) : (
                    <>
                        <StorageItem/>
                    </>
                )}
            </CardContent>
        </Card>
    )
}