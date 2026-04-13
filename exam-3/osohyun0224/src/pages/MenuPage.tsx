import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCategories, useMenuItems } from '@/features/menu/api/queries';
import { CategoryTabs } from '@/features/menu/components/CategoryTabs';
import { MenuCard } from '@/features/menu/components/MenuCard';
import { AsyncBoundary } from '@/shared/components/AsyncBoundary';
import { FixedBottomCTA } from '@/shared/components/FixedBottomCTA';
import { useCart } from '@/shared/hooks/useCart';
import { formatPrice } from '@/shared/utils/format';
import type { MenuCategory } from '@/types/order';

const pageTitle = css({ padding: '20px 20px 8px' });
const title = css({ fontSize: 22, fontWeight: 700, color: '#191f28' });
const spacer = css({ height: 80 });

const skeletonTabs = css({
  display: 'flex',
  gap: 0,
  padding: '0 20px',
  borderBottom: '1px solid #e5e8eb',
});
const skeletonTab = css({
  flex: 1,
  height: 20,
  backgroundColor: '#f2f4f6',
  borderRadius: 4,
  margin: '12px 8px',
});
const skeletonRow = css({
  display: 'flex',
  gap: 16,
  padding: '12px 20px',
  alignItems: 'center',
});
const skeletonImage = css({ width: 56, height: 56, backgroundColor: '#f2f4f6', borderRadius: 12 });
const skeletonTextLong = css({
  width: 120,
  height: 16,
  backgroundColor: '#f2f4f6',
  borderRadius: 4,
  marginBottom: 4,
});
const skeletonTextShort = css({ width: 60, height: 14, backgroundColor: '#f2f4f6', borderRadius: 4 });

function MenuPageSkeleton() {
  return (
    <div>
      <div css={skeletonTabs}>
        {[1, 2, 3].map((i) => (
          <div key={i} css={skeletonTab} />
        ))}
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} css={skeletonRow}>
          <div css={skeletonImage} />
          <div>
            <div css={skeletonTextLong} />
            <div css={skeletonTextShort} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Suspense 경계 안에서만 훅 호출 (상단 제목은 즉시 표시). */
function MenuItemsSection() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories } = useCategories();
  const { data: menuItems } = useMenuItems();

  const selectedCategory =
    (searchParams.get('category') as MenuCategory | null) || categories[0] || null;

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return [];
    return menuItems.filter((item) => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);

  return (
    <>
      <CategoryTabs
        categories={categories}
        selected={selectedCategory}
        onSelect={(cat) => setSearchParams({ category: cat })}
      />
      <div>
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} onClick={() => navigate(`/menu/${item.id}`)} />
        ))}
      </div>
    </>
  );
}

export function MenuPage() {
  const navigate = useNavigate();
  const { state } = useCart();

  const ctaText =
    state.totalQuantity === 0
      ? '장바구니 보기'
      : `${state.totalQuantity}개 ${formatPrice(state.totalPrice)} 장바구니`;

  return (
    <>
      <div css={pageTitle}>
        <h1 css={title}>커피 사일로</h1>
      </div>
      <AsyncBoundary fallback={<MenuPageSkeleton />}>
        <MenuItemsSection />
      </AsyncBoundary>
      <div css={spacer} />
      <FixedBottomCTA onClick={() => navigate('/cart')}>{ctaText}</FixedBottomCTA>
    </>
  );
}
