import { useProductFilters } from '@/hooks/useProductFilters';
import type { SortOption } from '@/types/product';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
  { value: 'newest', label: '신상품순' },
  { value: 'rating', label: '평점순' },
];

function SortSelect() {
  const { sort, setSort } = useProductFilters();

  return (
    <select
      aria-label="정렬"
      className="cursor-pointer border-none bg-transparent text-xs font-medium text-gray-900 outline-none md:text-sm"
      value={sort}
      onChange={(e) => setSort(e.target.value as SortOption)}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortSelect;
