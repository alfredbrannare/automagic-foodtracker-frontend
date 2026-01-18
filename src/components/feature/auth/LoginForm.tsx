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
                    <Button type="submit"><a href="http://localhost:8080/oauth2/authorization/google">Login</a></Button>
            </CardContent>
        </div>
    )
}