import { css } from '@emotion/react';
import type { ReactNode } from 'react';

const wrapper = css({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: 480,
  padding: '12px 20px',
  paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
  backgroundColor: '#fff',
  borderTop: '1px solid #f2f4f6',
});

const buttonBase = css({
  width: '100%',
  height: 52,
  borderRadius: 12,
  color: '#fff',
  fontSize: 16,
  fontWeight: 600,
  border: 'none',
  transition: 'background-color 0.2s',
});

const buttonEnabled = css(buttonBase, {
  backgroundColor: '#ffb24d',
  cursor: 'pointer',
});

const buttonDisabled = css(buttonBase, {
  backgroundColor: '#d1d6db',
  cursor: 'not-allowed',
});

interface FixedBottomCTAProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function FixedBottomCTA({ children, onClick, disabled = false }: FixedBottomCTAProps) {
  return (
    <div css={wrapper}>
      <button type="button" onClick={onClick} disabled={disabled} css={disabled ? buttonDisabled : buttonEnabled}>
        {children}
      </button>
    </div>
  );
}
