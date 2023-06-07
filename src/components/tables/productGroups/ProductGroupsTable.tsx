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
import type { ProductGroup } from '@/data/models/entityModels';
import EditProductGroupDialog from '@/components/dialog/productGroups/EditProductGroupDialog';
import DeleteProductGroupDialog from '@/components/dialog/productGroups/DeleteProductGroupDialog';
import AddProductGroupDialog from '@/components/dialog/productGroups/AddProductGroupDialog';
import ProductGroupActionsDropdown from './ProductGroupActionsDropdown';
import TableInstance from '../TableInstance';
import exportToExcel from '@/utils/exportToExcel';

type ProductGroupsTableProps = {
  tableData: ProductGroup[];
};

export default function ProductGroupsTable({
  tableData,
}: ProductGroupsTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<ProductGroup | null>(
    null
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [deleteProductGroupModalIsOpen, setDeleteProductGroupModalIsOpen] =
    useState<boolean>(false);
  const [editProductGroupModalIsOpen, setEditProductGroupModalIsOpen] =
    useState<boolean>(false);
  const [addProductGroupModalIsOpen, setAddProductGroupModalIsOpen] =
    useState<boolean>(false);

  const { isLoading } = useQuery(['product-groups'], { enabled: false });

  const handleExportToExcel = () => {
    const data = tableData.map((item) => ({
      ID: item.id,
      İsim: item.name,
      Banka: item.bank_name,
      'Banka Kodu': item.client_id,
      Durum: item.is_active ? 'Aktif' : 'Pasif',
    }));
    exportToExcel({ data, fileName: 'urun-gruplari' });
  };

  const columns = useMemo<ColumnDef<ProductGroup>[]>(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false,
        header: () => <span>ID</span>,
      },
      {
        accessorKey: 'name',
        header: () => <span>Ürün Grubu Adı</span>,
      },
      {
        accessorKey: 'bank_name',
        header: () => <span>Banka</span>,
      },
      {
        accessorKey: 'client_id',
        header: () => <span>Banka Kodu</span>,
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
            <ProductGroupActionsDropdown
              record={row.original}
              key={row.id}
              setEditProductGroupModalIsOpen={setEditProductGroupModalIsOpen}
              setDeleteProductGroupModalIsOpen={
                setDeleteProductGroupModalIsOpen
              }
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
              onClick={() => setAddProductGroupModalIsOpen(true)}
              className='flex-end inline-flex items-center gap-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md'
            >
              <PlusIcon className='h-5 w-5' />
              <span>Ürün Grubu Ekle</span>
            </button>
          </div>
          <TableInstance isLoading={isLoading} table={table} />
        </div>
        <div className='h-4'></div>
      </div>

      {selectedRecord !== null ? (
        <EditProductGroupDialog
          open={editProductGroupModalIsOpen}
          setOpen={setEditProductGroupModalIsOpen}
          record={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      ) : null}

      {selectedRecord !== null ? (
        <DeleteProductGroupDialog
          open={deleteProductGroupModalIsOpen}
          setOpen={setDeleteProductGroupModalIsOpen}
          record={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      ) : null}

      {addProductGroupModalIsOpen ? (
        <AddProductGroupDialog
          open={addProductGroupModalIsOpen}
          setOpen={setAddProductGroupModalIsOpen}
        />
      ) : null}
    </>
  );
}
