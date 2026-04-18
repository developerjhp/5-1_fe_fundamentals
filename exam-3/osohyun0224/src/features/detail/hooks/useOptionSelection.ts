import { useState, useCallback } from 'react';
import type { MenuOption } from '@/types/order';

export function useOptionSelection(options: MenuOption[]) {
  const [selections, setSelections] = useState<Record<number, string[]>>({});

  const selectSingle = useCallback((optionId: number, label: string) => {
    setSelections(prev => ({ ...prev, [optionId]: [label] }));
  }, []);

  const toggleMulti = useCallback((optionId: number, label: string) => {
    setSelections(prev => {
      const current = prev[optionId] || [];
      const isSelected = current.includes(label);
      return {
        ...prev,
        [optionId]: isSelected ? current.filter(l => l !== label) : [...current, label],
      };
    });
  }, []);

  const getOptionPrice = useCallback((option: MenuOption, labels: string[]): number => {
    return labels.reduce((sum, label) => {
      const index = option.labels.indexOf(label);
      return sum + (index >= 0 ? option.prices[index] : 0);
    }, 0);
  }, []);

  const getTotalOptionPrice = useCallback(() => {
    return options.reduce((sum, option) => {
      return sum + getOptionPrice(option, selections[option.id] || []);
    }, 0);
  }, [options, selections, getOptionPrice]);

  const validateRequired = useCallback((): { valid: boolean; missingName?: string } => {
    for (const option of options) {
      const selected = selections[option.id] || [];
      if (option.type === 'grid' && selected.length === 0) return { valid: false, missingName: option.name };
      if (option.type === 'list' && option.minCount > 0 && selected.length < option.minCount) return { valid: false, missingName: option.name };
    }
    return { valid: true };
  }, [options, selections]);

  return { selections, selectSingle, toggleMulti, getTotalOptionPrice, validateRequired };
}
