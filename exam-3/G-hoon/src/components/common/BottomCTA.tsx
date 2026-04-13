interface BottomCTAProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function BottomCTA({
  label,
  onClick,
  disabled = false,
}: BottomCTAProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="w-full rounded-lg bg-amber-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-amber-700 active:bg-amber-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {label}
      </button>
    </footer>
  );
}

export function BottomCTASpacer() {
  return <div aria-hidden="true" className="h-24" />;
}
