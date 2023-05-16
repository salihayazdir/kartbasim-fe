import { useState, useMemo } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import parseDateTime from '@/utils/parseDatetime';
import { PlusIcon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import type { Bank } from '@/data/models/entityModels';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import BankActionsPopover from './BankActionsPopover';
import EditBankDialog from '@/components/dialog/banks/EditBankDialog';
import DeleteBankDialog from '@/components/dialog/banks/DeleteBankDialog';
import AddBankDialog from '@/components/dialog/banks/AddBankDialog';

type BanksTableProps = {
  tableData: Bank[];
  queryResult: UseQueryResult<ResponseObject<Bank[]>, ResponseObject<Bank[]>>;
};

export default function BanksTable({ tableData }: BanksTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [deleteBankModalIsOpen, setDeleteBankModalIsOpen] =
    useState<boolean>(false);
  const [editBankModalIsOpen, setEditBankModalIsOpen] =
    useState<boolean>(false);
  const [addBankModalIsOpen, setAddBankModalIsOpen] = useState<boolean>(false);

  const columns = useMemo<ColumnDef<Bank>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <span>Banka ID</span>,
      },
      {
        accessorKey: 'name',
        header: () => <span>Banka Adı</span>,
      },
      {
        accessorKey: 'is_active',
        header: () => <span>Aktif / Pasif</span>,
        cell: (props) => {
          if (props.getValue())
            return (
              <div className='flex'>
                <div className='max-w-full rounded-xl bg-green-100 px-3 py-1 text-xs font-semibold tracking-wide text-green-600'>
                  Aktif
                </div>
              </div>
            );
          return (
            <div className='flex'>
              <div className='max-w-full rounded-xl bg-red-100 px-3 py-1 text-xs font-semibold tracking-wide text-red-600'>
                Pasif
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'created_by',
        header: () => <span>Oluşturan</span>,
      },
      {
        accessorKey: 'created_at',
        header: () => <span>Oluşturulma Zamanı</span>,
        cell: (props) => {
          const cellValue = `${props.getValue()}`;
          if (cellValue) {
            const parsedAndFormattedValue = parseDateTime(cellValue);
            return <div>{parsedAndFormattedValue}</div>;
          }
          return null;
        },
      },
      {
        accessorKey: 'edited_by',
        header: () => <span>Düzenleyen</span>,
      },
      {
        accessorKey: 'edited_at',
        header: () => <span>Düzenlenme Zamanı</span>,
        cell: (props) => {
          const cellValue = `${props.getValue()}`;
          if (cellValue) {
            const parsedAndFormattedValue = parseDateTime(cellValue);
            return <div>{parsedAndFormattedValue}</div>;
          }
          return null;
        },
      },
      {
        accessorKey: 'edit',
        header: () => <span>Düzenle</span>,
        cell: ({ row }) => {
          return (
            <BankActionsPopover
              bank={row.original}
              key={row.id}
              setEditBankModalIsOpen={setEditBankModalIsOpen}
              setDeleteBankModalIsOpen={setDeleteBankModalIsOpen}
              setSelectedBank={setSelectedBank}
            />
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className='flex flex-col rounded-xl border border-slate-200 bg-white pt-4'>
        <div className={`overflow-x-auto overflow-y-visible text-sm`}>
          <div className='flex w-full items-center justify-between px-4 pb-4'>
            <h2 className=''></h2>
            <button
              onClick={() => setAddBankModalIsOpen(true)}
              className='flex-end inline-flex items-center gap-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-800'
            >
              <PlusIcon className='h-5 w-5' />
              <span>Banka Ekle</span>
            </button>
          </div>
          <table className='w-full border-collapse rounded-lg'>
            <thead className='border-y border-slate-200 bg-slate-50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className='px-4 py-2 text-left align-baseline font-semibold'
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className='text-slate-800'>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className='border-b border-slate-200'>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className='px-4 py-2'>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='h-4'></div>
      </div>

      {selectedBank !== null ? (
        <EditBankDialog
          open={editBankModalIsOpen}
          setOpen={setEditBankModalIsOpen}
          bank={selectedBank}
          setSelectedBank={setSelectedBank}
        />
      ) : null}

      {selectedBank !== null ? (
        <DeleteBankDialog
          open={deleteBankModalIsOpen}
          setOpen={setDeleteBankModalIsOpen}
          bank={selectedBank}
          setSelectedBank={setSelectedBank}
        />
      ) : null}

      {addBankModalIsOpen ? (
        <AddBankDialog
          open={addBankModalIsOpen}
          setOpen={setAddBankModalIsOpen}
        />
      ) : null}
    </>
  );
}
