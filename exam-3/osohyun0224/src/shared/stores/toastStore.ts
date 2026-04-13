interface ToastState {
  message: string;
  visible: boolean;
}

type Listener = () => void;

const listeners = new Set<Listener>();
let state: ToastState = { message: '', visible: false };
let timerId: ReturnType<typeof setTimeout> | null = null;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): ToastState {
  return state;
}

export function showToast(message: string) {
  if (timerId) clearTimeout(timerId);
  state = { message, visible: true };
  emitChange();
  timerId = setTimeout(() => {
    state = { message: '', visible: false };
    emitChange();
    timerId = null;
  }, 2000);
}
