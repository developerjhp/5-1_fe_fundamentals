import { useCallback, useEffect, useRef, useState } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { SortSelect } from '@/components/SortSelect';
import { useDebounce } from '@/hooks/useDebounce';
import { useProducts } from '@/hooks/useProducts';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import type { Category, SortOption } from '@/types/product';
import './App.css';

function App() {
  const { filters, setFilters, resetFilters } = useUrlFilters();
  const [searchInput, setSearchInput] = useState(filters.keyword);
  const debouncedKeyword = useDebounce(searchInput, 300);
  const isInitialMount = useRef(true);

  // 디바운스된 검색어가 변경되면 URL 필터 업데이트
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setFilters({ keyword: debouncedKeyword, page: 1 });
  }, [debouncedKeyword, setFilters]);

  const { products, total, totalPages, loading, error, retry } =
    useProducts(filters);

  const handleCategoryChange = useCallback(
    (categories: Category[]) => {
      setFilters({ categories, page: 1 });
    },
    [setFilters],
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setFilters({ sort, page: 1 });
    },
    [setFilters],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ page });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setFilters],
  );

  // 자동완성에서 선택 시 즉시 검색
  const handleAutocompleteSelect = useCallback(
    (value: string) => {
      setSearchInput(value);
      setFilters({ keyword: value, page: 1 });
    },
    [setFilters],
  );

  const handleReset = useCallback(() => {
    resetFilters();
    setSearchInput('');
  }, [resetFilters]);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.keyword !== '' ||
    filters.sort !== 'newest';

  return (
    <div className="app">
      <header className="header">
        <h1>상품 목록</h1>
        {!loading && !error && (
          <span className="result-count">총 {total.toLocaleString()}개</span>
        )}
      </header>

      <div className="layout">
        <aside className="sidebar">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSelect={handleAutocompleteSelect}
          />
          <CategoryFilter
            selected={filters.categories}
            onChange={handleCategoryChange}
          />
          <SortSelect value={filters.sort} onChange={handleSortChange} />
          {hasActiveFilters && (
            <button type="button" className="reset-btn" onClick={handleReset}>
              필터 초기화
            </button>
          )}
        </aside>

        <main className="main">
          {loading && (
            <div className="status-message">
              <div className="spinner" />
              <p>상품을 불러오는 중...</p>
            </div>
          )}

          {error && (
            <div className="status-message error">
              <p>{error}</p>
              <button type="button" className="retry-btn" onClick={retry}>
                다시 시도
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="status-message">
              <p>검색 결과가 없습니다.</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="retry-btn"
                  onClick={handleReset}
                >
                  필터 초기화
                </button>
              )}
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                page={filters.page}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
