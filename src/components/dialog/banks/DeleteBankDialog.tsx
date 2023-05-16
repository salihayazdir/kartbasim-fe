import React, { useState, useEffect } from 'react';
import { useDeleteBank } from '@/data/hooks/useBanksData';
import type { Bank } from '@/data/models/entityModels';
import DialogWrapper from '../DialogWrapper';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';

type DeleteBankDialogProps = {
  bank: Bank;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBank: React.Dispatch<React.SetStateAction<Bank | null>>;
};

export default function DeleteBankDialog({
  bank,
  open,
  setOpen,
  setSelectedBank,
}: React.PropsWithChildren<DeleteBankDialogProps>) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, error, data, isSuccess } =
    useDeleteBank();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const deleteBankOnSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(bank.id);
  };

  const title = `Banka Sil | ${bank.name}`;

  const onCloseAction = () => {
    setSelectedBank(null);
  };
  return (
    <DialogWrapper
      onCloseAction={onCloseAction}
      open={open}
      setOpen={setOpen}
      title={title}
    >
      <div className='flex flex-col gap-6 text-sm'>
        <p className='mt-2 text-gray-800'>
          {bank.id} ID'li banka silinecektir. <br /> Onaylıyor musunuz?
        </p>
        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Banka başarıyla silindi. ID: ${data?.data.data.deletedBankId}`}
        />

        <button
          onClick={deleteBankOnSubmit}
          disabled={isLoading}
          className=' mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
        >
          Bankayı Sil
        </button>
      </div>
    </DialogWrapper>
  );
}
