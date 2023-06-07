import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { Consumable } from '../models/entityModels';

const fetchConsumables = async (): Promise<ResponseObject<Consumable[]>> => {
  const response = await axios.get('/api/consumables');
  return response.data;
};

export const useGetConsumables = (
  onSuccess: (data: ResponseObject<Consumable[]>) => void,
  onError: (data: ResponseObject<Consumable[]>) => void
) => {
  return useQuery({
    queryKey: ['consumables'],
    queryFn: fetchConsumables,
    onError,
    onSuccess,
  });
};

const addConsumable = (
  consumable: Omit<
    Consumable,
    'id' | 'stock_quantity' | 'is_active' | 'is_deleted'
  >
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  return axios.post('/api/consumables', consumable);
};

export const useAddConsumable = () => {
  const queryClient = useQueryClient();
  return useMutation(addConsumable, {
    onSuccess: () => {
      queryClient.invalidateQueries(['consumables']);
    },
  });
};

const editConsumable = (
  consumable: Consumable
): Promise<AxiosResponse<ResponseObject<{ editedId: number }>>> => {
  return axios.put(`/api/consumables/${consumable.id}`, consumable);
};

export const useEditConsumable = () => {
  const queryClient = useQueryClient();
  return useMutation(editConsumable, {
    onSuccess: () => {
      queryClient.invalidateQueries(['consumables']);
    },
  });
};

const deleteConsumable = (
  id: number
): Promise<AxiosResponse<ResponseObject<{ deletedId: number }>>> => {
  return axios.delete(`/api/consumables/${id}`);
};

export const useDeleteConsumable = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteConsumable, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['consumables']);
      }, 3000);
    },
  });
};
