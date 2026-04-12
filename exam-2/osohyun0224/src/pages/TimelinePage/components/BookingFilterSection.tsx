import { FormField } from '@/shared/components/FormField';
import { DateSelector } from '@/shared/components/DateSelector';
import { ChipToggle } from '@/shared/components/ChipToggle';
import { EQUIPMENT_LABELS } from '@/shared/utils/equipment';
import type { Equipment } from '@/types';

const CAPACITY_OPTIONS = [
  { value: 0, label: '전체' },
  { value: 2, label: '2인 이상' },
  { value: 4, label: '4인 이상' },
  { value: 6, label: '6인 이상' },
  { value: 8, label: '8인 이상' },
  { value: 10, label: '10인 이상' },
  { value: 15, label: '15인 이상' },
];

interface BookingFilterSectionProps {
  date: string;
  onDateChange: (date: string) => void;
  minCapacity: number;
  onCapacityChange: (value: number) => void;
  equipmentFilter: Equipment[];
  onEquipmentToggle: (eq: Equipment) => void;
}

export function BookingFilterSection({
  date,
  onDateChange,
  minCapacity,
  onCapacityChange,
  equipmentFilter,
  onEquipmentToggle,
}: BookingFilterSectionProps) {
  return (
    <div className="controls-bar">
      <FormField label="날짜">
        <DateSelector
          value={date}
          onChange={onDateChange}
          aria-label="조회 날짜"
        />
      </FormField>

      <FormField label="최소 수용인원">
        <select
          value={minCapacity}
          onChange={(e) => onCapacityChange(Number(e.target.value))}
          className="form-input"
          aria-label="최소 수용인원 필터"
        >
          {CAPACITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="장비 필터">
        <div className="equipment-filters">
          {(Object.keys(EQUIPMENT_LABELS) as Equipment[]).map((eq) => (
            <ChipToggle
              key={eq}
              selected={equipmentFilter.includes(eq)}
              onClick={() => onEquipmentToggle(eq)}
              label={EQUIPMENT_LABELS[eq]}
            />
          ))}
        </div>
      </FormField>
    </div>
  );
}
