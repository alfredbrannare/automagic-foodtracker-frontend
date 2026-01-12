import {
    Button,
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
    Tabs, TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui";

export const Auth = () => {
    return (
        <main className="min-h-screen m-2 pb-30 flex flex-col justify-center">
            <Card className="flex justify-center items-center">
                <img src="/AutomagicFoodTrackerLogo.png" alt="Automagic Food Tracker Logo" width={450}/>
            </Card>
            <Card className="flex justify-center items-center">
                <Tabs>
                    <TabsList>
                        <TabsTrigger value="register">Register</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="register">
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                    </TabsContent>
                    <TabsContent value="login">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                    </TabsContent>
                </Tabs>
            </Card>
        </main>
    )
}