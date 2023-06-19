import { useGetPrinters } from '@/data/hooks/definitions/usePrintersData';
import { useState } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { Printer } from '@/data/models/entityModels';
import PrintersTable from '@/components/tables/definitions/printers/PrintersTable';
import authControl from '@/utils/authControl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Makineler() {
  const [tableData, setTableData] = useState<Printer[]>([]);

  const onGetPrintersSuccess = (data: ResponseObject<Printer[]>) => {
    setTableData(data.data);
  };

  const onGetPrintersError = () => {};

  useGetPrinters(onGetPrintersSuccess, onGetPrintersError);

  return (
    <>
      <PrintersTable tableData={tableData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return authControl(context);
};
