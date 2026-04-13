import { QueryErrorResetBoundary, useQueryClient } from '@tanstack/react-query';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

import { CartEmpty } from '@/features/cart/components/CartEmpty';
import { CartGnb } from '@/features/cart/components/CartGnb';
import { CartItem } from '@/features/cart/components/CartItem';
import { buildCartItemKey } from '@/features/cart/lib/buildCartItemKey';
import {
  useCartItems,
  useCartTotalPrice,
  useCartTotalQuantity,
  useClearCart,
} from '@/features/cart/store/useCartStore';
import { useOptions } from '@/features/menu/hooks/queries/useOptions';
import { orderQueryKeys } from '@/features/order/hooks/queries/queryKeys';
import { useCreateOrder } from '@/features/order/hooks/queries/useCreateOrder';
import { buildCreateOrderRequestFromCart } from '@/features/order/lib/buildCreateOrderRequestFromCart';
import { BottomCTA } from '@/shared/components/BottomCTA';
import { ErrorFallback } from '@/shared/components/ErrorFallback';
import { LoadingFallback } from '@/shared/components/LoadingFallback';

function CartPageContent() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { data: allOptions } = useOptions();
  const clearCart = useClearCart();

  const optionNameById = useMemo(
    () => new Map(allOptions.map((o) => [o.id, o.name])),
    [allOptions],
  );

  const items = useCartItems();
  const totalQuantity = useCartTotalQuantity();
  const totalPrice = useCartTotalPrice();

  if (items.length === 0) {
    return (
      <>
        <CartGnb onReturnToMenu={() => setLocation('/')} />
        <CartEmpty />
      </>
    );
  }

  const handlePlaceOrder = async () => {
    const payload = buildCreateOrderRequestFromCart(items);
    try {
      const { orderId } = await createOrder(payload);
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.detail(orderId),
      });

      clearCart();
      setLocation(`/orders/${orderId}`);
    } catch {
      toast.error('주문에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <CartGnb onReturnToMenu={() => setLocation('/')} />

      <div className="flex flex-col gap-3 px-4 pb-4 pt-2">
        {items.map((item) => (
          <CartItem
            key={buildCartItemKey(item.itemId, item.options)}
            item={item}
            optionNameById={optionNameById}
          />
        ))}

        <section
          className="mt-2 flex flex-col gap-2 border-t border-border pt-4 text-sm"
          aria-live="polite"
        >
          <div className="flex justify-between text-muted-foreground">
            <span>총 수량</span>
            <span>{totalQuantity}개</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>총 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
        </section>
      </div>

      <BottomCTA
        label={`총 ${totalQuantity}개 · ${totalPrice.toLocaleString()}원 | 주문하기`}
        disabled={isCreatingOrder}
        onClick={handlePlaceOrder}
      />
    </>
  );
}

export function CartPage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <CartPageContent />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
