import { useCallback, useEffect, useState } from 'react';
import { useProductFilters } from './useProductFilters';

export function useSearchInput() {
  const { keyword: urlKeyword, setKeyword: setUrlKeyword } =
    useProductFilters();
  const [inputValue, setInputValue] = useState(urlKeyword);

  const hasValue = inputValue.length > 0;

  // URL keyword가 외부에서 변경되면 (초기화 등) 동기화
  useEffect(() => {
    setInputValue(urlKeyword);
  }, [urlKeyword]);

  const submit = useCallback(
    (value: string) => {
      setInputValue(value);
      setUrlKeyword(value || null);
    },
    [setUrlKeyword],
  );

  const clear = useCallback(() => {
    setInputValue('');
    setUrlKeyword(null);
  }, [setUrlKeyword]);

  return {
    inputValue,
    setInputValue,
    hasValue,
    submit,
    clear,
  };
}
