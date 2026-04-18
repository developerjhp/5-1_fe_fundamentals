import { http } from '@/shared/api/http';
import type { Order } from '@/types/order';

export const fetchOrder = (orderId: string) =>
  http.get<{ order: Order }>(`/api/orders/${orderId}`).then(r => r.order);
