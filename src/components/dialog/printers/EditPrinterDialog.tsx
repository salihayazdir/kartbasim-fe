import React, { useState, useEffect } from 'react';
import { useEditPrinter } from '@/data/hooks/usePrintersData';
import type { Printer } from '@/data/models/entityModels';
import ModalWrapper from '../DialogWrapper';
import { Switch } from '@headlessui/react';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';
import _ from 'lodash';
import DialogActionButton from '../DialogActionButton';

type EditPrinterDialogProps = {
  record: Printer;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<Printer | null>>;
};

export default function EditPrinterDialog({
  record,
  open,
  setOpen,
  setSelectedRecord,
}: React.PropsWithChildren<EditPrinterDialogProps>) {
  const [newRecord, setNewRecord] = useState<Printer>(record);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isLoading, isError, isSuccess, data, error } =
    useEditPrinter();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const isUnchanged: boolean = _.isEqual(newRecord, record);

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

  const title = `Makine Düzenle | ${record.name}`;

  const onCloseAction = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  return (
    <ModalWrapper
      onCloseAction={onCloseAction}
      open={open}
      setOpen={setOpen}
      title={title}
    >
      <form onSubmit={onSubmit} className='flex flex-col gap-4 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='name'>
            Makine İsmi
          </label>
          <input
            value={newRecord.name}
            onChange={onChange}
            disabled={isLoading}
            id='name'
            required
            pattern='.{3,}'
            onKeyDown={(e) => e.stopPropagation()}
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

        <fieldset className='flex items-center gap-6 py-2'>
          <label className='font-semibold text-slate-700' htmlFor='is_active'>
            {newRecord.is_active ? 'Aktif' : 'Pasif'}
          </label>
          <Switch
            checked={newRecord.is_active}
            onChange={(checked) =>
              setNewRecord((prev) => ({ ...prev, is_active: checked }))
            }
            className={`${
              newRecord.is_active ? 'bg-green-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                newRecord.is_active ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </fieldset>

        <DialogResponseMessages
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          errorMessage={errorMessage}
          successMessage={`Makine başarıyla düzenlendi.`}
        />

        <DialogActionButton
          isSuccess={isSuccess}
          closeButtonOnClick={onCloseAction}
          type='submit'
          disabled={isLoading || isUnchanged}
        >
          Gönder
        </DialogActionButton>
      </form>
    </ModalWrapper>
  );
}
