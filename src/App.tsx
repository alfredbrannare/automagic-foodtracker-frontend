import { AuthProvider } from './context/AuthContext';
import {useAuthContext} from './hooks/useAuth';
import { Dashboard, Auth } from '@/pages';
import {isDemoMode} from '@/demo/demoMode';


const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthContext();

    // Demo mode never waits on auth -- it makes no real network calls at all.
    if (isDemoMode()) {
        return <Dashboard />;
    }

    // Render the landing page immediately instead of blocking on the auth check (which can
    // take 30-60s on a cold backend). It flips to the dashboard once the check resolves
    // authenticated; until then "Try demo" is visible right away.
    if (!isAuthenticated) {
        return <Auth isCheckingSession={isLoading} />;
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