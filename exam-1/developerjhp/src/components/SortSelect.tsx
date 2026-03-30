import type { SortOption } from '@/types/product';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: '최신순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
  { value: 'rating', label: '평점순' },
];

interface Props {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortSelect({ value, onChange }: Props) {
  return (
    <div className="sort-wrapper">
      <label htmlFor="sort-select">정렬</label>
      <select
        id="sort-select"
        className="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
