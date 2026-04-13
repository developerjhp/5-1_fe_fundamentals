import { css } from '@emotion/react';

const wrapperDefault = css({ display: 'flex', alignItems: 'center', gap: 12 });
const wrapperSmall = css({ display: 'flex', alignItems: 'center', gap: 8 });

const spinButtonBase = css({
  borderRadius: '50%',
  border: '1px solid #d1d6db',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  backgroundColor: '#fff',
});

const spinDefault = css(spinButtonBase, { width: 32, height: 32 });
const spinSmall = css(spinButtonBase, { width: 28, height: 28 });

const spinDisabled = css({ color: '#d1d6db', cursor: 'not-allowed' });
const spinEnabled = css({ color: '#4e5968', cursor: 'pointer' });

const valueDefault = css({
  minWidth: 24,
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 600,
  color: '#191f28',
});

const valueSmall = css({
  minWidth: 24,
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 600,
  color: '#191f28',
});

interface NumericSpinnerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  size?: 'small' | 'default';
}

export function NumericSpinner({ value, onChange, min = 1, size = 'default' }: NumericSpinnerProps) {
  const isMin = value <= min;
  const wrap = size === 'small' ? wrapperSmall : wrapperDefault;
  const spinSize = size === 'small' ? spinSmall : spinDefault;
  const valStyle = size === 'small' ? valueSmall : valueDefault;
  const stateStyle = isMin ? spinDisabled : spinEnabled;

  return (
    <div css={wrap}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={isMin}
        aria-label="수량 감소"
        css={[spinSize, stateStyle]}
      >
        −
      </button>
      <span css={valStyle}>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="수량 증가" css={[spinSize, spinEnabled]}>
        +
      </button>
    </div>
  );
}
