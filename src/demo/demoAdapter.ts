import {AxiosError} from "axios";
import type {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {createDemoSeed} from "./demoData";
import type {DemoSeed, StorageEntity} from "./demoData";
import type {Nutrition} from "@/types/nutrition";
import type {CreateMealRequest, MealResponse, UpdateMealRequest} from "@/types/meal";
import type {CreateStorageRequest, StorageResponse, UpdateStorageRequest} from "@/types/storage";
import type {UpdateUserGoalsRequest, UserGoalsResponse} from "@/types/user";

// ---------------------------------------------------------------------------
// Small helpers mirroring backend semantics
// ---------------------------------------------------------------------------

// `entity/Nutrition.java#round`: round to 1 decimal.
const round1 = (value: number): number => Math.round(value * 10) / 10;

// `entity/Nutrition.java#scale`.
const scaleNutrition = (nutrition: Nutrition, weightInGrams: number): Nutrition => {
    const multiplier = weightInGrams / 100;
    return {
        protein: round1(nutrition.protein * multiplier),
        carbs: round1(nutrition.carbs * multiplier),
        fat: round1(nutrition.fat * multiplier),
        kcal: round1(nutrition.kcal * multiplier),
    };
};

// `entity/Storage.java` helper getters + `StorageMapper.toResponse`.
const toStorageResponse = (entity: StorageEntity): StorageResponse => {
    const remainingWeight = entity.totalWeight - entity.consumedWeight;

    return {
        id: entity.id,
        name: entity.name,
        totalWeight: entity.totalWeight,
        consumedWeight: entity.consumedWeight,
        weightPerMeal: entity.weightPerMeal,
        nutritionPer100g: entity.nutritionPer100g,
        lowStockThreshold: entity.lowStockThreshold,
        createdAt: entity.createdAt,
        // `StorageMapper.toResponse` never sets `updatedAt` -- it is always absent on the real
        // wire response. Nothing in the app reads this field; left empty for the same reason.
        updatedAt: "",
        mealsLeft: remainingWeight / entity.weightPerMeal,
        mealsLeftPercentage: round1((entity.consumedWeight / entity.totalWeight) * 100),
        lowStock: remainingWeight < entity.lowStockThreshold,
    };
};

// Axios has already JSON.stringified `config.data` by the time an adapter sees it.
const parseBody = <T,>(config: InternalAxiosRequestConfig): T => {
    const raw: unknown = config.data;
    if (typeof raw === "string" && raw.length > 0) {
        return JSON.parse(raw) as T;
    }
    return (raw ?? {}) as T;
};

const getDateParam = (config: InternalAxiosRequestConfig): string | undefined => {
    const params = config.params as {date?: unknown} | undefined;
    const date = params?.date;
    return typeof date === "string" ? date : undefined;
};

const getPath = (config: InternalAxiosRequestConfig): string => {
    const raw = config.url ?? "";
    const withoutQuery = raw.split("?")[0] ?? "";
    if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
        return withoutQuery.slice(0, -1);
    }
    return withoutQuery;
};

// `MealsController#getMeals` / `#getDailyNutritionSummary`: default to the server's current
// calendar date, day-boundaries computed in UTC.
const resolveTargetDate = (dateParam?: string): string => dateParam ?? new Date().toISOString().split("T")[0];

const isWithinUtcDay = (isoInstant: string, dateStr: string): boolean => {
    const dayStart = new Date(`${dateStr}T00:00:00.000Z`).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const t = new Date(isoInstant).getTime();
    return t >= dayStart && t < dayEnd;
};

class DemoApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

// ---------------------------------------------------------------------------
// In-memory store -- built lazily on first use (not at module load, since
// `apiClient.ts` statically imports this module for every visitor, demo or not) and
// then mutated in place for the rest of the session by the handlers below.
// ---------------------------------------------------------------------------

let store: DemoSeed | null = null;
const getStore = (): DemoSeed => (store ??= createDemoSeed());

const findStorageOrThrow = (id: string): StorageEntity => {
    const entity = getStore().storageItems.find((s) => s.id === id);
    if (!entity) {
        throw new DemoApiError(404, `Storage ${id} not found`);
    }
    return entity;
};

