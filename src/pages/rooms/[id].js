import { filterReservationsByRoom } from "@/domain/filterReservationsByRoom";
import { Calendar } from "@/ui/components/Calendar";
import { useRouter } from "next/router";
import cx from "@/ui/styles/Reservations.module.scss";
import {
  fetchReservations,
  fetchRooms,
} from "@/infrastructure/inner/fetchReservations";
import { mapReservationsToCalendarEntries } from "@/utils/mapReservations";

export default function RoomsId({ reservations, rooms, id }) {
  const router = useRouter();

  const selectedRoomId = Number(id);
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  const selectedRoomReservations = filterReservationsByRoom(
    reservations,
    selectedRoom
  );

  const calendarEntries = mapReservationsToCalendarEntries(
    selectedRoomReservations
  );

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
          data-testid="select-room"
          className={cx.selectRoom}>
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

export async function getStaticPaths() {
  const rooms = await fetchRooms();

  const paths = rooms.map((room) => ({
    params: { id: room.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const reservations = await fetchReservations();
  const rooms = await fetchRooms();

  if (!rooms.find((room) => room.id.toString() === params.id)) {
    return {
      redirect: {
        destination: `/rooms/${rooms[0].id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      reservations: reservations,
      rooms: rooms,
      id: params.id,
    },
  };
}
