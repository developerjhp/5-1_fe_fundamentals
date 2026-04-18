import { css } from '@emotion/react';
import type { ReactNode } from 'react';

const header = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 56,
  padding: '0 16px',
});

const side = css({
  width: 40,
  display: 'flex',
});

const leftSide = css(side, { justifyContent: 'flex-start' });
const rightSide = css(side, { justifyContent: 'flex-end' });

const title = css({
  fontSize: 17,
  fontWeight: 600,
  color: '#191f28',
  flex: 1,
  textAlign: 'center',
});

const backButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  padding: 0,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

interface NavigationBarProps {
  left?: ReactNode;
  title?: string;
  right?: ReactNode;
  onBack?: () => void;
}

export function NavigationBar({ left, title: titleText, right, onBack }: NavigationBarProps) {
  const leftContent =
    left ??
    (onBack ? (
      <button type="button" onClick={onBack} aria-label="뒤로 가기" css={backButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <title>뒤로</title>
          <path
            d="M15 19l-7-7 7-7"
            stroke="#191f28"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ) : null);

  return (
    <header css={header}>
      <div css={leftSide}>{leftContent}</div>
      {titleText && <h1 css={title}>{titleText}</h1>}
      <div css={rightSide}>{right}</div>
    </header>
  );
}
