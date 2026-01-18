import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            window.location.href = "/dashboard";
        } else {
            navigate("/login?error=auth_failed");
        }
    }, [searchParams, navigate]);

    return <div>Completing login, please wait...</div>;
};