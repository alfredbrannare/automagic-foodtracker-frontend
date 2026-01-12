import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Dashboard, Auth } from '@/pages';


const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Checking credentials...</div>;
    }

    if (!isAuthenticated) {
        return <Auth />;
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