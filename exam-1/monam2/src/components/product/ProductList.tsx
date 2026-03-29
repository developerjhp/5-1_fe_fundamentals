import { useProductList, useRouteParams } from "@/hooks";
import { ImpressionArea, ProductCard, Spinner } from "@/components";

import { DEFAULT_SORT } from "@/constants";

const SCROLL_THRESHOLD = 0.2;
const SIZE = 5;

export default function ProductList() {
  const { currentQuery } = useRouteParams();

  const {
    data: products,
    hasNextPage,
    fetchNextPage,
  } = useProductList({
    keyword: currentQuery.search,
    categories: currentQuery.categories,
    sort: currentQuery.sort ?? DEFAULT_SORT,
    size: SIZE,
    page: 0,
  });

  const fetchMoreData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ImpressionArea
        areaThreshold={SCROLL_THRESHOLD}
        onImpressionStart={fetchMoreData}
      >
        <EndOfList hasMoreData={hasNextPage} />
      </ImpressionArea>
    </>
  );
}

function EndOfList({ hasMoreData }: { hasMoreData: boolean }) {
  return hasMoreData ? <Spinner /> : <p>더 이상 데이터가 없습니다.</p>;
}
