import ConsumableTypesTable from '@/components/tables/definitions/consumableTypes/ConsumableTypesTable';
import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { ConsumableType } from '@/data/models/entityModels';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useGetConsumableTypes } from '@/data/hooks/definitions/useConsumableTypesData';

export default function MatbuatTurleri() {
  const [tableData, setTableData] = useState<ConsumableType[]>([]);

  const onGetConsumableTypesSuccess = (
    data: ResponseObject<ConsumableType[]>
  ) => {
    setTableData(data.data);
  };

  const onGetConsumableTypesError = () => {};

  useGetConsumableTypes(onGetConsumableTypesSuccess, onGetConsumableTypesError);

  return (
    <>
      <ConsumableTypesTable tableData={tableData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
