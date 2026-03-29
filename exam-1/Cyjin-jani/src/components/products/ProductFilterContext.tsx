import { createContext, useContext } from 'react';
import {
  type ProductFiltersReturn,
  useProductFilters,
} from '@/hooks/useProductFilters';

const ProductFilterContext = createContext<ProductFiltersReturn | null>(null);

export const ProductFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useProductFilters();

  return (
    <ProductFilterContext.Provider value={value}>
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilterContext = (): ProductFiltersReturn => {
  const ctx = useContext(ProductFilterContext);
  if (!ctx)
    throw new Error(
      'useProductFilterContext는 ProductFilterProvider 내부에서만 사용할 수 있습니다.',
    );
  return ctx;
};
