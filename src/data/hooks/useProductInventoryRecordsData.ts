import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { Bank, ProductInventoryRecords } from '../models/entityModels';
import { axiosProtected } from '@/utils/axiosInstances';

const fetchProductInventoryRecords = async (): Promise<
  ResponseObject<ProductInventoryRecords[]>
> => {
  const response = await axiosProtected.get('/api/product-inventory-records');
  return response.data;
};

export const useProductInventoryRecordsData = (
  onSuccess: (data: ResponseObject<ProductInventoryRecords[]>) => void,
  onError: (data: ResponseObject<ProductInventoryRecords[]>) => void
) => {
  return useQuery({
    queryKey: ['product-inventory-records'],
    queryFn: fetchProductInventoryRecords,
    onError,
    onSuccess,
  });
};

const addRecord = (
  name: string
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  const requestBody = {
    name,
  };
  return axiosProtected.post('/api/product-inventory-records', requestBody);
};

export const useAddRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(addRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries(['product-inventory-records']);
    },
  });
};
