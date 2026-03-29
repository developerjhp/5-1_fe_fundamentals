import type { ProductListResponse } from '@/types';
import { client } from './client';

export async function getAutoComplete({ keyword }: { keyword: string }) {
  return client
    .get('autocomplete', {
      searchParams: {
        keyword,
      },
    })
    .json<{ suggestions: string[] }>();
}

export async function getProducts({
  categories,
  keyword,
  sort,
  page,
  size,
}: {
  categories?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}) {
  const searchParams: Record<string, string | number> = {
    ...(categories && { categories }),
    ...(keyword && { keyword }),
    ...(sort && { sort }),
    ...(page !== undefined && { page }),
    ...(size !== undefined && { size }),
  };

  return client
    .get('products', {
      searchParams,
    })
    .json<ProductListResponse>();
}
