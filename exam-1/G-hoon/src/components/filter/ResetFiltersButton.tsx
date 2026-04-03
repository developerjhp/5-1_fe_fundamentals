import { useProductFilters } from '@/hooks/useProductFilters';

function ResetFiltersButton() {
  const { resetAll } = useProductFilters();

  return (
    <button
      type="button"
      className="min-w-10 text-gray-400 underline underline-offset-2 transition-colors hover:text-black"
      onClick={resetAll}
    >
      <span className="text-sm">초기화</span>
    </button>
  );
}

export default ResetFiltersButton;
