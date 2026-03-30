import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

interface AutocompleteResponse {
  suggestions: string[];
}

export function useAutocomplete(keyword: string): string[] {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedKeyword = useDebounce(keyword, 200);

  useEffect(() => {
    if (!debouncedKeyword.trim()) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({ keyword: debouncedKeyword });

    fetch(`/api/autocomplete?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) return { suggestions: [] as string[] };
        return res.json() as Promise<AutocompleteResponse>;
      })
      .then((json) => setSuggestions(json.suggestions))
      .catch(() => {
        // 자동완성 에러는 무시
      });

    return () => controller.abort();
  }, [debouncedKeyword]);

  return suggestions;
}
