import { css } from '@emotion/react';
import type { MenuCategory } from '@/types/order';

const wrapper = css({
  display: 'flex',
  gap: 0,
  borderBottom: '1px solid #e5e8eb',
  padding: '0 20px',
  overflowX: 'auto',
});

const tabBase = css({
  flex: 1,
  padding: '12px 16px',
  fontSize: 15,
  whiteSpace: 'nowrap',
  transition: 'all 0.15s',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  borderBottom: '2px solid transparent',
  textAlign: 'center',
});

const tabActive = css(tabBase, {
  fontWeight: 700,
  color: '#191f28',
  borderBottomColor: '#191f28',
});

const tabInactive = css(tabBase, {
  fontWeight: 400,
  color: '#8b95a1',
  borderBottomColor: 'transparent',
});

interface CategoryTabsProps {
  categories: MenuCategory[];
  selected: MenuCategory | null;
  onSelect: (category: MenuCategory) => void;
}

export function CategoryTabs({ categories, selected, onSelect }: CategoryTabsProps) {
  return (
    <div css={wrapper}>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          css={selected === cat ? tabActive : tabInactive}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
