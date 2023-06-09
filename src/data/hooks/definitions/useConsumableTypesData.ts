import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { ConsumableType } from '../models/entityModels';
import { axiosProtected } from '@/utils/axiosInstances';

const fetchConsumableTypes = async (): Promise<
  ResponseObject<ConsumableType[]>
> => {
  const response = await axiosProtected.get('/api/consumable-types');
  return response.data;
};

export const useGetConsumableTypes = (
  onSuccess: (data: ResponseObject<ConsumableType[]>) => void,
  onError: (data: ResponseObject<ConsumableType[]>) => void
) => {
  return useQuery({
    queryKey: ['consumable-types'],
    queryFn: fetchConsumableTypes,
    onError,
    onSuccess,
  });
};

const addConsumableType = (
  consumableType: Omit<ConsumableType, 'id' | 'is_active' | 'is_deleted'>
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  return axiosProtected.post('/api/consumable-types', consumableType);
};

export const useAddConsumableType = () => {
  const queryClient = useQueryClient();
  return useMutation(addConsumableType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['consumable-types']);
    },
  });
};

const editConsumableType = (
  consumableType: ConsumableType
): Promise<AxiosResponse<ResponseObject<{ editedId: number }>>> => {
  return axiosProtected.put(
    `/api/consumable-types/${consumableType.id}`,
    consumableType
  );
};

export const useEditConsumableType = () => {
  const queryClient = useQueryClient();
  return useMutation(editConsumableType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['consumable-types']);
    },
  });
};

const deleteConsumableType = (
  id: number
): Promise<AxiosResponse<ResponseObject<{ deletedId: number }>>> => {
  return axiosProtected.delete(`/api/consumable-types/${id}`);
};

export const useDeleteConsumableType = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteConsumableType, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['consumable-types']);
      }, 3000);
    },
  });
};
