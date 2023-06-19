import React, { useState, useEffect } from 'react';
import DialogWrapper from '../../DialogWrapper';
import DialogResponseMessages from '../../DialogResponseMessages';
import { AxiosError } from 'axios';
import { useAddProductGroup } from '@/data/hooks/definitions/useProductGroupsData';
import type { Bank, ProductGroup } from '@/data/models/entityModels';
import DialogActionButton from '@/components/dialog/DialogActionButton';
import SelectBank from '@/components/select/SelectBank';

type AddProductGroupDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddProductGroupDialog({
  open,
  setOpen,
}: React.PropsWithChildren<AddProductGroupDialogProps>) {
  const [newRecord, setNewRecord] = useState<
    Omit<ProductGroup, 'id' | 'is_active' | 'bank_id' | 'is_deleted'>
  >({
    name: '',
    client_id: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const { mutate, isLoading, isError, error, data, isSuccess } =
    useAddProductGroup();

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
    if (selectedBank)
      mutate({
        ...newRecord,
        bank_id: selectedBank.id,
      });
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title='Ürün Grubu Ekle'>
      <form onSubmit={onSubmit} className='flex flex-col gap-6 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='name'>
            Ürün Grubu İsmi
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
          <label className='font-semibold text-slate-700' htmlFor='bank_id'>
            Banka
          </label>
          <SelectBank selected={selectedBank} setSelected={setSelectedBank} />
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
          successMessage={`Ürün grubu oluşturuldu. ID: ${data?.data.data.insertedId}`}
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
