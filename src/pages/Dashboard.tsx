import { NavigationBar } from "../components/layout/NavigationBar"
import { StorageSection } from "../components/feature/index";
import { StorageProvider } from "../context/StorageContext";

export const Dashboard = () => {
    return (
        <StorageProvider>
        <main className="min-h-screen">
            <NavigationBar />
            <StorageSection />
        </main>
        </StorageProvider>
    );
}