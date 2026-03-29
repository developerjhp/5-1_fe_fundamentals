import { getProducts } from "@/apis";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

const PRODUCT_QUERY_KEY = (
  keyword: string,
  categories: string,
  sort: string,
  size: number,
) => ["products", keyword, categories, sort, size];

interface useProductListProps {
  keyword: string;
  categories: string;
  sort: string;
  page?: number;
  size?: number;
}

export default function useProductList({
  keyword,
  categories,
  sort,
  size = 10,
}: useProductListProps) {
  return useSuspenseInfiniteQuery({
    queryKey: PRODUCT_QUERY_KEY(keyword, categories, sort, size),
    queryFn: ({ pageParam = 1 }) =>
      getProducts({ page: pageParam, keyword, categories, sort, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.products.length
        ? allPages.length + 1
        : undefined;
      return nextPage;
    },
    select: (data) => data.pages.flatMap((page) => page.products),
  });
}

useProductList.getQueryKeys = function ({
  keyword,
  categories,
  sort,
  size = 10,
}: useProductListProps) {
  return PRODUCT_QUERY_KEY(keyword, categories, sort, size);
};
