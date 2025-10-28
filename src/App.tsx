import {useState} from "react"
import "./App.css"
import LoginForm from "./components/LoginForm.tsx"
import Dashboard from "./components/Dashboard.tsx"


const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setToken(null);
    };

    return (
        <div>
            {token ?
                <Dashboard token={token} onLogout={handleLogout} />
                :
                <LoginForm
                    onLogin={(accessToken, refreshToken) => {
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    setToken(accessToken);
                }}/>}
        </div>
    );
}

export default App;