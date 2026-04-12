import { useSearchParams } from 'react-router-dom';
import { DEFAULT_DATE } from '@/shared/utils/time';

export interface BookingParams {
  roomId: string;
  date: string;
  startTime: string;
  endTime: string | null;
}

export function useBookingParams(): BookingParams {
  const [searchParams] = useSearchParams();

  return {
    roomId: searchParams.get('roomId') ?? '',
    date: searchParams.get('date') ?? DEFAULT_DATE,
    startTime: searchParams.get('startTime') ?? '09:00',
    endTime: searchParams.get('endTime'),
  };
}
