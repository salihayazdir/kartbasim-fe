import React, { useState, useEffect } from 'react';
import type { Printer } from '@/data/models/entityModels';
import DialogWrapper from '../DialogWrapper';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';
import { useDeletePrinter } from '@/data/hooks/usePrintersData';
import DialogActionButton from '../DialogActionButton';

type DeletePrinterDialogProps = {
  record: Printer;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<Printer | null>>;
};

export default function DeletePrinterDialog({
  record,
  open,
  setOpen,
  setSelectedRecord,
}: React.PropsWithChildren<DeletePrinterDialogProps>) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, error, data, isSuccess } =
    useDeletePrinter();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(record.id);
  };

  const title = `Makine Sil | ${record.name}`;

  const onCloseAction = () => {
    setSelectedRecord(null);
    setOpen(false);
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
          {record.id} ID'li makine silinecektir. <br /> Onaylıyor musunuz?
        </p>

        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Makine başarıyla silindi. ID: ${data?.data.data.deletedId}`}
        />

        <DialogActionButton
          closeButtonOnClick={onCloseAction}
          isSuccess={isSuccess}
          onClick={onSubmit}
          disabled={isLoading}
        >
          Sil
        </DialogActionButton>
      </div>
    </DialogWrapper>
  );
}
