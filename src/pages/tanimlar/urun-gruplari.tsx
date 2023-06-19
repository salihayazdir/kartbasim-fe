import ProductGroupsTable from '@/components/tables/definitions/productGroups/ProductGroupsTable';
import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { ProductGroup } from '@/data/models/entityModels';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useGetProductGroups } from '@/data/hooks/definitions/useProductGroupsData';

export default function UrunGruplari() {
  const [tableData, setTableData] = useState<ProductGroup[]>([]);

  const onGetProductGroupsSuccess = (data: ResponseObject<ProductGroup[]>) => {
    setTableData(data.data);
  };

  const onGetProductGroupsError = () => {};

  useGetProductGroups(onGetProductGroupsSuccess, onGetProductGroupsError);

  return (
    <>
      <ProductGroupsTable tableData={tableData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
