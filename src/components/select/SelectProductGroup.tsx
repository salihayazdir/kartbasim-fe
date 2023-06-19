import { ProductGroup } from '@/data/models/entityModels';
import { useGetProductGroups } from '@/data/hooks/definitions/useProductGroupsData';
import ComboboxInstance from './ComboboxInstance';

type SelectProductGroupProps = {
  selected: ProductGroup | null;
  setSelected: React.Dispatch<React.SetStateAction<ProductGroup | null>>;
  defaultSelectionId?: number;
};

export default function SelectProductGroup({
  selected,
  setSelected,
  defaultSelectionId,
}: SelectProductGroupProps) {
  const { data, isLoading } = useGetProductGroups(
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
      id='product-group-id'
      fieldDisplayName='Ürün grubu'
      defaultSelectionId={defaultSelectionId}
    />
  );
}
