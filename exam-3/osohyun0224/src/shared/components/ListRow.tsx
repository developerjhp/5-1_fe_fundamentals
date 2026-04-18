import { css } from '@emotion/react';
import type { ReactNode } from 'react';

const row = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  width: '100%',
  textAlign: 'left',
  gap: 12,
});

const clickable = css(row, {
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
});

const contentsArea = css({
  flex: 1,
  minWidth: 0,
});

const right = css({
  flexShrink: 0,
});

interface ListRowProps {
  contents: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
}

export function ListRow({ contents, right: rightSlot, onClick }: ListRowProps) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} css={clickable}>
        <div css={contentsArea}>{contents}</div>
        {rightSlot && <div css={right}>{rightSlot}</div>}
      </button>
    );
  }

  return (
    <div css={row}>
      <div css={contentsArea}>{contents}</div>
      {rightSlot && <div css={right}>{rightSlot}</div>}
    </div>
  );
}
