interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  start?: string;
  end?: string;
  step?: number;
  placeholder?: string;
  'aria-label'?: string;
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function toTimeString(minutes: number): string {
  const hoursString = String(Math.floor(minutes / 60)).padStart(2, '0');
  const minutesString = String(minutes % 60).padStart(2, '0');
  return `${hoursString}:${minutesString}`;
}

function generateTimeSlots(
  start: string,
  end: string,
  step: number,
): string[] {
  const startMin = toMinutes(start);
  const endMin = toMinutes(end);
  const slots: string[] = [];
  for (let min = startMin; min <= endMin; min += step) {
    slots.push(toTimeString(min));
  }
  return slots;
}

export function TimeSelector({
  value,
  onChange,
  start = '09:00',
  end = '18:00',
  step = 30,
  placeholder = '선택',
  'aria-label': ariaLabel,
}: TimeSelectorProps) {
  const timeSlots = generateTimeSlots(start, end, step);

  return (
    <select
      className="form-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
    >
      <option value="">{placeholder}</option>
      {timeSlots.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}
