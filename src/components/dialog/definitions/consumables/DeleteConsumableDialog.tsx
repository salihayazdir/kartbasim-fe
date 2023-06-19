import React, { useState, useEffect } from 'react';
import type { Consumable } from '@/data/models/entityModels';
import DialogWrapper from '../../DialogWrapper';
import DialogResponseMessages from '../../DialogResponseMessages';
import { AxiosError } from 'axios';
import { useDeleteConsumable } from '@/data/hooks/definitions/useConsumablesData';
import DialogActionButton from '../../DialogActionButton';

type DeleteConsumableDialogProps = {
  record: Consumable;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<Consumable | null>>;
};

export default function DeleteConsumableDialog({
  record,
  open,
  setOpen,
  setSelectedRecord,
}: React.PropsWithChildren<DeleteConsumableDialogProps>) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, error, data, isSuccess } =
    useDeleteConsumable();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(record.id);
  };

  const title = `Matbuat Sil | ${record.name}`;

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
          {`${record.id} ID'li ürün silinecektir.`}
          <br />
          {`Onaylıyor musunuz?`}
        </p>

        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Matbuat silindi. ID: ${data?.data.data.deletedId}`}
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
