import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { Product } from '../models/entityModels';

const fetchProducts = async (): Promise<ResponseObject<Product[]>> => {
  const response = await axios.get('/api/products');
  return response.data;
};

export const useGetProducts = (
  onSuccess: (data: ResponseObject<Product[]>) => void,
  onError: (data: ResponseObject<Product[]>) => void
) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    onError,
    onSuccess,
  });
};

const addProduct = (
  product: Omit<
    Product,
    | 'id'
    | 'main_safe_quantity'
    | 'daily_safe_quantity'
    | 'is_active'
    | 'is_deleted'
  >
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  return axios.post('/api/products', product);
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};

const editProduct = (
  product: Product
): Promise<AxiosResponse<ResponseObject<{ editedId: number }>>> => {
  return axios.put(`/api/products/${product.id}`, product);
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};

const deleteProduct = (
  id: number
): Promise<AxiosResponse<ResponseObject<{ deletedId: number }>>> => {
  return axios.delete(`/api/products/${id}`);
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['products']);
      }, 3000);
    },
  });
};
