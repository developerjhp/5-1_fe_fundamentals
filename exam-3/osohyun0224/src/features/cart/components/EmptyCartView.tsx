import { css } from '@emotion/react';
import { NavigationBar } from '@/shared/components/NavigationBar';

const container = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 400,
  padding: 20,
});

const message = css({ fontSize: 16, color: '#8b95a1' });
const subMessage = css({ fontSize: 14, color: '#b0b8c1', marginTop: 8 });

interface EmptyCartViewProps {
  onBack: () => void;
}

export function EmptyCartView({ onBack }: EmptyCartViewProps) {
  return (
    <div>
      <NavigationBar title="장바구니" onBack={onBack} />
      <div css={container}>
        <p css={message}>장바구니가 비어있어요</p>
        <p css={subMessage}>메뉴를 선택해서 장바구니에 담아보세요!</p>
      </div>
    </div>
  );
}
