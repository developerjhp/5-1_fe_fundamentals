import { api } from '@/shared/lib/ky';
import type { CategoriesResponse, MenuItem } from '@/types/order';

export interface MenuItemsResponse {
  items: MenuItem[];
}

export async function getCategories(): Promise<CategoriesResponse> {
  return api.get('catalog/categories').json<CategoriesResponse>();
}

export async function getMenuItems(): Promise<MenuItemsResponse> {
  return api.get('catalog/items').json<MenuItemsResponse>();
}
