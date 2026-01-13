export interface Goals {
    targetProtein: number;
    targetCarbs: number;
    targetFat: number;
    targetCalories: number;
}

export interface UpdateUserGoalsRequest {
    targetProtein: number;
    targetCarbs: number;
    targetFat: number;
    targetCalories: number;
}

export interface UserGoalsResponse {
    targetProtein: number;
    targetCarbs: number;
    targetFat: number;
    targetCalories: number;
}

export interface UserContextTypes {
    userGoals: Goals | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    updateGoals: (data: UpdateUserGoalsRequest) => Promise<UserGoalsResponse>;
}

export interface UserProviderProps {
    children: React.ReactNode;
}