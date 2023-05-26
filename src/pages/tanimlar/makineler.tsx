import { useGetPrinters } from '@/data/hooks/usePrintersData';
import { useState, useContext, useRef } from 'react';
import type { ResponseObject } from '@/data/models/dataTransferModels';
import type { Printer } from '@/data/models/entityModels';
import { AppContext } from '@/context/AppContext';
import PrintersTable from '@/components/tables/printers/PrintersTable';

export default function Makineler() {
  const { test, setTest } = useContext(AppContext);

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
