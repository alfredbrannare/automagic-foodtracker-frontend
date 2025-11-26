import { NavigationBar } from "../components/layout/NavigationBar"
import { StorageSection } from "../components/feature/index";

export const Dashboard = () => {
    return (
        <main className="min-h-screen">
            <NavigationBar />
            <StorageSection />
        </main>
    );
}