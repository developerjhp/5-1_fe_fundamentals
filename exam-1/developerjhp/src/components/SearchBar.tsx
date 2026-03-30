import { useEffect, useRef, useState } from 'react';
import { useAutocomplete } from '@/hooks/useAutocomplete';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

export function SearchBar({ value, onChange, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestions = useAutocomplete(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showDropdown = isOpen && suggestions.length > 0 && value.trim() !== '';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectSuggestion = (suggestion: string) => {
    onSelect(suggestion);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) {
          selectSuggestion(suggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const highlightMatch = (text: string) => {
    const lowerText = text.toLowerCase();
    const lowerInput = value.toLowerCase();
    const idx = lowerText.indexOf(lowerInput);
    if (idx === -1 || !value) return text;

    return (
      <>
        {text.slice(0, idx)}
        <mark>{text.slice(idx, idx + value.length)}</mark>
        {text.slice(idx + value.length)}
      </>
    );
  };

  return (
    <div className="search-bar" ref={wrapperRef}>
      <input
        type="text"
        className="search-input"
        placeholder="상품 검색..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showDropdown}
      />
      {showDropdown && (
        <div className="autocomplete-dropdown">
          {suggestions.map((suggestion, i) => (
            <div
              key={suggestion}
              role="option"
              tabIndex={-1}
              className={i === activeIndex ? 'suggestion active' : 'suggestion'}
              onMouseDown={() => selectSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {highlightMatch(suggestion)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
