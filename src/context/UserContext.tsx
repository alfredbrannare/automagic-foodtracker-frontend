import {createContext, useEffect, useState} from "react";
import type {Goals, UpdateUserGoalsRequest, UserContextTypes, UserGoalsResponse, UserProviderProps} from "@/types/user";
import {getUserGoals, updateUserGoals} from "@/api/user.ts";

export const UserContext = createContext<UserContextTypes | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [userGoals, setUserGoals] = useState<Goals | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getUserGoals();
            setUserGoals(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const updateGoals = async (data: UpdateUserGoalsRequest) => {
        try {
            setLoading(true);
            setError(null);

            const updatedGoals: UserGoalsResponse = await updateUserGoals(data);
            setUserGoals(updatedGoals);
            return updatedGoals;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const value: UserContextTypes = {
        userGoals,
        loading,
        error,
        refetch: fetchItems,
        updateGoals: updateGoals
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}