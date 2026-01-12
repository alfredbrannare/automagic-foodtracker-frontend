import { AuthProvider } from './context/AuthContext';
import {useAuthContext} from './hooks/useAuth';
import { Dashboard, Auth } from '@/pages';


const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthContext();

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