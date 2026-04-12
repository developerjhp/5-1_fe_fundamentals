import { FormField } from '@/shared/components/FormField';
import { DateSelector } from '@/shared/components/DateSelector';
import { TimeSelector } from '@/shared/components/TimeSelector';
import type { ConflictError, Room } from '@/types';

interface BookingFormProps {
  rooms: Room[];
  roomsLoading: boolean;
  formState: {
    roomId: string;
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    organizer: string;
    attendees: number;
  };
  handlers: {
    setRoomId: (v: string) => void;
    setDate: (v: string) => void;
    setStartTime: (v: string) => void;
    setEndTime: (v: string) => void;
    setTitle: (v: string) => void;
    setOrganizer: (v: string) => void;
    setAttendees: (v: number) => void;
  };
  validationErrors: string[];
  conflictInfo: ConflictError | null;
  isPending: boolean;
  error: Error | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function BookingForm({
  rooms,
  roomsLoading,
  formState,
  handlers,
  validationErrors,
  conflictInfo,
  isPending,
  error,
  onSubmit,
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="reservation-form">
      <FormField label="회의실">
        <select
          value={formState.roomId}
          onChange={(e) => handlers.setRoomId(e.target.value)}
          className="form-input"
          disabled={roomsLoading}
          aria-label="회의실 선택"
        >
          <option value="">회의실을 선택하세요</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} ({room.floor}F, {room.capacity}명)
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="날짜">
        <DateSelector
          value={formState.date}
          onChange={handlers.setDate}
          aria-label="예약 날짜"
        />
      </FormField>

      <div className="form-row">
        <FormField label="시작 시간">
          <TimeSelector
            value={formState.startTime}
            onChange={handlers.setStartTime}
            start="09:00"
            end="17:30"
            aria-label="시작 시간"
          />
        </FormField>
        <FormField label="종료 시간">
          <TimeSelector
            value={formState.endTime}
            onChange={handlers.setEndTime}
            start="09:30"
            end="18:00"
            aria-label="종료 시간"
          />
        </FormField>
      </div>

      <FormField label="회의 제목">
        <input
          type="text"
          value={formState.title}
          onChange={(e) => handlers.setTitle(e.target.value)}
          placeholder="예: 주간 스크럼"
          className="form-input"
          aria-label="회의 제목"
        />
      </FormField>

      <div className="form-row">
        <FormField label="예약자명">
          <input
            type="text"
            value={formState.organizer}
            onChange={(e) => handlers.setOrganizer(e.target.value)}
            placeholder="예: 김철수"
            className="form-input"
            aria-label="예약자명"
          />
        </FormField>
        <FormField label="참석 인원">
          <input
            type="number"
            min={1}
            value={formState.attendees}
            onChange={(e) => handlers.setAttendees(Number(e.target.value))}
            className="form-input"
            aria-label="참석 인원"
          />
        </FormField>
      </div>

      {validationErrors.length > 0 && (
        <div className="error-box">
          {validationErrors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      )}

      {conflictInfo && (
        <div className="conflict-box">
          <strong>시간 충돌이 발생했습니다</strong>
          <p>
            기존 예약: {conflictInfo.conflictWith.title} (
            {conflictInfo.conflictWith.startTime} ~{' '}
            {conflictInfo.conflictWith.endTime})
          </p>
        </div>
      )}

      {error && !conflictInfo && (
        <div className="error-box">
          <p>{error.message}</p>
        </div>
      )}

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? '생성 중...' : '예약 생성'}
      </button>
    </form>
  );
}
