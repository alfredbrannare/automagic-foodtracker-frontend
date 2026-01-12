import {Button, CardContent, CardHeader, CardTitle, Input, Label} from "@/components/ui";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {useAuthContext} from "@/hooks/useAuth.ts";

export const LoginForm = () => {
    const { login } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login();
    }

    return (
        <div className="text-center">
            <CardContent >
                <form className="grid gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" required={true}/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} className="pr-10"
                                   required={true}/>
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <Eye size={24}/> : <EyeOff size={20}/>}
                            </button>
                        </div>
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </CardContent>
        </div>
    )
}