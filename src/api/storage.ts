import apiClient from "@/api/apiClient.ts";
import type { StorageResponse, CreateStorageRequest, UpdateStorageRequest } from '../types/storage';

export const getStorageItems = async (): Promise<StorageResponse[]> => {
    const response = await apiClient.get('/storage');

    return response.data;
};

export const createStorageItem = async (data: CreateStorageRequest): Promise<StorageResponse> => {
    const response = await apiClient.post('/storage', data);
    return response.data;
}

export const updateStorageItem = async (id: string, data: UpdateStorageRequest): Promise<StorageResponse> => {
    const response = await apiClient.put(`/storage/${id}`, data);

    return response.data;
};

export const deleteStorageItem = async (id: string): Promise<void> => {
    await apiClient.delete(`/storage/${id}`);
}