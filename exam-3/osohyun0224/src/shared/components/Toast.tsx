import { css } from '@emotion/react';
import { useToast } from '@/shared/hooks/useToast';

const toastStyle = css({
  position: 'fixed',
  bottom: 100,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(34, 34, 34, 0.9)',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: 8,
  fontSize: 14,
  zIndex: 9999,
  animation: 'fadeIn 0.2s ease',
  maxWidth: 'calc(100% - 40px)',
  textAlign: 'center',
});

export function Toast() {
  const { toast } = useToast();
  if (!toast.visible) return null;

  return <div css={toastStyle}>{toast.message}</div>;
}
