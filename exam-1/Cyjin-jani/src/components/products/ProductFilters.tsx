import { RotateCcw } from 'lucide-react';
import { type ChangeEvent, useCallback, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { Category, SortOption } from '@/types/product';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useProductFilterContext } from './ProductFilterContext';

const categories: Category[] = ['accessories', 'bottoms', 'shoes', 'tops'];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: '최신순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
  { value: 'rating', label: '평점순' },
];

export const ProductFilters = () => {
  const {
    filters,
    isPending,
    hasActiveFilters,
    setKeyword,
    toggleCategory,
    setSort,
    resetFilters,
  } = useProductFilterContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSetKeyword = useDebounce(setKeyword, 500);

  const handleFilterChange = (category: Category) => {
    toggleCategory(category);
  };

  const handleKeywordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debouncedSetKeyword(e.target.value);
    },
    [debouncedSetKeyword],
  );

  const handleReset = () => {
    resetFilters();
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex w-full items-center">
        <div className="mx-auto w-full max-w-[360px]">
          <Input
            ref={inputRef}
            className="w-full"
            placeholder="keyword 검색"
            defaultValue={filters.keyword}
            onChange={handleKeywordChange}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!hasActiveFilters}
          onClick={handleReset}
          className="absolute right-0 gap-1.5"
        >
          <RotateCcw />
          초기화
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-[12px] transition-opacity ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleFilterChange(category)}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>

        <Select
          value={filters.sort}
          onValueChange={(v) => setSort(v as SortOption)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
