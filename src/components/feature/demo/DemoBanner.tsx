import {Button, Card} from "@/components/ui";
import {exitDemo} from "@/demo/demoMode";

export const DemoBanner = () => {
    return (
        <div className="fixed top-4 inset-x-2 md:inset-x-0 z-50 mx-auto max-w-3xl">
            <Card className="flex flex-row items-center justify-between gap-3 rounded-lg bg-elevated-bg px-4 py-3 shadow">
                <span className="text-sm text-amft-white">
                    Demo mode — nothing is saved
                </span>
                <Button size="sm" variant="outline" className="shrink-0" onClick={exitDemo}>
                    Exit demo
                </Button>
            </Card>
        </div>
    )
}
