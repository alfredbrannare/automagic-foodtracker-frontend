import React from "react";
import { Button } from "./ui/index.tsx"

interface Props {
    token: string;
    onLogout: () => void;
}

const Dashboard: React.FC<Props> = ({ token, onLogout }) => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome!</h1>
            <p>Your access token: {token}</p>
            <Button onClick={onLogout} className="mt-4">Logout</Button>
        </div>
    )
}

export default Dashboard;