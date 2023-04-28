import { PropsWithChildren, useState, ChangeEvent, FormEvent } from 'react';
import { useAddBank } from '@/dataHooks/useBanksData';
import DialogWrapper from '../DialogWrapper';

export default function AddBankDialog({ children }: PropsWithChildren) {
  const [newBankName, setNewBankName] = useState<string>('');

  const { mutate, isLoading, isError, error } = useAddBank();

  const newBankNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBankName(e.currentTarget.value);
  };

  const addBankOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(newBankName);
  };

  return (
    <>
      <DialogWrapper title='Banka Ekle' trigger={children}>
        <form onSubmit={addBankOnSubmit}>
          <fieldset className='mb-[15px] flex items-center gap-5'>
            <label
              className='w-[90px] text-right text-[15px] text-violet11'
              htmlFor='bankName'
            >
              Banka İsmi
            </label>
            <input
              value={newBankName}
              onChange={newBankNameOnChange}
              disabled={isLoading}
              id='bankName'
              className='inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8'
            />
          </fieldset>
          <button
            type='submit'
            disabled={isLoading}
            className='inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none'
          >
            Gönder
          </button>
        </form>
      </DialogWrapper>
    </>
  );
}
