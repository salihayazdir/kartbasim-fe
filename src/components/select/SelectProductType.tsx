import { ProductType } from '@/data/models/entityModels';
import { useGetProductTypes } from '@/data/hooks/useProductTypesData';
import ComboboxInstance from './ComboboxInstance';

type SelectProductTypeProps = {
  selected: ProductType | undefined;
  setSelected: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
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
      notFoundText='Ürün tipi bulunamadı.'
      defaultSelectionId={defaultSelectionId}
    />
  );
}
