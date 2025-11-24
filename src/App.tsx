import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Dashboard } from './pages/Dashboard';


const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Checking credentials...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in (LoginForm will go here)</div>;
    }

    return (
        <>
        <Dashboard />
        </>
    );
}

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;