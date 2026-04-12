interface ChipToggleProps {
  selected: boolean;
  onClick: () => void;
  label: string;
}

export function ChipToggle({ selected, onClick, label }: ChipToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      className={`chip-toggle ${selected ? 'chip-toggle-selected' : ''}`}
    >
      {label}
    </button>
  );
}
