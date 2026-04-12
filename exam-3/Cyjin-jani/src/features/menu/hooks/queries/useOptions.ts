import { useSuspenseQuery } from '@tanstack/react-query';
import { getOptions } from '@/features/menu/api/menu';
import type { MenuOption, OptionsResponse } from '@/types/order';
import { menuQueryKeys } from './queryKeys';

export function useOptions() {
  return useSuspenseQuery<OptionsResponse, Error, MenuOption[]>({
    queryKey: menuQueryKeys.options(),
    queryFn: getOptions,
    select: (response) => response.options,
  });
}
