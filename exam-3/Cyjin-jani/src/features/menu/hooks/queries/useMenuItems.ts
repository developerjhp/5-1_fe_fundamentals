import { useSuspenseQuery } from '@tanstack/react-query';
import { getMenuItems, type MenuItemsResponse } from '@/features/menu/api/menu';
import type { MenuItem } from '@/types/order';
import { menuQueryKeys } from './queryKeys';

export function useMenuItems() {
  return useSuspenseQuery<MenuItemsResponse, Error, MenuItem[]>({
    queryKey: menuQueryKeys.items(),
    queryFn: getMenuItems,
    select: (response) => response.items,
  });
}
