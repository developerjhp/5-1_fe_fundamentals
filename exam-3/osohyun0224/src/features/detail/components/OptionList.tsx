import { css } from '@emotion/react';
import { formatPrice } from '@/shared/utils/format';
import { showToast } from '@/shared/stores/toastStore';
import type { ListOption } from '@/types/order';

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
const list = css({ display: 'flex', flexDirection: 'column' });

const itemButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  border: 'none',
});

const itemWithBorder = css({
  borderBottom: '1px solid #f2f4f6',
});

const itemLabel = css({ fontSize: 15, color: '#333d4b' });
const itemPrice = css({ fontSize: 13, color: '#8b95a1', marginTop: 2 });

const checkboxChecked = css({
  width: 24,
  height: 24,
  borderRadius: 4,
  backgroundColor: '#ffb24d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all 0.15s',
  border: 'none',
});

const checkboxUnchecked = css({
  width: 24,
  height: 24,
  borderRadius: 4,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all 0.15s',
  border: '2px solid #d1d6db',
});

interface OptionListProps {
  option: ListOption;
  selectedLabels: string[];
  onToggle: (label: string) => void;
}

export function OptionList({ option, selectedLabels, onToggle }: OptionListProps) {
  const handleToggle = (label: string) => {
    if (!selectedLabels.includes(label) && selectedLabels.length >= option.maxCount) {
      showToast(`최대 ${option.maxCount}개까지 선택할 수 있어요`);
      return;
    }
    onToggle(label);
  };

  const getBadgeText = () => {
    if (option.minCount > 0 && option.minCount === option.maxCount) return `${option.minCount}개 선택`;
    if (option.minCount > 0) return `${option.minCount}~${option.maxCount}개 선택`;
    return null;
  };

  const badgeText = getBadgeText();

  return (
    <div css={wrapper}>
      <div css={header}>
        <span css={name}>
          {option.name} (최대 {option.maxCount}개)
        </span>
        {badgeText && <span css={badge}>{badgeText}</span>}
        {option.required && !badgeText && <span css={badge}>필수</span>}
      </div>
      <div css={list}>
        {option.labels.map((label, index) => {
          const isChecked = selectedLabels.includes(label);
          const isLast = index === option.labels.length - 1;
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleToggle(label)}
              css={[itemButton, !isLast && itemWithBorder]}
            >
              <div>
                <div css={itemLabel}>{label}</div>
                <div css={itemPrice}>
                  {option.prices[index] > 0 ? `+${formatPrice(option.prices[index])}` : '+0원'}
                </div>
              </div>
              <div css={isChecked ? checkboxChecked : checkboxUnchecked}>
                {isChecked && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="#fff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
