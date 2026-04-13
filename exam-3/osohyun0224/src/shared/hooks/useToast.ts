import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, showToast } from '@/shared/stores/toastStore';

export function useToast() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  return { toast: state, showToast };
}
