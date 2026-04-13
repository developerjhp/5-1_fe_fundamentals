import { http } from '@/shared/api/http';
import type { CreateOrderRequest } from '@/types/order';

export const createOrder = (data: CreateOrderRequest) =>
  http.post<{ orderId: string }>('/api/orders', data);
