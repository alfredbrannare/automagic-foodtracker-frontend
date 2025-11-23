import {useState, useEffect} from "react"
import "./App.css"
import apiClient from "./api/apiClient"
import Dashboard from "./components/Dashboard"

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await apiClient('/user/me')
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    /*if (isLoading) {
        return <div>Loading...</div>;
    }*/

    return (
        <div>
            <Dashboard />
        </div>
    );
}

export default App;