import type { Equipment } from '@/types';

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  monitor: '모니터',
  whiteboard: '화이트보드',
  video_conference: '화상회의',
  projector: '빔프로젝터',
};

export function getEquipmentLabel(eq: Equipment): string {
  return EQUIPMENT_LABELS[eq];
}
