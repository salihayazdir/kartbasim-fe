import React, { useState, useEffect } from 'react';
import ModalWrapper from '../DialogWrapper';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';
import { useAddConsumable } from '@/data/hooks/useConsumablesData';
import type { Consumable } from '@/data/models/entityModels';
import DialogActionButton from '@/components/dialog/DialogActionButton';

type AddConsumableDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddConsumableDialog({
  open,
  setOpen,
}: React.PropsWithChildren<AddConsumableDialogProps>) {
  const [newRecord, setNewRecord] = useState<
    Omit<Consumable, 'id' | 'stock_quantity' | 'is_active' | 'is_deleted'>
  >({
    name: '',
    consumable_type_id: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, error, data, isSuccess } =
    useAddConsumable();

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
    mutate(newRecord);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen} title='Matbuat Ekle'>
      <form onSubmit={onSubmit} className='flex flex-col gap-6 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='name'>
            Matbuat İsmi
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
            htmlFor='consumable_type_id'
          >
            Matbuat Türü
          </label>
          <input
            value={newRecord.consumable_type_id}
            onChange={onChange}
            disabled={isLoading}
            id='consumable_type_id'
            required
            type='number'
            className='block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 '
          />
        </fieldset>

        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Matbuat oluşturuldu. ID: ${data?.data.data.insertedId}`}
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
    </ModalWrapper>
  );
}
