import type { MenuCategory, MenuItem } from '@/types/order';

export function groupByCategory(items: MenuItem[]): Record<MenuCategory, MenuItem[]> {
  return items.reduce<Record<MenuCategory, MenuItem[]>>(
    (acc, item) => {
      acc[item.category].push(item);
      return acc;
    },
    { 커피: [], 음료: [], 디저트: [] },
  );
}
