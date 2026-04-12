import { useMemo, useState } from 'react';
import type { Equipment, Room } from '@/types';

export function useTimelineFilters(rooms: Room[]) {
  const [minCapacity, setMinCapacity] = useState(0);
  const [equipmentFilter, setEquipmentFilter] = useState<Equipment[]>([]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (room.capacity < minCapacity) return false;
      if (equipmentFilter.length > 0) {
        return equipmentFilter.every((eq) => room.equipment.includes(eq));
      }
      return true;
    });
  }, [rooms, minCapacity, equipmentFilter]);

  function toggleEquipment(eq: Equipment) {
    setEquipmentFilter((prev) =>
      prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq],
    );
  }

  return {
    minCapacity,
    setMinCapacity,
    equipmentFilter,
    setEquipmentFilter,
    toggleEquipment,
    filteredRooms,
  };
}
