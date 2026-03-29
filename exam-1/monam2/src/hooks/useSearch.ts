import { useState, useEffect } from "react";
import { useRouteParams, useDebounce, useAutoComplete } from "@/hooks";

export default function useSearch() {
  const { currentQuery, updateQuery, resetQuery } = useRouteParams();

  const [keyword, setKeyword] = useState<string>(currentQuery.search ?? "");
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data: autocompletedData } = useAutoComplete({
    keyword: debouncedKeyword,
  });

  useEffect(() => {
    setKeyword(currentQuery.search ?? "");
  }, [currentQuery.search]);

  const options =
    autocompletedData?.suggestions.map((suggestion) => ({
      label: suggestion,
      value: suggestion,
    })) ?? [];

  const onChange = (value: string) => {
    setKeyword(value);
  };

  const search = (nextKeyword = keyword) => {
    const trimmedKeyword = nextKeyword.trim();

    setKeyword(trimmedKeyword);
    updateQuery({
      search: trimmedKeyword,
    });
  };

  const reset = () => {
    setKeyword("");
    resetQuery();
  };

  return {
    keyword,
    options,
    onChange,
    search,
    reset,
  };
}
