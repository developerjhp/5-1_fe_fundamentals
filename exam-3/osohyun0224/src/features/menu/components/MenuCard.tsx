import { css } from '@emotion/react';
import { ListRow } from '@/shared/components/ListRow';
import { formatPrice } from '@/shared/utils/format';
import type { MenuItem } from '@/types/order';

const row = css({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const image = css({
  width: 56,
  height: 56,
  borderRadius: 12,
  objectFit: 'cover',
  backgroundColor: '#f8f9fa',
  flexShrink: 0,
});

const title = css({
  fontSize: 16,
  fontWeight: 600,
  color: '#191f28',
});

const price = css({
  fontSize: 14,
  color: '#8b95a1',
  marginTop: 2,
});

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

export function MenuCard({ item, onClick }: MenuCardProps) {
  return (
    <ListRow
      onClick={onClick}
      contents={
        <div css={row}>
          <img src={item.iconImg} alt={item.title} css={image} />
          <div>
            <div css={title}>{item.title}</div>
            <div css={price}>{formatPrice(item.price)}</div>
          </div>
        </div>
      }
    />
  );
}