const findMealOrThrow = (id: string): MealResponse => {
    const meal = getStore().meals.find((m) => m.id === id);
    if (!meal) {
        throw new DemoApiError(404, `Meal ${id} not found`);
    }
    return meal;
};

const unlinkMealsForStorage = (storageId: string): void => {
    for (const meal of getStore().meals) {
        if (meal.storageId === storageId) {
            meal.storageId = null;
        }
    }
};

// `StorageServiceImpl#deleteStorage`: unlink linked meals (rather than deleting them), then
// drop the storage item itself.
const deleteStorageInternal = (storageId: string): void => {
    unlinkMealsForStorage(storageId);
    getStore().storageItems = getStore().storageItems.filter((s) => s.id !== storageId);
};

// `StorageServiceImpl#updateConsumedWeight`: clamps at 0, and fully consuming (or exceeding)
// the stock auto-deletes the storage item, mirroring the real (slightly surprising) backend
// behaviour exactly.
const updateConsumedWeight = (storageId: string, weightChange: number): void => {
    const entity = findStorageOrThrow(storageId);

    if (weightChange === 0) {
        return;
    }

    let newConsumedWeight = entity.consumedWeight + weightChange;
    if (newConsumedWeight < 0) {
        newConsumedWeight = 0;
    }

    if (newConsumedWeight >= entity.totalWeight) {
        deleteStorageInternal(storageId);
        return;
    }

    entity.consumedWeight = newConsumedWeight;
};

// `StorageServiceImpl#registerStorage` / `StorageMapper.toEntity`.
const createStorage = (body: CreateStorageRequest): StorageEntity => {
    const entity: StorageEntity = {
        id: crypto.randomUUID(),
        name: body.name,
        totalWeight: body.totalWeight,
        consumedWeight: 0,
        weightPerMeal: body.weightPerMeal,
        nutritionPer100g: body.nutritionPer100g,
        lowStockThreshold: body.lowStockThreshold,
        createdAt: body.createdAt ?? new Date().toISOString(),
    };
    getStore().storageItems.push(entity);
    return entity;
};

// `StorageServiceImpl#updateStorage` (+ the validation `StorageMapper.toEntity` does up front).
const updateStorage = (id: string, body: UpdateStorageRequest): StorageEntity => {
    if (body.lowStockThreshold > body.totalWeight) {
        throw new DemoApiError(400, "Low stock threshold cannot be greater than total weight");
    }
    if (body.weightPerMeal > body.totalWeight) {
        throw new DemoApiError(400, "Weight per meal cannot be greater than total weight");
    }

    const existing = findStorageOrThrow(id);
    existing.name = body.name;
    existing.totalWeight = body.totalWeight;
    existing.weightPerMeal = body.weightPerMeal;
    existing.lowStockThreshold = body.lowStockThreshold;
    existing.nutritionPer100g = body.nutritionPer100g;
    // `createdAt` deliberately untouched: the real service never copies it from the request.

    // Reconciliation pass: every meal still linked to this item gets its name/nutrition
    // recomputed against the (possibly changed) per-100g values -- same net effect as the real
    // service re-running `updateMeal` for each linked meal with an unchanged weight/storageId.
    for (const meal of getStore().meals) {
        if (meal.storageId === id) {
            meal.name = existing.name;
            meal.nutrition = scaleNutrition(existing.nutritionPer100g, meal.weight);
        }
    }

    return existing;
};

const deleteStorageRoute = (id: string): void => {
    findStorageOrThrow(id);
    deleteStorageInternal(id);
};

const getGoals = (): UserGoalsResponse => getStore().goals;

const updateGoalsInternal = (body: UpdateUserGoalsRequest): UserGoalsResponse => {
    getStore().goals = {
        targetProtein: body.targetProtein,
        targetCarbs: body.targetCarbs,
        targetFat: body.targetFat,
        targetCalories: body.targetCalories,
    };
    return getStore().goals;
};

