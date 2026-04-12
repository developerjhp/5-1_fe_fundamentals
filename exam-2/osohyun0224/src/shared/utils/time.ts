export const DEFAULT_DATE = '2026-04-07';

export const TIME_SLOTS: string[] = [];
for (let hours = 9; hours < 18; hours++) {
  TIME_SLOTS.push(`${String(hours).padStart(2, '0')}:00`);
  TIME_SLOTS.push(`${String(hours).padStart(2, '0')}:30`);
}

export const TIME_OPTIONS: string[] = [];
for (let hours = 9; hours <= 18; hours++) {
  TIME_OPTIONS.push(`${String(hours).padStart(2, '0')}:00`);
  if (hours < 18) TIME_OPTIONS.push(`${String(hours).padStart(2, '0')}:30`);
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isValidTimeRange(start: string, end: string): boolean {
  return timeToMinutes(end) > timeToMinutes(start);
}

export function hasTimeConflict(
  start1: string,
  end1: string,
  start2: string,
  end2: string,
): boolean {
  return start1 < end2 && end1 > start2;
}

export function getNextTimeSlot(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  if (minutes + 30 >= 60) return `${String(hours + 1).padStart(2, '0')}:00`;
  return `${String(hours).padStart(2, '0')}:30`;
}

export function slotIndex(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - 9) * 2 + (minutes >= 30 ? 1 : 0);
}
