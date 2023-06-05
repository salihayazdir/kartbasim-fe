import BanksTable from '@/components/tables/banks/BanksTable';
import { useGetBanks } from '@/data/hooks/useBanksData';
import { useState, useContext, useRef } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { Bank } from '@/data/models/entityModels';
import { AppContext } from '@/context/AppContext';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Bankalar() {
  const { test, setTest } = useContext(AppContext);

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
