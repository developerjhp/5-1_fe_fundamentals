import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrder } from '@/features/order-complete/api/queries';
import { AsyncBoundary } from '@/shared/components/AsyncBoundary';
import { FixedBottomCTA } from '@/shared/components/FixedBottomCTA';
import { NavigationBar } from '@/shared/components/NavigationBar';
import { formatPrice } from '@/shared/utils/format';

const container = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
});
const checkCircle = css({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: '#fff4e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 24,
});
const heading = css({ fontSize: 22, fontWeight: 700, color: '#191f28', marginBottom: 8 });
const subtext = css({ fontSize: 16, color: '#8b95a1' });
const spacer = css({ height: 80 });

const skeletonCircle = css({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: '#f2f4f6',
  marginBottom: 24,
});
const skeletonHeading = css({
  width: 160,
  height: 24,
  backgroundColor: '#f2f4f6',
  borderRadius: 4,
  marginBottom: 8,
});
const skeletonSubtext = css({ width: 100, height: 16, backgroundColor: '#f2f4f6', borderRadius: 4 });

const notFound = css({ padding: 20, textAlign: 'center', color: '#8b95a1' });

function OrderCompleteSkeleton() {
  return (
    <div>
      <NavigationBar title="주문 완료" />
      <div css={container}>
        <div css={skeletonCircle} />
        <div css={skeletonHeading} />
        <div css={skeletonSubtext} />
      </div>
    </div>
  );
}

function OrderCompleteMain({ orderId }: { orderId: string }) {
  const navigate = useNavigate();
  const { data: order } = useOrder(orderId);
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <NavigationBar title="주문 완료" />
      <div css={container}>
        <div css={checkCircle}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <title>완료</title>
            <path
              d="M5 12l5 5L20 7"
              stroke="#ffb24d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 css={heading}>주문이 완료됐어요</h2>
        <p css={subtext}>
          {totalItems}개 {formatPrice(order.totalPrice)}
        </p>
      </div>
      <div css={spacer} />
      <FixedBottomCTA onClick={() => navigate('/')}>확인했어요</FixedBottomCTA>
    </>
  );
}

export function OrderCompletePage() {
  const { orderId } = useParams<{ orderId: string }>();
  if (!orderId) {
    return <div css={notFound}>유효하지 않은 주문입니다.</div>;
  }

  return (
    <AsyncBoundary fallback={<OrderCompleteSkeleton />}>
      <OrderCompleteMain orderId={orderId} />
    </AsyncBoundary>
  );
}
