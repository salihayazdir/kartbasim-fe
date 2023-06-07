import ProductsTable from '@/components/tables/products/ProductsTable';
import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { Product } from '@/data/models/entityModels';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useGetProducts } from '@/data/hooks/useProductsData';

export default function Urunler() {
  const [tableData, setTableData] = useState<Product[]>([]);

  const onGetProductsSuccess = (data: ResponseObject<Product[]>) => {
    setTableData(data.data);
  };

  const onGetProductsError = () => {};

  useGetProducts(onGetProductsSuccess, onGetProductsError);

  return (
    <>
      <ProductsTable tableData={tableData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
