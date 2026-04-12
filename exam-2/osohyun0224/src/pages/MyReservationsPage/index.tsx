import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { getRoomsQueryOptions, getMyReservationsQueryOptions } from '@/shared/queries';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useCancelReservation } from '@/shared/hooks';
import type { Reservation } from '@/types';
import { MyReservationList } from './components/MyReservationList';

export function MyReservationsPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [{ isLoading: roomsLoading, error: roomsError }, { isLoading: reservationsLoading, error: reservationsError }] =
    useQueries({
      queries: [getRoomsQueryOptions(), getMyReservationsQueryOptions()],
    });
  const cancelMutation = useCancelReservation();

  const isLoading = roomsLoading || reservationsLoading;
  const error = roomsError || reservationsError;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      <h2 className="page-title">내 예약 목록</h2>

      {message && (
        <div
          className={
            message.type === 'success' ? 'success-banner' : 'error-box'
          }
        >
          <p>{message.text}</p>
        </div>
      )}

      <MyReservationList
        onItemClick={(id) => navigate(`/reservations/${id}`)}
        renderRight={(reservation: Reservation) => (
          <button
            type="button"
            className="btn-danger-small"
            disabled={cancelMutation.isPending}
            onClick={() => {
              if (window.confirm('정말 취소하시겠습니까?')) {
                cancelMutation.mutate(reservation.id, {
                  onSuccess: () => setMessage({ type: 'success', text: '예약이 취소되었습니다.' }),
                  onError: () => setMessage({ type: 'error', text: '취소에 실패했습니다.' }),
                });
              }
            }}
          >
            취소
          </button>
        )}
      />
    </div>
  );
}
