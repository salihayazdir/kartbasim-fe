import React from 'react';
import { Table, flexRender, Column } from '@tanstack/react-table';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface TableProps {
  table: Table<any>;
  isLoading: boolean;
}

export default function TableInstance({ table, isLoading }: TableProps) {
  const isEmpty = table.getFilteredRowModel().rows.length === 0;
  return (
    <>
      <table className='w-full border-collapse rounded-lg text-xs'>
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
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center gap-2'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUpIcon className='h-3 w-3' />,
                            desc: <ChevronDownIcon className='h-3 w-3' />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
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
      {isLoading ? (
        <div className='flex w-full flex-col gap-3 px-4 pt-4 text-center '>
          <div className='h-6 animate-pulse rounded-full bg-gray-100'></div>
          <div className='h-6 animate-pulse rounded-full bg-gray-100'></div>
          <div className='h-6 animate-pulse rounded-full bg-gray-100'></div>
        </div>
      ) : null}
      {/* {isEmpty && !isLoading ? (
        <div className='flex w-full flex-col gap-3 px-4 pt-4 text-center '>
          <div className=' rounded-lg bg-gray-100 px-6 py-2 font-bold text-gray-400'>
            Sonuç Bulunamadı
          </div>
        </div>
      ) : null} */}
    </>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === 'number' ? (
    <div>
      <div className='flex space-x-2'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className='w-24 rounded border shadow'
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className='w-24 rounded border shadow'
        />
      </div>
      <div className='h-1' />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        // placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        placeholder={`Ara...`}
        className='mt-1 w-32 rounded border px-2 py-0.5'
        list={column.id + 'list'}
      />
    </>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
