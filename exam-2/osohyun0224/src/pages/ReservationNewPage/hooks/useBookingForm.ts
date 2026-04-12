import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextTimeSlot } from '@/shared/utils/time';
import { ROUTES } from '@/pages/routes.constants';
import type { ConflictError } from '@/types';
import { bookingFilterValidationSchema } from '../ReservationNewPage.schema';
import { useBookingParams } from './useBookingParams';
import { useCreateReservation } from './useCreateReservation';

export function useBookingForm() {
  const navigate = useNavigate();
  const params = useBookingParams();
  const createMutation = useCreateReservation();

  const [roomId, setRoomId] = useState(params.roomId);
  const [date, setDate] = useState(params.date);
  const [startTime, setStartTime] = useState(params.startTime);
  const [endTime, setEndTime] = useState(
    params.endTime ?? getNextTimeSlot(params.startTime),
  );
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [attendees, setAttendees] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const conflictInfo =
    createMutation.error && (createMutation.error as any).status === 409
      ? ((createMutation.error as any).data as ConflictError)
      : null;

  function validate(): string[] {
    const result = bookingFilterValidationSchema.safeParse({
      roomId,
      date,
      startTime,
      endTime,
      title,
      organizer,
      attendees,
    });

    if (result.success) return [];
    return result.error.issues.map((issue) => issue.message);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validate();
    setValidationErrors(errors);
    if (errors.length > 0) return;

    try {
      await createMutation.mutateAsync({
        roomId,
        date,
        startTime,
        endTime,
        title: title.trim(),
        organizer: organizer.trim(),
        attendees,
      });
      navigate(`${ROUTES.HOME}?date=${date}`);
    } catch {
      throw new Error('예약에 실패했습니다.');
    }
  }

  return {
    formState: {
      roomId,
      date,
      startTime,
      endTime,
      title,
      organizer,
      attendees,
    },
    handlers: {
      setRoomId,
      setDate,
      setStartTime,
      setEndTime,
      setTitle,
      setOrganizer,
      setAttendees,
    },
    validationErrors,
    conflictInfo,
    isPending: createMutation.isPending,
    error: createMutation.error,
    handleSubmit,
  };
}
