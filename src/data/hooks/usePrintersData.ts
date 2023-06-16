import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import type { ResponseObject } from '../models/dataTransferModels';
import type { Printer } from '../models/entityModels';
import { axiosProtected } from '@/utils/axiosInstances';

const fetchPrinters = async (): Promise<ResponseObject<Printer[]>> => {
  const response = await axiosProtected.get('/api/printers');
  return response.data;
};

export const useGetPrinters = (
  onSuccess: (data: ResponseObject<Printer[]>) => void,
  onError: (data: ResponseObject<Printer[]>) => void
) => {
  return useQuery({
    queryKey: ['printers'],
    queryFn: fetchPrinters,
    onError,
    onSuccess,
  });
};

const addPrinter = (
  printer: Omit<Printer, 'id' | 'is_active' | 'is_deleted'>
): Promise<AxiosResponse<ResponseObject<{ insertedId: number }>>> => {
  return axiosProtected.post('/api/printers', printer);
};

export const useAddPrinter = () => {
  const queryClient = useQueryClient();
  return useMutation(addPrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries(['printers']);
    },
  });
};

const editPrinter = (
  printer: Printer
): Promise<AxiosResponse<ResponseObject<{ editedId: number }>>> => {
  return axiosProtected.put(`/api/Printers/${printer.id}`, printer);
};

export const useEditPrinter = () => {
  const queryClient = useQueryClient();
  return useMutation(editPrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries(['printers']);
    },
  });
};

const deletePrinter = (
  id: number
): Promise<AxiosResponse<ResponseObject<{ deletedId: number }>>> => {
  return axiosProtected.delete(`/api/printers/${id}`);
};

export const useDeletePrinter = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePrinter, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['printers']);
      }, 3000);
    },
  });
};
