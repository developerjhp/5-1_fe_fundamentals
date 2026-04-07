import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { TimelinePreview } from "@/pages/timeline/Timeline";
import { roomsQueryOptions } from "@/reservation/api/rooms";
import { reservationsQueryOptions } from "@/reservation/api/reservations";
import type { Reservation } from "@/reservation/types";
import { color, radius, spacing } from "@/styles/tokens";
import { Button } from "@/components/Button";
import { Match, Switch } from "@/components/Switch";

interface ReservationTimelinePreviewProps {
  reservation: Reservation;
}

export function ReservationTimelinePreview({
  reservation,
}: ReservationTimelinePreviewProps) {
  const roomsQuery = useQuery(roomsQueryOptions());
  const reservationsQuery = useQuery(reservationsQueryOptions(reservation.date));
  const room = roomsQuery.data?.rooms.find(
    (item) => item.id === reservation.roomId,
  );
  const roomReservations =
    reservationsQuery.data?.reservations.filter(
      (item) => item.roomId === reservation.roomId,
    ) ?? [];

  return (
    <section css={previewSectionStyle}>
      <h2 css={previewTitleStyle}>해당 날짜 타임라인 미리보기</h2>
      <Switch>
        <Match when={roomsQuery.isPending || reservationsQuery.isPending}>
          <p>타임라인 미리보기를 불러오는 중입니다.</p>
        </Match>
        <Match when={roomsQuery.isError || reservationsQuery.isError}>
          <div css={errorBannerStyle}>
            타임라인 미리보기를 불러올 수 없습니다.
            <Button
              variant="secondary"
              onClick={() => {
                void roomsQuery.refetch();
                void reservationsQuery.refetch();
              }}
              css={css`
                margin-left: ${spacing.sm};
              `}
            >
              다시 시도
            </Button>
          </div>
        </Match>
        <Match when={room == null}>
          <div css={errorBannerStyle}>
            회의실 정보를 찾을 수 없어 타임라인 미리보기를 표시할 수 없습니다.
          </div>
        </Match>
        <Match when={room != null}>
          <TimelinePreview
            rooms={room ? [room] : []}
            reservations={roomReservations}
            highlightedReservationId={reservation.id}
          />
        </Match>
      </Switch>
    </section>
  );
}

const previewSectionStyle = css`
  margin-bottom: ${spacing.xl};
`;

const previewTitleStyle = css`
  margin-bottom: ${spacing.md};
`;

const errorBannerStyle = css`
  color: ${color.danger};
  background: ${color.dangerBg};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${radius.sm};
  margin-bottom: ${spacing.md};
`;
