import {
    Button,
    Card,
    Separator,
    Spinner
} from "@/components/ui";
import type {AuthProps} from "@/types/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Auth: React.FC<AuthProps> = ({isCheckingSession = false}) => {

    const handleGoogleLogin = () => {
        window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
    }

    const handleTryDemo = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("demo", "1");
        window.location.href = url.toString();
    }

    return (
        <main className="min-h-screen m-2 pb-30 flex flex-col items-center gap-4 justify-center max-w-full">
            <Card className="bg-elevated-bg max-w-xl w-full gap-0">
                <div className="flex flex-col items-center justify-center mb-6">
                <img src="/AutomagicFoodTrackerLogo.png" alt="Automagic Food Tracker Logo" className="w-42"/>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amft-white tracking-tight text-center">
                        Automagic Foodtracker
                    </h1>
                    <p className="text-sm text-muted-foreground text-center">
                        Track your nutrition effortlessly
                    </p>
                </div>
                <Separator className="mb-0"/>
                <div className="flex flex-col items-center gap-2 mt-4">
                    <Button onClick={handleGoogleLogin}>Login with Google</Button>
                    {isCheckingSession && (
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Spinner className="size-3"/> Restoring session…
                        </span>
                    )}
                    <Button onClick={handleTryDemo} variant="outline" className="mt-2">Try demo</Button>
                </div>
            </Card>
        </main>
    )
}