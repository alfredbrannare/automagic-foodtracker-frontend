import {
    Card,
    Separator,
    Tabs, TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui";
import {LoginForm} from "@/components/feature/auth/LoginForm.tsx";
import {RegisterForm} from "@/components/feature/auth/RegisterForm.tsx";
import {useState} from "react";

export const Auth = () => {
    const [activeTab, setActiveTab] = useState<string>("login")

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
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full ">
                    <TabsList className="w-full bg-elevated-bg rounded-b-lg rounded-t-xl pt-0">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="mt-4">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                            <RegisterForm />
                    </TabsContent>
                </Tabs>
            </Card>
        </main>
    )
}