import React, { useState, useEffect } from 'react';
import DialogWrapper from '../../DialogWrapper';
import DialogResponseMessages from '../../DialogResponseMessages';
import { AxiosError } from 'axios';
import { useAddConsumable } from '@/data/hooks/definitions/useConsumablesData';
import type { Consumable, ConsumableType } from '@/data/models/entityModels';
import DialogActionButton from '@/components/dialog/DialogActionButton';
import SelectConsumableType from '@/components/select/SelectConsumableType';

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

  const [selectedConsumableType, setSelectedConsumableType] =
    useState<ConsumableType | null>(null);

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
    if (selectedConsumableType)
      mutate({
        ...newRecord,
        consumable_type_id: selectedConsumableType.id,
      });
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title='Matbuat Ekle'>
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
          <SelectConsumableType
            selected={selectedConsumableType}
            setSelected={setSelectedConsumableType}
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
    </DialogWrapper>
  );
}
