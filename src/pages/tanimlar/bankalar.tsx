import BanksTable from '@/components/tables/definitions/banks/BanksTable';
import { useGetBanks } from '@/data/hooks/definitions/useBanksData';
import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { Bank } from '@/data/models/entityModels';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Bankalar() {
  const [tableData, setTableData] = useState<Bank[]>([]);

  const onGetBanksSuccess = (data: ResponseObject<Bank[]>) => {
    setTableData(data.data);
  };

  const onGetBanksError = () => {};

  useGetBanks(onGetBanksSuccess, onGetBanksError);

  return (
    <>
      <BanksTable tableData={tableData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
