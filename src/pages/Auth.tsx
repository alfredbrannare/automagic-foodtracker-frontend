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
import {LoginForm} from "@/components/feature/auth/LoginForm.tsx";

export const Auth = () => {
    return (
        <main className="min-h-screen m-2 pb-30 flex flex-col items-center gap-4 justify-center max-w-full ">
            <Card className="bg-elevated-bg max-w-5xl w-full pt-0">
                <Tabs defaultValue="login" className="items-center w-full">
                    <TabsList className="w-full bg-elevated-bg rounded-b-lg rounded-t-xl">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="mt-4">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                    </TabsContent>
                </Tabs>
            </Card>
        </main>
    )
}