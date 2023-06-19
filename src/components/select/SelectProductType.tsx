import { ProductType } from '@/data/models/entityModels';
import { useGetProductTypes } from '@/data/hooks/definitions/useProductTypesData';
import ComboboxInstance from './ComboboxInstance';

type SelectProductTypeProps = {
  selected: ProductType | null;
  setSelected: React.Dispatch<React.SetStateAction<ProductType | null>>;
  defaultSelectionId?: number;
};

export default function SelectProductType({
  selected,
  setSelected,
  defaultSelectionId,
}: SelectProductTypeProps) {
  const { data, isLoading } = useGetProductTypes(
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
      id='product-type-id'
      fieldDisplayName='Ürün tipi'
      defaultSelectionId={defaultSelectionId}
    />
  );
}
