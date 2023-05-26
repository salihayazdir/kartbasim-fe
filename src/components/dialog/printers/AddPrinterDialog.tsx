import React, { useState, useEffect } from 'react';
import ModalWrapper from '../DialogWrapper';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';
import { useAddPrinter } from '@/data/hooks/usePrintersData';
import type { Printer } from '@/data/models/entityModels';
import DialogActionButton from '@/components/dialog/DialogActionButton';

type AddPrinterDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddPrinterDialog({
  open,
  setOpen,
}: React.PropsWithChildren<AddPrinterDialogProps>) {
  const [newRecord, setNewRecord] = useState<
    Omit<Printer, 'id' | 'is_active' | 'is_deleted'>
  >({
    name: '',
    model: '',
    serial_no: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, error, data, isSuccess } =
    useAddPrinter();

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
    <ModalWrapper open={open} setOpen={setOpen} title='Makine Ekle'>
      <form onSubmit={onSubmit} className='flex flex-col gap-6 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='name'>
            Makine İsmi
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
          <label className='font-semibold text-slate-700' htmlFor='model'>
            Model
          </label>
          <input
            value={newRecord.model}
            onChange={onChange}
            disabled={isLoading}
            id='model'
            required
            pattern='.{3,}'
            className='block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 '
          />
        </fieldset>

        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='serial_no'>
            Seri No
          </label>
          <input
            value={newRecord.serial_no}
            onChange={onChange}
            disabled={isLoading}
            id='serial_no'
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
          successMessage={`Makine başarıyla oluşturuldu. ID: ${data?.data.data.insertedId}`}
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
