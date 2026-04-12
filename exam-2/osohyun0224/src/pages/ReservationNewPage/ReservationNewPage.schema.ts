import { z } from 'zod';
import { DEFAULT_DATE } from '@/shared/utils/time';

export const bookingFilterSchema = z.object({
  roomId: z.string().default(''),
  date: z.string().default(DEFAULT_DATE),
  startTime: z.string().default(''),
  endTime: z.string().default(''),
  title: z.string().default(''),
  organizer: z.string().default(''),
  attendees: z.coerce.number().int().min(1).default(1),
});

export type BookingFilter = z.output<typeof bookingFilterSchema>;

export const bookingFilterValidationSchema = z
  .object({
    roomId: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    title: z.string(),
    organizer: z.string(),
    attendees: z.number().int(),
  })
  .superRefine((data, ctx) => {
    if (!data.roomId) {
      ctx.addIssue({
        code: 'custom',
        message: '회의실을 선택해주세요.',
        path: ['roomId'],
      });
    }
    if (!data.date) {
      ctx.addIssue({
        code: 'custom',
        message: '날짜를 입력해주세요.',
        path: ['date'],
      });
    }
    if (!data.startTime) {
      ctx.addIssue({
        code: 'custom',
        message: '시작 시간을 선택해주세요.',
        path: ['startTime'],
      });
    }
    if (!data.endTime) {
      ctx.addIssue({
        code: 'custom',
        message: '종료 시간을 선택해주세요.',
        path: ['endTime'],
      });
    }
    if (!data.title.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: '회의 제목을 입력해주세요.',
        path: ['title'],
      });
    }
    if (!data.organizer.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: '예약자명을 입력해주세요.',
        path: ['organizer'],
      });
    }
    if (data.attendees < 1) {
      ctx.addIssue({
        code: 'custom',
        message: '참석 인원은 1명 이상이어야 합니다.',
        path: ['attendees'],
      });
    }
    if (data.endTime && data.startTime && data.endTime <= data.startTime) {
      ctx.addIssue({
        code: 'custom',
        message: '종료 시간은 시작 시간보다 이후여야 합니다.',
        path: ['endTime'],
      });
    }
  });
