import { css } from '@emotion/react';
import {
  type ComponentPropsWithoutRef,
  createContext,
  type Dispatch,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

export interface AutocompleteOption {
  value: string;
  label: string;
}

interface AutocompleteProps {
  children: ReactNode;
  options: AutocompleteOption[];
  value: string;
  onChange: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
}

interface AutocompleteContextValue {
  activeIndex: number;
  inputId: string;
  inputRef: RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  listId: string;
  onChange: (value: string) => void;
  options: AutocompleteOption[];
  selectOption: (option: AutocompleteOption) => void;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  value: string;
}

const AutocompleteContext = createContext<AutocompleteContextValue | null>(
  null,
);

function useAutocompleteContext() {
  const context = useContext(AutocompleteContext);

  if (!context) {
    throw new Error('Autocomplete compound components must be used together.');
  }

  return context;
}

function AutocompleteRoot({
  children,
  options,
  value,
  onChange,
  onSelect,
}: AutocompleteProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const listId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node | null)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value) {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (options.length === 0) {
      setActiveIndex(-1);
      return;
    }

    if (document.activeElement === inputRef.current) {
      setIsOpen(true);
    }

    if (activeIndex >= options.length) {
      setActiveIndex(options.length - 1);
    }
  }, [activeIndex, options.length, value]);

  const selectOption = (option: AutocompleteOption) => {
    onChange(option.value);
    onSelect?.(option);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  return (
    <AutocompleteContext.Provider
      value={{
        activeIndex,
        inputId,
        inputRef,
        isOpen,
        listId,
        onChange,
        options,
        selectOption,
        setActiveIndex,
        setIsOpen,
        value,
      }}
    >
      <div ref={rootRef} css={rootStyle}>
        {children}
      </div>
    </AutocompleteContext.Provider>
  );
}

type AutocompleteInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'onChange'
>;

function AutocompleteInput({
  onFocus,
  onKeyDown,
  ...props
}: AutocompleteInputProps) {
  const {
    activeIndex,
    inputId,
    inputRef,
    isOpen,
    onChange,
    options,
    selectOption,
    setActiveIndex,
    setIsOpen,
    value,
  } = useAutocompleteContext();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (!isOpen) {
      if (event.key === 'ArrowDown' && options.length > 0) {
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((previousIndex) =>
          Math.min(previousIndex + 1, options.length - 1),
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((previousIndex) => Math.max(previousIndex - 1, 0));
        break;
      case 'Enter':
        if (activeIndex >= 0 && options[activeIndex]) {
          event.preventDefault();
          selectOption(options[activeIndex]);
        }
        break;
      case 'Escape':
      case 'Tab':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <input
      {...props}
      ref={inputRef}
      id={inputId}
      type="text"
      autoComplete="off"
      css={inputStyle}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
        setIsOpen(true);
        setActiveIndex(-1);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (options.length > 0) {
          setIsOpen(true);
        }
      }}
      onKeyDown={handleKeyDown}
    />
  );
}

interface AutocompleteListProps {
  emptyMessage?: string;
}

function AutocompleteList({
  emptyMessage = '검색 결과가 없습니다.',
}: AutocompleteListProps) {
  const { activeIndex, isOpen, listId, options, selectOption, setActiveIndex } =
    useAutocompleteContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div id={listId} css={listStyle}>
      {options.length === 0 ? (
        <div css={emptyStyle}>{emptyMessage}</div>
      ) : (
        options.map((option, index) => (
          <button
            type="button"
            key={option.value}
            id={`${listId}-option-${index}`}
            tabIndex={-1}
            css={[itemStyle, activeIndex === index && activeItemStyle]}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseDown={(event) => {
              event.preventDefault();
              selectOption(option);
            }}
          >
            {option.label}
          </button>
        ))
      )}
    </div>
  );
}

const Autocomplete = Object.assign(AutocompleteRoot, {
  Input: AutocompleteInput,
  List: AutocompleteList,
});

export default Autocomplete;

const rootStyle = css({
  position: 'relative',
  width: '100%',
});

const inputStyle = css({
  width: '100%',
  height: '40px',
  padding: '0 0.875rem',
  fontSize: '0.9375rem',
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1.5px solid #d1d5db',
  borderRadius: '8px',
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',

  '&::placeholder': {
    color: '#9ca3af',
  },

  '&:focus': {
    borderColor: '#f97316',
    boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.18)',
  },
});

const listStyle = css({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  zIndex: 10,
  padding: '0.25rem',
  margin: 0,
  listStyle: 'none',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
});

const itemStyle = css({
  display: 'block',
  width: '100%',
  padding: '0.5rem 0.75rem',
  color: 'inherit',
  textAlign: 'left',
  background: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
});

const activeItemStyle = css({
  backgroundColor: '#fff7ed',
  color: '#c2410c',
});

const emptyStyle = css({
  padding: '0.5rem 0.75rem',
  color: '#9ca3af',
});
