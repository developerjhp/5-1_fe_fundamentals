export const menuQueryKeys = {
  categories: () => ['menu', 'categories'] as const,
  items: () => ['menu', 'items'] as const,
  detailById: (id: string) => ['menu', 'detail', id] as const,
};
