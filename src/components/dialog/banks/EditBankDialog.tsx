import React, { useState, useEffect } from 'react';
import { useEditBank } from '@/data/hooks/useBanksData';
import type { Bank } from '@/data/models/entityModels';
import ModalWrapper from '../DialogWrapper';
import * as Switch from '@radix-ui/react-switch';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';

type EditBankDialogProps = {
  bank: Bank;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBank: React.Dispatch<React.SetStateAction<Bank | null>>;
};

export default function EditBankDialog({
  bank,
  open,
  setOpen,
  setSelectedBank,
}: React.PropsWithChildren<EditBankDialogProps>) {
  const [newBankName, setNewBankName] = useState<string>(bank.name);
  const [newBankIsActive, setNewBankIsActive] = useState<boolean>(
    bank.is_active
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, isSuccess, data, error } = useEditBank();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const isUnchanged: boolean =
    newBankName === bank.name && newBankIsActive === bank.is_active;

  const newBankNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNewBankName(e.target.value);
  };

  const switchOnChange = (checked: boolean) => setNewBankIsActive(checked);

  const addBankOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      ...bank,
      name: newBankName,
      is_active: newBankIsActive,
    });
  };

  const title = `Banka Düzenle | ${bank.name}`;

  const onCloseAction = () => {
    setSelectedBank(null);
  };
  return (
    <ModalWrapper
      onCloseAction={onCloseAction}
      open={open}
      setOpen={setOpen}
      title={title}
    >
      <form onSubmit={addBankOnSubmit} className='flex flex-col gap-4 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='bankname'>
            Banka İsmi
          </label>
          <input
            value={newBankName}
            onChange={newBankNameOnChange}
            disabled={isLoading}
            id='bankname'
            onKeyDown={(e) => e.stopPropagation()}
            className='block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 '
          />
        </fieldset>
        <fieldset className='flex items-center gap-6 py-2'>
          <label className='font-semibold text-slate-700' htmlFor='isactive'>
            {newBankIsActive ? 'Aktif' : 'Pasif'}
          </label>
          <Switch.Root
            checked={newBankIsActive}
            onCheckedChange={switchOnChange}
            className='relative h-[25px] w-[42px] cursor-default rounded-full bg-slate-300 outline-none data-[state=checked]:bg-green-500'
            id='isactive'
          >
            <Switch.Thumb className='block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]' />
          </Switch.Root>
        </fieldset>
        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Banka başarıyla düzenlendi. ID: ${data?.data.data.editedBankId}`}
        />
        <button
          type='submit'
          disabled={isLoading || isUnchanged}
          className='rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium  uppercase tracking-wider text-white hover:bg-blue-800 disabled:bg-gray-400'
        >
          Gönder
        </button>
      </form>
    </ModalWrapper>
  );
}
