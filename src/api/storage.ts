import apiClient from "@/api/apiClient.ts";
import { StorageItem, CreateStorageRequest, UpdateStorageRequest, StorageResponse } from '../types/storage/index';

export const getStorageItems = async (): Promise<StorageResponse[]> => {
    const response = await apiClient.get('/storage');

    return response.data;
};

export const createStorageItem = async (data: CreateStorageRequest): Promise<StorageResponse> => {
    const response = await apiClient.post('/storage', data);
    return response.data;
}

export const updateStorageItem = async (id: String, data: UpdateStorageRequest): Promise<StorageResponse> => {
    const response = await apiClient.put(`/storage/${id}`, data);

    return response.data;
};

export const deleteStorageItem = async (id: String): Promise<void> => {
    await apiClient.delete(`/storage/${id}`);
}