import type { Category } from '@/types/product';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'shoes', label: '신발' },
  { value: 'tops', label: '상의' },
  { value: 'bottoms', label: '하의' },
  { value: 'accessories', label: '액세서리' },
];

interface Props {
  selected: Category[];
  onChange: (categories: Category[]) => void;
}

export function CategoryFilter({ selected, onChange }: Props) {
  const toggle = (category: Category) => {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category));
    } else {
      onChange([...selected, category]);
    }
  };

  return (
    <fieldset className="category-filter">
      <legend>카테고리</legend>
      <div className="category-options">
        {CATEGORIES.map(({ value, label }) => (
          <label key={value} className="category-checkbox">
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => toggle(value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
