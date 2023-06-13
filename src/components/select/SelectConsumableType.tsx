import { ConsumableType } from '@/data/models/entityModels';
import { useGetConsumableTypes } from '@/data/hooks/useConsumableTypesData';
import ComboboxInstance from './ComboboxInstance';

type SelectConsumableTypeProps = {
  selected: ConsumableType | undefined;
  setSelected: React.Dispatch<React.SetStateAction<ConsumableType | undefined>>;
  defaultSelectionId?: number;
};

export default function SelectConsumableType({
  selected,
  setSelected,
  defaultSelectionId,
}: SelectConsumableTypeProps) {
  const { data, isLoading } = useGetConsumableTypes(
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
      id='consumable-type-id'
      notFoundText='Matbuat türü bulunamadı.'
      defaultSelectionId={defaultSelectionId}
    />
  );
}
