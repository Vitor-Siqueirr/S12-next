import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";
import { uniqBy } from "lodash";

export default function Rooms({ rooms }) {
  const router = useRouter();

  useEffect(() => {
    const firstRoomId = rooms[0].id;
    router.push(`/rooms/${firstRoomId}`);
  }, [rooms, router]);

  return <>Loading...</>;
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

  return {
    props: {
      rooms: rooms,
    },
  };
};
