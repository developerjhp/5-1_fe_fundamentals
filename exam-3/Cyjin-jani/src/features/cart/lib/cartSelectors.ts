import type { CartItem } from '@/types/order';

export function selectTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function selectTotalPrice(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
