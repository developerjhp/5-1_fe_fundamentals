import { css } from '@emotion/react';
import type { GridOption } from '@/types/order';

const wrapper = css({ padding: '16px 20px' });
const header = css({ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 });
const name = css({ fontSize: 15, fontWeight: 700, color: '#333d4b' });
const badge = css({
  fontSize: 12,
  fontWeight: 600,
  color: '#ffb24d',
  backgroundColor: '#fff4e0',
  padding: '2px 8px',
  borderRadius: 4,
});

const icon = css({ fontSize: 24 });

const itemBase = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  padding: '16px 8px',
  borderRadius: 12,
  cursor: 'pointer',
  transition: 'all 0.15s',
});

const itemSelected = css(itemBase, { border: '2px solid #ffb24d', backgroundColor: '#fff8ed' });
const itemUnselected = css(itemBase, { border: '1px solid #e5e8eb', backgroundColor: '#fff' });

const labelSelected = css({ fontSize: 14, fontWeight: 600, color: '#ffb24d' });
const labelUnselected = css({ fontSize: 14, fontWeight: 400, color: '#4e5968' });
const extraPrice = css({ fontSize: 12, color: '#8b95a1' });

interface OptionGridProps {
  option: GridOption;
  selectedLabel: string | null;
  onSelect: (label: string) => void;
}

export function OptionGrid({ option, selectedLabel, onSelect }: OptionGridProps) {
  return (
    <div css={wrapper}>
      <div css={header}>
        <span css={name}>{option.name}</span>
        {option.required && <span css={badge}>필수</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${option.col}, 1fr)`, gap: 8 }}>
        {option.labels.map((label, index) => {
          const isSelected = selectedLabel === label;
          return (
            <button key={label} type="button" onClick={() => onSelect(label)} css={isSelected ? itemSelected : itemUnselected}>
              <span css={icon}>{option.icons[index]}</span>
              <span css={isSelected ? labelSelected : labelUnselected}>{label}</span>
              {option.prices[index] > 0 && <span css={extraPrice}>+{option.prices[index].toLocaleString()}원</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
