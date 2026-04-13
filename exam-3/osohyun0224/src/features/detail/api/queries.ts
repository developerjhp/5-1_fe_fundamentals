import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/api/queryKeys';
import { fetchMenuItem, fetchOptions } from './fetchDetail';

export const useMenuItem = (itemId: string) =>
  useSuspenseQuery({
    queryKey: queryKeys.menuItem(itemId),
    queryFn: () => fetchMenuItem(itemId),
  });

export const useOptions = () =>
  useSuspenseQuery({
    queryKey: queryKeys.options,
    queryFn: fetchOptions,
  });
