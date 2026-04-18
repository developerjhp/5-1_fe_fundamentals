import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react';

const errorWrap = css({
  padding: '48px 24px',
  textAlign: 'center',
});

const errorTitle = css({
  fontSize: 18,
  fontWeight: 600,
  color: '#191f28',
  marginBottom: 8,
});

const errorMessage = css({
  fontSize: 15,
  color: '#8b95a1',
  lineHeight: 1.5,
  wordBreak: 'keep-all',
});

const retryButton = css({
  marginTop: 20,
  minWidth: 120,
  height: 44,
  padding: '0 20px',
  borderRadius: 12,
  backgroundColor: '#ffb24d',
  color: '#fff',
  fontSize: 15,
  fontWeight: 600,
});

type BoundaryProps = {
  children: ReactNode;
  onQueryReset: () => void;
  renderError: (error: Error, retry: () => void) => ReactNode;
};

type BoundaryState = { error: Error | null };

class QueryErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[QueryErrorBoundary]', error, info.componentStack);
  }

  retry = () => {
    this.props.onQueryReset();
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return this.props.renderError(this.state.error, this.retry);
    }
    return this.props.children;
  }
}

type AsyncBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export function AsyncBoundary({ children, fallback }: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <QueryErrorBoundary
          onQueryReset={reset}
          renderError={(error, retry) => (
            <div css={errorWrap}>
              <p css={errorTitle}>불러오지 못했어요</p>
              <p css={errorMessage}>{error.message}</p>
              <button type="button" css={retryButton} onClick={retry}>
                다시 시도
              </button>
            </div>
          )}
        >
          <Suspense fallback={fallback}>{children}</Suspense>
        </QueryErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
