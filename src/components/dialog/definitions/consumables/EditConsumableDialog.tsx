import React, { useState, useEffect } from 'react';
import { useEditConsumable } from '@/data/hooks/definitions/useConsumablesData';
import type { Consumable, ConsumableType } from '@/data/models/entityModels';
import DialogWrapper from '../../DialogWrapper';
import { Switch } from '@headlessui/react';
import DialogResponseMessages from '../../DialogResponseMessages';
import { AxiosError } from 'axios';
import _ from 'lodash';
import DialogActionButton from '../../DialogActionButton';
import SelectConsumableType from '@/components/select/SelectConsumableType';

type EditConsumableDialogProps = {
  record: Consumable;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<Consumable | null>>;
};

export default function EditConsumableDialog({
  record,
  open,
  setOpen,
  setSelectedRecord,
}: React.PropsWithChildren<EditConsumableDialogProps>) {
  const [newRecord, setNewRecord] = useState<Consumable>(record);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [selectedConsumableType, setSelectedConsumableType] =
    useState<ConsumableType | null>(null);

  const { mutate, isLoading, isError, isSuccess, data, error } =
    useEditConsumable();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const isUnchanged: boolean =
    _.isEqual(newRecord, record) &&
    record.consumable_type_id === selectedConsumableType?.id;

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

  const title = `Matbuat Düzenle | ${record.name}`;

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
      <form onSubmit={onSubmit} className='flex flex-col gap-4 text-sm'>
        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='name'>
            Matbuat İsmi
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
          <label
            className='font-semibold text-slate-700'
            htmlFor='consumable_type_id'
          >
            Matbuat Türü
          </label>
          <SelectConsumableType
            selected={selectedConsumableType}
            setSelected={setSelectedConsumableType}
            defaultSelectionId={record.consumable_type_id}
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
          successMessage={`Matbuat düzenlendi.`}
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
    </DialogWrapper>
  );
}