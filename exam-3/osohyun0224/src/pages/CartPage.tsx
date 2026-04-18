import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrder } from '@/features/cart/api/queries';
import { CartItemCard } from '@/features/cart/components/CartItemCard';
import { EmptyCartView } from '@/features/cart/components/EmptyCartView';
import { FixedBottomCTA } from '@/shared/components/FixedBottomCTA';
import { NavigationBar } from '@/shared/components/NavigationBar';
import { useCart } from '@/shared/hooks/useCart';
import { showToast } from '@/shared/stores/toastStore';
import { formatPrice } from '@/shared/utils/format';
import type { CreateOrderRequest } from '@/types/order';

const list = css({ paddingTop: 8 });
const spacer = css({ height: 120 });

export function CartPage() {
  const navigate = useNavigate();
  const { state, removeFromCart, updateQuantity, getCartId } = useCart();
  const { handleOrder, isOrdering } = useCreateOrder();

  const handleBack = () => navigate(-1);

  if (state.items.length === 0) return <EmptyCartView onBack={handleBack} />;

  const handleOrderClick = async () => {
    if (isOrdering || state.items.length === 0) return;
    const orderData: CreateOrderRequest = {
      totalPrice: state.totalPrice,
      customerName: '고객',
      items: state.items.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        options: item.options,
      })),
    };
    try {
      await handleOrder(orderData);
    } catch (error: unknown) {
      showToast(error instanceof Error ? error.message : '주문 처리 중 오류가 발생했어요');
    }
  };

  return (
    <div>
      <NavigationBar title="장바구니" onBack={handleBack} />
      <div css={list}>
        {state.items.map((item) => {
          const cartId = getCartId(item.itemId, item.options);
          return (
            <CartItemCard
              key={cartId}
              item={item}
              cartId={cartId}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          );
        })}
      </div>
      <div css={spacer} />
      <FixedBottomCTA onClick={handleOrderClick} disabled={isOrdering}>
        {isOrdering ? '주문 중...' : `${state.totalQuantity}개 ${formatPrice(state.totalPrice)} 결제하기`}
      </FixedBottomCTA>
    </div>
  );
}
