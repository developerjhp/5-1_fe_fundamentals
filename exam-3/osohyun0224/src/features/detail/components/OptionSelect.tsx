import { css } from '@emotion/react';
import { useState } from 'react';
import { BottomSheet } from '@/shared/components/BottomSheet';
import { formatPrice } from '@/shared/utils/format';
import type { SelectOption } from '@/types/order';

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

const selectSelected = css({
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: '1px solid #e5e8eb',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: 15,
  color: '#191f28',
});

const selectPlaceholder = css({
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: '1px solid #e5e8eb',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: 15,
  color: '#8b95a1',
});

const optionBase = css({
  width: '100%',
  padding: '14px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
});

const optionSelected = css(optionBase, { backgroundColor: '#f8f9fa' });
const optionUnselected = css(optionBase, { backgroundColor: 'transparent' });

const optionLabelSelected = css({ fontSize: 16, color: '#ffb24d', fontWeight: 600 });
const optionLabelUnselected = css({ fontSize: 16, color: '#333d4b', fontWeight: 400 });
const optionPrice = css({ fontSize: 13, color: '#8b95a1' });

interface OptionSelectProps {
  option: SelectOption;
  selectedLabel: string | null;
  onSelect: (label: string) => void;
}

export function OptionSelect({ option, selectedLabel, onSelect }: OptionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (label: string) => {
    onSelect(label);
    setIsOpen(false);
  };

  return (
    <div css={wrapper}>
      <div css={header}>
        <span css={name}>{option.name}</span>
        {option.required && <span css={badge}>필수</span>}
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        css={selectedLabel ? selectSelected : selectPlaceholder}
      >
        <span>{selectedLabel || '선택해주세요'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title={`${option.name}을 선택해주세요`}>
        {option.labels.map((label, index) => {
          const isSel = selectedLabel === label;
          return (
            <button key={label} type="button" onClick={() => handleSelect(label)} css={isSel ? optionSelected : optionUnselected}>
              <span css={isSel ? optionLabelSelected : optionLabelUnselected}>{label}</span>
              {option.prices[index] > 0 && <span css={optionPrice}>+{formatPrice(option.prices[index])}</span>}
            </button>
          );
        })}
      </BottomSheet>
    </div>
  );
}
