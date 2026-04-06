import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReservationForm } from '@/features/reservation/components';
import { useCreateReservation } from '@/features/reservation/hooks';
import { useRooms } from '@/features/timeline/hooks';
import { LoadingSpinner } from '@/shared/components';
import type { CreateReservationRequest } from '@/types/reservation';

function ReservationNewContent() {
  const [searchParams] = useSearchParams();
  const { data: rooms } = useRooms();
  const mutation = useCreateReservation();

  const defaultValues: Partial<CreateReservationRequest> = {
    roomId: searchParams.get('roomId') ?? undefined,
    date: searchParams.get('date') ?? undefined,
    startTime: searchParams.get('startTime') ?? undefined,
  };

  const handleSubmit = async (values: CreateReservationRequest) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div className="w-full max-w-full flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold mb-6">예약 생성</h2>
      <ReservationForm
        rooms={rooms}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isPending={mutation.isPending}
      />
    </div>
  );
}

export default function ReservationNew() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReservationNewContent />
    </Suspense>
  );
}
