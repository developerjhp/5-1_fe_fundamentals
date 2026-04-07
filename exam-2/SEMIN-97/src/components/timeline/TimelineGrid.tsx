import type { Reservation, Room } from '@/types/reservation.ts'

const TIME_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9
  const minute = i % 2 === 0 ? '00' : '30'
  return `${String(hour).padStart(2, '0')}:${minute}`
})

interface Props {
  rooms: Room[]
  reservations: Reservation[]
  date: string
}

function TimelineGrid({ rooms, reservations, date }: Props) {
  return (
    <div>
      {/* 타임라인 헤더 */}
      <div className="flex">
        <div className="min-w-30" />
        <div className="relative flex">
          {TIME_SLOTS.map(slot => (
            <div
              key={slot}
              className="min-w-20"
            >
              {slot.endsWith(':00') && (
                <span className="flex justify-center w-0 text-xs text-gray-500">
                  {slot}
                </span>
              )}
            </div>
          ))}
          <span className="flex justify-center w-0 text-xs text-gray-500">
            18:00
          </span>
        </div>
      </div>

      {/* 타임라인 바디 */}
      <div className="w-fit border border-gray-200 rounded-lg">
        {rooms.map(room => (
          <div key={room.id} className="flex border-b border-gray-200">
            {/* 회의실 이름 */}
            <div className="flex flex-col justify-center min-w-30 px-3 py-2 border-r border-gray-200 bg-gray-50">
              <span className="text-sm font-medium text-gray-800">{room.name}</span>
              <span className="text-xs text-gray-400">{room.floor}F · {room.capacity}인</span>
            </div>

            {/* 빈 셀들 */}
            {TIME_SLOTS.map((slot, i) => (
              <div
                key={slot}
                className={`min-w-20 ${i < TIME_SLOTS.length - 1 ? 'border-r border-gray-200' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimelineGrid
