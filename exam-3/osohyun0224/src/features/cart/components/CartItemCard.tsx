import { css } from '@emotion/react';
import { ListRow } from '@/shared/components/ListRow';
import { NumericSpinner } from '@/shared/components/NumericSpinner';
import { formatPrice } from '@/shared/utils/format';
import type { CartItem } from '@/types/order';

const title = css({ fontSize: 16, fontWeight: 600, color: '#191f28' });
const options = css({ fontSize: 14, color: '#8b95a1', marginTop: 2 });
const priceCalc = css({ fontSize: 14, color: '#4e5968', marginTop: 2, fontWeight: 500 });
const rightGroup = css({ display: 'flex', alignItems: 'center', gap: 12 });
const removeButton = css({
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#8b95a1',
  padding: 0,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

interface CartItemCardProps {
  item: CartItem;
  cartId: string;
  onQuantityChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({ item, cartId, onQuantityChange, onRemove }: CartItemCardProps) {
  const optionsText =
    item.options.length > 0 ? item.options.map((opt) => opt.labels.join(', ')).join(', ') : '기본';

  return (
    <ListRow
      contents={
        <div>
          <div css={title}>{item.title}</div>
          <div css={options}>{optionsText}</div>
          <div css={priceCalc}>
            {formatPrice(item.unitPrice)} × {item.quantity} = {formatPrice(item.unitPrice * item.quantity)}
          </div>
        </div>
      }
      right={
        <div css={rightGroup}>
          <NumericSpinner size="small" value={item.quantity} onChange={(qty) => onQuantityChange(cartId, qty)} />
          <button type="button" onClick={() => onRemove(cartId)} aria-label="삭제" css={removeButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      }
    />
  );
}
