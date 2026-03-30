import { useCallback, useEffect, useState } from 'react';
import type { Category, SortOption } from '@/types/product';

export interface Filters {
  categories: Category[];
  keyword: string;
  sort: SortOption;
  page: number;
}

const VALID_CATEGORIES = new Set<string>([
  'shoes',
  'tops',
  'bottoms',
  'accessories',
]);
const VALID_SORTS = new Set<string>([
  'price_asc',
  'price_desc',
  'newest',
  'rating',
]);

function parseUrl(): Filters {
  const params = new URLSearchParams(window.location.search);

  const rawCategories = params.get('categories')?.split(',') ?? [];
  const categories = rawCategories.filter((c): c is Category =>
    VALID_CATEGORIES.has(c),
  );

  const rawSort = params.get('sort');
  const sort: SortOption = VALID_SORTS.has(rawSort ?? '')
    ? (rawSort as SortOption)
    : 'newest';

  return {
    categories,
    keyword: params.get('keyword') ?? '',
    sort,
    page: Math.max(1, Number(params.get('page')) || 1),
  };
}

function buildUrl(filters: Filters): string {
  const params = new URLSearchParams();

  if (filters.categories.length > 0) {
    params.set('categories', filters.categories.join(','));
  }
  if (filters.keyword) {
    params.set('keyword', filters.keyword);
  }
  if (filters.sort !== 'newest') {
    params.set('sort', filters.sort);
  }
  if (filters.page > 1) {
    params.set('page', String(filters.page));
  }

  const search = params.toString();
  return search ? `?${search}` : window.location.pathname;
}

export function useUrlFilters() {
  const [filters, setFiltersState] = useState<Filters>(parseUrl);

  useEffect(() => {
    const handler = () => setFiltersState(parseUrl());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const setFilters = useCallback(
    (update: Partial<Filters> | ((prev: Filters) => Partial<Filters>)) => {
      setFiltersState((prev) => {
        const partial = typeof update === 'function' ? update(prev) : update;
        const next = { ...prev, ...partial };
        window.history.pushState(null, '', buildUrl(next));
        return next;
      });
    },
    [],
  );

  const resetFilters = useCallback(() => {
    const initial: Filters = {
      categories: [],
      keyword: '',
      sort: 'newest',
      page: 1,
    };
    window.history.pushState(null, '', window.location.pathname);
    setFiltersState(initial);
  }, []);

  return { filters, setFilters, resetFilters };
}
