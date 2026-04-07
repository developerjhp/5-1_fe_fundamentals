import { SuspenseQuery } from "@suspensive/react-query-5";
import { css } from "@emotion/react";
import { useQueryStates } from "nuqs";
import { useNavigate } from "react-router";
import {
  ReservationForm,
  type SubmitError,
} from "@/pages/create-reservation/ReservationForm";
import { useCreateReservation } from "@/reservation/hooks/useCreateReservation";
import { HttpError } from "@/reservation/api/client";
import { roomsQueryOptions } from "@/reservation/api/rooms";
import {
  createReservationSearchParsers,
  getTimelineSearchValues,
  normalizeCreateReservationSearch,
  serializeTimelineSearch,
} from "@/reservation/searchParams";
import type {
  ConflictError,
  CreateReservationRequest,
  ReservationResponse,
} from "@/reservation/types";
import { AsyncBoundary } from "@/components/AsyncBoundary";
import { spacing } from "@/styles/tokens";

function parseSubmitError(error: Error | null): SubmitError | null {
  if (!error) return null;

  if (error instanceof HttpError && error.status === 409) {
    const conflict = (error.body as ConflictError).conflictWith;
    return {
      type: "conflict",
      message: "시간 충돌",
      conflict: {
        title: conflict.title,
        startTime: conflict.startTime,
        endTime: conflict.endTime,
      },
    };
  }

  if (error instanceof HttpError && error.status >= 500) {
    return {
      type: "server",
      message: "서버 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }

  return { type: "server", message: error.message };
}

export function CreateReservationPage() {
  const navigate = useNavigate();
  const mutation = useCreateReservation();
  const [search] = useQueryStates(createReservationSearchParsers);
  const normalizedSearch = normalizeCreateReservationSearch(search);
  const initialRoomId = normalizedSearch.roomId ?? "";
  const initialDate = normalizedSearch.date ?? "";
  const initialStartTime = normalizedSearch.startTime ?? "";
  const timelineSearchValues = getTimelineSearchValues({
    date: initialDate,
    minCapacity: normalizedSearch.minCapacity,
    equipment: normalizedSearch.equipment,
  });

  const handleSubmit = (data: CreateReservationRequest) => {
    mutation.mutate(data, {
      onSuccess: (response: ReservationResponse) => {
        navigate(
          serializeTimelineSearch("/", {
            ...timelineSearchValues,
            date: response.reservation.date,
          }),
        );
      },
    });
  };

  const submitError = parseSubmitError(mutation.error);

  return (
    <div>
      <h1
        css={css`
          margin-bottom: ${spacing.lg};
        `}
      >
        예약 생성
      </h1>
      <AsyncBoundary>
        <SuspenseQuery {...roomsQueryOptions()}>
          {({ data: { rooms } }) => {
            const validRoomId = rooms.some((room) => room.id === initialRoomId)
              ? initialRoomId
              : "";

            return (
              <ReservationForm
                rooms={rooms}
                initialValues={{
                  roomId: validRoomId,
                  date: initialDate,
                  startTime: initialStartTime,
                }}
                onSubmit={handleSubmit}
                isPending={mutation.isPending}
                submitError={submitError}
              />
            );
          }}
        </SuspenseQuery>
      </AsyncBoundary>
    </div>
  );
}
