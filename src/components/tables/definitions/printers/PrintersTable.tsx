import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import parseDateTime from '@/utils/parseDatetime';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table';
import type { Printer } from '@/data/models/entityModels';
import PrinterActionsDropdown from './PrinterActionsDropdown';
import EditPrinterDialog from '@/components/dialog/definitions/printers/EditPrinterDialog';
import DeletePrinterDialog from '@/components/dialog/definitions/printers/DeletePrinterDialog';
import AddPrinterDialog from '@/components/dialog/definitions/printers/AddPrinterDialog';
import TableInstance from '../../TableInstance';
import exportToExcel from '@/utils/exportToExcel';

type PrintersTableProps = {
  tableData: Printer[];
};

export default function PrintersTable({ tableData }: PrintersTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<Printer | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [deletePrinterModalIsOpen, setDeletePrinterModalIsOpen] =
    useState<boolean>(false);
  const [editPrinterModalIsOpen, setEditPrinterModalIsOpen] =
    useState<boolean>(false);
  const [addPrinterModalIsOpen, setAddPrinterModalIsOpen] =
    useState<boolean>(false);

  const { isLoading, isFetching } = useQuery(['printers'], { enabled: false });

  const handleExportToExcel = () => {
    const data = tableData.map((item) => ({
      ID: item.id,
      İsim: item.name,
      Durum: item.is_active ? 'Aktif' : 'Pasif',
      Model: item.model,
      SeriNo: item.serial_no,
      Açıklama: item.description,
    }));
    exportToExcel({ data, fileName: 'makineler' });
  };

  const columns = useMemo<ColumnDef<Printer>[]>(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false,
        header: () => <span>ID</span>,
      },
      {
        accessorKey: 'name',
        header: () => <span>Makine Adı</span>,
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
        accessorKey: 'model',
        header: () => <span>Model</span>,
      },
      {
        accessorKey: 'serial_no',
        header: () => <span>Seri No</span>,
      },
      {
        accessorKey: 'description',
        enableColumnFilter: false,
        header: () => <span>Açıklama</span>,
      },
      {
        accessorKey: 'created_by',
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
        accessorKey: 'edited_by',
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
            <PrinterActionsDropdown
              record={row.original}
              key={row.id}
              setEditPrinterModalIsOpen={setEditPrinterModalIsOpen}
              setDeletePrinterModalIsOpen={setDeletePrinterModalIsOpen}
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
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
              className='flex-end inline-flex items-center gap-3 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:shadow-md'
            >
              <ArrowDownTrayIcon className='h-5 w-5' />
              <span>{`Excel'e Aktar`}</span>
            </button>
            <button
              onClick={() => setAddPrinterModalIsOpen(true)}
              className='flex-end inline-flex items-center gap-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:shadow-md'
            >
              <PlusIcon className='h-5 w-5' />
              <span>Makine Ekle</span>
            </button>
          </div>
          <TableInstance isLoading={isLoading} table={table} />
        </div>
        <div className='h-4'></div>
      </div>

      {selectedRecord !== null ? (
        <EditPrinterDialog
          open={editPrinterModalIsOpen}
          setOpen={setEditPrinterModalIsOpen}
          record={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      ) : null}

      {selectedRecord !== null ? (
        <DeletePrinterDialog
          open={deletePrinterModalIsOpen}
          setOpen={setDeletePrinterModalIsOpen}
          record={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      ) : null}

      {addPrinterModalIsOpen ? (
        <AddPrinterDialog
          open={addPrinterModalIsOpen}
          setOpen={setAddPrinterModalIsOpen}
        />
      ) : null}
    </>
  );
}
