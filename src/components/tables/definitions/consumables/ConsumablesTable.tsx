import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import parseDateTime from '@/utils/parseDatetime';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import type { Consumable } from '@/data/models/entityModels';
import EditConsumableDialog from '@/components/dialog/definitions/consumables/EditConsumableDialog';
import DeleteConsumableDialog from '@/components/dialog/definitions/consumables/DeleteConsumableDialog';
import AddConsumableDialog from '@/components/dialog/definitions/consumables/AddConsumableDialog';
import ConsumableActionsDropdown from './ConsumableActionsDropdown';
import TableInstance from '../../TableInstance';
import exportToExcel from '@/utils/exportToExcel';

type ConsumablesTableProps = {
  tableData: Consumable[];
};

export default function ConsumablesTable({ tableData }: ConsumablesTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<Consumable | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [deleteConsumableModalIsOpen, setDeleteConsumableModalIsOpen] =
    useState<boolean>(false);
  const [editConsumableModalIsOpen, setEditConsumableModalIsOpen] =
    useState<boolean>(false);
  const [addConsumableModalIsOpen, setAddConsumableModalIsOpen] =
    useState<boolean>(false);

  const { isLoading } = useQuery(['consumables'], { enabled: false });

  const handleExportToExcel = () => {
    const data = tableData.map((item) => ({
      ID: item.id,
      İsim: item.name,
      'Matbuat Türü': item.consumable_type_name,
      Adet: item.stock_quantity,
      Açıklama: item.description,
      Durum: item.is_active ? 'Aktif' : 'Pasif',
    }));
    exportToExcel({ data, fileName: 'urunler' });
  };

  const columns = useMemo<ColumnDef<Consumable>[]>(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false,
        header: () => <span>ID</span>,
      },
      {
        accessorKey: 'name',
        header: () => <span>Matbuat Adı</span>,
      },
      {
        accessorKey: 'consumable_type_name',
        header: () => <span>Matbuat Türü</span>,
      },
      {
        accessorKey: 'stock_quantity',
        enableColumnFilter: false,
        header: () => <span>Stok Adeti</span>,
      },
      {
        accessorKey: 'is_active',
        enableColumnFilter: false,
        header: () => <span>Durum</span>,
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
        accessorKey: 'created_by_name',
        enableColumnFilter: false,
        header: () => <span>Oluşturan</span>,
      },
      {
        accessorKey: 'created_at',
        enableColumnFilter: false,
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
        accessorKey: 'edited_by_name',
        enableColumnFilter: false,
        header: () => <span>Düzenleyen</span>,
      },
      {
        accessorKey: 'edited_at',
        enableColumnFilter: false,
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
        enableColumnFilter: false,
        header: () => <span>Düzenle</span>,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <ConsumableActionsDropdown
              record={row.original}
              key={row.id}
              setEditConsumableModalIsOpen={setEditConsumableModalIsOpen}
              setDeleteConsumableModalIsOpen={setDeleteConsumableModalIsOpen}
              setSelectedRecord={setSelectedRecord}
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
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className='flex flex-col rounded-xl border border-slate-200 bg-white pt-4'>
        <div className={`overflow-x-auto overflow-y-visible text-sm`}>
          <div className='flex w-full items-center justify-end gap-4 px-4 pb-4'>
            <button
              onClick={() => handleExportToExcel()}
              className='flex-end inline-flex items-center gap-3 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:text-gray-900 hover:shadow-md'
            >
              <ArrowDownTrayIcon className='h-5 w-5' />
              <span>{`Excel'e Aktar`}</span>
            </button>
            <button
              onClick={() => setAddConsumableModalIsOpen(true)}
              className='flex-end inline-flex items-center gap-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md'
            >
              <PlusIcon className='h-5 w-5' />
              <span>Matbuat Ekle</span>
            </button>
          </div>
          <TableInstance isLoading={isLoading} table={table} />
        </div>
        <div className='h-4'></div>
      </div>

      {selectedRecord !== null ? (
        <EditConsumableDialog
          open={editConsumableModalIsOpen}
          setOpen={setEditConsumableModalIsOpen}
          record={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      ) : null}

      {selectedRecord !== null ? (
        <DeleteConsumableDialog
          open={deleteConsumableModalIsOpen}
          setOpen={setDeleteConsumableModalIsOpen}
          record={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      ) : null}

      {addConsumableModalIsOpen ? (
        <AddConsumableDialog
          open={addConsumableModalIsOpen}
          setOpen={setAddConsumableModalIsOpen}
        />
      ) : null}
    </>
  );
}
