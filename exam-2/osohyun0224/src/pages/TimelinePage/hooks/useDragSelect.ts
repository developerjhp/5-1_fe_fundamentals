import { useCallback, useRef, useState } from 'react';

export interface DragState {
  roomId: string;
  startSlot: number;
  endSlot: number;
}

export function useDragSelect(
  onDragEnd: (roomId: string, startSlot: number, endSlot: number) => void,
) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((roomId: string, slotIdx: number) => {
    isDragging.current = true;
    setDragState({ roomId, startSlot: slotIdx, endSlot: slotIdx });
  }, []);

  const handleMouseEnter = useCallback(
    (roomId: string, slotIdx: number) => {
      if (!isDragging.current || !dragState) return;
      if (dragState.roomId !== roomId) return;
      setDragState((prev) =>
        prev ? { ...prev, endSlot: slotIdx } : null,
      );
    },
    [dragState],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current || !dragState) {
      isDragging.current = false;
      setDragState(null);
      return;
    }
    isDragging.current = false;
    const start = Math.min(dragState.startSlot, dragState.endSlot);
    const end = Math.max(dragState.startSlot, dragState.endSlot);
    onDragEnd(dragState.roomId, start, end + 1);
    setDragState(null);
  }, [dragState, onDragEnd]);

  function isSlotInDragRange(roomId: string, slotIdx: number): boolean {
    if (!dragState || dragState.roomId !== roomId) return false;
    const start = Math.min(dragState.startSlot, dragState.endSlot);
    const end = Math.max(dragState.startSlot, dragState.endSlot);
    return slotIdx >= start && slotIdx <= end;
  }

  return {
    dragState,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    isSlotInDragRange,
  };
}
