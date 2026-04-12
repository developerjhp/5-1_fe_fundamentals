import type { Reservation, Room } from '@/types';

interface ReservationDetailProps {
  reservation: Reservation;
  room: Room | undefined;
  onCancel: () => void;
  onBack: () => void;
  isCancelling: boolean;
  cancelError: Error | null;
}

export function ReservationDetail({
  reservation,
  room,
  onCancel,
  onBack,
  isCancelling,
  cancelError,
}: ReservationDetailProps) {
  return (
    <div className="detail-card">
      <div className="detail-card-header">
        <h3>{reservation.title}</h3>
      </div>

      <dl className="detail-list">
        <div className="detail-row">
          <dt>회의실</dt>
          <dd>{room?.name ?? reservation.roomId}</dd>
        </div>
        <div className="detail-row">
          <dt>날짜</dt>
          <dd>{reservation.date}</dd>
        </div>
        <div className="detail-row">
          <dt>시간</dt>
          <dd>
            {reservation.startTime} ~ {reservation.endTime}
          </dd>
        </div>
        <div className="detail-row">
          <dt>예약자</dt>
          <dd>{reservation.organizer}</dd>
        </div>
        <div className="detail-row">
          <dt>참석 인원</dt>
          <dd>{reservation.attendees}명</dd>
        </div>
        {room && (
          <>
            <div className="detail-row">
              <dt>층</dt>
              <dd>{room.floor}F</dd>
            </div>
            <div className="detail-row">
              <dt>수용인원</dt>
              <dd>{room.capacity}명</dd>
            </div>
          </>
        )}
      </dl>

      {cancelError && (
        <div className="error-box" style={{ margin: '0 24px' }}>
          <p>취소에 실패했습니다. 다시 시도해주세요.</p>
        </div>
      )}

      <div className="detail-actions">
        <button type="button" onClick={onBack} className="btn-secondary">
          뒤로 가기
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isCancelling}
          className="btn-danger"
        >
          {isCancelling ? '취소 중...' : '예약 취소'}
        </button>
      </div>
    </div>
  );
}
