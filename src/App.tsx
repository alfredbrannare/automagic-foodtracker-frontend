import { AuthProvider } from './context/AuthContext';
import {useAuthContext} from './hooks/useAuth';
import { Dashboard, Auth } from '@/pages';
import {Spinner} from "@/components/ui";


const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-2">
                Checking credentials...
                <Spinner />
            </div>
        )
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