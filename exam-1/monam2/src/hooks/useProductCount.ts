import { getProducts } from "@/apis";
import { useQuery } from "@tanstack/react-query";

export default function useProductCount({
  keyword,
  categories,
}: {
  keyword: string;
  categories: string;
}) {
  return useQuery({
    queryKey: ["productCount"],
    queryFn: () => getProducts({ keyword, categories }),
  });
}
