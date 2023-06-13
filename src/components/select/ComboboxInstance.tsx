import { ProductGroup } from '@/data/models/entityModels';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Fragment, useState, useEffect } from 'react';
import SpinningLoader from '../placeholders/SpinningLoader';

type ComboboxInstanceProps = {
  selected: any | undefined;
  setSelected: React.Dispatch<React.SetStateAction<any | undefined>>;
  items: any[];
  isLoading: boolean;
  id: string;
  notFoundText: string;
  defaultSelectionId?: number;
};

export default function ComboboxInstance({
  selected,
  setSelected,
  items,
  isLoading,
  id,
  notFoundText,
  defaultSelectionId,
}: ComboboxInstanceProps) {
  useEffect(() => {
    if (defaultSelectionId)
      setSelected(items.filter((item) => item.id === defaultSelectionId)[0]);
  }, [items]);

  const [filterQuery, setFilterQuery] = useState<string>('');
  const filteredItems =
    filterQuery === ''
      ? items
      : items.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(filterQuery.toLowerCase().replace(/\s+/g, ''))
        );
  return (
    <Combobox disabled={isLoading} value={selected} onChange={setSelected}>
      <div className='relative mt-1'>
        <div className='relative w-full cursor-default overflow-hidden rounded-md border border-slate-300 bg-slate-50 text-left text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          {isLoading ? (
            <div className='flex w-full items-center gap-3 border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-400 focus:ring-0'>
              <SpinningLoader small />
              <span>Yükleniyor...</span>
            </div>
          ) : (
            <Combobox.Input
              id={id}
              className='w-full border-none bg-slate-50 py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              placeholder='Seçiniz'
              displayValue={(selected: ProductGroup) =>
                selected.name ?? 'Seçiniz'
              }
              onChange={(event) => setFilterQuery(event.target.value)}
            />
          )}
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setFilterQuery('')}
        >
          <Combobox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredItems.length === 0 && filterQuery !== '' ? (
              <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                {`${notFoundText}`}
              </div>
            ) : (
              filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
