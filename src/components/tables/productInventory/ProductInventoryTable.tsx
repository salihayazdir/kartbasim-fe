import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import type { Product } from '@/data/models/entityModels';
import TableInstance from '../TableInstance';
import exportToExcel from '@/utils/exportToExcel';

type ProductInventoryTableProps = {
  tableData: Product[];
};

export default function ProductInventoryTable({
  tableData,
}: ProductInventoryTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<Product | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { isLoading } = useQuery(['products'], { enabled: false });

  const handleExportToExcel = () => {
    const data = tableData.map((item) => ({
      ID: item.id,
      İsim: item.name,
      'Ürün Grubu': item.product_group_name,
      'Ürün Tipi': item.product_type_name,
      'Günlük Kasa Adet': item.daily_safe_quantity,
      'Ana Kasa Adet': item.main_safe_quantity,
      Açıklama: item.description,
      Durum: item.is_active ? 'Aktif' : 'Pasif',
    }));
    exportToExcel({ data, fileName: 'urunler' });
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false,
        header: () => <span>ID</span>,
      },
      {
        accessorKey: 'name',
        header: () => <span>Ürün Adı</span>,
      },
      {
        accessorKey: 'product_group_name',
        header: () => <span>Ürün Grubu</span>,
      },
      {
        accessorKey: 'bank_name',
        header: () => <span>Banka</span>,
      },
      {
        accessorKey: 'product_type_name',
        header: () => <span>Ürün Tipi</span>,
      },
      {
        accessorKey: 'daily_safe_quantity',
        enableColumnFilter: false,
        header: () => (
          <div className=' w-full text-center'>
            Günlük
            <br />
            Kasa
          </div>
        ),
        cell: (props) => {
          const value = `${props.getValue()}`;
          return (
            <div className='rounded-md bg-sky-50 py-0.5 text-center text-sm font-bold tracking-wide text-sky-700'>
              {value}
            </div>
          );
        },
      },
      {
        accessorKey: 'main_safe_quantity',
        enableColumnFilter: false,
        header: () => (
          <div className=' w-full text-center'>
            Ana
            <br />
            Kasa
          </div>
        ),
        cell: (props) => {
          const value = `${props.getValue()}`;
          return (
            <div className='rounded-md bg-emerald-50 px-2 py-0.5 text-center text-sm font-bold tracking-wide text-emerald-700'>
              {value}
            </div>
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
          </div>
          <TableInstance isLoading={isLoading} table={table} />
        </div>
        <div className='h-4'></div>
      </div>
    </>
  );
}
