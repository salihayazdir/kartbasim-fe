import React, { useState, useEffect } from 'react';
import { useEditProduct } from '@/data/hooks/useProductsData';
import type {
  Product,
  ProductGroup,
  ProductType,
} from '@/data/models/entityModels';
import ModalWrapper from '../DialogWrapper';
import { Switch } from '@headlessui/react';
import DialogResponseMessages from '../DialogResponseMessages';
import { AxiosError } from 'axios';
import _ from 'lodash';
import DialogActionButton from '../DialogActionButton';
import SelectProductGroup from '@/components/select/SelectProductGroup';
import SelectProductType from '@/components/select/SelectProductType';

type EditProductDialogProps = {
  record: Product;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<Product | null>>;
};

export default function EditProductDialog({
  record,
  open,
  setOpen,
  setSelectedRecord,
}: React.PropsWithChildren<EditProductDialogProps>) {
  const [newRecord, setNewRecord] = useState<Product>(record);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [selectedProductGroup, setSelectedProductGroup] = useState<
    ProductGroup | undefined
  >();
  const [selectedProductType, setSelectedProductType] = useState<
    ProductType | undefined
  >();

  const { mutate, isLoading, isError, isSuccess, data, error } =
    useEditProduct();

  useEffect(() => {
    if (error instanceof AxiosError)
      setErrorMessage(error.response?.data.error.message);
  }, [error]);

  const isUnchanged: boolean =
    _.isEqual(newRecord, record) &&
    record.product_group_id === selectedProductGroup?.id &&
    record.product_type_id === selectedProductType?.id;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewRecord((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProductGroup && selectedProductType)
      mutate({
        ...newRecord,
        product_group_id: selectedProductGroup.id,
        product_type_id: selectedProductType.id,
      });
  };

  const title = `Ürün Düzenle | ${record.name}`;

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
            Ürün İsmi
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
            htmlFor='product_group_id'
          >
            Ürün Grubu
          </label>
          <SelectProductGroup
            selected={selectedProductGroup}
            setSelected={setSelectedProductGroup}
            defaultSelectionId={record.product_group_id}
          />
        </fieldset>

        <fieldset className='flex flex-col gap-1'>
          <label
            className='font-semibold text-slate-700'
            htmlFor='product_type_id'
          >
            Ürün Tipi
          </label>
          <SelectProductType
            selected={selectedProductType}
            setSelected={setSelectedProductType}
            defaultSelectionId={record.product_type_id}
          />
        </fieldset>

        <fieldset className='flex flex-col gap-1'>
          <label className='font-semibold text-slate-700' htmlFor='client_id'>
            Müşteri Kodu
          </label>
          <input
            value={newRecord.client_id}
            onChange={onChange}
            disabled={isLoading}
            id='client_id'
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
          successMessage={`Ürün düzenlendi.`}
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
