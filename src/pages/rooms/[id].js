import { filterReservationsByRoom } from "@/domain/filterReservationsByRoom";
import { Calendar } from "@/ui/components/Calendar";
import { useRouter } from "next/router";
import cx from "./Rooms.module.scss";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";
import { uniqBy } from "lodash";
import { useEffect } from "react";

export default function RoomsId({ reservations, rooms }) {
  const router = useRouter();
  const { id } = router.query;

  const selectedRoomId = Number(id);
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  useEffect(() => {
    if (!selectedRoom) {
      const firstRoomId = rooms[0].id;
      router.push(`/rooms/${firstRoomId}`);
    }
  }, [rooms, selectedRoom, router]);

  if (!selectedRoom) {
    return <>Loading...</>;
  }

  const selectedRoomReservations = filterReservationsByRoom(
    reservations,
    selectedRoom
  );

  const calendarEntries = selectedRoomReservations.map((reservation) => ({
    id: reservation.id,
    title: reservation.student.name,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id,
  }));

  const handleChangeRoom = (event) => {
    const roomId = Number(event.target.value);
    router.push(`/rooms/${roomId}`);
  };

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={id}
          onChange={handleChangeRoom}
          data-testid="select-room">
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.number} - {room.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar
          entries={calendarEntries}
          data-value={calendarEntries}
          data-testid="calendar-data"
        />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  let reservations;

  await fetchReservations().then(async (data) => {
    reservations = await data;
  });

  const rooms = reservations
    ? uniqBy(
        reservations.map((reservation) => reservation.room),
        "id"
      )
    : undefined;

  const isLoading = reservations === undefined;

  return {
    props: {
      reservations: reservations,
      rooms: rooms,
      isLoading: isLoading,
    },
  };
};
