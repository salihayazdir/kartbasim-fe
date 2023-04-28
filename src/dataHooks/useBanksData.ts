import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export type Bank = {
  bank_id: number;
  bank_name: string;
  is_active: boolean;
};

export type GetBanksResponse = {
  success: boolean;
  recordset: Bank[];
};

const fetchBanks = async (): Promise<GetBanksResponse> => {
  const response = await axios.get('/api/banks');
  return response.data;
};

export const useGetBanks = (
  onSuccess: (data: GetBanksResponse) => void,
  onError: (data: GetBanksResponse) => void
) => {
  return useQuery({
    queryKey: ['getBanks'],
    queryFn: fetchBanks,
    onError,
    onSuccess,
  });
};

const addBank = (bankName: string) => {
  const reqData = {
    bankName,
  };
  return axios.post('/api/banks', reqData);
};

export const useAddBank = () => {
  const queryClient = useQueryClient();
  return useMutation(addBank, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getBanks']);
    },
  });
};
