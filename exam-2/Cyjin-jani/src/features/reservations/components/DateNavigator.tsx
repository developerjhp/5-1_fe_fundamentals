import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface DateNavigatorProps {
  date: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMove: (offset: number) => void;
}

export function DateNavigator({ date, onDateChange, onMove }: DateNavigatorProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button variant="outline" size="icon" onClick={() => onMove(-1)} aria-label="이전 날짜">
        <ChevronLeft />
      </Button>

      <div className="flex items-center gap-1.5">
        <Label htmlFor="timeline-date" className="sr-only">
          날짜 선택
        </Label>
        <Input
          id="timeline-date"
          type="date"
          value={date}
          onChange={onDateChange}
          className="w-40 cursor-pointer"
        />
      </div>

      <Button variant="outline" size="icon" onClick={() => onMove(1)} aria-label="다음 날짜">
        <ChevronRight />
      </Button>
    </div>
  );
}
