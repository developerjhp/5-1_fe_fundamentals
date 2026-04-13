import { selectTotalPrice } from '@/features/cart/lib/cartSelectors';
import type { CartItem, CreateOrderRequest } from '@/types/order';

export function buildCreateOrderRequestFromCart(
  items: CartItem[],
): CreateOrderRequest {
  return {
    totalPrice: selectTotalPrice(items),
    customerName: 'SIPER 5TH',
    items: items.map(({ itemId, quantity, options }) => ({
      itemId,
      quantity,
      options,
    })),
  };
}
