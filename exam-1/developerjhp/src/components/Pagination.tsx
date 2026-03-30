interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination" aria-label="페이지 네비게이션">
      <button
        className="page-btn"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        type="button"
      >
        이전
      </button>

      {start > 1 && (
        <>
          <button
            className="page-btn"
            onClick={() => onChange(1)}
            type="button"
          >
            1
          </button>
          {start > 2 && <span className="page-ellipsis">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? 'page-btn current' : 'page-btn'}
          onClick={() => onChange(p)}
          type="button"
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="page-ellipsis">...</span>}
          <button
            className="page-btn"
            onClick={() => onChange(totalPages)}
            type="button"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="page-btn"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        type="button"
      >
        다음
      </button>
    </nav>
  );
}
