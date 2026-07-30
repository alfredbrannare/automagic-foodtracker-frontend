import type {Nutrition} from "@/types/nutrition";
import type {Goals} from "@/types/user";
import type {MealResponse} from "@/types/meal";

// Raw storage record as it would live in the backend's `storage` table -- i.e. without the
// derived fields (`mealsLeft`, `mealsLeftPercentage`, `lowStock`) that `StorageMapper.toResponse`
// computes on the way out. The demo adapter derives those at response time, mirroring
// `entity/Storage.java`.
export interface StorageEntity {
    id: string;
    name: string;
    totalWeight: number;
    consumedWeight: number;
    weightPerMeal: number;
    nutritionPer100g: Nutrition;
    lowStockThreshold: number;
    createdAt: string;
}

export interface DemoSeed {
    goals: Goals;
    storageItems: StorageEntity[];
    meals: MealResponse[];
}

const daysAgoIso = (days: number): string =>
    new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

// Builds a timestamp for *today* at a fixed UTC hour/minute. Using a fixed UTC time (rather
// than e.g. "now + 9h" like `DemoAccountService` does) guarantees the seeded meals always land
// inside today's UTC day-boundary filter in `MealsController.getMeals`, no matter what time of
// day the demo happens to be loaded.
const todayAtUtcTime = (hours: number, minutes: number): string => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hours, minutes, 0)).toISOString();
};

// Returns a brand new seed graph on every call -- no module-level mutable state lives here.
// The demo adapter calls this once to initialize its own in-memory store, which it then owns
// and mutates for the rest of the session.
export const createDemoSeed = (): DemoSeed => {
    const chickenId = crypto.randomUUID();
    const riceId = crypto.randomUUID();
    const oatsId = crypto.randomUUID();

    // Mirrors `DemoAccountService.seedDemoData`: same names, weights, per-100g nutrition and
    // thresholds as the real seeded `demo` account, so a returning user sees the same story.
    const storageItems: StorageEntity[] = [
        {
            id: chickenId,
            name: "Grilled Chicken Breast",
            totalWeight: 2000,
            consumedWeight: 450,
            weightPerMeal: 150,
            nutritionPer100g: {protein: 31, carbs: 0, fat: 3.6, kcal: 165},
            lowStockThreshold: 300,
            createdAt: daysAgoIso(5),
        },
        {
            id: riceId,
            name: "Brown Rice",
            totalWeight: 1500,
            consumedWeight: 900,
            weightPerMeal: 200,
            nutritionPer100g: {protein: 2.6, carbs: 23, fat: 0.9, kcal: 111},
            lowStockThreshold: 400,
            createdAt: daysAgoIso(5),
        },
        // Third item, already below its own low-stock threshold, so the low-stock styling in
        // `StorageItem` is visible without the visitor having to do anything first.
        {
            id: oatsId,
            name: "Rolled Oats",
            totalWeight: 500,
            consumedWeight: 420,
            weightPerMeal: 50,
            nutritionPer100g: {protein: 13.5, carbs: 68, fat: 6.9, kcal: 379},
            lowStockThreshold: 100,
            createdAt: daysAgoIso(2),
        },
    ];

    // Exactly one meal per linked storage item, so `consumedWeight` (above) is always >= the
    // sum of that item's linked meal weights -- deleting a seeded meal reduces consumedWeight
    // but can never drive it negative.
    const meals: MealResponse[] = [
        {
            id: crypto.randomUUID(),
            name: "Grilled Chicken Breast",
            weight: 150,
            consumedAt: todayAtUtcTime(11, 0),
            nutrition: {protein: 46.5, carbs: 0, fat: 5.4, kcal: 247.5},
            storageId: chickenId,
        },
        {
            id: crypto.randomUUID(),
            name: "Brown Rice",
            weight: 200,
            consumedAt: todayAtUtcTime(12, 0),
            nutrition: {protein: 5.2, carbs: 46, fat: 1.8, kcal: 222},
            storageId: riceId,
        },
    ];

    const goals: Goals = {
        targetProtein: 150,
        targetCarbs: 250,
        targetFat: 60,
        targetCalories: 2000,
    };

    return {goals, storageItems, meals};
};
