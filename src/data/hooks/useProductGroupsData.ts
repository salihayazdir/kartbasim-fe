import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { ProductGroup } from '../models/entityModels';

const fetchProductGroups = async (): Promise<
  ResponseObject<ProductGroup[]>
> => {
  const response = await axios.get('/api/product-groups');
  return response.data;
};

export const useGetProductGroups = (
  onSuccess: (data: ResponseObject<ProductGroup[]>) => void,
  onError: (data: ResponseObject<ProductGroup[]>) => void
) => {
  return useQuery({
    queryKey: ['product-groups'],
    queryFn: fetchProductGroups,
    onError,
    onSuccess,
  });
};

const addProductGroup = (
  productGroup: Omit<ProductGroup, 'id' | 'is_active' | 'is_deleted'>
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  return axios.post('/api/product-groups', productGroup);
};

export const useAddProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(addProductGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(['product-groups']);
    },
  });
};

const editProductGroup = (
  productGroup: ProductGroup
): Promise<AxiosResponse<ResponseObject<{ editedId: number }>>> => {
  return axios.put(`/api/product-groups/${productGroup.id}`, productGroup);
};

export const useEditProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(editProductGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(['product-groups']);
    },
  });
};

const deleteProductGroup = (
  id: number
): Promise<AxiosResponse<ResponseObject<{ deletedId: number }>>> => {
  return axios.delete(`/api/product-groups/${id}`);
};

export const useDeleteProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProductGroup, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['product-groups']);
      }, 3000);
    },
  });
};
