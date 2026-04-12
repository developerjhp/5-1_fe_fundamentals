import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRoomsQueryOptions, getReservationsQueryOptions } from '@/shared/queries';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { DEFAULT_DATE, TIME_SLOTS } from '@/shared/utils/time';
import { ROUTES } from '@/pages/routes.constants';
import type { Equipment, Reservation, Room } from '@/types';
import { useTimelineFilters } from './hooks/useTimelineFilters';
import { useDragSelect } from './hooks/useDragSelect';
import { BookingFilterSection } from './components/BookingFilterSection';
import { ReservationTimeline } from './components/ReservationTimeline';

function parseEquipmentParam(value: string | null): Equipment[] {
  if (!value) return [];
  return value.split(',').filter(Boolean) as Equipment[];
}

export function TimelinePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const dateParam = searchParams.get('date') || DEFAULT_DATE;
  const capacityParam = Number(searchParams.get('capacity') || '0');
  const equipmentParam = parseEquipmentParam(searchParams.get('equipment'));

  const [date, setDate] = useState(dateParam);

  const {
    data: roomsData,
    isLoading: roomsLoading,
    error: roomsError,
    refetch: refetchRooms,
  } = useQuery(getRoomsQueryOptions());

  const {
    data: reservationsData,
    isLoading: reservationsLoading,
    error: reservationsError,
    refetch: refetchReservations,
  } = useQuery(getReservationsQueryOptions(date));

  const rooms = roomsData?.rooms ?? [];
  const reservations = reservationsData?.reservations ?? [];

  const {
    minCapacity,
    setMinCapacity,
    equipmentFilter,
    toggleEquipment,
    setEquipmentFilter,
    filteredRooms,
  } = useTimelineFilters(rooms);

  useEffect(() => {
    if (capacityParam > 0) setMinCapacity(capacityParam);
    if (equipmentParam.length > 0) setEquipmentFilter(equipmentParam);
  }, []);

  const syncSearchParams = useCallback(
    (newDate: string, newCapacity: number, newEquipment: Equipment[]) => {
      const params: Record<string, string> = { date: newDate };
      if (newCapacity > 0) params.capacity = String(newCapacity);
      if (newEquipment.length > 0) params.equipment = newEquipment.join(',');
      setSearchParams(params, { replace: true });
    },
    [setSearchParams],
  );

  function handleDateChange(newDate: string) {
    setDate(newDate);
    syncSearchParams(newDate, minCapacity, equipmentFilter);
  }

  function handleCapacityChange(value: number) {
    setMinCapacity(value);
    syncSearchParams(date, value, equipmentFilter);
  }

  function handleEquipmentToggle(eq: Equipment) {
    const next = equipmentFilter.includes(eq)
      ? equipmentFilter.filter((e) => e !== eq)
      : [...equipmentFilter, eq];
    toggleEquipment(eq);
    syncSearchParams(date, minCapacity, next);
  }

  function handleSlotClick(room: Room, time: string) {
    navigate(
      `${ROUTES.BOOKING}?roomId=${room.id}&date=${date}&startTime=${time}`,
    );
  }

  function handleReservationClick(reservation: Reservation) {
    navigate(`/reservations/${reservation.id}`);
  }

  function handleDragEnd(roomId: string, startSlot: number, endSlot: number) {
    const startTime = TIME_SLOTS[startSlot];
    const endTime =
      endSlot < TIME_SLOTS.length ? TIME_SLOTS[endSlot] : '18:00';
    navigate(
      `${ROUTES.BOOKING}?roomId=${roomId}&date=${date}&startTime=${startTime}&endTime=${endTime}`,
    );
  }

  const {
    handleMouseDown: onDragStart,
    handleMouseEnter: onDragEnter,
    handleMouseUp: onDragMouseUp,
    isSlotInDragRange,
  } = useDragSelect(handleDragEnd);

  const isLoading = roomsLoading || reservationsLoading;
  const error = roomsError || reservationsError;

  if (error) {
    return (
      <ErrorMessage
        onRetry={() => {
          refetchRooms();
          refetchReservations();
        }}
      />
    );
  }

  return (
    <div>
      <BookingFilterSection
        date={date}
        onDateChange={handleDateChange}
        minCapacity={minCapacity}
        onCapacityChange={handleCapacityChange}
        equipmentFilter={equipmentFilter}
        onEquipmentToggle={handleEquipmentToggle}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ReservationTimeline
          rooms={filteredRooms}
          reservations={reservations}
          onSlotClick={handleSlotClick}
          onReservationClick={handleReservationClick}
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragEnd={onDragMouseUp}
          isSlotInDragRange={isSlotInDragRange}
        />
      )}
    </div>
  );
}
