import ConsumablesTable from '@/components/tables/consumables/ConsumablesTable';
import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { Consumable } from '@/data/models/entityModels';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useGetConsumables } from '@/data/hooks/useConsumablesData';

export default function Matbuat() {
  const [tableData, setTableData] = useState<Consumable[]>([]);

  const onGetConsumablesSuccess = (data: ResponseObject<Consumable[]>) => {
    setTableData(data.data);
  };

  const onGetConsumablesError = () => {};

  useGetConsumables(onGetConsumablesSuccess, onGetConsumablesError);

  return (
    <>
      <ConsumablesTable tableData={tableData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
