import { http } from '@/shared/api/http';
import type { MenuItem, MenuOption } from '@/types/order';

export const fetchMenuItem = (itemId: string) =>
  http.get<{ item: MenuItem }>(`/api/catalog/items/${itemId}`).then(r => r.item);

export const fetchOptions = () =>
  http.get<{ options: MenuOption[] }>('/api/catalog/options').then(r => r.options);
