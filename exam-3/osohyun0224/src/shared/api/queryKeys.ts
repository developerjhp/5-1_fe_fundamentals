export const queryKeys = {
  categories: ['categories'] as const,
  menuItems: ['menuItems'] as const,
  menuItem: (itemId: string) => ['menuItem', itemId] as const,
  options: ['options'] as const,
  order: (orderId: string) => ['order', orderId] as const,
  orders: ['orders'] as const,
};
