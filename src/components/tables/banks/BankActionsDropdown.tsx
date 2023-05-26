import React from 'react';
import { Menu } from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type { Bank } from '@/data/models/entityModels';

type BankActionsDropdownProps = {
  record: Bank;
  setEditBankModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteBankModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<Bank | null>>;
};

export default function BankActionsDropdown({
  record,
  setEditBankModalIsOpen,
  setDeleteBankModalIsOpen,
  setSelectedRecord,
}: BankActionsDropdownProps) {
  return (
    <Menu as={'div'} className=''>
      <Menu.Button className='relative items-center justify-center gap-1 rounded-md p-1 text-blue-600 hover:bg-blue-50'>
        <EllipsisHorizontalIcon className='h-5 w-5' />
      </Menu.Button>

      <Menu.Items className='absolute z-10 mb-10 flex -translate-x-[calc(100%-50px)] flex-col gap-1 rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-lg'>
        <div className=' absolute right-0 top-0 h-4 w-4 -translate-x-[27px] -translate-y-1/2 rotate-45 rounded-tl-sm border-l border-t border-gray-200  bg-white'></div>

        <div className='whitespace-nowrap px-6 py-1 text-xs text-slate-400'>
          {record.name}
        </div>

        <hr className='h-[1px] bg-slate-100' />

        <Menu.Item>
          <button
            onClick={() => {
              setSelectedRecord(record);
              setEditBankModalIsOpen(true);
            }}
            className='flex w-full items-center gap-3 rounded-md p-1 px-3 font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700'
          >
            <PencilSquareIcon className='h-5 w-5' />
            <span className='flex-1 text-center'>Düzenle</span>
          </button>
        </Menu.Item>

        <hr className='h-[1px] bg-slate-100' />

        <Menu.Item>
          <button
            onClick={() => {
              setSelectedRecord(record);
              setDeleteBankModalIsOpen(true);
            }}
            className='flex w-full items-center gap-3 rounded-md p-1 px-3 font-semibold text-slate-600 hover:bg-red-600 hover:text-white'
          >
            <TrashIcon className='h-5 w-5' />
            <span className='flex-1 text-center'>Sil</span>
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
