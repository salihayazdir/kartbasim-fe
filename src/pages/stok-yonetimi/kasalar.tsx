import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type {
  Product,
  ProductInventoryRecords,
} from '@/data/models/entityModels';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useGetProducts } from '@/data/hooks/definitions/useProductsData';
import ProductInventoryTable from '@/components/tables/productInventory/ProductInventoryTable';
import { Tab } from '@headlessui/react';
import ProductInventoryRecordsTable from '@/components/tables/productInventory/ProductInventoryRecordsTable';
import { useProductInventoryRecordsData } from '@/data/hooks/useProductInventoryRecordsData';

export default function StokYonetimiKasalar() {
  const [selectedViewIndex, setSelectedViewIndex] = useState<number>(0);

  const [productsTableData, setProductsTableData] = useState<Product[]>([]);
  const [
    productInventoryRecordsTableData,
    setProductInventoryRecordsTableData,
  ] = useState<ProductInventoryRecords[]>([]);

  const onGetProductsSuccess = (data: ResponseObject<Product[]>) => {
    setProductsTableData(data.data);
  };
  const onGetProductsError = () => {};
  useGetProducts(onGetProductsSuccess, onGetProductsError);

  const onGetProductInventoryRecordsSuccess = (
    data: ResponseObject<ProductInventoryRecords[]>
  ) => {
    setProductInventoryRecordsTableData(data.data);
  };
  const onGetProductInventoryRecordsError = () => {};
  useProductInventoryRecordsData(
    onGetProductInventoryRecordsSuccess,
    onGetProductInventoryRecordsError
  );

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  const views: string[] = ['Stoklar', 'Stok Hareketleri'];

  return (
    <>
      <div className='flex items-center justify-between'>
        <Tab.Group onChange={(index) => setSelectedViewIndex(index)}>
          <Tab.List className='flex space-x-1 rounded-xl bg-gray-50 p-1'>
            {views.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'whitespace-nowrap px-4',
                    'w-full rounded-lg py-1.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60  focus:outline-none ',
                    selected
                      ? 'bg-white shadow-md'
                      : 'text-slate-400  hover:text-blue-700'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
        <div className='flex gap-6'>
          <div className='flex items-center gap-6 rounded-lg bg-sky-50 px-4 py-1.5 '>
            <div className='flex items-center gap-2'>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <g>
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    fill='rgb(2 132 199)' //sky-600
                    d='M10 20H6v2H4v-2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7V1.59a.5.5 0 0 1 .582-.493l10.582 1.764a1 1 0 0 1 .836.986V6h1v2h-1v7h1v2h-1v2.153a1 1 0 0 1-.836.986L20 20.333V22h-2v-1.333l-7.418 1.236A.5.5 0 0 1 10 21.41V20zm2-.36l8-1.334V4.694l-8-1.333v16.278zM16.5 14c-.828 0-1.5-1.12-1.5-2.5S15.672 9 16.5 9s1.5 1.12 1.5 2.5-.672 2.5-1.5 2.5z'
                  />
                </g>
              </svg>
              <div className='text-xs leading-none text-sky-500'>
                Günlük
                <br />
                Kasa
              </div>
            </div>
            <div className='text-xl font-bold text-sky-800'>2505</div>
          </div>
          <div className='flex items-center gap-6 rounded-lg bg-emerald-50 px-4 py-1.5 '>
            <div className='flex items-center gap-2'>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <g>
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    fill='rgb(5 150 105)' //emerald-600
                    d='M10 20H6v2H4v-2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7V1.59a.5.5 0 0 1 .582-.493l10.582 1.764a1 1 0 0 1 .836.986V6h1v2h-1v7h1v2h-1v2.153a1 1 0 0 1-.836.986L20 20.333V22h-2v-1.333l-7.418 1.236A.5.5 0 0 1 10 21.41V20zm2-.36l8-1.334V4.694l-8-1.333v16.278zM16.5 14c-.828 0-1.5-1.12-1.5-2.5S15.672 9 16.5 9s1.5 1.12 1.5 2.5-.672 2.5-1.5 2.5z'
                  />
                </g>
              </svg>
              <div className='text-xs leading-none text-emerald-500'>
                Ana
                <br />
                Kasa
              </div>
            </div>
            <div className='text-xl font-bold text-emerald-800'>65483</div>
          </div>
        </div>
      </div>
      <hr className='h-6 border-none' />
      <div className={`${selectedViewIndex !== 0 ? 'hidden' : null}`}>
        <ProductInventoryTable tableData={productsTableData} />
      </div>
      <div className={`${selectedViewIndex !== 1 ? 'hidden' : null}`}>
        <ProductInventoryRecordsTable
          tableData={productInventoryRecordsTableData}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
