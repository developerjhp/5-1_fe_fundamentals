import type { CartItem } from '@/shared/types';
import {
  createLocalStorageStore,
  readJsonStorage,
  writeJsonStorage,
} from '@/shared/utils';

export const CART_STORAGE_KEY = 'sipe-order';
export const EMPTY_CART_SNAPSHOT = '[]';

export const cartStorage = createLocalStorageStore(
  CART_STORAGE_KEY,
  EMPTY_CART_SNAPSHOT,
);

export function getCartItems() {
  return readJsonStorage<CartItem[]>(CART_STORAGE_KEY, []);
}

export function setCartItems(items: CartItem[]) {
  writeJsonStorage(CART_STORAGE_KEY, items);
}

export function addCartItem(item: CartItem) {
  setCartItems([...getCartItems(), item]);
}
