import ProductTypesTable from '@/components/tables/definitions/productTypes/ProductTypesTable';
import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { ProductType } from '@/data/models/entityModels';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useGetProductTypes } from '@/data/hooks/definitions/useProductTypesData';

export default function UrunTipleri() {
  const [tableData, setTableData] = useState<ProductType[]>([]);

  const onGetProductTypesSuccess = (data: ResponseObject<ProductType[]>) => {
    setTableData(data.data);
  };

  const onGetProductTypesError = () => {};

  useGetProductTypes(onGetProductTypesSuccess, onGetProductTypesError);

  return (
    <>
      <ProductTypesTable tableData={tableData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
