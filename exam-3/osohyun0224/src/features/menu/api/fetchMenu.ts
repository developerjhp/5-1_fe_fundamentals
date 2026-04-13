import { http } from '@/shared/api/http';
import type { MenuItem, MenuCategory } from '@/types/order';

export const fetchCategories = () =>
  http.get<{ categories: MenuCategory[] }>('/api/catalog/categories').then(r => r.categories);

export const fetchMenuItems = () =>
  http.get<{ items: MenuItem[] }>('/api/catalog/items').then(r => r.items);
