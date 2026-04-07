import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRoomsQueryOptions, getReservationByIdQueryOptions, getReservationsQueryOptions } from '@/shared/queries';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { ROUTES } from '@/pages/routes.constants';
import { useCancelReservation } from '@/shared/hooks';
import { ReservationDetail } from './components/ReservationDetail';
import { MiniTimeline } from './components/MiniTimeline';

export function ReservationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery(
    getReservationByIdQueryOptions(id ?? ''),
  );
  const { data: roomsData } = useQuery(getRoomsQueryOptions());
  const cancelMutation = useCancelReservation();

  const reservation = data?.reservation;
  const rooms = roomsData?.rooms ?? [];
  const room = rooms.find((room) => room.id === reservation?.roomId);

  const { data: dayReservationsData } = useQuery({
    ...getReservationsQueryOptions(reservation?.date ?? ''),
    enabled: !!reservation?.date,
  });
  const dayReservations = dayReservationsData?.reservations ?? [];

  async function handleCancel() {
    if (!reservation) return;
    const confirmed = window.confirm(
      `"${reservation.title}" 예약을 취소하시겠습니까?`,
    );
    if (!confirmed) return;

    try {
      await cancelMutation.mutateAsync(reservation.id);
      navigate(-1);
    } catch {
      throw new Error('예약 취소에 실패했습니다.');
    }
  }

  if (isLoading) return <LoadingSpinner />;

  if (error && (error as any).status === 404) {
    return (
      <div className="empty-state">
        <h2>예약을 찾을 수 없습니다</h2>
        <p>존재하지 않거나 이미 취소된 예약입니다.</p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.HOME)}
          className="btn-secondary"
        >
          타임라인으로 돌아가기
        </button>
      </div>
    );
  }

  if (error) return <ErrorMessage onRetry={() => refetch()} />;
  if (!reservation) return null;

  return (
    <div className="page-container">
      <h2 className="page-title">예약 상세</h2>
      <ReservationDetail
        reservation={reservation}
        room={room}
        onCancel={handleCancel}
        onBack={() => navigate(-1)}
        isCancelling={cancelMutation.isPending}
        cancelError={cancelMutation.error}
      />
      {dayReservations.length > 0 && (
        <MiniTimeline
          reservations={dayReservations}
          roomId={reservation.roomId}
          currentId={reservation.id}
        />
      )}
    </div>
  );
}
