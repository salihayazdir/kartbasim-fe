import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { Bank } from '../models/entityModels';

const fetchBanks = async (): Promise<ResponseObject<Bank[]>> => {
  const response = await axios.get('/api/banks');
  return response.data;
};

export const useGetBanks = (
  onSuccess: (data: ResponseObject<Bank[]>) => void,
  onError: (data: ResponseObject<Bank[]>) => void
) => {
  return useQuery({
    queryKey: ['getBanks'],
    queryFn: fetchBanks,
    onError,
    onSuccess,
  });
};

const addBank = (
  name: string
): Promise<AxiosResponse<ResponseObject<{ insertedBankId: number }>>> => {
  const requestBody = {
    name,
  };
  return axios.post('/api/banks', requestBody);
};

export const useAddBank = () => {
  const queryClient = useQueryClient();
  return useMutation(addBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getBanks']);
    },
  });
};

const editBank = (bank: Bank) => {
  const { id, name, is_active } = bank;
  const requestBody = {
    name,
    is_active,
  };
  return axios.put(`/api/banks/${id}`, requestBody);
};

export const useEditBank = () => {
  const queryClient = useQueryClient();
  return useMutation(editBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getBanks']);
    },
  });
};

const deleteBank = (id: number) => {
  return axios.delete(`/api/banks/${id}`);
};

export const useDeleteBank = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBank, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['getBanks']);
      }, 3000);
    },
  });
};