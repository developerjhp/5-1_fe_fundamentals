import { TriangleAlert } from 'lucide-react';

interface ErrorFallbackProps {
  onReset: () => void;
}

function ErrorFallback({ onReset }: ErrorFallbackProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-24"
      role="alert"
    >
      <TriangleAlert className="h-10 w-10 text-gray-300" />
      <p className="text-sm text-gray-500">
        서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <button
        type="button"
        className="border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        onClick={onReset}
      >
        다시 시도
      </button>
    </div>
  );
}

export default ErrorFallback;
