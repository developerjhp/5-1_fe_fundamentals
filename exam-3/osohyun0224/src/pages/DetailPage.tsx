import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMenuItem, useOptions } from '@/features/detail/api/queries';
import { OptionGrid } from '@/features/detail/components/OptionGrid';
import { OptionList } from '@/features/detail/components/OptionList';
import { OptionSelect } from '@/features/detail/components/OptionSelect';
import { useOptionSelection } from '@/features/detail/hooks/useOptionSelection';
import { AsyncBoundary } from '@/shared/components/AsyncBoundary';
import { FixedBottomCTA } from '@/shared/components/FixedBottomCTA';
import { NavigationBar } from '@/shared/components/NavigationBar';
import { NumericSpinner } from '@/shared/components/NumericSpinner';
import { useCart } from '@/shared/hooks/useCart';
import { showToast } from '@/shared/stores/toastStore';
import { formatPrice } from '@/shared/utils/format';
import type { OptionSelection } from '@/types/order';

const imageWrapper = css({ display: 'flex', justifyContent: 'center', padding: '20px 0' });
const image = css({ width: 170, height: 170, objectFit: 'contain' });
const info = css({ padding: '0 20px' });
const itemTitle = css({ fontSize: 22, fontWeight: 700, color: '#191f28' });
const description = css({ fontSize: 14, color: '#8b95a1', marginTop: 4 });
const priceRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 20px 24px',
});
const basePrice = css({ fontSize: 18, fontWeight: 700, color: '#191f28' });
const dividerThick = css({ height: 8, backgroundColor: '#f2f4f6' });
const dividerThin = css({ height: 1, backgroundColor: '#f2f4f6', margin: '0 20px' });
const spacer = css({ height: 80 });

const skeletonImage = css({ width: 170, height: 170, backgroundColor: '#f2f4f6', borderRadius: 12 });
const skeletonTitle = css({
  width: 120,
  height: 24,
  backgroundColor: '#f2f4f6',
  borderRadius: 4,
  marginBottom: 8,
});
const skeletonDesc = css({ width: 200, height: 16, backgroundColor: '#f2f4f6', borderRadius: 4 });

const notFound = css({ padding: 20, textAlign: 'center', color: '#8b95a1' });

function DetailSkeleton() {
  return (
    <div>
      <NavigationBar onBack={() => {}} />
      <div css={imageWrapper}>
        <div css={skeletonImage} />
      </div>
      <div css={info}>
        <div css={skeletonTitle} />
        <div css={skeletonDesc} />
      </div>
    </div>
  );
}

function DetailPageMain({ itemId }: { itemId: string }) {
  const navigate = useNavigate();
  const { data: menuItem } = useMenuItem(itemId);
  const { data: allOptions } = useOptions();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const updateQuantity = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const itemOptions = allOptions.filter((opt) => menuItem.optionIds.includes(opt.id));
  const {
    selections,
    selectSingle,
    toggleMulti,
    getTotalOptionPrice,
    validateRequired,
  } = useOptionSelection(itemOptions);

  const unitPrice = menuItem.price + getTotalOptionPrice();
  const finalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const validation = validateRequired();
    if (!validation.valid && validation.missingName) {
      showToast(`${validation.missingName}을(를) 선택해주세요`);
      return;
    }
    const options: OptionSelection[] = itemOptions
      .filter((opt) => (selections[opt.id] || []).length > 0)
      .map((opt) => ({ optionId: opt.id, labels: selections[opt.id] }));
    addToCart({
      itemId: menuItem.id,
      title: menuItem.title,
      basePrice: menuItem.price,
      options,
      quantity,
      unitPrice,
    });
    navigate('/');
  };

  return (
    <div>
      <NavigationBar onBack={() => navigate(-1)} />
      <div css={imageWrapper}>
        <img src={menuItem.iconImg} alt={menuItem.title} css={image} />
      </div>
      <div css={info}>
        <h2 css={itemTitle}>{menuItem.title}</h2>
        <p css={description}>{menuItem.description}</p>
      </div>
      <div css={priceRow}>
        <span css={basePrice}>{formatPrice(menuItem.price)}</span>
        <NumericSpinner value={quantity} onChange={updateQuantity} />
      </div>
      {itemOptions.map((option, index) => (
        <div key={option.id}>
          {index === 0 && <div css={dividerThick} />}
          {index > 0 && <div css={dividerThin} />}
          {option.type === 'grid' && (
            <OptionGrid
              option={option}
              selectedLabel={selections[option.id]?.[0] || null}
              onSelect={(l) => selectSingle(option.id, l)}
            />
          )}
          {option.type === 'select' && (
            <OptionSelect
              option={option}
              selectedLabel={selections[option.id]?.[0] || null}
              onSelect={(l) => selectSingle(option.id, l)}
            />
          )}
          {option.type === 'list' && (
            <OptionList
              option={option}
              selectedLabels={selections[option.id] || []}
              onToggle={(l) => toggleMulti(option.id, l)}
            />
          )}
        </div>
      ))}
      <div css={spacer} />
      <FixedBottomCTA onClick={handleAddToCart}>
        {quantity}개 {formatPrice(finalPrice)} 담기
      </FixedBottomCTA>
    </div>
  );
}

export function DetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  if (!itemId) {
    return <div css={notFound}>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <AsyncBoundary fallback={<DetailSkeleton />}>
      <DetailPageMain itemId={itemId} />
    </AsyncBoundary>
  );
}
