import { useQuery } from '@tanstack/react-query';
import { debounce } from 'es-toolkit/function';
import { useEffect, useMemo, useState } from 'react';
import { getAutocomplete } from '@/api';

export function useAutocomplete(keyword: string) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  const debouncedSet = useMemo(
    () => debounce((v: string) => setDebouncedKeyword(v), 200),
    [],
  );

  useEffect(() => {
    debouncedSet(keyword);
    return () => debouncedSet.cancel();
  }, [keyword, debouncedSet]);

  const trimmed = debouncedKeyword.trim();
  const { data } = useQuery({
    queryKey: ['autocomplete', trimmed],
    queryFn: () => getAutocomplete(trimmed),
    enabled: trimmed.length > 0,
  });

  return data?.suggestions ?? [];
}
