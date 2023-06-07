import React, { useState, useEffect } from 'react';
import { useDeleteBank } from '@/data/hooks/useBanksData';
import type { Bank } from '@/data/models/entityModels';
import DialogWrapper from '../DialogWrapper';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';
import DialogActionButton from '../DialogActionButton';

type DeleteBankDialogProps = {
  record: Bank;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<Bank | null>>;
};

export default function DeleteBankDialog({
  record,
  open,
  setOpen,
  setSelectedRecord,
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
    mutate(record.id);
  };

  const title = `Banka Sil | ${record.name}`;

  const onCloseAction = () => {
    setSelectedRecord(null);
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
          {`${record.id} ID'li banka silinecektir.`}
          <br />
          {`Onaylıyor musunuz?`}
        </p>
        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Banka silindi. ID: ${data?.data.data.deletedId}`}
        />

        <DialogActionButton
          closeButtonOnClick={onCloseAction}
          isSuccess={isSuccess}
          onClick={deleteBankOnSubmit}
          disabled={isLoading}
        >
          Sil
        </DialogActionButton>
      </div>
    </DialogWrapper>
  );
}
