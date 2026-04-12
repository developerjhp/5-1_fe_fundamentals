import { useQuery } from '@tanstack/react-query';
import { getRoomsQueryOptions } from '@/shared/queries';
import { useBookingForm } from './hooks/useBookingForm';
import { BookingForm } from './components/BookingForm';

export function ReservationNewPage() {
  const { data: roomsData, isLoading: roomsLoading } = useQuery(
    getRoomsQueryOptions(),
  );
  const rooms = roomsData?.rooms ?? [];

  const {
    formState,
    handlers,
    validationErrors,
    conflictInfo,
    isPending,
    error,
    handleSubmit,
  } = useBookingForm();

  return (
    <div className="page-container">
      <h2 className="page-title">예약 생성</h2>
      <BookingForm
        rooms={rooms}
        roomsLoading={roomsLoading}
        formState={formState}
        handlers={handlers}
        validationErrors={validationErrors}
        conflictInfo={conflictInfo}
        isPending={isPending}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
