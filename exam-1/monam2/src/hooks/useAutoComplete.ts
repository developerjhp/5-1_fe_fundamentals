import { getAutoComplete } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = (keyword: string) => ["autoComplete", keyword];

export default function useAutoComplete({ keyword }: { keyword: string }) {
  return useQuery({
    queryKey: QUERY_KEY(keyword),
    queryFn: () => getAutoComplete({ keyword }),
    enabled: !!keyword,
  });
}

useAutoComplete.getQueryKey = (keyword: string) => QUERY_KEY(keyword);
