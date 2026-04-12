interface BottomCTAProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function BottomCTA({ label, onClick, disabled = false }: BottomCTAProps) {
  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t border-border bg-background px-4 py-3">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-50"
      >
        {label}
      </button>
    </div>
  );
}
