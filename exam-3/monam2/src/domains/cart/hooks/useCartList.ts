import { useMemo, useSyncExternalStore } from 'react';
import { cartStorage, EMPTY_CART_SNAPSHOT } from '@/domains/cart/utils';
import type { CartItem } from '@/shared/types';

function parseCartItems(snapshot: string) {
  try {
    return JSON.parse(snapshot) as CartItem[];
  } catch {
    return [];
  }
}

export default function useCartList(storage = cartStorage) {
  const cartSnapshot = useSyncExternalStore(
    storage.subscribe,
    storage.getSnapshot,
    () => EMPTY_CART_SNAPSHOT,
  );

  const items = useMemo(() => parseCartItems(cartSnapshot), [cartSnapshot]);

  return useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    return {
      items,
      totalPrice,
      totalQuantity,
    };
  }, [items]);
}
