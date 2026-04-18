import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/api/queryKeys';
import { fetchCategories, fetchMenuItems } from './fetchMenu';

export const useCategories = () =>
  useSuspenseQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
  });

export const useMenuItems = () =>
  useSuspenseQuery({
    queryKey: queryKeys.menuItems,
    queryFn: fetchMenuItems,
  });
