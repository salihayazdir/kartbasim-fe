import { ProductGroup } from '@/data/models/entityModels';
import { useGetProductGroups } from '@/data/hooks/useProductGroupsData';
import ComboboxInstance from './ComboboxInstance';

type SelectProductGroupProps = {
  selected: ProductGroup | undefined;
  setSelected: React.Dispatch<React.SetStateAction<ProductGroup | undefined>>;
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
      notFoundText='Ürün grubu bulunamadı.'
      defaultSelectionId={defaultSelectionId}
    />
  );
}
