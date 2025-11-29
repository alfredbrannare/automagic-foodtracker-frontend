import { NavigationBar } from "../components/layout/NavigationBar"
import { StorageSection } from "../components/feature/index";
import { StorageProvider } from "../context/StorageContext";

export const Dashboard = () => {
    return (
        <StorageProvider>
        <main className="min-h-screen m-2">
            <NavigationBar />
            <div className="flex flex-col items-center">
                <StorageSection />
            </div>
        </main>
        </StorageProvider>
    );
}