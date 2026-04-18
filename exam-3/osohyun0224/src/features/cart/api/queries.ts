import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from './fetchOrder';
import { clearCart } from '@/shared/stores/cartStore';
import type { CreateOrderRequest } from '@/types/order';

export function useCreateOrder() {
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = async (orderData: CreateOrderRequest) => {
    if (isOrdering) return;
    setIsOrdering(true);
    try {
      const data = await createOrder(orderData);
      clearCart();
      navigate(`/orders/${data.orderId}`);
    } catch (error) {
      throw error;
    } finally {
      setIsOrdering(false);
    }
  };

  return { handleOrder, isOrdering };
}