// `MealServiceImpl#registerMeal`: when created from a storage item, name + nutrition are
// overwritten from that storage item's per-100g nutrition, scaled by the request weight.
// When there is no storage item, `MealMapper.toEntity(CreateMealRequest)` still unconditionally
// does `request.getNutrition().scale(request.getWeight())` -- the client sends per-100g values
// (see `AddMealDialog`'s "per 100g" labels) and the backend always scales them by weight, so the
// non-storage path must scale here too, not just take `body.nutrition` verbatim.
const createMeal = (body: CreateMealRequest): MealResponse => {
    let name = body.name;
    let nutrition = scaleNutrition(body.nutrition, body.weight);

    if (body.storageId) {
        const storage = findStorageOrThrow(body.storageId);
        name = storage.name;
        nutrition = scaleNutrition(storage.nutritionPer100g, body.weight);
        updateConsumedWeight(storage.id, body.weight);
    }

    const meal: MealResponse = {
        id: crypto.randomUUID(),
        name,
        weight: body.weight,
        consumedAt: body.consumedAt ?? new Date().toISOString(),
        nutrition,
        storageId: body.storageId ?? null,
    };

    getStore().meals.push(meal);
    return meal;
};

// `MealServiceImpl#deleteMeal`.
const deleteMealInternal = (id: string): void => {
    const meal = findMealOrThrow(id);
    if (meal.storageId) {
        updateConsumedWeight(meal.storageId, -meal.weight);
    }
    getStore().meals = getStore().meals.filter((m) => m.id !== id);
};

// `MealServiceImpl#updateMeal` -- the full storage-reconciliation branch matrix, ported
// faithfully (null -> id, id -> null, id -> different id, same id with changed weight).
const updateMealInternal = (id: string, body: UpdateMealRequest): MealResponse => {
    const existing = findMealOrThrow(id);

    const existingStorageId = existing.storageId;
    const existingWeight = existing.weight;
    const newStorageId = body.storageId ?? null;
    const newWeight = body.weight;

    existing.weight = newWeight;
    existing.consumedAt = body.consumedAt;

    if (newStorageId !== null) {
        const storage = findStorageOrThrow(newStorageId);
        existing.name = storage.name;
        existing.nutrition = scaleNutrition(storage.nutritionPer100g, newWeight);
    } else {
        existing.name = body.name;
        existing.nutrition = scaleNutrition(body.nutrition, newWeight);
    }

    if (existingStorageId !== null || newStorageId !== null) {
        if (existingStorageId === null && newStorageId !== null) {
            updateConsumedWeight(newStorageId, newWeight);
        } else if (existingStorageId !== null && newStorageId === null) {
            updateConsumedWeight(existingStorageId, -existingWeight);
        } else if (existingStorageId !== null && newStorageId !== null) {
            if (existingStorageId !== newStorageId) {
                updateConsumedWeight(existingStorageId, -existingWeight);
                updateConsumedWeight(newStorageId, newWeight);
            } else if (newWeight !== existingWeight) {
                updateConsumedWeight(newStorageId, newWeight - existingWeight);
            }
        }
    }

    existing.storageId = newStorageId;
    return existing;
};

// `MealsController#getMeals`.
const listMeals = (dateParam?: string): MealResponse[] => {
    const targetDate = resolveTargetDate(dateParam);
    return getStore().meals.filter((m) => isWithinUtcDay(m.consumedAt, targetDate));
};

// `MealServiceImpl#getDailyNutrition`: totals rounded to whole numbers.
const getSummary = (dateParam?: string): Nutrition => {
    const meals = listMeals(dateParam);
    const totals = meals.reduce<Nutrition>(
        (acc, m) => ({
            protein: acc.protein + m.nutrition.protein,
            carbs: acc.carbs + m.nutrition.carbs,
            fat: acc.fat + m.nutrition.fat,
            kcal: acc.kcal + m.nutrition.kcal,
        }),
        {protein: 0, carbs: 0, fat: 0, kcal: 0},
    );

    return {
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fat: Math.round(totals.fat),
        kcal: Math.round(totals.kcal),
    };
};

// ---------------------------------------------------------------------------
// Route table + dispatch
// ---------------------------------------------------------------------------

interface RouteResult {
    status: number;
    data: unknown;
}

type RouteHandler = (config: InternalAxiosRequestConfig, params: string[]) => RouteResult;

interface Route {
    method: string;
    pattern: RegExp;
    handler: RouteHandler;
}

