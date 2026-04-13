export const MIN_CART_ITEM_QUANTITY = 1;
export const MAX_CART_ITEM_QUANTITY = 99;

export function normalizeCartItemQuantity(quantity: number): number {
  return Math.min(MAX_CART_ITEM_QUANTITY, Math.max(MIN_CART_ITEM_QUANTITY, Math.trunc(quantity)));
}
