import { ConsumableType } from '@/data/models/entityModels';
import { useGetConsumableTypes } from '@/data/hooks/definitions/useConsumableTypesData';
import ComboboxInstance from './ComboboxInstance';

type SelectConsumableTypeProps = {
  selected: ConsumableType | null;
  setSelected: React.Dispatch<React.SetStateAction<ConsumableType | null>>;
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
      fieldDisplayName='Matbuat türü'
      defaultSelectionId={defaultSelectionId}
    />
  );
}
