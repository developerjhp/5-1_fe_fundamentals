import { css } from "@emotion/react";

import {
  Flex,
  Select,
  Button,
  Checkbox,
  Container,
  ProductList,
  Autocomplete,
  AsyncBoundary,
  ProductSkeleton,
} from "@/components";
import { CATEGORY, DEFAULT_SORT, SORT } from "@/constants";
import { useCategory, useRouteParams, useSearch } from "@/hooks";

export default function App() {
  return (
    <Container>
      <App.Header title="SIPE 마켓" subtitle="구매할 상품을 골라보세요." />
      <ProductSearchBar />
      <Flex
        css={css`
          width: 100%;
          align-items: stretch;
        `}
      >
        <ProductCategory />
        <ProductSort />
      </Flex>
      <AsyncBoundary suspenseFallback={<ProductSkeleton />}>
        <ProductList />
      </AsyncBoundary>
    </Container>
  );
}

function ProductSearchBar() {
  const { keyword, options, onChange, search, reset } = useSearch();

  return (
    <Flex direction="row" gap="0.5rem">
      <Autocomplete
        value={keyword}
        onChange={onChange}
        onSelect={(option) => search(option.value)}
        options={options}
      >
        <Autocomplete.Input
          aria-label="상품명 검색"
          placeholder="상품명을 입력하세요."
        />
        <Autocomplete.List />
      </Autocomplete>
      <Button onClick={() => search()}>검색</Button>
      <Button onClick={reset} variant="secondary">
        초기화
      </Button>
    </Flex>
  );
}

function ProductCategory() {
  const { selectedCategories, onChange } = useCategory();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        min-width: 0;

        @media (min-width: 768px) {
          flex-direction: row;
          flex-wrap: wrap;
          min-width: 280px;
        }
      `}
    >
      {Object.entries(CATEGORY).map(([key, value]) => (
        <Checkbox
          key={key}
          label={value}
          value={key}
          checked={selectedCategories.includes(key)}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

function ProductSort() {
  const { updateQuery, currentQuery } = useRouteParams();
  const selectedSort = currentQuery.sort ?? DEFAULT_SORT;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    updateQuery({
      sort: value,
    });
  };

  return (
    <Select
      options={[
        ...Object.entries(SORT).map(([key, value]) => ({
          label: value,
          value: key,
        })),
      ]}
      value={selectedSort}
      onChange={onChange}
    />
  );
}

App.Header = function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
