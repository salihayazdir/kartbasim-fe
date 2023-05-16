import React, { useState, useEffect } from 'react';
import { useAddBank } from '@/data/hooks/useBanksData';
import ModalWrapper from '../DialogWrapper';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';

type AddBankDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddBankDialog({
  open,
  setOpen,
}: React.PropsWithChildren<AddBankDialogProps>) {
  const [newBankName, setNewBankName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, error, data, isSuccess } = useAddBank();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const newBankNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBankName(e.target.value);
  };

  const addBankOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(newBankName);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen} title='Banka Ekle'>
      <form onSubmit={addBankOnSubmit} className='flex flex-col gap-6 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='bankName'>
            Banka İsmi
          </label>
          <input
            value={newBankName}
            onChange={newBankNameOnChange}
            disabled={isLoading}
            id='bankName'
            className='block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 '
          />
        </fieldset>
        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Banka başarıyla oluşturuldu. ID: ${data?.data.data.insertedBankId}`}
        />
        <button
          type='submit'
          disabled={isLoading}
          className='rounded-lg bg-blue-700 px-6 py-3 text-sm  font-medium uppercase tracking-wider text-white hover:bg-blue-800'
        >
          Gönder
        </button>
      </form>
    </ModalWrapper>
  );
}
