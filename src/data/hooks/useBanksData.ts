import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { Bank } from '../models/entityModels';
import { axiosProtected } from '@/utils/axiosInstances';

const fetchBanks = async (): Promise<ResponseObject<Bank[]>> => {
  const response = await axiosProtected.get('/api/banks');
  return response.data;
};

export const useGetBanks = (
  onSuccess: (data: ResponseObject<Bank[]>) => void,
  onError: (data: ResponseObject<Bank[]>) => void
) => {
  return useQuery({
    queryKey: ['banks'],
    queryFn: fetchBanks,
    onError,
    onSuccess,
  });
};

const addBank = (
  name: string
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  const requestBody = {
    name,
  };
  return axiosProtected.post('/api/banks', requestBody);
};

export const useAddBank = () => {
  const queryClient = useQueryClient();
  return useMutation(addBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['banks']);
    },
  });
};

const editBank = (bank: Bank) => {
  const { id, name, is_active } = bank;
  const requestBody = {
    name,
    is_active,
  };
  return axiosProtected.put(`/api/banks/${id}`, requestBody);
};

export const useEditBank = () => {
  const queryClient = useQueryClient();
  return useMutation(editBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['banks']);
    },
  });
};

const deleteBank = (
  id: number
): Promise<AxiosResponse<ResponseObject<{ deletedId: number }>>> => {
  return axiosProtected.delete(`/api/banks/${id}`);
};

export const useDeleteBank = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBank, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['banks']);
      }, 3000);
    },
  });
};
