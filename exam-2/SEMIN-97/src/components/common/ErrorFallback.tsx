function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-3 text-red-500">
      <p>데이터를 불러오지 못했어요.</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
      >
        다시 시도
      </button>
    </div>
  )
}

export default ErrorFallback
