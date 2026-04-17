export const orderQueryKeys = {
  detail: (orderId: string) => ['orders', 'detail', orderId] as const,
};
