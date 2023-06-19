import { Bank } from '@/data/models/entityModels';
import { useGetBanks } from '@/data/hooks/definitions/useBanksData';
import ComboboxInstance from './ComboboxInstance';

type SelectBankProps = {
  selected: Bank | null;
  setSelected: React.Dispatch<React.SetStateAction<Bank | null>>;
  defaultSelectionId?: number;
};

export default function SelectBank({
  selected,
  setSelected,
  defaultSelectionId,
}: SelectBankProps) {
  const { data, isLoading } = useGetBanks(
    () => {},
    () => {}
  );
  const items = data?.data ?? [];

  return (
    <ComboboxInstance
      selected={selected}
      setSelected={setSelected}
      items={items}
      isLoading={isLoading}
      id='bank-id'
      fieldDisplayName='Banka'
      defaultSelectionId={defaultSelectionId}
    />
  );
}