const routes: Route[] = [
    {method: "get", pattern: /^\/auth\/check$/, handler: () => ({status: 200, data: undefined})},
    {method: "post", pattern: /^\/auth\/logout$/, handler: () => ({status: 200, data: undefined})},
    {method: "delete", pattern: /^\/me$/, handler: () => ({status: 204, data: undefined})},

    {method: "get", pattern: /^\/me\/goals$/, handler: () => ({status: 200, data: getGoals()})},
    {
        method: "put",
        pattern: /^\/me\/goals$/,
        handler: (config) => ({status: 200, data: updateGoalsInternal(parseBody(config))}),
    },

    {method: "get", pattern: /^\/storage$/, handler: () => ({status: 200, data: getStore().storageItems.map(toStorageResponse)})},
    {
        method: "post",
        pattern: /^\/storage$/,
        handler: (config) => ({status: 201, data: toStorageResponse(createStorage(parseBody(config)))}),
    },
    {
        method: "put",
        pattern: /^\/storage\/([^/]+)$/,
        handler: (config, params) => ({status: 200, data: toStorageResponse(updateStorage(params[0], parseBody(config)))}),
    },
    {
        method: "delete",
        pattern: /^\/storage\/([^/]+)$/,
        handler: (_config, params) => {
            deleteStorageRoute(params[0]);
            return {status: 204, data: undefined};
        },
    },

    {
        method: "get",
        pattern: /^\/meals\/summary$/,
        handler: (config) => ({status: 200, data: getSummary(getDateParam(config))}),
    },
    {method: "get", pattern: /^\/meals$/, handler: (config) => ({status: 200, data: listMeals(getDateParam(config))})},
    {method: "post", pattern: /^\/meals$/, handler: (config) => ({status: 201, data: createMeal(parseBody(config))})},
    {
        method: "put",
        pattern: /^\/meals\/([^/]+)$/,
        handler: (config, params) => ({status: 200, data: updateMealInternal(params[0], parseBody(config))}),
    },
    {
        method: "delete",
        pattern: /^\/meals\/([^/]+)$/,
        handler: (_config, params) => {
            deleteMealInternal(params[0]);
            return {status: 204, data: undefined};
        },
    },
];

const MIN_LATENCY_MS = 150;
const MAX_LATENCY_MS = 250;

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const randomLatency = (): number => MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);

const STATUS_TEXT: Record<number, string> = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    404: "Not Found",
};

const DEFAULT_VALIDATE_STATUS = (status: number): boolean => status >= 200 && status < 300;

// Mirrors axios' own internal `settle()`: always builds a response, then resolves or rejects
// based on `validateStatus` -- so a non-2xx here rejects with a real `AxiosError` carrying a
// `.response`, exactly like the real xhr/fetch adapters do.
const settleLikeAxios = (config: InternalAxiosRequestConfig, status: number, data: unknown): Promise<AxiosResponse> => {
    const response: AxiosResponse = {
        data,
        status,
        statusText: STATUS_TEXT[status] ?? "",
        headers: {},
        config,
    };

    const validateStatus = config.validateStatus ?? DEFAULT_VALIDATE_STATUS;
    if (validateStatus(status)) {
        return Promise.resolve(response);
    }

    return Promise.reject(
        new AxiosError(
            `Request failed with status code ${status}`,
            status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
            config,
            undefined,
            response,
        ),
    );
};

// The axios adapter itself. Resolves every request against the in-memory demo store instead
// of making a real network call.
export const demoAdapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
    await wait(randomLatency());

    const method = (config.method ?? "get").toLowerCase();
    const path = getPath(config);

    for (const route of routes) {
        if (route.method !== method) {
            continue;
        }

        const match = path.match(route.pattern);
        if (!match) {
            continue;
        }

        try {
            const {status, data} = route.handler(config, match.slice(1));
            return await settleLikeAxios(config, status, data);
        } catch (error) {
            if (error instanceof DemoApiError) {
                return settleLikeAxios(config, error.status, {message: error.message});
            }
            throw error;
        }
    }

    return settleLikeAxios(config, 404, {message: `No demo route for ${method.toUpperCase()} ${path}`});
};
