import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import type {
  Product,
  ProductInventoryRecords,
} from '@/data/models/entityModels';
import TableInstance from '../TableInstance';
import exportToExcel from '@/utils/exportToExcel';
import AddProductInventoryRecordDialog from '@/components/dialog/productInventoryRecords/addProductInventoryRecordDialog';
import parseDateTime from '@/utils/parseDatetime';

type ProductInventoryRecordsTableProps = {
  tableData: ProductInventoryRecords[];
};

export default function ProductInventoryRecordsTable({
  tableData,
}: ProductInventoryRecordsTableProps) {
  const [selectedRecord, setSelectedRecord] =
    useState<ProductInventoryRecords | null>(null);

  const [addInventoryRecordModalIsOpen, setAddInventoryRecordModalIsOpen] =
    useState<boolean>(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { isLoading } = useQuery(['products'], { enabled: false });

  const handleExportToExcel = () => {
    const data = tableData.map((item) => ({
      ID: item.id,
    }));
    exportToExcel({ data, fileName: 'urunler' });
  };

  const columns = useMemo<ColumnDef<ProductInventoryRecords>[]>(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false,
        header: () => <span>ID</span>,
      },
      {
        accessorKey: 'product_name',
        header: () => <span>Ürün</span>,
      },
      //   {
      //     accessorKey: 'product_group_name',
      //     header: () => <span>Ürün Grubu</span>,
      //   },
      //   {
      //     accessorKey: 'bank_name',
      //     header: () => <span>Banka</span>,
      //   },
      //   {
      //     accessorKey: 'product_type_name',
      //     header: () => <span>Ürün Tipi</span>,
      //   },
      {
        accessorKey: 'product_inventory_record_type_name',
        header: () => <span>Hareket Türü</span>,
      },
      {
        accessorKey: 'batch_id',
        header: () => <span>Batch ID</span>,
      },
      {
        accessorKey: 'created_by_name',
        header: () => <span>Oluşturan</span>,
      },
      {
        accessorKey: 'is_main_safe',
        header: () => <span>Kasa</span>,
        cell: (props) => {
          if (props.getValue())
            return (
              <div className='whitespace-nowrap rounded-md  px-2  py-0.5 text-left font-medium text-emerald-600'>
                Ana Kasa
              </div>
            );
          return (
            <div className='whitespace-nowrap  rounded-md px-2  py-0.5 text-left font-medium text-sky-600'>
              Günlük Kasa
            </div>
          );
        },
      },
      {
        accessorKey: 'quantity',
        enableColumnFilter: false,
        header: () => <span>Adet</span>,
        cell: (props) => {
          const value = props.getValue() as number;
          const isNegative = !(value > 0);
          const isMainSafe = props.row.getValue('is_main_safe');
          const displayValue = `${isNegative ? '' : '+'}${value}`;
          if (!value) return null;
          return (
            <div
              className={`whitespace-nowrap rounded-md px-2 py-0.5 text-center text-sm font-bold tracking-wide ${
                isNegative ? 'bg-red-50 text-red-700' : ''
              } ${
                isMainSafe && !isNegative
                  ? 'bg-emerald-50 text-emerald-700'
                  : ''
              }
                ${!isMainSafe && !isNegative ? 'bg-sky-50 text-sky-700' : ''}`}
            >
              {displayValue}
            </div>
          );
        },
      },
      {
        accessorKey: 'created_at',
        header: () => <span>Tarih</span>,
        enableColumnFilter: false,
        cell: (props) => {
          const cellValue = `${props.getValue()}`;
          if (cellValue) {
            const parsedAndFormattedValue = parseDateTime(cellValue);
            return <div>{parsedAndFormattedValue}</div>;
          }
          return null;
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
          <div className='flex w-full items-center justify-between px-4 pb-4'>
            <div>DATE RANGE PICKER</div>
            <div className='flex  gap-4 '>
              <button
                onClick={() => handleExportToExcel()}
                className='flex-end inline-flex items-center gap-3 rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-600 transition-all hover:text-gray-900 hover:shadow-md'
              >
                <ArrowDownTrayIcon className='h-5 w-5' />
                <span>{`Excel'e Aktar`}</span>
              </button>
              <button
                onClick={() => setAddInventoryRecordModalIsOpen(true)}
                className='flex-end inline-flex items-center gap-3 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md'
              >
                <PlusIcon className='h-5 w-5' />
                <span>Stok Hareketi Oluştur</span>
              </button>
            </div>
          </div>
          <TableInstance isLoading={isLoading} table={table} />
        </div>
        <div className='h-4'></div>
      </div>

      {addInventoryRecordModalIsOpen ? (
        <AddProductInventoryRecordDialog
          open={addInventoryRecordModalIsOpen}
          setOpen={setAddInventoryRecordModalIsOpen}
        />
      ) : null}
    </>
  );
}
