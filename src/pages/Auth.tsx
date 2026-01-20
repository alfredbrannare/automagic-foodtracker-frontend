import {
    Button,
    Card,
    Separator
} from "@/components/ui";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Auth = () => {

    const handleGoogleLogin = () => {
        window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
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
                <Button onClick={handleGoogleLogin}>Login with Google</Button>
            </Card>
        </main>
    )
}