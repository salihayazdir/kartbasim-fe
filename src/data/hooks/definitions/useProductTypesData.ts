import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { ProductType } from '../models/entityModels';
import { axiosProtected } from '@/utils/axiosInstances';

const fetchProductTypes = async (): Promise<ResponseObject<ProductType[]>> => {
  const response = await axiosProtected.get('/api/product-types');
  return response.data;
};

export const useGetProductTypes = (
  onSuccess: (data: ResponseObject<ProductType[]>) => void,
  onError: (data: ResponseObject<ProductType[]>) => void
) => {
  return useQuery({
    queryKey: ['product-types'],
    queryFn: fetchProductTypes,
    onError,
    onSuccess,
  });
};

const addProductType = (
  productType: Omit<ProductType, 'id' | 'is_active' | 'is_deleted'>
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  return axiosProtected.post('/api/product-types', productType);
};

export const useAddProductType = () => {
  const queryClient = useQueryClient();
  return useMutation(addProductType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['product-types']);
    },
  });
};

const editProductType = (
  productType: ProductType
): Promise<AxiosResponse<ResponseObject<{ editedId: number }>>> => {
  return axiosProtected.put(
    `/api/product-types/${productType.id}`,
    productType
  );
};

export const useEditProductType = () => {
  const queryClient = useQueryClient();
  return useMutation(editProductType, {
    onSuccess: () => {
      queryClient.invalidateQueries(['product-types']);
    },
  });
};

const deleteProductType = (
  id: number
): Promise<AxiosResponse<ResponseObject<{ deletedId: number }>>> => {
  return axiosProtected.delete(`/api/product-types/${id}`);
};

export const useDeleteProductType = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProductType, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['product-types']);
      }, 3000);
    },
  });
};
