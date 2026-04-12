interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="error-state">
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-secondary">
          다시 시도
        </button>
      )}
    </div>
  );
}
