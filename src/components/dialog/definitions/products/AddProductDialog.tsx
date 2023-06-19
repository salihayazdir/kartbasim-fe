import React, { useState, useEffect } from 'react';
import DialogWrapper from '../../DialogWrapper';
import DialogResponseMessages from '../../DialogResponseMessages';
import { AxiosError } from 'axios';
import { useAddProduct } from '@/data/hooks/definitions/useProductsData';
import type {
  Product,
  ProductGroup,
  ProductType,
} from '@/data/models/entityModels';
import DialogActionButton from '@/components/dialog/DialogActionButton';
import SelectProductGroup from '@/components/select/SelectProductGroup';
import SelectProductType from '@/components/select/SelectProductType';

type AddProductDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddProductDialog({
  open,
  setOpen,
}: React.PropsWithChildren<AddProductDialogProps>) {
  const [newRecord, setNewRecord] = useState<
    Omit<
      Product,
      | 'id'
      | 'main_safe_quantity'
      | 'daily_safe_quantity'
      | 'product_group_id'
      | 'product_type_id'
      | 'is_active'
      | 'is_deleted'
    >
  >({
    name: '',
    client_id: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [selectedProductGroup, setSelectedProductGroup] =
    useState<ProductGroup | null>(null);
  const [selectedProductType, setSelectedProductType] =
    useState<ProductType | null>(null);

  const { mutate, isLoading, isError, error, data, isSuccess } =
    useAddProduct();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewRecord((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget?.client_id?.value);
    if (selectedProductGroup && selectedProductType)
      mutate({
        ...newRecord,
        product_group_id: selectedProductGroup.id,
        product_type_id: selectedProductType.id,
      });
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title='Ürün Ekle'>
      <form onSubmit={onSubmit} className='flex flex-col gap-6 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='name'>
            Ürün İsmi
          </label>
          <input
            value={newRecord.name}
            onChange={onChange}
            disabled={isLoading}
            required
            pattern='.{3,}'
            id='name'
            className='block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 '
          />
        </fieldset>

        <fieldset className='flex flex-col gap-1'>
          <label
            className='font-semibold text-slate-700'
            htmlFor='product_group_id'
          >
            Ürün Grubu
          </label>
          <SelectProductGroup
            selected={selectedProductGroup}
            setSelected={setSelectedProductGroup}
          />
        </fieldset>

        <fieldset className='flex flex-col gap-1'>
          <label
            className='font-semibold text-slate-700'
            htmlFor='product_type_id'
          >
            Ürün Tipi
          </label>
          <SelectProductType
            selected={selectedProductType}
            setSelected={setSelectedProductType}
          />
        </fieldset>

        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='client_id'>
            Müşteri Kodu
          </label>
          <input
            value={newRecord.client_id}
            onChange={onChange}
            disabled={isLoading}
            id='client_id'
            required
            pattern='.{3,}'
            className='block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 '
          />
        </fieldset>

        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='description'>
            Açıklama
          </label>
          <input
            value={newRecord.description}
            onChange={onChange}
            disabled={isLoading}
            id='description'
            className='block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 '
          />
        </fieldset>

        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Ürün oluşturuldu. ID: ${data?.data.data.insertedId}`}
        />
        <DialogActionButton
          closeButtonOnClick={() => setOpen(false)}
          isSuccess={isSuccess}
          type='submit'
          disabled={isLoading}
        >
          Gönder
        </DialogActionButton>
      </form>
    </DialogWrapper>
  );
}
