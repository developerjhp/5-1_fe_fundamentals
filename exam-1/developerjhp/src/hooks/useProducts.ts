import { useCallback, useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import type { Filters } from './useUrlFilters';

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

interface UseProductsResult {
  products: Product[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useProducts(filters: Filters): UseProductsResult {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const categoriesKey = filters.categories.join(',');
  const { keyword, sort, page } = filters;

  // biome-ignore lint/correctness/useExhaustiveDependencies: retryCount triggers re-fetch on retry
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (categoriesKey) {
      params.set('categories', categoriesKey);
    }
    if (keyword) {
      params.set('keyword', keyword);
    }
    params.set('sort', sort);
    params.set('page', String(page));
    params.set('size', '20');

    fetch(`/api/products?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const body: { message?: string } = await res.json();
          throw new Error(body.message || '요청에 실패했습니다.');
        }
        return res.json() as Promise<ProductsResponse>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [categoriesKey, keyword, sort, page, retryCount]);

  const retry = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    loading,
    error,
    retry,
  };
}
