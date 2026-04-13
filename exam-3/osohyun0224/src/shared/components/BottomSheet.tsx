import { css } from '@emotion/react';
import { useEffect, type ReactNode } from 'react';

const overlay = css({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

const backdrop = css({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  animation: 'fadeOverlay 0.2s ease',
});

const sheet = css({
  position: 'relative',
  width: '100%',
  maxWidth: 480,
  maxHeight: '70vh',
  backgroundColor: '#fff',
  borderRadius: '16px 16px 0 0',
  animation: 'slideUp 0.3s ease',
  overflow: 'auto',
});

const header = css({
  padding: '20px 20px 12px',
  borderBottom: '1px solid #f2f4f6',
});

const headerTitle = css({
  fontSize: 18,
  fontWeight: 700,
  color: '#191f28',
});

const content = css({
  padding: '8px 0',
  paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
});

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div css={overlay}>
      <div css={backdrop} onClick={onClose} />
      <div css={sheet}>
        <div css={header}>
          <h3 css={headerTitle}>{title}</h3>
        </div>
        <div css={content}>{children}</div>
      </div>
    </div>
  );
}
