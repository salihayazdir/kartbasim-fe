import { useState, useMemo } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import parseDateTime2 from '@/utils/parseDatetime2';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import AddBankDialog from '@/components/dialog/banks/AddBankDialog';
import type { Bank, GetBanksResponse } from '@/dataHooks/useBanksData';
import {} from '@tanstack/react-query';

type BanksTableProps = {
  tableData: Bank[];
  queryResult: UseQueryResult<GetBanksResponse, GetBanksResponse>;
};

export default function BanksTable({
  queryResult,
  tableData,
}: BanksTableProps) {
  const { isLoading, data: apiResponse, isError, error, refetch } = queryResult;

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Bank>[]>(
    () => [
      {
        accessorKey: 'bank_id',
        id: 'bank_id',
        header: () => <span>Banka ID</span>,
      },
      {
        accessorKey: 'bank_name',
        header: () => <span>Banka Adı</span>,
      },
      {
        accessorKey: 'is_active',
        header: () => <span>Aktif / Pasif</span>,
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
          const parsedAndFormattedValue = parseDateTime2(cellValue);
          return <div>{parsedAndFormattedValue}</div>;
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
          const parsedAndFormattedValue = parseDateTime2(cellValue);
          return <div>{parsedAndFormattedValue}</div>;
        },
      },
      {
        accessorKey: 'edit',
        header: () => <span>Düzenle</span>,
        cell: ({ row }) => {
          return (
            <button
              onClick={() => console.log(row.original)}
              className='flex items-center justify-center gap-1 rounded-md p-1 text-blue-600 hover:bg-blue-50'
            >
              <PencilSquareIcon className='h-5 w-5' />
            </button>
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
      <div className='flex flex-col rounded-xl border border-gray-200 bg-white pt-4'>
        <div className={`overflow-x-auto overflow-y-visible text-sm`}>
          <div className='flex w-full items-center justify-between px-4 pb-4'>
            <h2 className=''></h2>
            <AddBankDialog>
              <button className='flex-end inline-flex items-center gap-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-800'>
                <PlusIcon className='h-5 w-5' />
                <span>Banka Ekle</span>
              </button>
            </AddBankDialog>
          </div>
          <table className='w-full border-collapse rounded-lg'>
            <thead className='border-y border-gray-200 bg-gray-50'>
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
            <tbody className='text-gray-800'>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className='border-b border-gray-200'>
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
    </>
  );
}
