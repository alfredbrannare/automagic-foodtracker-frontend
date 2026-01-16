import {Button, CardContent, ErrorInput, Input, Label} from "@/components/ui";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {useAuthContext} from "@/hooks/useAuth.ts";
import type {LoginRequest} from "@/types/auth";

export const LoginForm = () => {
    const {login, error} = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState<LoginRequest>({
        username: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData);
    }

    return (
        <div className="text-center max-w-md mx-auto">
            <CardContent>
                <form className="grid gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" required={true} value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} className="pr-10"
                                   required={true} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <Eye size={24}/> : <EyeOff size={20}/>}
                            </button>
                        </div>
                        {error && <ErrorInput className="text-red-500" description={error}>{error}</ErrorInput>}
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </CardContent>
        </div>
    )
}