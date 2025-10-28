import React, { useState } from "react";
import { login } from "../api/api.ts";
import { Card, CardContent, CardHeader, CardTitle, Input, Button } from "./ui/index.tsx";

interface Props {
    onLogin: (accessToken: string, refreshToken: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await login(username, password);
            onLogin(data.accessToken, data.refreshToken);
        } catch {
            setError("Invalid username or password");
        }
    };
    
    return (
        <Card className="w-[300px] mx-auto mt-20">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Login</Button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm;