import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useProductFilters } from '@/hooks/useProductFilters';
import ErrorFallback from '../ErrorFallback';

interface ProductErrorBoundaryProps {
  children: ReactNode;
}

function ProductErrorBoundary({ children }: ProductErrorBoundaryProps) {
  const { keyword, categories, sort } = useProductFilters();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          resetKeys={[keyword, categories, sort]}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback onReset={resetErrorBoundary} />
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default ProductErrorBoundary;
