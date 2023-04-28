import BanksTable from '@/components/tables/BanksTable';
import { useGetBanks } from '@/dataHooks/useBanksData';
import { useState, useContext } from 'react';
import type { Bank, GetBanksResponse } from '@/dataHooks/useBanksData';
import { AppContext } from '@/context/AppContext';

export default function Bankalar() {
  const { test, setTest } = useContext(AppContext);

  const [tableData, setTableData] = useState<Bank[]>([]);

  console.log(tableData);

  const onGetBanksSuccess = (data: GetBanksResponse) => {
    console.log('scs');
    setTableData(data.recordset);
  };

  const onGetBanksError = () => {
    console.log('err');
  };

  const getBanksQueryResult = useGetBanks(onGetBanksSuccess, onGetBanksError);

  return (
    <>
      <BanksTable queryResult={getBanksQueryResult} tableData={tableData} />
      <div className='mt-20'>
        {getBanksQueryResult.isLoading
          ? 'loading'
          : `${JSON.stringify(getBanksQueryResult.data?.recordset)}`}
      </div>
      <div className='mt-4'>
        {getBanksQueryResult.isError &&
          `${JSON.stringify(getBanksQueryResult.error)}`}
      </div>
    </>
  );
}
