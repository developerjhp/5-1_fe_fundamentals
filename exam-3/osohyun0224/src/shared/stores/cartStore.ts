import type { CartItem, OptionSelection } from '@/types/order';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

type Listener = () => void;

const listeners = new Set<Listener>();
let state: CartState = { items: [], totalQuantity: 0, totalPrice: 0 };

function emitChange() {
  for (const listener of listeners) listener();
}

function recalcTotals(items: CartItem[]): CartState {
  return {
    items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  };
}

export function getCartId(itemId: string, options: OptionSelection[]): string {
  const optionStr = options
    .map(opt => `${opt.optionId}:${opt.labels.sort().join(',')}`)
    .sort()
    .join('|');
  return `${itemId}_${optionStr}`;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): CartState {
  return state;
}

export function addItem(item: CartItem) {
  const cartId = getCartId(item.itemId, item.options);
  const existingIndex = state.items.findIndex(
    existing => getCartId(existing.itemId, existing.options) === cartId,
  );
  if (existingIndex >= 0) {
    const updatedItems = state.items.map((existing, index) =>
      index === existingIndex ? { ...existing, quantity: existing.quantity + item.quantity } : existing,
    );
    state = recalcTotals(updatedItems);
  } else {
    state = recalcTotals([...state.items, item]);
  }
  emitChange();
}

export function removeItem(id: string) {
  state = recalcTotals(state.items.filter(item => getCartId(item.itemId, item.options) !== id));
  emitChange();
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) { removeItem(id); return; }
  const updatedItems = state.items.map(item =>
    getCartId(item.itemId, item.options) === id ? { ...item, quantity } : item,
  );
  state = recalcTotals(updatedItems);
  emitChange();
}

export function clearCart() {
  state = { items: [], totalQuantity: 0, totalPrice: 0 };
  emitChange();
}
