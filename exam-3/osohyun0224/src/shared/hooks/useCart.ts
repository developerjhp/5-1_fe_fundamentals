import { useSyncExternalStore } from 'react';
import {
  subscribe,
  getSnapshot,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  getCartId,
} from '@/shared/stores/cartStore';

export function useCart() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  return { state, addToCart: addItem, removeFromCart: removeItem, updateQuantity, clearCart, getCartId };
}
